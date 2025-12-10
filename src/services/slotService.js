// src/services/slotService.js
import { supabase } from "./supabase/client";
import Response from "../helpers/response/Response";

const getAllSlots = async () => {
  try {
    const { data, error } = await supabase
      .from("slots")
      .select("*")
      .order("start_time", { ascending: true });

    if (error) return Response.getError(error);
    return Response.getSuccess(data || []);
  } catch (error) {
    return Response.getError(error);
  }
};

const getUserAvailability = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("user_availabilities")
      .select("slot_id, slots(*)")
      .eq("user_id", userId);

    if (error) return Response.getError(error);

    const slots = (data || []).map((row) => row.slots);
    return Response.getSuccess(slots);
  } catch (error) {
    return Response.getError(error);
  }
};

const setUserAvailability = async (userId, slotIds) => {
  try {
    const { error: delError } = await supabase
      .from("user_availabilities")
      .delete()
      .eq("user_id", userId);

    if (delError) return Response.getError(delError);

    if (!slotIds || slotIds.length === 0) {
      return Response.getSuccess(null);
    }

    const rows = slotIds.map((slotId) => ({
      user_id: userId,
      slot_id: slotId,
    }));

    const { error: insError } = await supabase
      .from("user_availabilities")
      .insert(rows);

    if (insError) return Response.getError(insError);
    return Response.getSuccess(null);
  } catch (error) {
    return Response.getError(error);
  }
};

/* Admin tarafı */

const adminCreateSlot = async (startTime, endTime) => {
  try {
    const { data, error } = await supabase
      .from("slots")
      .insert({
        start_time: startTime,
        end_time: endTime,
      })
      .select()
      .single();

    if (error) return Response.getError(error);
    return Response.getSuccess(data);
  } catch (error) {
    return Response.getError(error);
  }
};

const adminDeleteSlot = async (id) => {
  try {
    const { error } = await supabase.from("slots").delete().eq("id", id);

    if (error) return Response.getError(error);
    return Response.getSuccess(null);
  } catch (error) {
    return Response.getError(error);
  }
};

export const SlotService = {
  getAllSlots,
  getUserAvailability,
  setUserAvailability,
  adminCreateSlot,
  adminDeleteSlot,
};
