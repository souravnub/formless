//References
// useref https://react.dev/reference/react/useRef
// CHATGPT prompt: How to use useRef in React
// CHATGPT prompt: I have a form with text inputs and radio buttons, i want to fill it using speech to text

"use client";
import Form, { IChangeEvent } from "@rjsf/core";
import React, { useRef, useState } from "react";
import validator from "@rjsf/validator-ajv8";
import "../createForm/form.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { submitForm } from "@/actions/forms";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const UserForm = ({ form }: { form: any }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentFieldIndex = useRef(0);
  const [formData, setFormData] = useState({}); // State to hold form values
  const [isListening, setIsListening] = useState(false);

  const recognition =
    typeof window !== "undefined" && (window as any).webkitSpeechRecognition
      ? new (window as any).webkitSpeechRecognition()
      : null;

  const fields = form.schema.properties;
  const fieldNames = Object.keys(fields);

  const startVoiceInput = () => {
    currentFieldIndex.current = 0;
    setIsListening(true);
    startListening();
  };

  const startListening = () => {
    if (recognition) {
      console.log(
        "started listening for" + fieldNames[currentFieldIndex.current]
      );
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript.trim();
        const currentFieldName = fieldNames[currentFieldIndex.current];
        const currentField = fields[currentFieldName];
        console.log(currentFieldName, speechResult);

        if (currentField.type === "string") {
          handleSpeechResult(speechResult, currentFieldName);
        } else if (currentField.enum) {
          handleRadioSpeechResult(
            speechResult,
            currentFieldName,
            currentField.enum
          );
        }
      };

      recognition.onerror = (event: { error: any }) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        if (currentFieldIndex.current + 1 < fieldNames.length) {
          currentFieldIndex.current++;
          startListening();
        } else {
          setIsListening(false);
          console.log("Speech recognition ended");
        }
      };

      recognition.start();
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  const handleSpeechResult = (speechResult: string, fieldName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: speechResult,
    }));
  };

  const handleRadioSpeechResult = (
    speechResult: string,
    fieldName: string,
    options: string[]
  ) => {
    const matchedOption = options.find(
      (option) => option.toLowerCase() === speechResult.toLowerCase()
    );

    if (matchedOption) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: matchedOption,
      }));
      console.log(`Matched option for ${fieldName}:`, matchedOption);
    } else {
      console.log(
        `No match found for speech result: "${speechResult}" in options`,
        options
      );
    }
  };

  async function handleFormSubmit(formState: IChangeEvent) {
    setIsSubmitting(true);
    const res = await submitForm(form.id, formState.formData);

    setIsSubmitting(false);

    toast({
      description: res.message,
      variant: res.success ? "default" : "destructive",
    });

    if (res.success) {
      form.role === "USER" ? router.push("/user") : router.push("/supervisor");
    }
  }

  return (
    <Card className="max-w-xl mx-auto mt-5">
      <CardHeader>
        <CardTitle>{form.title}</CardTitle>
        <CardDescription>{form.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={startVoiceInput}
          className={isListening ? "bg-red-500 hover:bg-red-500" : ""}
        >
          {isListening ? "Listening" : "Voice Input"}
        </Button>
        <Form
          onSubmit={handleFormSubmit}
          className="form space-y-3"
          uiSchema={form.uiSchema}
          schema={form.schema}
          formData={formData} // Pass formData here
          validator={validator}
        >
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
