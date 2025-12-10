// src/services/profileService.js
import { supabase } from "./supabase/client";
import Response from "../helpers/response/Response";

const getOrCreateProfile = async (user) => {
  try {
    let { data: prof, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // Row not found
    if (error && error.code === "PGRST116") {
      const { data: inserted, error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          email: user.email,
        })
        .select()
        .single();

      if (insertError) return Response.getError(insertError);

      prof = inserted;
      error = null;
    }

    if (error) return Response.getError(error);
    return Response.getSuccess(prof);
  } catch (error) {
    return Response.getError(error);
  }
};

const getProfileById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return Response.getError(error);
    return Response.getSuccess(data);
  } catch (error) {
    return Response.getError(error);
  }
};

const updateProfile = async (id, payload) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) return Response.getError(error);
    return Response.getSuccess(data);
  } catch (error) {
    return Response.getError(error);
  }
};

const listAllProfiles = async () => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return Response.getError(error);
    return Response.getSuccess(data || []);
  } catch (error) {
    return Response.getError(error);
  }
};

const checkIsAdmin = async () => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) return Response.getError(userError);
    const user = userData.user;
    if (!user) return Response.getSuccess(false);

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (error) return Response.getError(error);
    return Response.getSuccess(Boolean(profile?.is_admin));
  } catch (error) {
    return Response.getError(error);
  }
};

export const ProfileService = {
  getOrCreateProfile,
  getProfileById,
  updateProfile,
  listAllProfiles,
  checkIsAdmin,
};
