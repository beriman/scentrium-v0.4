import React, { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { AuthContext, AuthContextType } from "./authContext";

// Export the useAuth hook from authContext to avoid circular dependencies
export { useAuth } from "./authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [requires2FA, setRequires2FA] = useState(false);

  // Check active sessions and set the user
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setUserProfile(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    }
  };

  // Handle OAuth callback
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (
        event === "SIGNED_IN" &&
        window.location.href.includes("#access_token")
      ) {
        // Redirect after OAuth login
        window.location.href = "/profile";
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    // Check if user needs 2FA
    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role, is_2fa_enabled")
        .eq("id", data.user.id)
        .single();

      if (userError) throw userError;

      // If user is a business and 2FA is enabled
      if (userData?.role === "business" && userData?.is_2fa_enabled) {
        setRequires2FA(true);
        return {
          requires2FA: true,
          userId: data.user.id,
          email: data.user.email,
        };
      }
    }

    return { requires2FA: false };
  };

  const verify2FA = async (userId: string, otp: string) => {
    const { data, error } = await supabase.functions.invoke(
      "supabase-functions-verify-otp",
      {
        body: { userId, otp },
      },
    );

    if (error) throw error;
    setRequires2FA(false);
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setRequires2FA(false);
    setUserProfile(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    userProfile,
    requires2FA,
    verify2FA,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
