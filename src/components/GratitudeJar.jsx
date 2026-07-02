import { useState, useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const notes = [
  "Your spirit in the face of challenges inspires me every single day.",
  "The way your eyes light up when you're excited about something is my favorite view.",
  "Your kindness — to strangers, to animals, to everyone — makes the world more beautiful.",
  "You have the most contagious laughter I have ever heard.",
  "Your patience and gentleness are gifts I am grateful for every day.",
  "The way you care for the people you love is nothing short of extraordinary.",
  "You make even ordinary moments feel magical just by being there.",
  "Your heart is the most beautiful thing about you, and that's saying a lot.",
];

export default function GratitudeJar() {
  const [shaking, setShaking] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [noteVisible, setNoteVisible] = useState(false);
  const ref = useRef(null);
  const visible = useScrollReveal(ref);

  const handleShake = () => {
    if (shaking) return;
    setShaking(true);
    setNoteVisible(false);
    setTimeout(() => {
      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      setCurrentNote(randomNote);
      setNoteVisible(true);
      setShaking(false);
    }, 800);
  };

  return (
    <section
      ref={ref}
      style={{ padding: "60px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s ease",
          textAlign: "center",
          marginBottom: 36,
        }}
      >
        <p style={{ fontSize: 10, letterSpacing: 4, color: "rgba(245,230,240,0.5)", textTransform: "uppercase", marginBottom: 12 }}>
          — From My Heart To Yours —
        </p>
        <h2 style={{ fontSize: "clamp(24px, 5vw, 38px)", fontWeight: 400, color: "#f5e6f0", fontFamily: "'Georgia', serif" }}>
          Reasons I'm Grateful to Know You
        </h2>
        <p style={{ fontSize: 13, color: "rgba(245,230,240,0.5)", marginTop: 8 }}>
          Shake the jar and pick a note 🫙
        </p>
      </div>

      {/* Jar */}
      <div
        onClick={handleShake}
        style={{
          cursor: "pointer",
          animation: shaking ? "jarShake 0.1s linear infinite" : "none",
          marginBottom: 28,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
          userSelect: "none",
        }}
      >
        <svg width={140} height={170} viewBox="0 0 140 170">
          {/* Jar lid */}
          <rect x={35} y={10} width={70} height={22} rx={6} fill="#c06080" />
          <rect x={40} y={15} width={60} height={12} rx={4} fill="#d47090" />

          {/* Jar body */}
          <path d="M25 32 L25 150 Q25 165 70 165 Q115 165 115 150 L115 32 Z" fill="rgba(180,100,140,0.25)" stroke="rgba(232,160,192,0.4)" strokeWidth={2} />

          {/* Notes inside */}
          {[
            { x: 50, y: 100, r: "-15deg", color: "rgba(245,220,235,0.7)" },
            { x: 75, y: 85, r: "10deg", color: "rgba(245,220,235,0.6)" },
            { x: 55, y: 130, r: "5deg", color: "rgba(245,220,235,0.7)" },
            { x: 80, y: 120, r: "-8deg", color: "rgba(245,220,235,0.6)" },
          ].map((note, i) => (
            <rect
              key={i}
              x={note.x}
              y={note.y}
              width={28}
              height={22}
              rx={3}
              fill={note.color}
              transform={`rotate(${note.r}, ${note.x + 14}, ${note.y + 11})`}
              style={{ animation: shaking ? `noteJiggle 0.15s ease ${i * 0.05}s infinite alternate` : "none" }}
            />
          ))}

          {/* Flower on notes */}
          <text x={58} y={112} fontSize="12" style={{ userSelect: "none" }}>🌻</text>
          <text x={83} y={98} fontSize="10" style={{ userSelect: "none" }}>🌸</text>
        </svg>
      </div>

      {/* Shake button */}
      <button
        onClick={handleShake}
        style={{
          background: "rgba(60,20,45,0.8)",
          border: "1px solid rgba(232,160,192,0.3)",
          borderRadius: 50,
          padding: "14px 32px",
          color: "#f5e6f0",
          fontSize: 14,
          cursor: "pointer",
          letterSpacing: 1,
          marginBottom: 24,
          transition: "all 0.2s ease",
          animation: shaking ? "jarShake 0.1s linear infinite" : "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(90,30,65,0.9)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(60,20,45,0.8)")}
      >
        🫙 Shake the Jar
      </button>

      {/* Note reveal */}
      {noteVisible && (
        <div
          style={{
            background: "rgba(253,240,245,0.95)",
            borderRadius: 16,
            padding: "24px 28px",
            maxWidth: "min(340px, 90vw)",
            width: "100%",
            textAlign: "center",
            animation: "noteSlideUp 0.5s ease",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            position: "relative",
          }}
        >
          <button
            onClick={() => setNoteVisible(false)}
            style={{
              position: "absolute",
              top: 8,
              right: 12,
              background: "none",
              border: "none",
              fontSize: 18,
              color: "#ccc",
              cursor: "pointer",
            }}
          >
            ×
          </button>
          <p style={{ fontSize: 14, color: "#5a2840", lineHeight: 1.8, fontStyle: "italic", fontFamily: "'Georgia', serif" }}>
            {currentNote}
          </p>
          <p style={{ fontSize: 22, marginTop: 12 }}>💕</p>
        </div>
      )}

      <style>{`
        @keyframes jarShake {
          0% { transform: rotate(-4deg) translateX(-2px); }
          100% { transform: rotate(4deg) translateX(2px); }
        }
        @keyframes noteSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes noteJiggle {
          0% { transform: rotate(-5deg); }
          100% { transform: rotate(5deg); }
        }
      `}</style>
    </section>
  );
}
