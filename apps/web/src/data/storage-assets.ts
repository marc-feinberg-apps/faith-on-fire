// Inventory of every image hosted in the Supabase `public-files` bucket.
// Add new Supabase-hosted assets here, then build the URL with
// `publicStorageUrl` from @/lib/supabase/storage — keeps the bucket path
// in one place instead of repeating the storage URL shape per asset.
export const storageAssets = {
  ebookCover: "faith-on-fire-ebook-cover.png",
  courseCover: "course-blueprint.webp",
  mastermindZoom: "mastermind-zoom.png",
  pillarShared: "pillars/pillar-2.jpg",
  problemIsolation: "percentages/isolation.webp",
  problemGuiltShame: "percentages/guilt-and-shame.jpg",
  problemLackOfDirection: "percentages/lack-of-direction.jpg",
  problemForgiveness: "percentages/forgiveness-struggle.jpg",
  problemOther: "percentages/others.jpg",
  introVideo: "intro-video.mp4",
  courseBlueprintOfferVideo: "upsell/course-blueprint-offer.mp4",
  weeklyMastermindOfferVideo: "upsell/weekly-mastermind-offer.mp4",
} as const

// Email-only assets live under the bucket's `email/` prefix and are referenced
// via EMAIL_ASSETS_URL in src/emails/components/urls.ts instead of
// publicStorageUrl — email templates render outside the app's Vite pipeline
// (react-email's own dev server, ad hoc send scripts), where import.meta.env
// isn't populated. See that file for the current list of email/ files.
