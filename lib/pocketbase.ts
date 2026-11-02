// Static replacement for the PocketBase client.
//
// The site used to call a hosted PocketBase server. Now the content is exported to
// /public/data/*.json and /public/files/** (see scripts/export-pocketbase.mjs) and this
// file exposes the same tiny API the pages already use, so no page code had to change:
//   pb.collection(name).getList / getOne / getFirstListItem / create
//   pb.health.check(), pb.baseUrl, getImageUrl()

const BASE: string = ((import.meta as any).env?.BASE_URL as string) || '/';
const WEB3FORMS_KEY: string | undefined = (import.meta as any).env?.VITE_WEB3FORMS_KEY;

type Rec = Record<string, any>;
const cache = new Map<string, Promise<Rec[]>>();

const loadCollection = (name: string): Promise<Rec[]> => {
  if (!cache.has(name)) {
    cache.set(
      name,
      fetch(`${BASE}data/${name}.json`).then(async (res) => {
        if (!res.ok) throw Object.assign(new Error(`Collection "${name}" not found`), { status: res.status });
        return (await res.json()).items as Rec[];
      })
    );
  }
  return cache.get(name)!;
};

// "-created" / "+created" / "title" (comma separated allowed)
const applySort = (items: Rec[], sort?: string) => {
  if (!sort) return items;
  const keys = sort.split(',').map((s) => s.trim()).filter(Boolean);
  return [...items].sort((a, b) => {
    for (const k of keys) {
      const desc = k.startsWith('-');
      const field = k.replace(/^[-+]/, '');
      if (a[field] === b[field]) continue;
      return (a[field] > b[field] ? 1 : -1) * (desc ? -1 : 1);
    }
    return 0;
  });
};

// Supports the filters the site uses: `field = true`, `slug="x"`, joined with &&.
const matches = (rec: Rec, filter?: string) => {
  if (!filter || !filter.trim()) return true;
  return filter.split('&&').every((part) => {
    const m = part.trim().match(/^(\w+)\s*=\s*(true|false|"([^"]*)"|'([^']*)')$/);
    if (!m) throw new Error(`Unsupported filter: ${part}`);
    const expected = m[2] === 'true' ? true : m[2] === 'false' ? false : (m[3] ?? m[4]);
    return rec[m[1]] === expected;
  });
};

const notFound = () => Object.assign(new Error('The requested resource wasn\'t found.'), { status: 404 });

const collection = (name: string) => ({
  async getList<T = Rec>(page = 1, perPage = 30, opts: { sort?: string; filter?: string } = {}) {
    const all = applySort((await loadCollection(name)).filter((r) => matches(r, opts.filter)), opts.sort);
    return {
      page,
      perPage,
      totalItems: all.length,
      totalPages: Math.max(1, Math.ceil(all.length / perPage)),
      items: all.slice((page - 1) * perPage, page * perPage) as T[],
    };
  },
  async getOne<T = Rec>(id: string) {
    const rec = (await loadCollection(name)).find((r) => r.id === id);
    if (!rec) throw notFound();
    return rec as T;
  },
  async getFirstListItem<T = Rec>(filter: string, opts: { sort?: string } = {}) {
    const rec = applySort((await loadCollection(name)).filter((r) => matches(r, filter)), opts.sort)[0];
    if (!rec) throw notFound();
    return rec as T;
  },
  // Only the contact form writes data. It is forwarded to Web3Forms, which emails it to you.
  async create(data: Rec) {
    if (name !== 'messages') throw new Error('This site is static: only contact messages can be submitted.');
    if (!WEB3FORMS_KEY) throw new Error('VITE_WEB3FORMS_KEY is not set');
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: data.subject ? `Portfolio: ${data.subject}` : 'New portfolio message',
        from_name: data.name,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.success === false) throw new Error(body.message || 'Message could not be sent');
    return body;
  },
});

export const pb = {
  // Used by the Admin page to open the dashboard of a PocketBase running on YOUR machine.
  baseUrl: 'http://127.0.0.1:8090',
  collection,
  health: { check: async () => ({ code: 200, message: 'static', data: {} }) },
  autoCancellation: (_v: boolean) => {},
};

export const getImageUrl = (collectionId: string, recordId: string, fileName: string) =>
  `${BASE}files/${collectionId}/${recordId}/${fileName}`;
