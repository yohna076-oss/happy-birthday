const positions = [
  { top: "5%", left: "3%", emoji: "✿", size: 14, opacity: 0.3, duration: 6, delay: 0 },
  { top: "8%", left: "90%", emoji: "✼", size: 12, opacity: 0.25, duration: 8, delay: 1 },
  { top: "20%", left: "5%", emoji: "❀", size: 10, opacity: 0.2, duration: 7, delay: 2 },
  { top: "35%", left: "95%", emoji: "✿", size: 11, opacity: 0.2, duration: 9, delay: 0.5 },
  { top: "55%", left: "2%", emoji: "✼", size: 13, opacity: 0.25, duration: 6, delay: 3 },
  { top: "70%", left: "92%", emoji: "❀", size: 10, opacity: 0.2, duration: 8, delay: 1.5 },
  { top: "85%", left: "8%", emoji: "✿", size: 12, opacity: 0.3, duration: 7, delay: 2.5 },
  { top: "90%", left: "88%", emoji: "✼", size: 11, opacity: 0.2, duration: 5, delay: 0.8 },
];

export default function FloatingFlowers() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {positions.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            fontSize: p.size,
            color: "#e8a0c0",
            opacity: p.opacity,
            animation: `bgFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        >
          {p.emoji}
        </div>
      ))}
      <style>{`
        @keyframes bgFloat {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(30deg); }
        }
      `}</style>
    </div>
  );
}
