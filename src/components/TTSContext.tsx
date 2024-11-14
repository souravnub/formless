"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Button } from "./ui/button";

interface TTSContextType {
  TTS: boolean;
  toggleTTS: () => void;
  textToSpeech: (text: string) => void;
  TTSClick: (e: React.MouseEvent<HTMLElement>) => void;
  TTSMouseOver: (e: React.MouseEvent<HTMLElement>) => void;
  TTSMouseOut: (e: React.MouseEvent<HTMLElement>) => void;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

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

  const TTSClick = (e: React.MouseEvent<HTMLElement>) => {
    const text = (e.target as HTMLElement).textContent || "";
    textToSpeech(text);
  };

  const TTSMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    if (TTS) {
      (e.target as HTMLElement).classList.add("bg-blue-100");
    }
  };

  const TTSMouseOut = (e: React.MouseEvent<HTMLElement>) => {
    if (TTS) {
      (e.target as HTMLElement).classList.remove("bg-blue-100");
    }
  };

  return (
    <TTSContext.Provider
      value={{
        TTS,
        toggleTTS,
        textToSpeech,
        TTSClick,
        TTSMouseOver,
        TTSMouseOut,
      }}
    >
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => {
  const context = useContext(TTSContext);
  if (!context) {
    throw new Error("useTTS must be used within a TTSProvider");
  }
  return context;
};

export const TTSButton: React.FC = () => {
  const { TTS, toggleTTS } = useTTS();
  return (
    <Button
      className={TTS ? "bg-red-500 hover:bg-red-500" : "bg-black"}
      onClick={toggleTTS}
    >
      {TTS ? "TTS on" : "TTS off"}
    </Button>
  );
};
