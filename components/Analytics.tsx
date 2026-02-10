
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useProfile } from '../context/ProfileContext';

const Analytics: React.FC = () => {
  const { settings } = useProfile();
  const gaId = settings?.analytics;

  if (!gaId) return null;

  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </script>
    </Helmet>
  );
};

export default Analytics;
