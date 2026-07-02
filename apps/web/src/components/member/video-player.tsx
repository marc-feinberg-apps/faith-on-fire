import { useCallback, useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlayIcon,
  PauseIcon,
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeMute01Icon,
  ArrowExpand02Icon,
  ArrowShrink02Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons"

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const total = Math.floor(seconds)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m)
  const ss = String(s).padStart(2, "0")
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

interface VideoPlayerProps {
  src: string
  /** Autoplay on mount (best-effort; muted autoplay always allowed). */
  autoPlay?: boolean
  /**
   * Start muted so autoplay isn't blocked by browser policy (unmuted autoplay
   * is unreliable / often silently blocked). The player's own mute button
   * still lets the viewer turn sound on. Only affects the initial mount.
   */
  defaultMuted?: boolean
  /** Fired when playback reaches the end of the video. */
  onEnded?: () => void
  /**
   * Extra UI (toasts, "up next" cards, etc.) layered over the player. Rendered
   * *inside* the fullscreen container (not as an outside sibling), so it stays
   * visible when the member toggles native fullscreen — anything outside this
   * element's subtree is hidden by the Fullscreen API while active.
   */
  overlay?: React.ReactNode
}

// A self-contained, YouTube-style player: custom play/pause, scrubber, volume
// slider, and a fullscreen toggle layered over a native <video>. Controls hide
// while the cursor is idle during playback and reappear on movement. Keyboard
// shortcuts: space/k (play), ←/→ (seek 5s), ↑/↓ (volume), m (mute), f (full).
export function VideoPlayer({
  src,
  autoPlay = true,
  defaultMuted = false,
  onEnded,
  overlay,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(defaultMuted)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) void video.play().catch(() => {})
    else video.pause()
  }, [])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
  }, [])

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {})
    else void el.requestFullscreen().catch(() => {})
  }, [])

  const seekBy = useCallback((delta: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.min(Math.max(0, video.currentTime + delta), video.duration || 0)
  }, [])

  const nudgeVolume = useCallback((delta: number) => {
    const video = videoRef.current
    if (!video) return
    const next = Math.min(1, Math.max(0, video.volume + delta))
    video.volume = next
    video.muted = next === 0
  }, [])

  // Reveal controls, then hide again after inactivity (only while playing).
  const revealControls = useCallback(() => {
    setShowControls(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShowControls(false)
    }, 2500)
  }, [])

  // Wire all <video> events to local state so the custom UI stays in sync.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => {
      setIsPlaying(false)
      setShowControls(true)
    }
    const onTime = () => setCurrent(video.currentTime)
    const onDuration = () => setDuration(video.duration || 0)
    const onVolume = () => {
      setVolume(video.volume)
      setMuted(video.muted)
    }
    const onWaiting = () => setIsWaiting(true)
    const onPlaying = () => setIsWaiting(false)
    const onProgress = () => {
      if (video.buffered.length) setBuffered(video.buffered.end(video.buffered.length - 1))
    }
    const onEndedEvent = () => onEnded?.()

    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)
    video.addEventListener("timeupdate", onTime)
    video.addEventListener("loadedmetadata", onDuration)
    video.addEventListener("durationchange", onDuration)
    video.addEventListener("volumechange", onVolume)
    video.addEventListener("waiting", onWaiting)
    video.addEventListener("playing", onPlaying)
    video.addEventListener("progress", onProgress)
    video.addEventListener("ended", onEndedEvent)
    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("timeupdate", onTime)
      video.removeEventListener("loadedmetadata", onDuration)
      video.removeEventListener("durationchange", onDuration)
      video.removeEventListener("volumechange", onVolume)
      video.removeEventListener("waiting", onWaiting)
      video.removeEventListener("playing", onPlaying)
      video.removeEventListener("progress", onProgress)
      video.removeEventListener("ended", onEndedEvent)
    }
  }, [onEnded])

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current)
    document.addEventListener("fullscreenchange", onFsChange)
    return () => document.removeEventListener("fullscreenchange", onFsChange)
  }, [])

  useEffect(() => () => void (hideTimer.current && clearTimeout(hideTimer.current)), [])

  // Focus the container on mount so keyboard shortcuts work without a click.
  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  // Keyboard shortcuts, scoped to the player container's focus.
  function onKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case " ":
      case "k":
        event.preventDefault()
        togglePlay()
        break
      case "ArrowLeft":
        event.preventDefault()
        seekBy(-5)
        break
      case "ArrowRight":
        event.preventDefault()
        seekBy(5)
        break
      case "ArrowUp":
        event.preventDefault()
        nudgeVolume(0.1)
        break
      case "ArrowDown":
        event.preventDefault()
        nudgeVolume(-0.1)
        break
      case "m":
        toggleMute()
        break
      case "f":
        toggleFullscreen()
        break
      default:
        break
    }
    revealControls()
  }

  function onSeek(event: React.ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Number(event.target.value)
  }

  function onVolumeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current
    if (!video) return
    const next = Number(event.target.value)
    video.volume = next
    video.muted = next === 0
  }

  const volumeIcon = muted || volume === 0 ? VolumeMute01Icon : volume < 0.5 ? VolumeLowIcon : VolumeHighIcon
  const progressPct = duration ? (current / duration) * 100 : 0
  const bufferedPct = duration ? (buffered / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseMove={revealControls}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="group/player relative size-full bg-black focus:outline-none"
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        muted={defaultMuted}
        playsInline
        onClick={togglePlay}
        className="size-full"
      />

      {/* Buffering spinner */}
      {isWaiting ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <HugeiconsIcon icon={Loading03Icon} className="size-10 animate-spin text-white/90" />
        </div>
      ) : null}

      {/* Center play affordance when paused */}
      {!isPlaying && !isWaiting ? (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-[var(--fire-red)] shadow-lg transition-transform duration-200 hover:scale-110">
            <HugeiconsIcon icon={PlayIcon} className="size-7 translate-x-0.5" />
          </span>
        </button>
      ) : null}

      {/* Control bar */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-2 pt-8 transition-opacity duration-200 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Seek scrubber */}
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute inset-x-0 h-1 rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white/30" style={{ width: `${bufferedPct}%` }} />
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[var(--fire-red)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step="any"
            value={current}
            onChange={onSeek}
            aria-label="Seek"
            className="relative h-1 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--fire-red)] [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--fire-red)]"
          />
        </div>

        {/* Buttons row */}
        <div className="mt-1.5 flex items-center gap-3 text-white">
          <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="transition-opacity hover:opacity-80">
            <HugeiconsIcon icon={isPlaying ? PauseIcon : PlayIcon} className="size-6" />
          </button>

          <div className="group/vol flex items-center gap-1.5">
            <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="transition-opacity hover:opacity-80">
              <HugeiconsIcon icon={volumeIcon} className="size-5" />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={onVolumeInput}
              aria-label="Volume"
              className="h-1 w-0 cursor-pointer appearance-none rounded-full bg-white/30 opacity-0 transition-all duration-200 group-hover/vol:w-20 group-hover/vol:opacity-100 [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>

          <span className="font-heading text-xs tabular-nums text-white/90 normal-case">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            className="ml-auto transition-opacity hover:opacity-80"
          >
            <HugeiconsIcon icon={isFullscreen ? ArrowShrink02Icon : ArrowExpand02Icon} className="size-5" />
          </button>
        </div>
      </div>

      {overlay}
    </div>
  )
}
