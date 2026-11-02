
import fs from 'fs';

// Configuration
const SITE_URL = 'harishama.in'; // your live domain
const SETTINGS_PATH = './public/data/settings.json'; // written by scripts/export-pocketbase.mjs
const INDEX_PATH = './index.html';

async function updateMeta() {
   console.log('🔄 Reading exported SEO settings...');
   
   try {
       // Read the exported settings record (no server needed)
       const data = JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf-8'));
       
       if (!data.items || data.items.length === 0) {
           console.error('❌ No settings record in public/data/settings.json. Run scripts/export-pocketbase.mjs first.');
           return;
       }

       const settings = data.items[0];
       console.log(`✅ Found settings: "${settings.homepage_title}"`);

       // Read current index.html
       let html = fs.readFileSync(INDEX_PATH, 'utf-8');

       // Helper to replace Meta Tags
       // Matches: <meta name="xyz" content="..." /> OR <meta property="xyz" content="..." />
       const replaceMeta = (key, value, isProperty = false) => {
           if (!value) return;
           const attr = isProperty ? 'property' : 'name';
           // Regex to find the specific meta tag and capture its content attribute
           // handles potential spaces and different quote styles
           const regex = new RegExp(`(<meta\\s+${attr}=["']${key}["']\\s+content=["'])(.*?)(["'])`, 'gi');
           
           if (html.match(regex)) {
               html = html.replace(regex, `$1${value}$3`);
               console.log(`   Updated ${key}`);
           } else {
               console.warn(`   ⚠️ Tag for ${key} not found in index.html (skipping)`);
           }
       };

       // 1. Update Title
       if (settings.homepage_title) {
           html = html.replace(/<title>.*?<\/title>/i, `<title>${settings.homepage_title}</title>`);
           console.log(`   Updated <title>`);
       }

       // 2. Update Basic Meta
       replaceMeta('description', settings.seo_description);
       replaceMeta('author', settings.seo_author);
       replaceMeta('keywords', settings.seo_keywords);

       // 3. Update Open Graph (OG)
       const ogTitle = settings.og_title || settings.homepage_title;
       const ogDesc = settings.og_description || settings.seo_description;
       
       replaceMeta('og:title', ogTitle, true);
       replaceMeta('og:description', ogDesc, true);
       replaceMeta('og:url', SITE_URL, true);

       // 4. Update Twitter Card
       replaceMeta('twitter:title', ogTitle);
       replaceMeta('twitter:description', ogDesc);

       // 5. Update Images (Construct full URL)
       if (settings.og_image) {
           const imgUrl = `${SITE_URL}/files/${settings.collectionId}/${settings.id}/${settings.og_image}`;
           replaceMeta('og:image', imgUrl, true);
           replaceMeta('twitter:image', imgUrl);
           console.log(`   Updated Social Images`);
       }

       // Save changes
       fs.writeFileSync(INDEX_PATH, html);
       console.log('🎉 index.html successfully updated! Deploy this file to see changes on social media.');

   } catch (err) {
       console.error('❌ Error updating metadata:', err);
   }
}

updateMeta();
