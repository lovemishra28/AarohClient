/**
 * Display formatting. Pure, presentation-only — no agronomy maths ever happens here.
 *
 * Numbers are grouped the Indian way (₹8,930 / ₹1,24,500) because the audience reads
 * lakh/crore grouping, and we hand-roll it rather than rely on Intl.NumberFormat, which
 * is only partially implemented on Hermes.
 */

/** Groups the integer part with Indian digit separators: 1234567 → "12,34,567". */
function groupIndian(intDigits: string): string {
  if (intDigits.length <= 3) return intDigits;
  const last3 = intDigits.slice(-3);
  const rest = intDigits.slice(0, -3);
  return `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${last3}`;
}

/** Whole rupees with the ₹ symbol and Indian grouping. `1942` → "₹1,942". */
export function formatInr(value: number): string {
  const rounded = Math.round(Math.abs(value));
  const sign = value < 0 ? '-' : '';
  return `${sign}₹${groupIndian(String(rounded))}`;
}

/** Trims trailing zeros so 20.0 shows as "20" but 7.2 stays "7.2". */
export function formatNumber(value: number, maxDecimals = 2): string {
  if (!Number.isFinite(value)) return '—';
  const factor = 10 ** maxDecimals;
  const rounded = Math.round(value * factor) / factor;
  return String(rounded);
}

/** Area shown to the farmer: hectares with up to two decimals. */
export function formatHectares(areaHa: number | null | undefined): string {
  if (areaHa == null || !Number.isFinite(areaHa)) return '—';
  return `${formatNumber(areaHa, 2)} ha`;
}

/**
 * Ordinal cue instead of a raw score decimal (guide rule). We key the band off the crop's
 * rank *within its segment*, not the absolute score, because the ML score scale is not a
 * contract we can depend on — position is. Returns an i18n key under `advice.band.*`.
 */
export type ScoreBand = 'strong' | 'good' | 'fair';

export function scoreBandForIndex(index: number): ScoreBand {
  if (index <= 0) return 'strong';
  if (index === 1) return 'good';
  return 'fair';
}
