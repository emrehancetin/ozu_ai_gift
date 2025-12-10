// src/services/authService.js
import { supabase } from "./supabase/client";
import Response from "../helpers/response/Response";

const signInWithOtp = async (email, routePath = "/app") => {
  try {
    const redirectUrl = window.location.origin + routePath;

    const { error } = await supabase.auth.signInWithOtp({
      email: email.toLowerCase().trim(),
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) return Response.getError(error);
    return Response.getSuccess(null);
  } catch (error) {
    return Response.getError(error);
  }
};

const signInWithPassword = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });

    if (error) return Response.getError(error);

    const user = data.user;

    // Admin mi?
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (profileError) {
      await supabase.auth.signOut();
      return Response.getError(profileError);
    }

    if (!profile?.is_admin) {
      await supabase.auth.signOut();
      return Response.getMessageError("Bu hesap admin değil.");
    }

    return Response.getSuccess(user);
  } catch (error) {
    return Response.getError(error);
  }
};

const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) return Response.getError(error);
    return Response.getSuccess(data.user);
  } catch (error) {
    return Response.getError(error);
  }
};

const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) return Response.getError(error);
    return Response.getSuccess(data.session);
  } catch (error) {
    return Response.getError(error);
  }
};

const logout = async () => {
  try {
    await supabase.auth.signOut();
    return Response.getSuccess(null);
  } catch (error) {
    return Response.getError(error);
  }
};

export const AuthService = {
  signInWithOtp,
  signInWithPassword,
  getCurrentUser,
  getSession,
  logout,
};
