# AgroPulse — Phase 3 Test & Release Status

**Date:** 2026-08-28 · **Scope:** manual-input recommendation demo (M0–M8) · **Target:** Android emulator (Android Studio)

This doc tells you (1) how to run the app, (2) exactly what to test and what "pass" looks like, (3) what I could verify vs. what only you can verify on a device, and (4) the release readiness tracker.

---

## 1. What the app can do right now

The full money path is built and the whole codebase typechecks clean (`npm run typecheck` → 0 errors):

- **Language + auth** — Hindi/English toggle, phone entry, OTP verify (dev OTP `000000`), session persists across restarts, refresh + sign-out.
- **Fields** — list, create (area entered in **acres**, auto-converted to hectares), field detail with latest-reading tile grid and past-advice list.
- **Manual reading (M5)** — six required soil values (N, P, K, pH, EC in dS/m, moisture) + optional soil temp, range validation, EC soft-warning, "fill sample values" shortcut. Posts to `POST /v1/readings`.
- **Recommendation (M6, the payoff)** — two-call flow (reading → advice). Segment A (grow-now, green) + Segment B (worth-it-with-inputs, amber) with fertiliser in **50 kg bags → kg → ₹ total**, nutrient gap, and translated warnings. Never shows the raw ML score.
- **Offline (M8)** — a reading entered with no signal is queued to secure storage, shown optimistically, and auto-synced on reconnect with no duplicate (idempotency key). Sync banner shows offline / N-waiting / syncing.
- **States** — shared loading / empty / error states everywhere; a render crash lands on a branded ErrorBoundary card, not a red box.

**Two things are deliberately dormant** (see §4): Hindi **text-to-speech** and any **automated test suite**.

---

## 2. How to run it

```bash
cd C:\AAROH-Client

# 1. Install deps — package.json ships with empty deps on purpose; let Expo pick SDK-matched versions.
npm install expo
npx expo install react react-native react-dom \
  @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs \
  react-native-screens react-native-safe-area-context \
  @tanstack/react-query zustand \
  expo-secure-store expo-font expo-splash-screen expo-status-bar expo-constants \
  @expo/vector-icons react-native-svg \
  i18next react-i18next \
  nativewind react-native-reanimated
# (tailwindcss@^3.4 is already pinned in package.json — do NOT upgrade to v4, NativeWind v4 breaks on it.)

# 2. Start the server first (in aaroh-server): docker compose up --build db ai, then in api/: npm run migrate:up && npm run seed && npm run dev  (→ :3000)

# 3. Build + launch the dev client on the emulator
npx expo run:android
```

The emulator reaches the host server at `http://10.0.2.2:3000` (already the default in `src/lib/env.ts` / `.env`). If you run on a **physical** phone instead, set the base URL to your PC's LAN IP (`http://<PC-LAN-IP>:3000`).

> If `npx expo install` reports a peer/version conflict, take Expo's suggested version — never hand-pick, and never `--force`.

---

## 3. Manual test plan (do these in order)

Each step lists the action and what **pass** looks like.

**A. Boot & language**
1. Launch → app opens without a red error, splash hides after fonts load. *Pass: no fallback-font flash; UI is in the last-used language.*
2. Toggle the language chip. *Pass: every string flips; Devanagari renders as proper conjuncts, not boxes.*

**B. Auth**
3. Enter a phone number → OTP screen → enter `000000`. *Pass: lands on Home; farmer phone/role/region show in Settings.*
4. Kill and relaunch the app. *Pass: still logged in (session persisted).*
5. Settings → Sign out → confirm. *Pass: returns to phone entry.*

**C. Fields**
6. Home → Add a field → name + area in acres. *Pass: helper text shows the live hectare conversion; save lands on Field Detail.*
7. Field Detail with no reading. *Pass: "no reading yet" card + Enter-reading button (no advice button yet).*

**D. Reading → advice (the core)**
8. Enter reading by hand → tap "fill sample values" → submit. *Pass: navigates to Recommendation; a spinner while it POSTs, then results.*
9. Read the results. *Pass: Segment A green cards + Segment B amber cards with bags/kg/₹ and nutrient gap; band labels are words (Strong/Good/Fair), never a number; **the numbers match what the server returns** (verify against a Postman call to `POST /v1/fields/:id/recommendations`).*
10. Enter an **incomplete** reading (leave one required field blank). *Pass: inline "required" error, no submit.*
11. Enter an EC outside ~0.03–7.3 dS/m. *Pass: soft warning shows but submit still allowed.*
12. Create a field **without area**, then try Get Advice. *Pass: clean "area required" empty state, not a crash.*

