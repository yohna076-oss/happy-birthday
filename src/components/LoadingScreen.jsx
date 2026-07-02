import { useState, useEffect } from "react";

const flowers = [
  { top: "15%", left: "70%", size: 24, color: "#e8a0c0", delay: 0 },
  { top: "10%", left: "88%", size: 20, color: "#c97aaa", delay: 0.3 },
  { top: "22%", left: "80%", size: 18, color: "#f4c430", delay: 0.6 },
  { top: "30%", left: "88%", size: 16, color: "#d94f6a", delay: 0.9 },
];

function FlowerSVG({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <ellipse
          key={i}
          cx={20 + 10 * Math.cos((a * Math.PI) / 180)}
          cy={20 + 10 * Math.sin((a * Math.PI) / 180)}
          rx={6}
          ry={10}
          fill={color}
          transform={`rotate(${a}, ${20 + 10 * Math.cos((a * Math.PI) / 180)}, ${20 + 10 * Math.sin((a * Math.PI) / 180)})`}
        />
      ))}
      <circle cx={20} cy={20} r={5} fill="#fff" />
    </svg>
  );
}

export default function LoadingScreen() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const iv = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    return () => clearInterval(iv);
  }, []);

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
      }}
    >
      {flowers.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: f.top,
            left: f.left,
            animation: `float 3s ease-in-out ${f.delay}s infinite alternate`,
          }}
        >
          <FlowerSVG color={f.color} size={f.size} />
        </div>
      ))}

      {/* Snowflakes */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "44%",
          fontSize: 22,
          color: "rgba(255,255,255,0.5)",
          animation: "spin 4s linear infinite",
        }}
      >
        ✻
      </div>
      <div
        style={{
          position: "absolute",
          top: "41%",
          left: "56%",
          fontSize: 16,
          color: "rgba(255,255,255,0.4)",
          animation: "spin 3s linear infinite reverse",
        }}
      >
        ✼
      </div>

      {/* Main flower */}
      <div
        style={{
          marginBottom: 32,
          animation: "spin 8s linear infinite",
        }}
      >
        <svg width={70} height={70} viewBox="0 0 80 80">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
            <ellipse
              key={i}
              cx={40 + 15 * Math.cos((a * Math.PI) / 180)}
              cy={40 + 15 * Math.sin((a * Math.PI) / 180)}
              rx={8}
              ry={14}
              fill={i % 2 === 0 ? "#e8a0c0" : "#c97aaa"}
              transform={`rotate(${a}, ${40 + 15 * Math.cos((a * Math.PI) / 180)}, ${40 + 15 * Math.sin((a * Math.PI) / 180)})`}
            />
          ))}
          <circle cx={40} cy={40} r={8} fill="#fff" />
        </svg>
      </div>

      <p
        style={{
          fontSize: 14,
          color: "rgba(245,230,240,0.7)",
          letterSpacing: 2,
          fontStyle: "italic",
        }}
      >
        Preparing something special for you{dots}
      </p>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-12px) rotate(15deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
