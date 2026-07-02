#!/usr/bin/env bash
# Usage:
#   Process one video (by name):   ./scripts/process-upsell-videos.sh course-blueprint-offer
#   Process both:                  ./scripts/process-upsell-videos.sh
#
# Same treatment as process-course-videos.sh, applied to the post-purchase
# upsell videos in the public `public-files` bucket instead of the member
# course lessons in `member-files`:
#   1. Downloads the original from Supabase (public-files/upsell/<name>.mp4)
#   2. Probes the codec/bitrate — skips if already H.264 and under threshold
#   3. Re-encodes to H.264 CRF 22 + faststart (1080p, AAC 128k)
#   4. Uploads the result back, overwriting the original
#   5. Cleans up temp files
#
# Requirements: ffmpeg, curl

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
BUCKET="public-files"
PREFIX="upsell/"
TMP_DIR=$(mktemp -d)

cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

# ── Helpers ──────────────────────────────────────────────────────────────────
log()  { echo "[$(date '+%H:%M:%S')] $*"; }
ok()   { echo "[$(date '+%H:%M:%S')] ✓ $*"; }
skip() { echo "[$(date '+%H:%M:%S')] → $*"; }
err()  { echo "[$(date '+%H:%M:%S')] ✗ $*" >&2; }

process_video() {
  local name=$1
  local remote_path="${PREFIX}${name}.mp4"
  local src="$TMP_DIR/${name}_src.mp4"
  local out="$TMP_DIR/${name}_h264.mp4"

  echo ""
  log "━━━ ${name}.mp4 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Download
  log "Downloading..."
  local http_code
  http_code=$(curl -s -o "$src" -w "%{http_code}" \
    "$SUPABASE_URL/storage/v1/object/$BUCKET/$remote_path" \
    -H "apikey: $SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY")

  if [[ "$http_code" != "200" ]]; then
    err "Download failed (HTTP $http_code) — skipping ${name}.mp4"
    return
  fi
  log "Downloaded: $(du -sh "$src" | cut -f1)"

  # Probe codec
  local codec
  codec=$(ffprobe -v error -select_streams v:0 \
    -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 "$src")
  log "Codec: $codec"

  # Bitrate threshold: re-encode anything above 8 Mbps even if already H.264.
  local bitrate_kbps
  bitrate_kbps=$(ffprobe -v error -select_streams v:0 \
    -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 "$src")
  bitrate_kbps=${bitrate_kbps:-0}
  bitrate_kbps=$((bitrate_kbps / 1000))
  log "Bitrate: ${bitrate_kbps} kbps"

  if [[ "$codec" == "h264" && "$bitrate_kbps" -lt 8000 ]]; then
    # Low-bitrate H.264: just ensure faststart, no re-encode needed
    local atoms
    atoms=$(head -c 200000 "$src" | strings -n 4 | grep -oE "ftyp|moov|mdat" | head -3 | tr '\n' ' ')
    if echo "$atoms" | grep -q "moov" && [[ "$atoms" != *"mdat"*"moov"* ]]; then
      skip "Already H.264 + faststart + low bitrate — skipping ${name}.mp4"
      return
    fi
    log "H.264 + low bitrate but missing faststart — remuxing only..."
    ffmpeg -y -i "$src" -c copy -movflags +faststart "$out" -loglevel error -stats
  else
    log "Re-encoding → H.264 (CRF 22, faststart)..."
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
    -T "$out")

  if [[ "$up_code" == "200" ]]; then
    ok "${name}.mp4 uploaded"
  else
    err "Upload failed (HTTP $up_code) for ${name}.mp4"
  fi
}

# ── Entry point ───────────────────────────────────────────────────────────────
ALL_NAMES=(course-blueprint-offer weekly-mastermind-offer)

if [[ $# -ge 1 ]]; then
  NAMES=("$1")
else
  NAMES=("${ALL_NAMES[@]}")
fi

log "Processing: ${NAMES[*]}"
log "Temp dir: $TMP_DIR"

for name in "${NAMES[@]}"; do
  process_video "$name"
done

echo ""
ok "All done."
