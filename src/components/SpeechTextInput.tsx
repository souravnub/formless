//REFERENCES
//CHATGPT prompt: How to do speech to text in NEXTJS typescript application
//CHATGPT prompt: How to use chrome webkitSpeechRecognition API in NEXTJS TYPESCRIPT LINES 15-42 startListening function

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SpeechToTextIconComponent } from "./speech-to-text-icon";

const SpeechToText: React.FC = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognition =
    typeof window !== "undefined" && (window as any).webkitSpeechRecognition
      ? new (window as any).webkitSpeechRecognition()
      : null;

  const startListening = () => {
    if (recognition) {
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.start();

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error detected: " + event.error);
        setIsListening(false);
      };
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="p-4 px-6 flex flex-row justify-center items-center ">
      <Input
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />
      <span className="relative right-10">
        <SpeechToTextIconComponent
          onClick={isListening ? stopListening : startListening}
          isRecording={isListening}
          size="md"
        />
      </span>
      <Button onClick={() => setTranscript("")}>Clear</Button>
    </div>
  );
};

export default SpeechToText;
