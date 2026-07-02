import { useState, useRef, useEffect } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function FinalSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const ref = useRef(null);
  const visible = useScrollReveal(ref);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setShowPopup(true), 1500);
    }
  }, [visible]);

  const handleClose = () => setShowPopup(false);

  // Flower particles for background
  const bgFlowers = ["🌸", "🌺", "🌼", "🌷", "💮", "🌹"];

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        padding: "60px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Flower rain top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {Array(20).fill(0).map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: "clamp(12px, 3vw, 22px)",
              animation: `flowerRain ${2 + Math.random() * 3}s ease-in ${Math.random() * 2}s infinite`,
              opacity: 0,
              margin: "0 2px",
            }}
          >
            {bgFlowers[i % bgFlowers.length]}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s ease",
        }}
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: 4,
            color: "rgba(245,230,240,0.5)",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          ✿ With all my heart ✿
        </p>

        <h2
          style={{
            fontSize: "clamp(32px, 8vw, 56px)",
            fontWeight: 400,
            color: "#f5e6f0",
            lineHeight: 1.3,
            fontFamily: "'Georgia', serif",
            marginBottom: 0,
          }}
        >
          May your life
        </h2>
        <h2
          style={{
            fontSize: "clamp(32px, 8vw, 56px)",
            fontWeight: 400,
            color: "#e87aaa",
            fontStyle: "italic",
            lineHeight: 1.3,
            fontFamily: "'Georgia', serif",
            marginBottom: 0,
          }}
        >
          always be filled
        </h2>
        <h2
          style={{
            fontSize: "clamp(32px, 8vw, 56px)",
            fontWeight: 400,
            color: "#f5e6f0",
            lineHeight: 1.3,
            fontFamily: "'Georgia', serif",
            marginBottom: 32,
          }}
        >
          with flowers
        </h2>

        <p
          style={{
            fontSize: 13,
            color: "rgba(245,230,240,0.6)",
            maxWidth: 300,
            margin: "0 auto 20px",
            lineHeight: 1.9,
          }}
        >
          Happy birthday, Sayangku. May your days always be filled with love, happiness, and all the beautiful things you deserve. I am grateful every single day to know you.
        </p>

        <div style={{ fontSize: 20, marginBottom: 12 }}>🌸</div>

        <p
          style={{
            fontSize: 14,
            color: "rgba(245,230,240,0.5)",
            fontStyle: "italic",
            letterSpacing: 1,
          }}
        >
          — With love that never runs out 💕 —
        </p>

        <div style={{ fontSize: 22, marginTop: 12 }}>🌸</div>
      </div>

      {/* Birthday popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          {/* Flower rain overlay */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
            {Array(30).fill(0).map((_, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  top: "-5%",
                  left: `${Math.random() * 100}%`,
                  fontSize: 18 + Math.random() * 14,
                  animation: `confettiFall ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 1.5}s forwards`,
                  opacity: 0,
                }}
              >
                {bgFlowers[Math.floor(Math.random() * bgFlowers.length)]}
              </span>
            ))}
          </div>

          <div
            style={{
              background: "linear-gradient(145deg, #5a1e42, #3d1a2e)",
              border: "1px solid rgba(232,160,192,0.3)",
              borderRadius: 24,
              padding: "40px 32px",
              maxWidth: 320,
              width: "100%",
              textAlign: "center",
              position: "relative",
              animation: "popupIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                background: "none",
                border: "none",
                color: "rgba(245,230,240,0.5)",
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <div style={{ fontSize: 44, marginBottom: 16 }}>🎂</div>
            <h3
              style={{
                fontSize: 32,
                fontWeight: 400,
                color: "#f5e6f0",
                marginBottom: 8,
                fontFamily: "'Georgia', serif",
              }}
            >
              Happy Birthday!
            </h3>
            <p style={{ fontSize: 14, color: "rgba(245,230,240,0.65)" }}>
              The most special Dimas 🌸
            </p>

            <button
              onClick={handleClose}
              style={{
                marginTop: 24,
                background: "rgba(245,230,240,0.12)",
                border: "1px solid rgba(245,230,240,0.2)",
                borderRadius: 50,
                padding: "10px 28px",
                color: "#f5e6f0",
                fontSize: 13,
                cursor: "pointer",
                letterSpacing: 1,
              }}
            >
              Close ×
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes flowerRain {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateY(120px); }
        }
        @keyframes confettiFall {
          0% { opacity: 0; transform: translateY(0) rotate(0deg); }
          10% { opacity: 1; }
          100% { opacity: 0; transform: translateY(110vh) rotate(720deg); }
        }
        @keyframes popupIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
