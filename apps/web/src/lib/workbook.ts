// Shared across the course grid and watch pages so "already downloaded"
// state stays in sync no matter which page the member downloaded it from.
export const WORKBOOK_DOWNLOADED_KEY = "fof:workbook-downloaded"

// Separate from the downloaded flag: lets a member dismiss the watch-page
// nudge without it counting as having actually grabbed the workbook.
export const WORKBOOK_TOAST_DISMISSED_KEY = "fof:workbook-toast-dismissed"
