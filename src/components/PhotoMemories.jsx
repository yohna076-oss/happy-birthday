import { useState, useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const photos = [
  {
    image: "https://cdn.phototourl.com/free/2026-07-01-0f338ee0-5c3c-4cc0-8b2c-4b68ae5494bb.jpg", // sunset
    caption: "Our very first sunset together",
    rotate: "-3deg",
    color: "#f4c430",
    bg: "linear-gradient(135deg, #ff9a3c, #f4c430, #ff6b35)",
    description: "🩶",
  },
  {
    image: "https://cdn.phototourl.com/free/2026-07-01-27eff42d-f48b-4885-963a-8325dba309a0.jpg", // coffee
    caption: "Our favourite café in the corner of the city",
    rotate: "2deg",
    color: "#8B6355",
    bg: "linear-gradient(135deg, #4a2c1a, #8B6355, #c4956a)",
    description: "🌷",
  },
  {
    image: "https://cdn.phototourl.com/free/2026-07-01-1540aad4-c687-4441-bcdb-11fe9e027806.jpg", // beach
    caption: "First time at the beach, just the two of us",
    rotate: "-1deg",
    color: "#6b8cba",
    bg: "linear-gradient(135deg, #2c4a6b, #6b8cba, #a8c4e0)",
    description: "💕",
  },
];

export default function PhotoMemories() {
  const [expanded, setExpanded] = useState(null);
  const ref = useRef(null);
  const visible = useScrollReveal(ref);
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
          marginBottom: 32,
        }}
      >
        <p style={{ fontSize: 10, letterSpacing: 4, color: "rgba(245,230,240,0.5)", textTransform: "uppercase", marginBottom: 12 }}>
          — Our Moments —
        </p>
        <h2 style={{ fontSize: "clamp(28px, 6vw, 44px)", fontWeight: 400, color: "#f5e6f0", fontFamily: "'Georgia', serif" }}>
          Our Photo Memories
        </h2>
        <p style={{ fontSize: 13, color: "rgba(245,230,240,0.5)", marginTop: 8 }}>
          Every picture holds a beautiful story
        </p>
      </div>

      {/* Photos */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: "min(360px, 92vw)",
          width: "100%",
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{
              background: "#fff",
              borderRadius: 4,
              padding: "16px 16px 40px",
              transform: `rotate(${photo.rotate})`,
              cursor: "pointer",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              opacity: visible ? 1 : 0,
              transition: `all 0.6s ease ${i * 0.2}s`,
              position: "relative",
            }}
          >
            {/* Tape */}
            <div
              style={{
                position: "absolute",
                top: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 50,
                height: 16,
                background: "rgba(200,180,220,0.6)",
                borderRadius: 2,
              }}
            />
            {/* Flower decoration */}
            <div style={{ position: "absolute", top: 10, right: 12, fontSize: 14 }}>🌸</div>

            {/* Photo area with image */}
            <div
              style={{
                width: "100%",
                height: 200,
                borderRadius: 2,
                marginBottom: 12,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img 
                src={photo.image} 
                alt={photo.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  animation: `photoFloat 3s ease-in-out ${i * 0.5}s infinite alternate`,
                }}
              />
              {/* Light overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.15), transparent 60%)",
                pointerEvents: "none",
              }} />
            </div>

            <p style={{ textAlign: "center", fontSize: 12, color: "#888", fontStyle: "italic", fontFamily: "'Georgia', serif" }}>
              {photo.caption}
            </p>

            {/* Small flower bottom decoration */}
            <div style={{ position: "absolute", bottom: 10, right: 16, fontSize: 12 }}>🌼</div>
          </div>
        ))}
      </div>

      {/* Expanded modal */}
      {expanded !== null && (
        <div
          onClick={() => setExpanded(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            backdropFilter: "blur(8px)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 4,
              padding: "24px 24px 50px",
              maxWidth: 340,
              width: "90%",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              animation: "scaleIn 0.3s ease",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpanded(null)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "rgba(0,0,0,0.1)",
                border: "none",
                borderRadius: "50%",
                width: 28,
                height: 28,
                cursor: "pointer",
                fontSize: 12,
                color: "#666",
              }}
            >
              ×
            </button>
            <div
              style={{
                width: "100%",
                height: 250,
                borderRadius: 2,
                marginBottom: 16,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img 
                src={photos[expanded].image} 
                alt={photos[expanded].caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <p style={{ textAlign: "center", fontSize: 14, color: "#888", fontStyle: "italic", fontFamily: "'Georgia', serif" }}>
              {photos[expanded].caption}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes photoFloat {
          0% { transform: scale(1) rotate(0deg); }
          100% { transform: scale(1.1) rotate(5deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}