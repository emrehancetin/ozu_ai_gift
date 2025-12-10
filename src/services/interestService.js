// src/services/interestService.js
import { supabase } from "./supabase/client";
import Response from "../helpers/response/Response";

const getAllInterests = async () => {
  try {
    const { data, error } = await supabase
      .from("interests")
      .select("*")
      .order("content", { ascending: true });

    if (error) return Response.getError(error);
    return Response.getSuccess(data || []);
  } catch (error) {
    return Response.getError(error);
  }
};

const getUserInterests = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("user_interests")
      .select("interest_id, interests(*)")
      .eq("user_id", userId);

    if (error) return Response.getError(error);

    const interests = (data || []).map((row) => row.interests);
    return Response.getSuccess(interests);
  } catch (error) {
    return Response.getError(error);
  }
};

const setUserInterests = async (userId, interestIds) => {
  try {
    // Eski kayıtları sil
    const { error: delError } = await supabase
      .from("user_interests")
      .delete()
      .eq("user_id", userId);

    if (delError) return Response.getError(delError);

    if (!interestIds || interestIds.length === 0) {
      return Response.getSuccess(null);
    }

    const rows = interestIds.map((interestId) => ({
      user_id: userId,
      interest_id: interestId,
    }));

    const { error: insError } = await supabase
      .from("user_interests")
      .insert(rows);

    if (insError) return Response.getError(insError);
    return Response.getSuccess(null);
  } catch (error) {
    return Response.getError(error);
  }
};

/* Admin tarafı */

const adminCreateInterest = async (content) => {
  try {
    const { data, error } = await supabase
      .from("interests")
      .insert({ content })
      .select()
      .single();

    if (error) return Response.getError(error);
    return Response.getSuccess(data);
  } catch (error) {
    return Response.getError(error);
  }
};

const adminUpdateInterest = async (id, content) => {
  try {
    const { data, error } = await supabase
      .from("interests")
      .update({ content })
      .eq("id", id)
      .select()
      .single();

    if (error) return Response.getError(error);
    return Response.getSuccess(data);
  } catch (error) {
    return Response.getError(error);
  }
};

const adminDeleteInterest = async (id) => {
  try {
    const { error } = await supabase.from("interests").delete().eq("id", id);

    if (error) return Response.getError(error);
    return Response.getSuccess(null);
  } catch (error) {
    return Response.getError(error);
  }
};

export const InterestService = {
  getAllInterests,
  getUserInterests,
  setUserInterests,
  adminCreateInterest,
  adminUpdateInterest,
  adminDeleteInterest,
};
