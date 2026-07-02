import { useRef, useState, useEffect } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function LetterSection() {
  const ref = useRef(null);
  const visible = useScrollReveal(ref);
  const [typedText, setTypedText] = useState({
    greeting: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    paragraph4: "",
    ps: "",
  });
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Teks lengkap
  const fullText = {
    greeting: "My dearest Dimas,",
    paragraph1: "Di hari yang paling istimewa ini, aku ingin kamu tahu bahwa setiap hari bersamamu adalah anugerah yang tidak ternilai harganya. Kamu membawa cahaya ke setiap sudut hidupku — bahkan di hari-hari yang paling berat sekalipun.",
    paragraph2: "Tawamu adalah melodi terindah yang pernah aku dengar. Cara kamu memandang dunia — dengan rasa kagum dan kebaikan hati — selalu menginspirasi aku untuk menjadi versi terbaik dari diriku. 🌷",
    paragraph3: "Terima kasih sudah menjadi dirimu yang apa adanya — dengan segala keunikanmu, kelembutan hatimu, dan semangatmu yang tidak pernah padam. Kamu adalah hadiah terbesar yang pernah Tuhan titipkan dalam hidupku.",
    paragraph4: "Di ulang tahunmu ini, aku berharap semua impianmu terwujud, semua doamu dikabulkan, dan semua kebahagiaanmu berlipat-lipat. Kamu layak mendapatkan semua keindahan yang dunia ini bisa tawarkan.",
    ps: "P.S. — I will always be here for you, today, tomorrow, and forever 🌸",
  };

  // Efek typing
  useEffect(() => {
    if (!visible) return;

    const sections = [
      { key: 'greeting', text: fullText.greeting, delay: 500 },
      { key: 'paragraph1', text: fullText.paragraph1, delay: 1200 },
      { key: 'paragraph2', text: fullText.paragraph2, delay: 2200 },
      { key: 'paragraph3', text: fullText.paragraph3, delay: 3400 },
      { key: 'paragraph4', text: fullText.paragraph4, delay: 4600 },
      { key: 'ps', text: fullText.ps, delay: 5800 },
    ];

    let timeouts = [];
    let charTimeouts = [];

    sections.forEach((section) => {
      const timeout = setTimeout(() => {
        let currentText = '';
        const chars = section.text.split('');
        
        chars.forEach((char, index) => {
          const charTimeout = setTimeout(() => {
            currentText += char;
            setTypedText(prev => ({
              ...prev,
              [section.key]: currentText,
            }));
            
            // Cek apakah semua selesai
            if (section.key === 'ps' && index === chars.length - 1) {
              setIsTypingComplete(true);
            }
          }, 30 * index); // kecepatan typing 30ms per karakter
          
          charTimeouts.push(charTimeout);
        });
      }, section.delay);
      
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      charTimeouts.forEach(t => clearTimeout(t));
    };
  }, [visible]);

  return (
    <section
      ref={ref}
      style={{
        padding: "60px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
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
          From My Heart
        </p>
        <h2 style={{ fontSize: "clamp(28px, 6vw, 44px)", fontWeight: 400, color: "#f5e6f0", fontFamily: "'Georgia', serif" }}>
          A Letter For You
        </h2>
      </div>

      {/* Letter card */}
      <div
        style={{
          background: "#fdf0f5",
          borderRadius: 16,
          padding: "40px 32px",
          maxWidth: "min(380px, 92vw)",
          width: "100%",
          position: "relative",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) rotate(-1deg)" : "translateY(60px)",
          transition: "all 1s ease 0.2s",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Flower decorations */}
        <div style={{ position: "absolute", top: -10, right: -10, fontSize: 24 }}>🌻</div>
        <div style={{ position: "absolute", top: 20, left: 20, fontSize: 14, color: "#e8a0c0" }}>✿ + ✿</div>

        {/* Date */}
        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#c06080",
            letterSpacing: 2,
            marginBottom: 24,
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          02 juli
        </p>

        <div 
          style={{ 
            width: 20, 
            height: 20, 
            background: "#f4c430", 
            borderRadius: "50%", 
            margin: "0 auto 24px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }} 
        />

        {/* Typing text - Greeting */}
        <h3
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#3d1a2e",
            marginBottom: 20,
            fontFamily: "'Georgia', serif",
            minHeight: 40,
          }}
        >
          {typedText.greeting}
          {!typedText.greeting && visible && <span style={{ opacity: 0.5 }}>▌</span>}
        </h3>

        {/* Typing text - Paragraph 1 */}
        <p style={{ 
          fontSize: 13, 
          color: "#555", 
          lineHeight: 1.9, 
          marginBottom: 16,
          minHeight: 80,
        }}>
          {typedText.paragraph1}
          {typedText.paragraph1 && typedText.paragraph1.length < fullText.paragraph1.length && (
            <span style={{ opacity: 0.5 }}>▌</span>
          )}
        </p>

        {/* Typing text - Paragraph 2 */}
        <p style={{ 
          fontSize: 13, 
          color: "#555", 
          lineHeight: 1.9, 
          marginBottom: 20,
          minHeight: 80,
        }}>
          {typedText.paragraph2}
          {typedText.paragraph2 && typedText.paragraph2.length < fullText.paragraph2.length && (
            <span style={{ opacity: 0.5 }}>▌</span>
          )}
        </p>

        {/* Typing text - Paragraph 3 */}
        <p style={{ 
          fontSize: 13, 
          color: "#c06080", 
          lineHeight: 1.9, 
          fontStyle: "italic", 
          marginBottom: 20,
          minHeight: 80,
        }}>
          {typedText.paragraph3}
          {typedText.paragraph3 && typedText.paragraph3.length < fullText.paragraph3.length && (
            <span style={{ opacity: 0.5 }}>▌</span>
          )}
        </p>

        {/* Typing text - Paragraph 4 */}
        <p style={{ 
          fontSize: 13, 
          color: "#555", 
          lineHeight: 1.9, 
          marginBottom: 24,
          minHeight: 80,
        }}>
          {typedText.paragraph4}
          {typedText.paragraph4 && typedText.paragraph4.length < fullText.paragraph4.length && (
            <span style={{ opacity: 0.5 }}>▌</span>
          )}
        </p>

        {/* Typing text - PS section */}
        <div
          style={{
            background: "#fde8f0",
            borderRadius: 10,
            padding: "14px 18px",
            marginBottom: 24,
            minHeight: 60,
          }}
        >
          <p style={{ fontSize: 12, color: "#c06080", fontStyle: "italic", lineHeight: 1.8 }}>
            {typedText.ps}
            {typedText.ps && typedText.ps.length < fullText.ps.length && (
              <span style={{ opacity: 0.5 }}>▌</span>
            )}
          </p>
        </div>

        {/* Decorative flowers in letter */}
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-around", 
            marginBottom: 16,
            opacity: isTypingComplete ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {["🌺", "🌸", "🌼", "🌹"].map((f, i) => (
            <span key={i} style={{ fontSize: 14 }}>{f}</span>
          ))}
        </div>

        <div 
          style={{ 
            textAlign: "right",
            opacity: isTypingComplete ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <p style={{ fontSize: 13, color: "#aaa", fontStyle: "italic", marginBottom: 4 }}>With all my love,</p>
          <p style={{ fontSize: 18, color: "#3d1a2e", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>Yohana</p>
          <p style={{ fontSize: 20, marginTop: 4 }}>💕</p>
        </div>

        {/* Bottom decoration */}
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: 12, 
            marginTop: 16, 
            opacity: isTypingComplete ? 0.4 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {["✿", "❀", "✿", "❀", "✿"].map((d, i) => (
            <span key={i} style={{ fontSize: 12, color: "#e8a0c0" }}>{d}</span>
          ))}
        </div>
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: 10, 
            marginTop: 8, 
            opacity: isTypingComplete ? 0.3 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {["🌸", "✿", "🌻"].map((d, i) => (
            <span key={i} style={{ fontSize: 12 }}>{d}</span>
          ))}
        </div>
      </div>
    </section>
  );
}