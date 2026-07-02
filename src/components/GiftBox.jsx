import { useState, useEffect } from "react";

export default function GiftBox({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 2000);
  };

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
      <p
        style={{
          fontSize: 14,
          color: "rgba(245,230,240,0.7)",
          marginBottom: 40,
          letterSpacing: 1,
        }}
      >
        {opening ? "✨ Opening your gift... ✨" : "Tap the gift box to open it 🎁"}
      </p>

      {/* Gift Box SVG */}
      <div
        onClick={handleOpen}
        style={{
          cursor: "pointer",
          animation: opening ? "giftShake 0.3s ease infinite, giftGlow 0.5s ease infinite" : "giftBounce 2s ease-in-out infinite",
          filter: opening ? "brightness(1.5) drop-shadow(0 0 20px rgba(255,200,50,0.8))" : "none",
          transition: "filter 0.3s ease",
          position: "relative",
        }}
      >
        <svg width={180} height={180} viewBox="0 0 200 200">
          {/* Box body */}
          <rect x={30} y={100} width={140} height={90} rx={4} fill="#e87aaa" />
          {/* Box lid */}
          <rect x={20} y={80} width={160} height={30} rx={4} fill="#f4c430" />
          {/* Vertical ribbon */}
          <rect x={90} y={100} width={20} height={90} fill="#f4c430" />
          {/* Horizontal ribbon */}
          <rect x={30} y={140} width={140} height={20} fill="#f4c430" />
          {/* Lid ribbon */}
          <rect x={90} y={80} width={20} height={30} fill="#e87aaa" />
          {/* Bow left */}
          <ellipse cx={68} cy={70} rx={22} ry={13} fill="#f4c430" transform="rotate(-20,68,70)" />
          {/* Bow right */}
          <ellipse cx={132} cy={70} rx={22} ry={13} fill="#f4c430" transform="rotate(20,132,70)" />
          {/* Bow center */}
          <circle cx={100} cy={70} r={10} fill="#f4c430" />
          <circle cx={100} cy={70} r={5} fill="#e8a020" />
          {/* Stars if opening */}
          {opening && (
            <>
              {[[-40, -40], [40, -40], [-60, 0], [60, 0], [-30, -70], [30, -70]].map(([dx, dy], i) => (
                <g key={i} transform={`translate(${100 + dx}, ${100 + dy})`}>
                  <line x1={0} y1={-8} x2={0} y2={8} stroke="rgba(255,240,100,0.8)" strokeWidth={1.5} />
                  <line x1={-8} y1={0} x2={8} y2={0} stroke="rgba(255,240,100,0.8)" strokeWidth={1.5} />
                  <line x1={-6} y1={-6} x2={6} y2={6} stroke="rgba(255,240,100,0.6)" strokeWidth={1} />
                  <line x1={6} y1={-6} x2={-6} y2={6} stroke="rgba(255,240,100,0.6)" strokeWidth={1} />
                </g>
              ))}
            </>
          )}
        </svg>
      </div>

      {/* Sparkle lines when opening */}
      {opening && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          {Array(12).fill(0).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 100 + Math.random() * 80,
                  height: 2,
                  background: "linear-gradient(90deg, rgba(255,220,50,0.9), transparent)",
                  transform: `rotate(${i * 30}deg)`,
                  transformOrigin: "0 50%",
                  animation: "sparkleOut 0.8s ease forwards",
                }}
              />
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes giftBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes giftShake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes giftGlow {
          0%, 100% { filter: brightness(1.3) drop-shadow(0 0 15px rgba(255,200,50,0.6)); }
          50% { filter: brightness(1.7) drop-shadow(0 0 30px rgba(255,200,50,1)); }
        }
        @keyframes sparkleOut {
          0% { opacity: 1; width: 0; }
          100% { opacity: 0; width: 150px; }
        }
      `}</style>
    </div>
  );
}
