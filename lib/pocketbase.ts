
import PocketBase from 'pocketbase';

// 1. Initialize the client
// We use optional chaining (?.) to safely access env. If env is undefined, it falls back to the hardcoded URL.
const url = (import.meta as any).env?.VITE_POCKETBASE_URL || 'https://pb-harshi.tegota.com';

export const pb = new PocketBase(url);

// 2. Helper to get full image URL
export const getImageUrl = (collectionId: string, recordId: string, fileName: string) => {
    return `${pb.baseUrl}/api/files/${collectionId}/${recordId}/${fileName}`;
};
