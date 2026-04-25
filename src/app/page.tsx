"use client";

import { useState, useEffect } from "react";
import FormScreen from "@/components/FormScreen";
import GeneratingScreen from "@/components/GeneratingScreen";
import ResultScreen from "@/components/ResultScreen";

type Step = "form" | "generating" | "result";

interface FormData {
  workArea: string;
  whatToAutomate: string;
  forWhom: string;
}

interface ApiResult {
  html: string;
  templateName: string;
}

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [resultHtml, setResultHtml] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const [apiResult, setApiResult] = useState<ApiResult | null>(null);

  // Fire fetch when step becomes "generating"
  useEffect(() => {
    if (step !== "generating" || !formData) return;

    setAnimationDone(false);
    setApiResult(null);
    setError(null);

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Generation failed");
        return data as ApiResult;
      })
      .then((data) => setApiResult(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setStep("form");
      });
  }, [step, formData]);

  // Transition to result only when both the animation and API are done
  useEffect(() => {
    if (animationDone && apiResult) {
      setResultHtml(apiResult.html);
      setTemplateName(apiResult.templateName);
      setStep("result");
    }
  }, [animationDone, apiResult]);

  function handleFormSubmit(data: FormData) {
    setFormData(data);
    setStep("generating");
  }

  function handleRestart() {
    setStep("form");
    setResultHtml("");
    setTemplateName("");
    setApiResult(null);
    setAnimationDone(false);
    setError(null);
  }

  if (step === "generating") {
    return (
      <main key="generating" className="min-h-screen flex items-center justify-center p-4 screen-enter">
        <GeneratingScreen onComplete={() => setAnimationDone(true)} />
      </main>
    );
  }

  if (step === "result") {
    return (
      <main key="result" className="min-h-screen flex flex-col items-center justify-center p-4 py-10 screen-enter">
        <ResultScreen
          html={resultHtml}
          templateName={templateName}
          onRestart={handleRestart}
        />
      </main>
    );
  }

  return (
    <main key="form" className="min-h-screen flex flex-col items-center justify-center p-4 screen-enter">
      <FormScreen onSubmit={handleFormSubmit} error={error} />
    </main>
  );
}
