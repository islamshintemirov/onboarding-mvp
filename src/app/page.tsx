"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PreviewWrapper from "@/components/PreviewWrapper";
import FormScreen from "@/components/FormScreen";
import GeneratingScreen from "@/components/GeneratingScreen";
import ResultScreen from "@/components/ResultScreen";

type Step = "form" | "generating" | "result";
type DeviceMode = "desktop" | "mobile";

interface FormData {
  workArea: string;
  whatToAutomate: string;
  forWhom: string;
}

interface ApiResult {
  html: string;
  templateName: string;
}

const DEVICE_TOGGLES: { id: DeviceMode; label: string; icon: string }[] = [
  { id: "mobile",  label: "Mobile",  icon: "📱" },
  { id: "desktop", label: "Desktop", icon: "🖥" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>("form");
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [resultHtml, setResultHtml] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const [apiResult, setApiResult] = useState<ApiResult | null>(null);

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

  const content = (
    <>
      {step === "generating" && (
        <div key="generating" className="min-h-full flex items-center justify-center p-8 screen-enter">
          <GeneratingScreen onComplete={() => setAnimationDone(true)} />
        </div>
      )}
      {step === "result" && (
        <div key="result" className="min-h-full flex flex-col p-6 screen-enter">
          <ResultScreen
            html={resultHtml}
            templateName={templateName}
            deviceMode={deviceMode}
            onRestart={handleRestart}
          />
        </div>
      )}
      {step === "form" && (
        <div key="form" className="min-h-full flex flex-col items-center justify-center p-8 screen-enter">
          <FormScreen onSubmit={handleFormSubmit} error={error} />
        </div>
      )}
    </>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeId="vibe-coding" />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
          <span className="text-sm font-medium text-slate-500">
            Vibe Coding Onboarding
          </span>

          {/* Device toggles */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-0.5">
            {DEVICE_TOGGLES.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setDeviceMode(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  deviceMode === id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </header>

        {/* Preview area */}
        <div className="flex-1 overflow-auto bg-slate-200">
          <PreviewWrapper mode={deviceMode}>
            {content}
          </PreviewWrapper>
        </div>
      </div>
    </div>
  );
}
