// src/services/adminService.js
import { supabase } from "./supabase/client";
import Response from "../helpers/response/Response";

const getDashboardStats = async () => {
  try {
    const { count: userCount, error: userError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (userError) return Response.getError(userError);

    const { count: matchCount, error: matchError } = await supabase
      .from("matches")
      .select("*", { count: "exact", head: true });

    if (matchError) return Response.getError(matchError);

    return Response.getSuccess({
      userCount: userCount || 0,
      matchCount: matchCount || 0,
    });
  } catch (error) {
    return Response.getError(error);
  }
};

const getLatestUsers = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) return Response.getError(error);
    return Response.getSuccess(data || []);
  } catch (error) {
    return Response.getError(error);
  }
};

// Kayıtlı herkes (çekilişe katılan) – burada basitçe tüm profilleri döndürüyoruz
const getRegisteredUsers = async () => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) return Response.getError(error);
    return Response.getSuccess(data || []);
  } catch (error) {
    return Response.getError(error);
  }
};

export const AdminService = {
  getDashboardStats,
  getLatestUsers,
  getRegisteredUsers,
};
