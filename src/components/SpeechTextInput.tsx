import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
    <div className="p-4">
      <Input
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />
      <Button
        onClick={isListening ? stopListening : startListening}
        className="mt-4"
      >
        {isListening ? "Stop" : "Start"}
      </Button>
    </div>
  );
};

export default SpeechToText;
