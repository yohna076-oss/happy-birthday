import { useEffect, useRef, useState } from "react";

const floatingFlowers = [
  { top: "12%", left: "8%", emoji: "🌸", size: 28, delay: 0 },
  { top: "18%", left: "88%", emoji: "🌺", size: 22, delay: 0.5 },
  { top: "55%", left: "5%", emoji: "🌹", size: 20, delay: 1 },
  { top: "65%", left: "90%", emoji: "🌸", size: 24, delay: 0.8 },
  { top: "80%", left: "15%", emoji: "🌻", size: 18, delay: 1.2 },
  { top: "35%", left: "92%", emoji: "🌷", size: 20, delay: 0.3 },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "60px 24px",
        textAlign: "center",
      }}
    >
      {floatingFlowers.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: f.top,
            left: f.left,
            fontSize: f.size,
            animation: `heroFloat 4s ease-in-out ${f.delay}s infinite alternate`,
            opacity: visible ? 1 : 0,
            transition: `opacity 1s ease ${f.delay}s`,
          }}
        >
          {f.emoji}
        </div>
      ))}

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s ease",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: 4,
            color: "rgba(245,230,240,0.6)",
            marginBottom: 16,
            textTransform: "uppercase",
            animation: "textPulse 3s ease-in-out infinite",
          }}
        >
          ✿ Your Special Day ✿
        </p>

        <h1
          style={{
            fontSize: "clamp(52px, 12vw, 80px)",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: 0,
            color: "#f5e6f0",
            fontFamily: "'Georgia', serif",
            animation: "textGlow 3s ease-in-out infinite",
          }}
        >
          Happy
        </h1>
        <h1
          style={{
            fontSize: "clamp(52px, 12vw, 80px)",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: 0,
            color: "#e87aaa",
            fontStyle: "italic",
            fontFamily: "'Georgia', serif",
            animation: "textGlow 3s ease-in-out infinite 0.5s",
          }}
        >
          Birthday
        </h1>
        <h1
          style={{
            fontSize: "clamp(52px, 12vw, 80px)",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: 32,
            color: "#f5e6f0",
            fontFamily: "'Georgia', serif",
            animation: "textGlow 3s ease-in-out infinite 1s",
          }}
        >
          Dimas Ahmad Fauzi
        </h1>

        <div style={{ width: 60, height: 1, background: "rgba(245,230,240,0.4)", margin: "0 auto 20px" }} />

        <p
          style={{
            fontSize: 11,
            letterSpacing: 4,
            color: "rgba(245,230,240,0.45)",
            textTransform: "uppercase",
            animation: "textPulse 3s ease-in-out infinite 1.5s",
          }}
        >
          July 02 · The Most Special Day
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          opacity: 0.5,
          animation: "bounce 2s ease-in-out infinite",
        }}
      >
        <span style={{ fontSize: 20 }}>⌄</span>
        <span style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,230,240,0.6)" }}>
          scroll
        </span>
      </div>

      <style>{`
        @keyframes heroFloat {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-15px) rotate(20deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes textPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.02); }
        }
        @keyframes textGlow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(232,122,170,0.1);
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 40px rgba(232,122,170,0.3), 0 0 80px rgba(232,122,170,0.1);
            transform: scale(1.02);
          }
        }
      `}</style>
    </section>
  );
}