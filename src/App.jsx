import { useState, useEffect, useRef } from "react";
import LoadingScreen from "./components/LoadingScreen";
import PinScreen from "./components/PinScreen";
import GiftBox from "./components/GiftBox";
import HeroSection from "./components/HeroSection";
import BouquetSection from "./components/BouquetSection";
import LetterSection from "./components/LetterSection";
import PhotoMemories from "./components/PhotoMemories";
import Timeline from "./components/Timeline";
import Playlist from "./components/Playlist";
import GratitudeJar from "./components/GratitudeJar";
import FinalSection from "./components/FinalSection";
import FloatingFlowers from "./components/FloatingFlowers";
import MusicNote from "./components/MusicNote";

export default function App() {
  const [phase, setPhase] = useState("loading"); // loading | pin | gift | main
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === "loading") setPhase("pin");
    }, 3000);
    return () => clearTimeout(timer);
  }, [phase]);

  const handlePinSuccess = () => {
    setPhase("gift");
  };

  const handleGiftOpen = () => {
    setPhase("main");
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#3d1a2e",
        fontFamily: "'Georgia', serif",
        color: "#f5e6f0",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <FloatingFlowers />

      {phase === "loading" && <LoadingScreen />}
      {phase === "pin" && <PinScreen onSuccess={handlePinSuccess} />}
      {phase === "gift" && <GiftBox onOpen={handleGiftOpen} />}
      {phase === "main" && (
        <>
          <HeroSection />
          <BouquetSection />
          <LetterSection />
          <PhotoMemories />
          <Timeline />
          <Playlist />
          <GratitudeJar />
          <FinalSection />
          <MusicNote playing={musicPlaying} onToggle={toggleMusic} />
        </>
      )}
    </div>
  );
}
