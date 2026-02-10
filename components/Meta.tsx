
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useProfile } from '../context/ProfileContext';
import { getImageUrl } from '../lib/pocketbase';

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
}

const Meta: React.FC<MetaProps> = ({ title, description, image, keywords }) => {
  const { settings, profile } = useProfile();

  // 1. Determine Fallbacks from Global Settings
  const siteTitle = settings?.homepage_title || "Harishama Chaurasia | Portfolio";
  const defaultDesc = settings?.seo_description || "Portfolio of Harishama Chaurasia, a Senior AI Engineer.";
  const defaultImage = settings?.og_image 
    ? getImageUrl(settings.collectionId, settings.id, settings.og_image)
    : "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop";
  const author = settings?.seo_author || profile?.firstName || "Harishama";

  // 2. Resolve Final Values
  // If specific title provided, append site name. Else use site title.
  const finalTitle = title ? `${title} | ${author}` : siteTitle;
  const finalDesc = description || defaultDesc;
  const finalImage = image || defaultImage;
  const finalKeywords = keywords || settings?.seo_keywords || "AI, Engineer, Portfolio, Developer";
  const currentUrl = window.location.href;

  return (
    <Helmet>
      {/* Basic */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={currentUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Theme Colors (Dynamic from Settings) */}
      {settings?.primary_color && (
          <style>{`:root { --primary: ${settings.primary_color}; }`}</style>
      )}
      {settings?.background_color && (
          <style>{`:root { --bg-color: ${settings.background_color}; }`}</style>
      )}
    </Helmet>
  );
};

export default Meta;
