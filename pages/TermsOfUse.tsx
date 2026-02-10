
import React, { useEffect, useState } from 'react';
import { pb } from '../lib/pocketbase';
import { LegalDoc } from '../types';
import { Loader2 } from 'lucide-react';

const TermsOfUse: React.FC = () => {
  const [doc, setDoc] = useState<LegalDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        // Fetch by slug "terms-of-use" from 'legals' collection
        const record = await pb.collection('legals').getFirstListItem<LegalDoc>('slug="terms-of-use"');
        setDoc(record);
      } catch (error) {
        console.error("Error fetching terms of use:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, []);

  if (loading) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-black pt-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );
  }

  // Fallback content if DB record is missing
  const content = doc?.content || `
    <p>Terms of Use content not found. Please create a record in the database with slug 'terms-of-use'.</p>
    <ul>
        <li>Collection: legals</li>
        <li>Slug: terms-of-use</li>
        <li>Title: Terms of Use</li>
        <li>Content: [Your Rich Text Here]</li>
    </ul>
  `;

  const lastUpdated = doc?.last_updated || "October 2024";

  return (
    <div className="w-full pt-28 pb-12 px-6">
      <div className="max-w-4xl mx-auto relative rounded-3xl bg-[#050505] border border-white/10 p-8 md:p-12 overflow-hidden shadow-2xl">

        <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-display uppercase border-b border-white/10 pb-6 tracking-tight">
                {doc?.title || "Terms of Use"}
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none text-textMuted leading-relaxed">
              <p className="mb-8 text-white/90 font-medium">
                Last updated: {lastUpdated}
              </p>

               {/* Rich Text Content from PocketBase */}
               <div dangerouslySetInnerHTML={{ __html: content }} />

               {!doc && (
                  <div className="mt-8 p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-lg text-yellow-200 text-sm font-sans not-prose">
                      <p className="font-bold mb-2">⚠ Developer Note</p>
                      <p>No record found in database with slug 'terms-of-use'. To make this dynamic:</p>
                      <ol className="list-decimal ml-4 mt-2 space-y-1">
                          <li>Create collection <code>legals</code>.</li>
                          <li>Add a record with <code>slug="terms-of-use"</code>.</li>
                          <li>Paste your HTML/Rich text into the content field.</li>
                      </ol>
                  </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
