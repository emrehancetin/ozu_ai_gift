// src/services/matchService.js
import { supabase } from "./supabase/client";
import Response from "../helpers/response/Response";

const getUserMatch = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select(
        `
        id,
        contacted,
        location:locations(*),
        meeting_slot:slots(*),
        user_a_id,
        user_b_id,
        user_a:profiles!matches_user_a_id_fkey(*),
        user_b:profiles!matches_user_b_id_fkey(*)
      `
      )
      .or(`user_a_id.eq.${userId},user_b_id.eq.${userId}`)
      .single();

    if (error && error.code === "PGRST116") {
      // match yok
      return Response.getSuccess(null);
    }
    if (error) return Response.getError(error);

    return Response.getSuccess(data);
  } catch (error) {
    return Response.getError(error);
  }
};

const markMatchContacted = async (matchId, contacted = true) => {
  try {
    const { error } = await supabase
      .from("matches")
      .update({ contacted })
      .eq("id", matchId);

    if (error) return Response.getError(error);
    return Response.getSuccess(null);
  } catch (error) {
    return Response.getError(error);
  }
};

/* Admin – tüm matchleri listeleme */

const adminListAllMatches = async () => {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select(
        `
        id,
        contacted,
        created_at,
        location:locations(*),
        meeting_slot:slots(*),
        user_a:profiles!matches_user_a_id_fkey(*),
        user_b:profiles!matches_user_b_id_fkey(*)
      `
      )
      .order("created_at", { ascending: false });

    if (error) return Response.getError(error);
    return Response.getSuccess(data || []);
  } catch (error) {
    return Response.getError(error);
  }
};

/* 
  Admin – eşleştirme algoritması (basit):

  - Mevcut tüm matchlerde yer alan kullanıcıları bul
  - Match'i olmayan kullanıcıları bul
  - Bu kullanıcıların availability'lerini slotlara göre grupla
  - Her slot için listeyi karıştır, 2'şerli eşleştir, artan kalırsa boşta kalır
  - Hepsi için aynı locationId kullan (şimdilik)
*/

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const adminRunMatching = async (defaultLocationId) => {
  try {
    // 1) Zaten eşleşmiş kullanıcıları bul
    const { data: existingMatches, error: matchError } = await supabase
      .from("matches")
      .select("user_a_id, user_b_id");

    if (matchError) return Response.getError(matchError);

    const matchedIds = new Set();
    (existingMatches || []).forEach((m) => {
      matchedIds.add(m.user_a_id);
      matchedIds.add(m.user_b_id);
    });

    // 2) Tüm kullanıcı availability'lerini çek
    const { data: availabilities, error: availError } = await supabase
      .from("user_availabilities")
      .select("user_id, slot_id");

    if (availError) return Response.getError(availError);

    // 3) Match'i olmayan kullanıcıların availability'lerini filtrele
    const filtered = (availabilities || []).filter(
      (a) => !matchedIds.has(a.user_id)
    );

    // 4) slot_id -> userId[] map'i
    const bySlot = {};
    for (const row of filtered) {
      if (!bySlot[row.slot_id]) bySlot[row.slot_id] = [];
      if (!bySlot[row.slot_id].includes(row.user_id)) {
        bySlot[row.slot_id].push(row.user_id);
      }
    }

    const newMatches = [];

    // 5) Her slot için karıştırıp eşleştir
    Object.keys(bySlot).forEach((slotIdStr) => {
      const slotId = Number(slotIdStr);
      let users = shuffle(bySlot[slotId]);

      // Daha önce başka slotta eşleşenleri filtrele
      users = users.filter((uid) => !matchedIds.has(uid));

      for (let i = 0; i + 1 < users.length; i += 2) {
        const userAId = users[i];
        const userBId = users[i + 1];

        // matched set'e ekle ki başka slotta tekrar kullanılmasın
        matchedIds.add(userAId);
        matchedIds.add(userBId);

        newMatches.push({
          user_a_id: userAId,
          user_b_id: userBId,
          location_id: defaultLocationId,
          meeting_slot_id: slotId,
          contacted: false,
        });
      }
    });

    if (newMatches.length === 0) {
      return Response.getMessageError(
        "Eşleştirilecek uygun kullanıcı bulunamadı."
      );
    }

    const { data: inserted, error: insertError } = await supabase
      .from("matches")
      .insert(newMatches)
      .select();

    if (insertError) return Response.getError(insertError);

    return Response.getSuccess({
      createdCount: inserted.length,
      matches: inserted,
    });
  } catch (error) {
    return Response.getError(error);
  }
};

export const MatchService = {
  getUserMatch,
  markMatchContacted,
  adminListAllMatches,
  adminRunMatching,
};
