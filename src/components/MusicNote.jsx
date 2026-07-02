export default function MusicNote({ playing, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: "fixed",
        bottom: 32,
        right: 24,
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "rgba(60,20,45,0.9)",
        border: "1px solid rgba(232,160,192,0.3)",
        color: "#e87aaa",
        fontSize: 20,
        cursor: "pointer",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        animation: playing ? "notePulse 1s ease infinite alternate" : "none",
        transition: "all 0.2s ease",
      }}
    >
      🎵
      <style>{`
        @keyframes notePulse {
          0% { box-shadow: 0 4px 20px rgba(232,122,170,0.3); transform: scale(1); }
          100% { box-shadow: 0 4px 30px rgba(232,122,170,0.7); transform: scale(1.08); }
        }
      `}</style>
    </button>
  );
}
