const PUBLIC_BUCKET = "public-files"

export function publicStorageUrl(path: string) {
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${PUBLIC_BUCKET}/${path}`
}