**E. Offline-then-sync (M8)**
13. Turn on **airplane mode** on the emulator (or stop the server). Enter a reading and submit. *Pass: "saved on your phone, will sync" alert; the reading shows on Field Detail immediately; sync banner says "1 change waiting to sync".*
14. Re-enable network (or restart server). *Pass: within ~30s the banner flips to syncing then disappears; the reading is now on the server (check via Postman `GET /v1/fields/:id/readings`) with **no duplicate**.*
15. While offline, force-quit and relaunch, then go online. *Pass: the queued reading survived the restart and still syncs.*

**F. History & states**
16. Generate advice on 2+ fields → open History tab. *Pass: advice grouped by field, newest first; tapping a row reopens that saved recommendation.*
17. Stop the server and open Fields. *Pass: error state with a Retry button, not a blank screen or crash.*

---

## 4. What I verified vs. what only you can verify

| Check | Status | Who |
|---|---|---|
| TypeScript strict compiles (`tsc --noEmit`) | ✅ passes, 0 errors | me |
| All 10 navigator-referenced screens exist | ✅ | me |
| No "Aaroh" in any UI string (brand = AgroPulse, hi + en) | ✅ | me |
| Every `t()` key (incl. plurals & band labels) resolves in hi + en | ✅ | me |
| App boots on emulator; fonts/Devanagari render | ⏳ needs device | **you** |
| Live auth + refresh + session-persist against real server | ⏳ needs device + server | **you** |
| Reading → advice numbers match server exactly | ⏳ needs device + server | **you** |
| Offline queue + resync + no-duplicate | ⏳ needs device | **you** |
| Hindi audio read-aloud | ❌ not enabled (see below) | **you** |

I cannot install packages, boot Android, or reach the server from my sandbox, so everything marked ⏳ is genuinely unverified until you run §3.

---

## 5. Not done yet / known gaps

1. **Hindi TTS is dormant (blocks DoD #3).** `src/lib/speech.ts` optionally loads `expo-speech`; until it's in the build, the "Listen" button simply doesn't render. To enable audio:
   ```bash
   npx expo install expo-speech
   npx expo run:android      # rebuild the dev client
   ```
   then follow the header note in `src/lib/speech.ts` — uncomment the static `import * as StaticSpeech from 'expo-speech'` and delete the dynamic loader (Metro only bundles a statically-visible import). I left it opt-in so M4–M8 stay runnable without a rebuild; say the word and I'll do the code swap so it's ready the moment you install the package.
2. **No automated tests.** There is no unit/integration test runner wired (no Jest/RNTL, no lint config). For a demo this is acceptable; for release I'd recommend at least unit tests on the pure helpers (`lib/units.ts` conversions, `lib/format.ts` bands/₹, `lib/advice.ts` token parsing) and the outbox drain logic. I can set that up on request.
3. **Visual-polish milestone not done.** M0–M8 are functional-first on the design tokens; the dedicated polish pass against your `DESIGN_DIRECTION.md` reference is still pending (it was always planned after the money path).
4. **Physical-device / LAN config unproven.** Only the emulator path (`10.0.2.2`) is wired by default.
5. **Error-copy for offline 4xx drops.** If a queued reading is rejected 4xx on drain, it's silently dropped (Phase 3 accepts this since the form validates first); a production build should surface it for correction.

---

## 6. Phase 3 Definition-of-Done tracker

| # | DoD criterion | Built | Verified on device |
|---|---|---|---|
| 1 | Login by phone+OTP, session persists across restarts | ✅ | ⏳ |
| 2 | Create field + area, hand-enter 6 values, get costed advice (bags + ₹) matching server | ✅ | ⏳ |
| 3 | Advice read aloud in Hindi; bilingual UI w/ correct Devanagari | ⚠️ TTS opt-in, not enabled | ⏳ |
| 4 | Whole flow works offline (queued) and syncs on reconnect, no duplicates | ✅ | ⏳ |
| 5 | Every screen has loading / empty / error / offline states | ✅ | ⏳ |

**Legend:** ✅ done · ⚠️ partial/opt-in · ⏳ awaiting your device run · ❌ not started

**Bottom line:** the code for Phase 3 is complete and type-clean except Hindi audio (one package install + a 2-line swap away). The remaining work is *verification on the emulator against the live server* — that's step §3, and it's the part I can't do for you.
