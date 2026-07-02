import { useState, useRef, useEffect } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const flowers = [
  { emoji: "🌸", message: "Sayang, kamu adalah mawar terindah yang pernah mekar di hidupku — penuh cinta dan kecantikan yang tiada tanding.", x: "35%", y: "5%", size: 28, delay: 0 },
  { emoji: "🌺", message: "Tawamu, sayang, adalah melodi terindah yang pernah aku dengar. Aku bisa dengar itu seharian.", x: "65%", y: "8%", size: 26, delay: 0.3 },
  { emoji: "🌻", message: "Kamu adalah sinar matahariku, pacarku — yang membuat setiap hariku jauh lebih cerah, bahkan saat mendung.", x: "18%", y: "30%", size: 30, delay: 0.5 },
  { emoji: "🌷", message: "Seperti tulip, kamu lemah lembut, anggun, dan begitu indah — persis dirimu, cintaku.", x: "50%", y: "22%", size: 24, delay: 0.7 },
  { emoji: "🌹", message: "Seluruh taman bunga ini untukmu, sayang — karena kamu layak mendapat semua keindahan di dunia ini.", x: "80%", y: "28%", size: 28, delay: 0.2 },
  { emoji: "🌸", message: "Setiap kelopak di sini menyimpan sepotong hatiku — hanya untukmu, pacarku tersayang, selamanya.", x: "50%", y: "48%", size: 22, delay: 0.9 },
  { emoji: "💖", message: "Terima kasih sudah jadi pacar terbaik yang pernah aku punya. Aku sayang kamu, lebih dari kata-kata bisa jelaskan.", x: "30%", y: "60%", size: 24, delay: 0.4 },
];

// Sparkle particle component
function Sparkle({ x, y, delay, size = 6 }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: size, height: size,
      pointerEvents: "none", zIndex: 10,
      animation: `sparklePop 0.8s ease-out ${delay}s both`,
    }}>
      <svg width={size} height={size} viewBox="0 0 10 10">
        <polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" fill="#f4c0d8" />
      </svg>
    </div>
  );
}

// Little floating heart burst — plays when a flower is clicked
function HeartBurst({ x, y }) {
  const hearts = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    dx: (Math.random() - 0.5) * 70,
    dy: -40 - Math.random() * 40,
    delay: i * 0.08,
    size: 10 + Math.random() * 8,
  }));
  return (
    <>
      {hearts.map(h => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            left: x, top: y,
            fontSize: h.size,
            pointerEvents: "none",
            zIndex: 11,
            "--dx": `${h.dx}px`,
            "--dy": `${h.dy}px`,
            animation: `heartFloat 1.1s ease-out ${h.delay}s both`,
          }}
        >
          💗
        </span>
      ))}
    </>
  );
}

function Vase() {
  return (
    <svg width={130} height={120} viewBox="0 0 130 120" style={{ overflow: "visible" }}>
      <line x1={50} y1={8} x2={20} y2={-90} stroke="#7aaa55" strokeWidth={2.5} />
      <line x1={80} y1={8} x2={108} y2={-88} stroke="#7aaa55" strokeWidth={2.5} />
      <line x1={52} y1={6} x2={10} y2={-55} stroke="#7aaa55" strokeWidth={2.5} />
      <line x1={65} y1={5} x2={65} y2={-75} stroke="#7aaa55" strokeWidth={2.5} />
      <line x1={78} y1={6} x2={118} y2={-58} stroke="#7aaa55" strokeWidth={2.5} />
      <line x1={65} y1={6} x2={65} y2={-40} stroke="#7aaa55" strokeWidth={2} />
      <ellipse cx={32} cy={-40} rx={11} ry={5} fill="#6aaa44" transform="rotate(-45,32,-40)" />
      <ellipse cx={98} cy={-38} rx={11} ry={5} fill="#6aaa44" transform="rotate(40,98,-38)" />
      <ellipse cx={65} cy={-55} rx={9} ry={4} fill="#6aaa44" transform="rotate(5,65,-55)" />
      <ellipse cx={16} cy={-30} rx={8} ry={4} fill="#6aaa44" transform="rotate(-35,16,-30)" />
      <g transform="translate(45, -18) scale(0.65)">
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
          <ellipse key={i}
            cx={14 * Math.cos((a * Math.PI) / 180)} cy={14 * Math.sin((a * Math.PI) / 180)}
            rx={5} ry={9} fill="#f4c430"
            transform={`rotate(${a}, ${14 * Math.cos((a * Math.PI) / 180)}, ${14 * Math.sin((a * Math.PI) / 180)})`}
          />
        ))}
        <circle cx={0} cy={0} r={8} fill="#7B4F00" />
      </g>
      <text x={60} y={-6} fontSize={16} style={{ userSelect: "none" }}>💐</text>
      <path d="M28 10 L20 95 Q20 108 65 108 Q110 108 110 95 L102 10 Z" fill="#c97aaa" />
      <ellipse cx={65} cy={10} rx={37} ry={10} fill="#d98abb" />
      <path d="M35 20 Q30 60 32 90" stroke="rgba(255,255,255,0.15)" strokeWidth={4} fill="none" strokeLinecap="round" />
      <ellipse cx={20} cy={88} rx={13} ry={10} fill="#c97aaa" />
      <ellipse cx={110} cy={88} rx={13} ry={10} fill="#c97aaa" />
      <ellipse cx={16} cy={85} rx={5} ry={4} fill="#d98abb" opacity={0.6} />
      <ellipse cx={106} cy={85} rx={5} ry={4} fill="#d98abb" opacity={0.6} />
    </svg>
  );
}

