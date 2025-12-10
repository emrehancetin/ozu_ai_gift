// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase/client";
import { ProfileService } from "../services/profileService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Supabase user
  const [profile, setProfile] = useState(null); // profiles tablosu
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      const u = data.user;
      setUser(u);

      const profRes = await ProfileService.getOrCreateProfile(u);
      if (profRes.success) {
        setProfile(profRes.data);
      }

      setLoading(false);
    };

    init();

    // auth durumu değişirse yakala (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        setUser(null);
        setProfile(null);
        return;
      }
      const u = session.user;
      setUser(u);
      const profRes = await ProfileService.getOrCreateProfile(u);
      if (profRes.success) setProfile(profRes.data);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = Boolean(profile?.is_admin);

  return (
    <AuthContext.Provider value={{ user, profile, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
