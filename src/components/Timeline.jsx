import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const memories = [
  {
    icon: "✨",
    label: "THE VERY BEGINNING",
    title: "First Time We Met",
    desc: "The day the world seemed to spin a little faster and everything felt different from before.",
    extra: "✼",
  },
  {
    icon: "💬",
    label: "A MAGICAL MOMENT",
    title: "Our First Conversation",
    desc: "The first words spoken, the first laughter shared — the beginning of thousands of stories we would write together.",
    extra: "✿",
  },
  {
    icon: "🌿",
    label: "A BEAUTIFUL MEMORY",
    title: "Our First Outing",
    desc: "A small adventure that felt like a trip to the best place on earth, simply because you were there.",
    extra: "❀",
  },
  {
    icon: "😂",
    label: "LAUGHTER THAT NEVER FADED",
    title: "The Moment We Laughed Until It Hurt",
    desc: "The moment we laughed until it hurt and I realized this is a feeling I want to hold on to forever.",
    extra: "✿",
  },
  {
    icon: "🌙",
    label: "A SWEET MEMORY",
    title: "Beautiful Silence Together",
    desc: "The comfortable quiet beside you feels warmer than a thousand words ever could.",
    extra: "✼",
  },
  {
    icon: "🎂",
    label: "TODAY",
    title: "Your Very Special Birthday",
    desc: "Celebrating you, your journey, and all the wonder you have brought into my life.",
    extra: "✿",
  },
];

export default function Timeline() {
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
          marginBottom: 40,
        }}
      >
        <p style={{ fontSize: 10, letterSpacing: 4, color: "rgba(245,230,240,0.5)", textTransform: "uppercase", marginBottom: 12 }}>
          — Our Journey —
        </p>
        <h2 style={{ fontSize: "clamp(24px, 5vw, 40px)", fontWeight: 400, color: "#f5e6f0", fontFamily: "'Georgia', serif" }}>
          Memories We've Written Together
        </h2>
        <div style={{ fontSize: 18, color: "rgba(245,230,240,0.4)", marginTop: 8 }}>✼</div>
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "relative",
          maxWidth: "min(380px, 92vw)",
          width: "100%",
        }}
      >
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 0,
            bottom: 0,
            width: 2,
            background: "linear-gradient(to bottom, transparent, rgba(232,122,170,0.6), transparent)",
          }}
        />

        {memories.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 24,
              marginBottom: 32,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: `all 0.6s ease ${i * 0.15}s`,
            }}
          >
            {/* Dot */}
            <div style={{ flexShrink: 0, paddingTop: 4 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: i === memories.length - 1 ? "#e87aaa" : "rgba(232,122,170,0.5)",
                  border: "2px solid rgba(232,122,170,0.4)",
                  marginTop: 6,
                  marginLeft: 15,
                }}
              />
            </div>

            {/* Card */}
            <div
              style={{
                flex: 1,
                background: "rgba(60,20,45,0.6)",
                border: "1px solid rgba(232,160,192,0.15)",
                borderRadius: 14,
                padding: "18px 20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <span style={{ fontSize: 14, color: "rgba(245,230,240,0.3)" }}>{m.extra}</span>
              </div>
              <p style={{ fontSize: 9, letterSpacing: 3, color: "rgba(245,230,240,0.45)", textTransform: "uppercase", marginBottom: 6 }}>
                {m.label}
              </p>
              <h3 style={{ fontSize: 16, fontWeight: 500, color: "#f5e6f0", marginBottom: 8, fontFamily: "'Georgia', serif" }}>
                {m.title}
              </h3>
              <p style={{ fontSize: 12, color: "rgba(245,230,240,0.55)", lineHeight: 1.7 }}>
                {m.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}