import { useState, useEffect } from "react";

const SECRET = "020707"; // Ciwa's special date

export default function PinScreen({ onSuccess }) {
  const [pin, setPin] = useState("");
  const [shaking, setShaking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const handleKey = (k) => {
    if (k === "×") {
      setPin((p) => p.slice(0, -1));
      return;
    }
    if (k === "⌫") {
      setPin((p) => p.slice(0, -1));
      return;
    }
    if (pin.length >= 6) return;
    const next = pin + k;
    setPin(next);
    if (next.length === 6) {
      setTimeout(() => {
        if (next === SECRET) {
          onSuccess();
        } else {
          setShaking(true);
          setTimeout(() => {
            setShaking(false);
            setPin("");
          }, 600);
        }
      }, 200);
    }
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "×", "0", "⌫"];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#3d1a2e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Decoration top */}
      <div style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)" }}>
        <svg width={48} height={48} viewBox="0 0 80 80" style={{ animation: "floatY 3s ease-in-out infinite alternate" }}>
          {[0, 60, 120, 180, 240, 300].map((a, i) => (
            <ellipse
              key={i}
              cx={40 + 14 * Math.cos((a * Math.PI) / 180)}
              cy={40 + 14 * Math.sin((a * Math.PI) / 180)}
              rx={7}
              ry={13}
              fill={i % 2 === 0 ? "#e8a0c0" : "#c97aaa"}
              transform={`rotate(${a}, ${40 + 14 * Math.cos((a * Math.PI) / 180)}, ${40 + 14 * Math.sin((a * Math.PI) / 180)})`}
            />
          ))}
          <circle cx={40} cy={40} r={7} fill="#fff" />
        </svg>
      </div>

      {/* Card */}
      <div
        style={{
          background: "rgba(60,20,45,0.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(232,160,192,0.2)",
          borderRadius: 24,
          padding: "40px 32px",
          width: "min(360px, 90vw)",
          animation: shaking ? "shake 0.5s ease" : "none",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 400,
            color: "#f5e6f0",
            marginBottom: 8,
            fontFamily: "'Georgia', serif",
          }}
        >
          For You, My Love
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "rgba(245,230,240,0.6)",
            marginBottom: 28,
            letterSpacing: 1,
          }}
        >
          Enter our secret code
        </p>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 28 }}>
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background:
                    i < pin.length
                      ? i === 0
                        ? "#e8a0c0"
                        : "rgba(245,230,240,0.7)"
                      : "rgba(245,230,240,0.2)",
                  border: i < pin.length ? "none" : "1px solid rgba(245,230,240,0.3)",
                  transition: "all 0.2s ease",
                  transform: i < pin.length ? "scale(1.1)" : "scale(1)",
                }}
              />
            ))}
        </div>

        {/* Keypad */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {keys.map((k) => (
            <button
              key={k}
              onClick={() => handleKey(k)}
              style={{
                height: 60,
                borderRadius: "50%",
                border: "1px solid rgba(245,230,240,0.15)",
                background: "rgba(245,230,240,0.07)",
                color: "#f5e6f0",
                fontSize: k === "⌫" ? 18 : 20,
                cursor: "pointer",
                transition: "all 0.15s ease",
                fontFamily: "'Georgia', serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(245,230,240,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(245,230,240,0.07)";
              }}
            >
              {k}
            </button>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 12,
            color: "rgba(245,230,240,0.4)",
          }}
        >
          Hint: our special date 💕
        </p>
      </div>

      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
