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
import { set } from "date-fns";
import { start } from "repl";

const UserForm = ({ form }: { form: any }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentFieldIndex = useRef(0);
  const [formSchema, setFormSchema] = useState(form.schema); // Store schema in state to trigger re-renders
  const [isListening, setIsListening] = useState(false);

  const recognition =
    typeof window !== "undefined" && (window as any).webkitSpeechRecognition
      ? new (window as any).webkitSpeechRecognition()
      : null;

  const fieldNames = Object.keys(formSchema.properties);

  const startInput = () => {
    currentFieldIndex.current = 0;
    setIsListening(true);
    startListening();
  };

  const startListening = () => {
    if (recognition) {
      console.log("Recognition initialized");
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript.trim();
        console.log("Speech result:", speechResult);

        // Get the current field name based on the current field index
        const currentFieldName = fieldNames[currentFieldIndex.current];
        console.log("Current field being populated:", currentFieldName);

        if (formSchema.properties[currentFieldName].type === "string") {
          handleSpeechResult(speechResult, currentFieldName);
        }
      };

      recognition.onerror = (event: { error: any }) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        if (currentFieldIndex.current + 1 < fieldNames.length) {
          currentFieldIndex.current++;
          console.log("Moving to next field");
          startListening();
        } else {
          setIsListening(false);
          console.log("Speech recognition ended");
        }
      };

      recognition.start();
      console.log("Speech recognition started");
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  const handleSpeechResult = (speechResult: string, fieldName: string) => {
    console.log(
      "Populating field with speech result:",
      fieldName,
      speechResult
    );

    // Update the specific field's default value in the schema
    const updatedSchema = { ...formSchema };
    updatedSchema.properties[fieldName].default = speechResult;

    // Trigger re-render by setting schema in state
    setFormSchema(updatedSchema);
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
          onClick={() => {
            console.log("Voice input button clicked");
            startInput();
          }}
          className={`${isListening ? "bg-red-500 hover:bg-red-500" : ""}`}
        >
          {isListening ? "Listening..." : "Start Voice Input"}
        </Button>
        <Form
          onSubmit={handleFormSubmit}
          className="form space-y-3"
          uiSchema={form.uiSchema}
          schema={formSchema} // Use state schema here
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
