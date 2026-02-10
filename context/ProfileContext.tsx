
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { pb } from '../lib/pocketbase';
import { Profile, SiteSettings } from '../types';

interface ProfileContextType {
  profile: Profile | null;
  settings: SiteSettings | null;
  loading: boolean;
  criticalError: boolean;
  refreshData: () => Promise<void>; // Added refresh function
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
  };
  branding: {
    logo: string;
    footer: string;
    fullName: string;
  }
}

// Default fallback data
const defaultProfile: ProfileContextType = {
  profile: null,
  settings: null,
  loading: true,
  criticalError: false,
  refreshData: async () => {},
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    leetcode: "https://leetcode.com/"
  },
  branding: {
    logo: "Website",
    footer: "Designed & Built by Developer",
    fullName: "User Name"
  }
};

const ProfileContext = createContext<ProfileContextType>(defaultProfile);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [criticalError, setCriticalError] = useState(false);

  const fetchData = useCallback(async () => {
      setLoading(true);
      setCriticalError(false);
      
      try {
        // Check Health First
        try {
            const health = await pb.health.check();
            if (health.code && health.code !== 200) throw new Error("Health check failed");
        } catch (e) {
            throw new Error("Cannot connect to backend");
        }

        // 1. Fetch Profile (Get the first record created)
        try {
            const profileRecord = await pb.collection('profile').getFirstListItem<Profile>('');
            setProfile(profileRecord);
        } catch (e) {
            console.warn("Profile fetch failed.", e);
            setCriticalError(true);
            return; // Stop if profile fails
        }

        // 2. Fetch Site Settings (Get the first record created)
        try {
            const settingsRecord = await pb.collection('settings').getFirstListItem<SiteSettings>('');
            setSettings(settingsRecord);
        } catch (e) {
             console.warn("Settings fetch failed.", e);
             setCriticalError(true);
             return; 
        }

      } catch (error) {
        console.error("Critical error fetching profile context:", error);
        setCriticalError(true);
      } finally {
        setLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value = {
    profile,
    settings,
    loading,
    criticalError,
    refreshData: fetchData,
    socials: {
      github: profile?.githubUrl || defaultProfile.socials.github,
      linkedin: profile?.linkedinUrl || defaultProfile.socials.linkedin,
      leetcode: profile?.leetcodeUrl || defaultProfile.socials.leetcode,
    },
    branding: {
        logo: profile?.firstName || defaultProfile.branding.logo,
        footer: profile?.footerText || defaultProfile.branding.footer,
        fullName: profile ? `${profile.firstName} ${profile.lastName}` : defaultProfile.branding.fullName
    }
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
