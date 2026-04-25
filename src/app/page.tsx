"use client";

import { useState, useEffect } from "react";
import { Button, Separator } from "@heroui/react";
import Sidebar from "@/components/Sidebar";
import PreviewWrapper from "@/components/PreviewWrapper";
import AllScreensCanvas from "@/components/AllScreensCanvas";
import FormScreen from "@/components/FormScreen";
import GeneratingScreen from "@/components/GeneratingScreen";
import ResultScreen from "@/components/ResultScreen";
import LoginScreen from "@/components/LoginScreen";

type Step       = "form" | "generating" | "result";
type DeviceMode = "desktop" | "mobile";
type ViewMode   = "preview" | "all-screens";

interface User {
  id: string | null;
  email: string;
  fullName: string | null;
}

interface FormData {
  workArea: string;
  whatToAutomate: string;
  templateId: string;
  primaryColor: string;
  workspaceName: string;
}

interface ApiResult {
  html: string;
  templateName: string;
}

const SESSION_KEY = "jbe_session";

const VIEW_TOGGLES: { id: ViewMode; label: string }[] = [
  { id: "preview",     label: "▶  Preview"     },
  { id: "all-screens", label: "⊞  All Screens" },
];

const DEVICE_TOGGLES: { id: DeviceMode; label: string }[] = [
  { id: "mobile",  label: "📱  Mobile"  },
  { id: "desktop", label: "🖥  Desktop" },
];

export default function OnboardingPage() {
  const [user,          setUser]          = useState<User | null>(null);
  const [accessToken,   setAccessToken]   = useState<string | null>(null);
  const [authChecked,   setAuthChecked]   = useState(false);

  const [step,          setStep]          = useState<Step>("form");
  const [viewMode,      setViewMode]      = useState<ViewMode>("preview");
  const [deviceMode,    setDeviceMode]    = useState<DeviceMode>("desktop");
  const [formData,      setFormData]      = useState<FormData | null>(null);
  const [resultHtml,    setResultHtml]    = useState("");
  const [templateName,  setTemplateName]  = useState("");
  const [error,         setError]         = useState<string | null>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const [apiResult,     setApiResult]     = useState<ApiResult | null>(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw) as { user: User; access: string };
        setUser(session.user);
        setAccessToken(session.access);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  function handleLogin(u: User, access: string, refresh: string) {
    setUser(u);
    setAccessToken(access);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ user: u, access, refresh }));
  }

  function handleLogout() {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem(SESSION_KEY);
  }

  // Generate API call
  useEffect(() => {
    if (step !== "generating" || !formData) return;
    setAnimationDone(false);
    setApiResult(null);
    setError(null);

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, userId: user?.id }),
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
  }, [step, formData, user]);

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

  // Wait for localStorage check before rendering
  if (!authChecked) return null;

  // Auth gate
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
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
      <Sidebar activeId="vibe-coding" user={user} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 gap-4">
          <span className="text-sm font-medium text-slate-500 flex-shrink-0">
            Vibe Coding Onboarding
          </span>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {VIEW_TOGGLES.map(({ id, label }) => (
                <Button key={id} variant={viewMode === id ? "secondary" : "ghost"} size="sm" onPress={() => setViewMode(id)}>
                  {label}
                </Button>
              ))}
            </div>

            <Separator orientation="vertical" className="h-5" />

            <div className="flex items-center gap-1">
              {DEVICE_TOGGLES.map(({ id, label }) => (
                <Button key={id} variant={deviceMode === id ? "secondary" : "ghost"} size="sm" onPress={() => setDeviceMode(id)}>
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </header>

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {viewMode === "all-screens" ? (
            <AllScreensCanvas deviceMode={deviceMode} resultHtml={resultHtml} templateName={templateName} />
          ) : (
            <div className="flex-1 overflow-auto bg-slate-200">
              <PreviewWrapper mode={deviceMode}>{previewContent}</PreviewWrapper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
