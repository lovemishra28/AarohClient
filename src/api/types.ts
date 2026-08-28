/**
 * API types — mirror of the server contract in AAROH-Server/api/openapi.yaml (v1.0.0).
 * Keep these in lockstep with that file; it is the source of truth.
 */

export type Role = 'farmer' | 'agent' | 'admin';
export type ServerLang = 'hi' | 'en';

/** Returned by /v1/auth/otp/verify and /v1/auth/refresh. */
export type TokenBundle = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  role: Role;
};

/**
 * The signed-in farmer.
 *
 * Every identifier is nullable because a farmer can arrive through any of three
 * doors: phone + OTP (phone set, email null), email + password or email code
 * (email set, phone null), or Google (email set once Google has verified it). The
 * server enforces that at least one is present; the UI must therefore treat each
 * one as optional rather than assuming a phone number exists.
 */
export type Farmer = {
  id: string;
  phone: string | null;
  email: string | null;
  /** True once an email code has been redeemed, or Google vouched for the address. */
  email_verified: boolean;
  name: string | null;
  preferred_lang: ServerLang;
  region_code: string;
  role: Role;
  created_at: string;
};

/** POST /v1/auth/otp/request response. `dev_code` is only populated in non-production. */
export type OtpRequestResult = {
  sent: boolean;
  expires_in_s: number;
  dev_code: string | null;
};

/** POST /v1/auth/otp/verify response: a farmer plus a flattened TokenBundle (allOf). */
export type OtpVerifyResult = TokenBundle & { farmer: Farmer };

export type MeResult = { farmer: Farmer };

/**
 * POST /v1/auth/logout response. `revoked` is how many refresh-token rows were
 * closed — 0 when the token was already revoked or unknown, which the server
 * reports as success on purpose so sign-out never fails and never discloses
 * whether the token was live.
 */
export type LogoutResult = { revoked: number };

/**
 * Auth inputs for the email and Google doors. All of them resolve to the same
 * shape as `OtpVerifyResult`, so they drop straight into `authStore.setSession()`
 * unchanged — see README "Authentication providers" for the server contract.
 */
export type GoogleSignInInput = { id_token: string };
export type EmailRegisterInput = { name: string; email: string; password: string };
export type EmailLoginInput = { email: string; password: string };

/**
 * POST /v1/auth/email/register also reports whether the verification email went
 * out. Registration succeeds either way — the address just stays unverified — so
 * this is informational, never a failure to handle.
 */
export type EmailRegisterResult = OtpVerifyResult & {
  verification: { sent: boolean; dev_code?: string };
};

/** Email one-time codes: 'login' is passwordless sign-in, 'email_verify' confirms an address. */
export type EmailOtpPurpose = 'login' | 'email_verify';
export type EmailOtpRequestInput = { email: string; purpose?: EmailOtpPurpose };
export type EmailOtpVerifyInput = { email: string; code: string; purpose?: EmailOtpPurpose };

export type PasswordForgotInput = { email: string };
export type PasswordResetInput = { email: string; code: string; password: string };

export type UpdateMeInput = {
  name?: string;
  preferred_lang?: ServerLang;
  region_code?: string;
};
export type UpdateMeResult = { farmer: Farmer };

/** Every non-2xx response uses this envelope. */
export type ErrorEnvelope = {
  error: {
    code: string;
    message?: string;
    details?: unknown;
  };
  requestId?: string;
};

/* ─── Fields (M4) ───────────────────────────────────────────────────────── */

export type Field = {
  id: string;
  farmer_id: string;
  name: string | null;
  /** Hectares. The farmer types acres; the app converts before sending (see lib/units). */
  area_ha: number | null;
  region_code: string;
  centroid: unknown | null;
  boundary: unknown | null;
  created_at: string;
};

export type FieldsResult = { fields: Field[] };
export type FieldCreateResult = { field: Field };
export type FieldDetailResult = { field: Field; latest_reading: Reading | null };

export type FieldCreateInput = {
  name: string;
  /** Hectares. Required in practice — the recommendation refuses without an area. */
  area_ha: number;
  region_code?: string;
};

/* ─── Readings (M5) ─────────────────────────────────────────────────────── */

export type ReadingSource = 'probe_ble' | 'manual' | 'import';

/**
 * NPK are elemental mg/kg (probe basis), never oxide. `ec_uscm` is µS/cm — the manual
 * form accepts dS/m and multiplies ×1000 before building this. All six soil fields plus
 * an optional soil temperature; `source` is the only server-required field.
 */
export type ReadingInput = {
  field_id?: string;
  device_id?: string;
  source: ReadingSource;
  taken_at?: string;
  n_mgkg?: number;
  p_mgkg?: number;
  k_mgkg?: number;
  ph?: number;
  ec_uscm?: number;
  moisture_vwc?: number;
  soil_temp_c?: number;
  npk_is_calibrated?: boolean;
  idempotency_key?: string;
  raw_frame?: string;
};

export type Reading = ReadingInput & {
  id: string;
  location: unknown | null;
  created_at: string;
};

export type ReadingsIngestResult = {
  readings: Reading[];
  created_count: number;
  duplicate_count: number;
};

/* ─── Recommendations (M6) — the frozen §6.4 payload the app renders ──────── */

export type NutrientGap = { n_kgha: number; p2o5_kgha: number; k2o_kgha: number };

export type ProductLine = {
  name: string;
  bags_50kg: number;
  kg: number;
  supplies: Record<string, number>;
};

export type Fertiliser = {
  products: ProductLine[];
  nutrient_gap_kgha: NutrientGap;
  cost_inr: number;
};

/** Segment A entry — grow now, no fertiliser needed. */
export type CropRank = {
  crop: string;
  crop_hi: string;
  score: number;
  rationale_code: string;
};

/** Segment B entry — worth it with a stated fertiliser cost. */
export type CropPlan = CropRank & { fertiliser: Fertiliser };

export type RecommendationResult = {
  model_version: string;
  agronomy_version: string;
  region_code: string;
  area_ha: number;
  segment_a: CropRank[];
  segment_b: CropPlan[];
  warnings: string[];
};

export type Recommendation = {
  id: string;
  field_id: string;
  reading_id: string | null;
  model_version: string;
  agronomy_version: string;
  region_code: string;
  area_ha: number;
  result: RecommendationResult;
  created_at: string;
};

export type RecommendationCreateResult = { recommendation: Recommendation };
export type RecommendationsListResult = { recommendations: Recommendation[] };

/** Optional overrides for POST /v1/fields/:id/recommendations. Empty body is valid. */
export type RecommendationInput = {
  reading_id?: string;
  area_ha?: number;
  season?: string;
  soil_type?: string;
  humidity?: number;
  rainfall?: number;
  budget_hint?: number;
};
