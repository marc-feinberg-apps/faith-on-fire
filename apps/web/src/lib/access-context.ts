export interface AccessContext {
  // Tiered access: a Mastermind subscription unlocks everything (course + ebook),
  // so `hasCourse`/`hasEbook` can be true without a standalone course purchase.
  hasCourse: boolean
  hasEbook: boolean
  hasMastermind: boolean
}
