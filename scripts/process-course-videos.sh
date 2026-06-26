#!/usr/bin/env bash
# Usage:
#   Process a specific video (by number):    ./scripts/process-course-videos.sh 4
#   Process a range:                         ./scripts/process-course-videos.sh 4 7
#   Process all 11:                          ./scripts/process-course-videos.sh
#
# What it does for each video:
#   1. Downloads the original from Supabase (member-files/course-blueprint/course_N.mp4)
#   2. Probes the codec — skips if already H.264
#   3. Re-encodes to H.264 CRF 22 + faststart (1080p, AAC 128k)
#   4. Uploads the result back, overwriting the original
#   5. Cleans up temp files
#
# Requirements: ffmpeg, curl, jq (brew install ffmpeg jq)

set -euo pipefail

# ── Config ───────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../apps/web/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: .env not found at $ENV_FILE" >&2
  exit 1
fi

SUPABASE_URL=$(grep '^VITE_SUPABASE_URL=' "$ENV_FILE" | cut -d= -f2- | tr -d '"')
SERVICE_ROLE_KEY=$(grep '^SUPABASE_SERVICE_ROLE_KEY=' "$ENV_FILE" | cut -d= -f2- | tr -d '"')
BUCKET="member-files"
PREFIX="course-blueprint/course_"
TMP_DIR=$(mktemp -d)

cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

# ── Helpers ──────────────────────────────────────────────────────────────────
log()  { echo "[$(date '+%H:%M:%S')] $*"; }
ok()   { echo "[$(date '+%H:%M:%S')] ✓ $*"; }
skip() { echo "[$(date '+%H:%M:%S')] → $*"; }
err()  { echo "[$(date '+%H:%M:%S')] ✗ $*" >&2; }

process_video() {
  local n=$1
  local remote_path="${PREFIX}${n}.mp4"
  local src="$TMP_DIR/course_${n}_src.mp4"
  local out="$TMP_DIR/course_${n}_h264.mp4"

  echo ""
  log "━━━ course_${n}.mp4 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Download
  log "Downloading..."
  local http_code
  http_code=$(curl -s -o "$src" -w "%{http_code}" \
    "$SUPABASE_URL/storage/v1/object/$BUCKET/$remote_path" \
    -H "apikey: $SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY")

  if [[ "$http_code" != "200" ]]; then
    err "Download failed (HTTP $http_code) — skipping course_${n}.mp4"
    return
  fi
  log "Downloaded: $(du -sh "$src" | cut -f1)"

  # Probe codec
  local codec
  codec=$(ffprobe -v error -select_streams v:0 \
    -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 "$src")
  log "Codec: $codec"

  if [[ "$codec" == "h264" ]]; then
    # Still ensure faststart even if already H.264
    local atoms
    atoms=$(head -c 200000 "$src" | strings -n 4 | grep -oE "ftyp|moov|mdat" | head -3 | tr '\n' ' ')
    if echo "$atoms" | grep -q "moov" && [[ "$atoms" != *"mdat"*"moov"* ]]; then
      skip "Already H.264 + faststart — skipping course_${n}.mp4"
      return
    fi
    log "Already H.264 but missing faststart — remuxing only..."
    ffmpeg -y -i "$src" -c copy -movflags +faststart "$out" -loglevel error -stats
  else
    log "Re-encoding HEVC → H.264 (CRF 22, faststart)..."
    ffmpeg -y -i "$src" \
      -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p \
      -c:a aac -b:a 128k \
      -movflags +faststart \
      "$out" -loglevel error -stats
  fi

  log "Output: $(du -sh "$out" | cut -f1)"

  # Upload (overwrite)
  log "Uploading..."
  local up_code
  up_code=$(curl -s -o /dev/null -w "%{http_code}" -X PUT \
    "$SUPABASE_URL/storage/v1/object/$BUCKET/$remote_path" \
    -H "apikey: $SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Content-Type: video/mp4" \
    -H "x-upsert: true" \
    --data-binary "@$out")

  if [[ "$up_code" == "200" ]]; then
    ok "course_${n}.mp4 uploaded"
  else
    err "Upload failed (HTTP $up_code) for course_${n}.mp4"
  fi

  # Extract thumbnail from the encoded output (frame at 5s, 1280×720)
  local thumb="$TMP_DIR/course_${n}_thumb.jpg"
  log "Extracting thumbnail..."
  ffmpeg -y -ss 5 -i "$out" -vframes 1 -q:v 3 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:black" "$thumb" -loglevel error
  local thumb_code
  thumb_code=$(curl -s -o /dev/null -w "%{http_code}" -X PUT \
    "$SUPABASE_URL/storage/v1/object/public-files/thumbnails/course_${n}.jpg" \
    -H "apikey: $SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Content-Type: image/jpeg" \
    -H "x-upsert: true" \
    --data-binary "@$thumb")
  if [[ "$thumb_code" == "200" ]]; then
    ok "course_${n}.mp4 + thumbnail done"
  else
    err "Thumbnail upload failed (HTTP $thumb_code) for course_${n}"
    ok "course_${n}.mp4 done (no thumbnail)"
  fi
}

# ── Entry point ───────────────────────────────────────────────────────────────
START=${1:-1}
END=${2:-11}

log "Processing course_${START}.mp4 → course_${END}.mp4"
log "Temp dir: $TMP_DIR"

for n in $(seq "$START" "$END"); do
  process_video "$n"
done

echo ""
ok "All done."
