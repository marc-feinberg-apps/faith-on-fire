export const SITE_URL = "https://www.faithonfire.world"

const PUBLIC_STORAGE_URL = "https://raaagsavhlkogmxfpfsx.supabase.co/storage/v1/object/public/public-files"

export const EMAIL_ASSETS_URL = `${PUBLIC_STORAGE_URL}/email`

// Existing site imagery (mirrors src/data/storage-assets.ts) that also fits
// as email hero art — kept as plain URLs here since emails render outside
// the app's Vite pipeline, where import.meta.env isn't populated.
export const EBOOK_COVER_URL = `${PUBLIC_STORAGE_URL}/faith-on-fire-ebook-cover.png`
export const MASTERMIND_ZOOM_PHOTO_URL = `${PUBLIC_STORAGE_URL}/mastermind-zoom.png`