// Floating ambient petals in background
function AmbientPetals() {
  const petals = ["🌸", "✿", "❀", "🌺", "✾", "💗"];
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${8 + i * 10}%`,
          top: "-20px",
          fontSize: `${12 + (i % 3) * 6}px`,
          opacity: 0.18,
          pointerEvents: "none",
          animation: `petalFall ${6 + i * 1.1}s linear ${i * 0.7}s infinite`,
          zIndex: 0,
        }}>
          {petals[i % petals.length]}
        </div>
      ))}
    </>
  );
}

export default function BouquetSection() {
  const [activeMsg, setActiveMsg] = useState("");
  const [activeMsgVisible, setActiveMsgVisible] = useState(false);
  const [clickedIdx, setClickedIdx] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const [burst, setBurst] = useState(null);
  const [revealedSet, setRevealedSet] = useState(new Set());
  const [msgKey, setMsgKey] = useState(0); // for re-triggering message animation
  const ref = useRef(null);
  const visible = useScrollReveal(ref);

  const handleFlower = (msg, idx, e) => {
    // Generate sparkles at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = ref.current.getBoundingClientRect();
    const cx = rect.left - containerRect.left + rect.width / 2;
    const cy = rect.top - containerRect.top + rect.height / 2;

    const newSparkles = Array.from({ length: 7 }).map((_, i) => ({
      id: Date.now() + i,
      x: cx + (Math.random() - 0.5) * 60,
      y: cy + (Math.random() - 0.5) * 60,
      delay: i * 0.06,
      size: 6 + Math.random() * 6,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1200);

    // Heart burst
    setBurst({ id: Date.now(), x: cx, y: cy });
    setTimeout(() => setBurst(null), 1300);

    setActiveMsg(msg);
    setActiveMsgVisible(true);
    setClickedIdx(idx);
    setRevealedSet(prev => new Set([...prev, idx]));
    setMsgKey(k => k + 1);
  };

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AmbientPetals />

      {/* Header */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s ease",
        textAlign: "center",
        marginBottom: 36,
        position: "relative", zIndex: 1,
      }}>
        <p style={{ fontSize: 10, letterSpacing: 4, color: "rgba(245,230,240,0.5)", textTransform: "uppercase", marginBottom: 12 }}>
          — Untuk Pacarku Tersayang —
        </p>
        <h2 style={{
          fontSize: "clamp(30px, 7vw, 48px)", fontWeight: 400, color: "#f5e6f0",
          fontFamily: "'Georgia', serif", marginBottom: 8,
          animation: "titleGlow 3.5s ease-in-out infinite",
        }}>
          A Digital Bouquet
        </h2>
        <p style={{ fontSize: 13, color: "rgba(245,230,240,0.55)" }}>
          Sentuh setiap bunga untuk reveal pesan cintaku untukmu 💕
        </p>

        {/* Revealed counter */}
        <div style={{
          marginTop: 12,
          display: "flex", justifyContent: "center", gap: 6,
        }}>
          {flowers.map((_, i) => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: "50%",
              background: revealedSet.has(i) ? "#e8a4c0" : "rgba(232,164,192,0.2)",
              transition: "all 0.4s ease",
              boxShadow: revealedSet.has(i) ? "0 0 6px rgba(232,164,192,0.6)" : "none",
              animation: revealedSet.has(i) ? "dotPop 0.4s ease" : "none",
            }} />
          ))}
        </div>
      </div>

      {/* Bouquet container */}
      <div style={{
        position: "relative",
        width: "min(320px, 88vw)",
        height: 460,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.3s",
        zIndex: 1,
      }}>
        {/* Sparkles */}
        {sparkles.map(s => (
          <Sparkle key={s.id} x={s.x} y={s.y} delay={s.delay} size={s.size} />
        ))}

        {/* Heart burst on click */}
        {burst && <HeartBurst key={burst.id} x={burst.x} y={burst.y} />}

        {/* Floating flowers */}
        {flowers.map((f, i) => (
          <button
            key={i}
            onClick={(e) => handleFlower(f.message, i, e)}
            style={{
              position: "absolute",
              left: f.x, top: f.y,
              transform: "translate(-50%, -50%)",
              fontSize: f.size,
              background: "none", border: "none", cursor: "pointer",
              animation: `bouqFloat 2.8s ease-in-out ${f.delay}s infinite alternate`,
              filter: clickedIdx === i
                ? "drop-shadow(0 0 12px rgba(255,180,220,1)) brightness(1.3)"
                : revealedSet.has(i)
                ? "drop-shadow(0 0 6px rgba(255,180,220,0.5)) brightness(1.1)"
                : "drop-shadow(0 2px 6px rgba(200,100,150,0.35))",
              transition: "filter 0.3s ease, transform 0.2s ease",
              zIndex: 2,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(255,180,220,0.9)) brightness(1.2)";
              e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.25)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.filter = clickedIdx === i
                ? "drop-shadow(0 0 12px rgba(255,180,220,1)) brightness(1.3)"
                : "drop-shadow(0 2px 6px rgba(200,100,150,0.35))";
              e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
            }}
          >
            {f.emoji}
            {/* Pulse ring when revealed */}
            {revealedSet.has(i) && (
              <span style={{
                position: "absolute", inset: -8,
                borderRadius: "50%",
                border: "1.5px solid rgba(232,164,192,0.5)",
                animation: "pulseRing 2s ease-out infinite",
                pointerEvents: "none",
              }} />
            )}
          </button>
        ))}

        {/* Vase */}
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)" }}>
          <Vase />
        </div>
      </div>

      {/* Message box */}
      <div
        key={msgKey}
        style={{
          marginTop: 20,
          background: "rgba(40,12,32,0.6)",
          border: `1px solid ${activeMsgVisible ? "rgba(232,160,192,0.4)" : "rgba(232,160,192,0.18)"}`,
          borderRadius: 20,
          padding: "16px 28px",
          maxWidth: "min(320px, 88vw)",
          width: "100%",
          minHeight: 64,
          textAlign: "center",
          transition: "border-color 0.4s ease",
          animation: activeMsgVisible ? "msgSlideUp 0.45s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
          position: "relative", zIndex: 1,
          boxShadow: activeMsgVisible ? "0 0 24px rgba(232,164,192,0.08)" : "none",
        }}
      >
        {/* Shimmer line on top of box when active */}
        {activeMsgVisible && (
          <div style={{
            position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(232,164,192,0.6), transparent)",
            borderRadius: 1,
            animation: "shimmer 1.5s ease infinite",
          }} />
        )}
        <p style={{
          fontSize: 13,
          color: activeMsgVisible ? "#f5e6f0" : "rgba(245,230,240,0.4)",
          fontStyle: "italic",
          lineHeight: 1.75,
        }}>
          {activeMsg || "Sentuh setiap bunga untuk reveal pesan cintaku untukmu 💕"}
        </p>
        {activeMsgVisible && (
          <div style={{ marginTop: 8, fontSize: 16, animation: "heartBeat 1.2s ease infinite" }}>💕</div>
        )}
      </div>

      {/* All revealed celebration */}
      {revealedSet.size === flowers.length && (
        <div style={{
          marginTop: 20,
          color: "#e8a4c0",
          fontSize: 13,
          fontStyle: "italic",
          animation: "fadeInUp 0.6s ease both, glowPulse 2.5s ease-in-out infinite",
          textAlign: "center",
          position: "relative", zIndex: 1,
        }}>
          ✨ Kamu sudah membuka semua bunga, sayang! Semuanya ini untukmu 🌸💗
        </div>
      )}

      <style>{`
        @keyframes bouqFloat {
          0%   { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) translateY(-12px) rotate(8deg); }
        }
        @keyframes petalFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0.18; }
          80%  { opacity: 0.18; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes sparklePop {
          0%   { transform: scale(0) rotate(0deg); opacity: 1; }
          60%  { transform: scale(1.4) rotate(180deg); opacity: 1; }
          100% { transform: scale(0.5) rotate(360deg); opacity: 0; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes msgSlideUp {
          0%   { opacity: 0; transform: translateY(12px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          14%      { transform: scale(1.25); }
          28%      { transform: scale(1); }
          42%      { transform: scale(1.15); }
          70%      { transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { opacity: 0.4; transform: scaleX(0.8); }
          50%  { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0.4; transform: scaleX(0.8); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartFloat {
          0%   { transform: translate(-50%, -50%) translate(0, 0) scale(0.4); opacity: 0; }
          20%  { opacity: 1; transform: translate(-50%, -50%) translate(calc(var(--dx) * 0.3), calc(var(--dy) * 0.3)) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(0.7); }
        }
        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 8px rgba(232,164,192,0.15); }
          50%      { text-shadow: 0 0 18px rgba(232,164,192,0.45); }
        }
        @keyframes dotPop {
          0%   { transform: scale(0.4); }
          60%  { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 1; text-shadow: 0 0 10px rgba(232,164,192,0.4); }
        }
      `}</style>
    </section>
  );
}