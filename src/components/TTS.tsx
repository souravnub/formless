"use client";
import { useTTS } from "./TTSContext";

export default function TTS({ children }: { children: React.ReactNode }) {
  const { TTSClick, TTSMouseOver, TTSMouseOut } = useTTS();
  return (
    <div onClick={TTSClick} onMouseOver={TTSMouseOver} onMouseOut={TTSMouseOut}>
      {children}
    </div>
  );
}
