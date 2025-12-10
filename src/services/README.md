# Supabase Services -- Full Documentation

This README describes all services in your Supabase-powered application,
including authentication, profiles, interests, availability, matching,
admin tools, and system settings.

---

# 📌 Project Architecture Summary

Your project uses Supabase (PostgreSQL + Auth + RLS) and a React
frontend.\
The app includes:

- **Students** logging in via passwordless email OTP\
- **Admins** logging in via email + password\
- **Profiles** (name, surname, gender, etc.)\
- **Interests** selection\
- **Availability slots** selection\
- **Matching system** (pairs users by similar slot availability)\
- **Admin dashboard** to manage interests, slots, users, matching\
- **Registration deadline system**

---

# 🧩 Service Modules Overview

## 1. AuthService

Handles all authentication-related operations.

### **Functions**

#### `signInWithOtp(email, routePath)`

Triggers a magic-link login for students.

**Flow:** 1. Validates email 2. Sends OTP (magic link) 3. Redirects
student to `/app` after login 4. Student session is stored by Supabase
automatically

---

#### `signInWithPassword(email, password)`

Used only by admins.

**Flow:** 1. Calls Supabase password login\
2. Fetches `profiles.is_admin` for the authenticated user\
3. If not admin, logs out and returns error\
4. Returns authenticated admin user

---

#### `getCurrentUser()`

Returns the currently authenticated Supabase user (from local session
token).

Returns `null` if not logged in.

---

#### `getSession()`

Returns session info (JWT token, expiration).

Useful for protected routes or debugging.

---

#### `logout()`

Clears Supabase authentication session.

---

---

## 2. ProfileService

Manages data in the `profiles` table.

### **Functions**

#### `getOrCreateProfile(user)`

Used right after login.

**Logic:** 1. Check if profile row exists for `auth.users.id` 2. If not
found → create minimal profile: - id - email 3. Return the profile row

---

#### `getProfileById(id)`

Fetch a specific profile.

---

#### `updateProfile(id, payload)`

Updates fields such as: - name\

- surname\
- gender

Returns updated profile.

---

#### `listAllProfiles()`

Admin-only function (enforced by RLS).\
Fetches all students registered so far.

Used in: - Admin dashboard\

- Statistics\
- Matching option previews

---

#### `checkIsAdmin()`

Returns `true` if the logged-in user is an admin.

This checks the `profiles.is_admin` field.

---

---

## 3. InterestService

Manages interest categories and student's selected interests.

### **Functions**

#### `getAllInterests()`

Fetches the list of possible interest categories.

Displayed in a multi-select UI for the student.

---

#### `getUserInterests(userId)`

Returns all interests selected by a student: - Uses `user_interests`
join table\

- Expands `interests(*)`

Useful for: - Profile resume\

- Update form pre-filling

---

#### `setUserInterests(userId, interestIds)`

Updates a student's interests in a safe way:

Process: 1. Delete all existing rows in `user_interests` 2. Insert new
rows for selected interests

Ensures that user always has **exactly** the selected interests.

---

### Admin-only Functions

#### `adminCreateInterest(content)`

Adds a new interest category.

#### `adminUpdateInterest(id, content)`

Renames an interest.

#### `adminDeleteInterest(id)`

Deletes an interest category.\
Automatically cascades and removes related `user_interests`.

---

---

## 4. SlotService

Handles available meeting slots and student's availability selections.

### **Functions**

#### `getAllSlots()`

Returns all time slots (startTime, endTime).

Admin creates these beforehand.

---

#### `getUserAvailability(userId)`

Returns all slots a user selected.

Uses join:

    user_availabilities(slot_id, slots(*))

---

#### `setUserAvailability(userId, slotIds)`

Same pattern as interests:

1.  Delete all previous availability rows\
2.  Insert new slot selections

Ensures correct availability list.

---

### Admin-only Functions

#### `adminCreateSlot(startTime, endTime)`

Creates a new unique time slot.

#### `adminDeleteSlot(id)`

Deletes the slot.

---

---

## 5. MatchService

The core system for pairing users.

### **Functions**

#### `getUserMatch(userId)`

Finds if a student already has a match.

Expands: - partner profile\

- location\
- meeting slot

Used for: - Showing match results page\

- Sending notifications

---

#### `markMatchContacted(matchId)`

Used for marking pair as: - Contacted\

- Connected\
- Confirmed

Admin or student can use depending on design.

---

### Admin-only Functions

#### `adminListAllMatches()`

Returns full match list with details.

Used in admin UI to monitor progress.

---

#### `adminRunMatching(defaultLocationId)`

The full pairing algorithm.

**Algorithm breakdown:** 1. Fetch all existing matches → build
`matchedIds`\
2. Fetch availability for all users\
3. Exclude matched users\
4. Group unmatched users by slot ID\
5. Shuffle each list for randomness\
6. Pair users in groups of two\
7. Write new `matches` rows: - userA\

- userB\
- meeting slot\
- location\
- contacted = false

Returns: - how many new matches created\

- which matches

Used after registration closes.

---

---

## 6. AdminService

Provides convenient aggregated queries for dashboards.

### **Functions**

#### `getDashboardStats()`

Returns: - total users\

- total matches

Used for admin charts and summaries.

---

#### `getLatestUsers(limit)`

Lists the most recently registered users.

---

#### `getRegisteredUsers()`

Returns all `profiles` rows.

---

---

# ✔ Final Notes

These services are designed to be: - Fully modular\

- Easy to import\
- Consistent with your database structure\
- Safe thanks to Supabase Row Level Security (RLS)\
- Extendable when new features are added
