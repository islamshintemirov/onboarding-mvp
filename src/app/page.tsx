"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PreviewWrapper from "@/components/PreviewWrapper";
import AllScreensCanvas from "@/components/AllScreensCanvas";
import FormScreen from "@/components/FormScreen";
import GeneratingScreen from "@/components/GeneratingScreen";
import ResultScreen from "@/components/ResultScreen";

type Step = "form" | "generating" | "result";
type DeviceMode = "desktop" | "mobile";
type ViewMode = "preview" | "all-screens";

interface FormData {
  workArea: string;
  whatToAutomate: string;
  forWhom: string;
}

interface ApiResult {
  html: string;
  templateName: string;
}

const VIEW_TOGGLES: { id: ViewMode; label: string; icon: string }[] = [
  { id: "preview",     label: "Preview",     icon: "▶" },
  { id: "all-screens", label: "All Screens",  icon: "⊞" },
];

const DEVICE_TOGGLES: { id: DeviceMode; label: string; icon: string }[] = [
  { id: "mobile",  label: "Mobile",  icon: "📱" },
  { id: "desktop", label: "Desktop", icon: "🖥" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>("form");
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
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

  const previewContent = (
    <>
      {step === "generating" && (
        <div key="generating" className="min-h-full flex items-center justify-center p-8 screen-enter">
          <GeneratingScreen onComplete={() => setAnimationDone(true)} />
        </div>
      )}
      {step === "result" && (
        <div key="result" className="min-h-full flex flex-col screen-enter">
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
        <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 gap-4">
          <span className="text-sm font-medium text-slate-500 flex-shrink-0">
            Vibe Coding Onboarding
          </span>

          <div className="flex items-center gap-3">
            {/* View mode toggle */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-0.5">
              {VIEW_TOGGLES.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    viewMode === id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <span>{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-slate-200" />

            {/* Device mode toggle */}
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
          </div>
        </header>

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {viewMode === "all-screens" ? (
            <AllScreensCanvas
              deviceMode={deviceMode}
              resultHtml={resultHtml}
              templateName={templateName}
            />
          ) : (
            <div className="flex-1 overflow-auto bg-slate-200">
              <PreviewWrapper mode={deviceMode}>
                {previewContent}
              </PreviewWrapper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
