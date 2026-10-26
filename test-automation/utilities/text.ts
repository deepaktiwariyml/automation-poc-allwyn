/** Collapses whitespace (`\s` includes non-breaking spaces) so CMS and rendered text compare reliably. */
export function normaliseText(value: string | null | undefined): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}
