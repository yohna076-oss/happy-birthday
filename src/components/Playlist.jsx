import { useState, useRef, useEffect } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const coverImage = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop";

// ✅ URL sudah benar — file ada di folder publik/audioo/
const songs = [
  { title: "Slipping Through My Fingertips", artist: "ABBA",          icon: "🎵", url: "/audioo/song1.mp4" },
  { title: "Can't Help Falling In Love",     artist: "Elvis Presley",  icon: "🎶", url: "/audioo/song2.mp4" },
  { title: "Perfect",                        artist: "Ed Sheeran",     icon: "🎵", url: "/audioo/song3.mp4" },
];

export default function Playlist() {
  const [playing, setPlaying]     = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [duration, setDuration]   = useState(0);
  const [error, setError]         = useState(null);
  const audioRef = useRef(null);
  const ref      = useRef(null);
  const visible  = useScrollReveal(ref);

  // Ganti lagu → load & play otomatis
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setError(null);
    audio.load();
    if (isPlaying) {
      audio.play().catch(err => {
        console.warn("Autoplay blocked:", err);
        setIsPlaying(false);
      });
    }
  }, [playing]);

  // Update progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setError(null);
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error("Play error:", err);
          setError("Tidak bisa memutar lagu. Pastikan file ada di folder publik/audioo/");
          setIsPlaying(false);
        });
    }
  };

  const next = () => {
    setPlaying(p => (p + 1) % songs.length);
    setIsPlaying(true);
  };

  const prev = () => {
    setPlaying(p => (p - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <section
      ref={ref}
      style={{ padding: "60px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={songs[playing].url}
        onEnded={next}
        onError={() => setError("File audio tidak ditemukan. Cek folder publik/audioo/")}
        preload="metadata"
      />

      {/* Header */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s ease",
        textAlign: "center",
        marginBottom: 32,
      }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>🎵</div>
        <p style={{ fontSize: 10, letterSpacing: 4, color: "rgba(245,230,240,0.5)", textTransform: "uppercase", marginBottom: 12 }}>
          — Our Songs —
        </p>
        <h2 style={{ fontSize: "clamp(28px, 6vw, 44px)", fontWeight: 400, color: "#f5e6f0", fontFamily: "'Georgia', serif" }}>
          Special Playlist
        </h2>
        <p style={{ fontSize: 13, color: "rgba(245,230,240,0.5)", marginTop: 8 }}>
          Songs that always remind me of you 💕
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div style={{
          background: "rgba(200,50,50,0.2)",
          border: "1px solid rgba(200,50,50,0.4)",
          borderRadius: 12,
          padding: "12px 20px",
          marginBottom: 16,
          maxWidth: "min(360px, 92vw)",
          width: "100%",
          color: "#ffaaaa",
          fontSize: 12,
          textAlign: "center",
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Player card */}
      <div style={{
        background: "rgba(50,15,38,0.85)",
        border: "1px solid rgba(232,160,192,0.2)",
        borderRadius: 24,
        padding: 28,
        maxWidth: "min(360px, 92vw)",
        width: "100%",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.3s",
        marginBottom: 16,
        backdropFilter: "blur(12px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        {/* Cover art */}
        <div style={{ marginBottom: 20, borderRadius: 16, overflow: "hidden", position: "relative" }}>
          <img
            src={coverImage}
            alt="Playlist Cover"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: 16,
              animation: isPlaying ? "vinylSpin 20s linear infinite" : "none",
              display: "block",
            }}
          />
          {/* Playing indicator */}
          {isPlaying && (
            <div style={{
              position: "absolute", top: 12, right: 12,
              background: "rgba(232,122,170,0.9)",
              borderRadius: 20,
              padding: "4px 10px",
              fontSize: 10,
              color: "white",
              fontWeight: 700,
              letterSpacing: 1,
            }}>
              ♪ PLAYING
            </div>
          )}
        </div>

        {/* Song info */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 400, color: "#f5e6f0", marginBottom: 4, fontFamily: "'Georgia', serif", lineHeight: 1.3 }}>
            {songs[playing].title}
          </h3>
          <p style={{ fontSize: 12, color: "rgba(245,230,240,0.5)", letterSpacing: 1 }}>
            {songs[playing].artist}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 16 }}>
          <div
            onClick={seek}
            style={{
              height: 4,
              background: "rgba(245,230,240,0.15)",
              borderRadius: 4,
              cursor: "pointer",
              position: "relative",
              marginBottom: 6,
            }}
          >
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: duration ? `${(progress / duration) * 100}%` : "0%",
              background: "linear-gradient(90deg, #e87aaa, #f5c6d8)",
              borderRadius: 4,
              transition: "width 0.1s linear",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(245,230,240,0.35)" }}>
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
          <button onClick={prev} style={btnStyle(44)}>⏮</button>
          <button
            onClick={togglePlay}
            style={{
              ...btnStyle(60),
              background: "linear-gradient(135deg, #e87aaa, #c4426a)",
              border: "none",
              fontSize: 24,
              boxShadow: "0 4px 20px rgba(232,122,170,0.4)",
            }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button onClick={next} style={btnStyle(44)}>⏭</button>
        </div>
      </div>

      {/* Playlist list */}
      <div style={{ maxWidth: "min(360px, 92vw)", width: "100%" }}>
        {songs.map((song, i) => (
          <div
            key={i}
            onClick={() => { setPlaying(i); setIsPlaying(true); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 16px",
              background: playing === i ? "rgba(232,122,170,0.15)" : "rgba(50,15,38,0.5)",
              border: `1px solid ${playing === i ? "rgba(232,122,170,0.4)" : "rgba(245,230,240,0.08)"}`,
              borderRadius: 14,
              marginBottom: 8,
              cursor: "pointer",
              opacity: visible ? 1 : 0,
              transition: `all 0.4s ease ${i * 0.1}s`,
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{ fontSize: 13, color: playing === i ? "#e87aaa" : "rgba(245,230,240,0.4)", width: 18, fontWeight: 700 }}>
              {playing === i && isPlaying ? "♫" : i + 1}
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, color: playing === i ? "#e87aaa" : "#f5e6f0", fontFamily: "'Georgia', serif", marginBottom: 2 }}>
                {song.title}
              </p>
              <p style={{ fontSize: 11, color: "rgba(245,230,240,0.4)" }}>{song.artist}</p>
            </div>
            <span style={{ fontSize: 14 }}>{song.icon}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

const btnStyle = (size) => ({
  background: "rgba(245,230,240,0.1)",
  border: "1px solid rgba(245,230,240,0.2)",
  borderRadius: "50%",
  width: size,
  height: size,
  cursor: "pointer",
  color: "#f5e6f0",
  fontSize: size === 44 ? 18 : 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
});
