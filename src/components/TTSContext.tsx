// TTSContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Button } from "./ui/button";

// TTS Context Type
interface TTSContextType {
  TTS: boolean;
  toggleTTS: () => void;
  textToSpeech: (text: string) => void;
}

// Create Context
const TTSContext = createContext<TTSContextType | undefined>(undefined);

// Provider Component
export const TTSProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [TTS, setTTS] = useState(false);

  const toggleTTS = () => {
    setTTS((prevTTS) => !prevTTS);
  };

  const textToSpeech = (text: string) => {
    if (TTS && typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-Speech not supported in this browser.");
    }
  };

  return (
    <TTSContext.Provider value={{ TTS, toggleTTS, textToSpeech }}>
      {children}
    </TTSContext.Provider>
  );
};

// Custom Hook to use TTS Context
export const useTTS = () => {
  const context = useContext(TTSContext);
  if (!context) {
    throw new Error("useTTS must be used within a TTSProvider");
  }
  return context;
};

// TTS Toggle Button Component
export const TTSButton: React.FC = () => {
  const { TTS, toggleTTS } = useTTS();
  return <Button onClick={toggleTTS}>{TTS ? "TTS on" : "TTS off"}</Button>;
};
