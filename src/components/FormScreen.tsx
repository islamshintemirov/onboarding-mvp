"use client";

import { useState } from "react";
import { Button, Card, Chip, Input, Label, TextField } from "@heroui/react";

interface SubmitData {
  workArea: string;
  whatToAutomate: string;
  templateId: string;
  primaryColor: string;
  workspaceName: string;
}

interface Props {
  onSubmit: (data: SubmitData) => void;
  error?: string | null;
}

const WORK_AREAS = [
  "Operations", "Finance", "Sales", "Marketing",
  "HR / People", "Engineering", "Product", "Other",
];

const GOALS = [
  "Track tasks & to-dos",
  "Manage budget & expenses",
  "Track leads & deals",
  "Monitor KPIs & metrics",
  "Manage projects",
  "Other",
];

const TEMPLATES = [
  {
    id: "task-tracker",
    name: "Task Tracker",
    icon: "✅",
    desc: "Checkboxes, filters, status tags",
  },
  {
    id: "budget-calculator",
    name: "Budget Tracker",
    icon: "💰",
    desc: "Income, expenses, net balance",
  },
  {
    id: "simple-crm",
    name: "Pipeline Board",
    icon: "🎯",
    desc: "Kanban stages, move cards forward",
  },
  {
    id: "kpi-dashboard",
    name: "KPI Dashboard",
    icon: "📊",
    desc: "Track metrics against targets",
  },
];

const COLORS = [
  { hex: "#3b82f6", label: "Blue"   },
  { hex: "#8b5cf6", label: "Violet" },
  { hex: "#22c55e", label: "Green"  },
  { hex: "#f97316", label: "Orange" },
  { hex: "#f43f5e", label: "Rose"   },
  { hex: "#14b8a6", label: "Teal"   },
];

export default function FormScreen({ onSubmit, error }: Props) {
  const [step,           setStep]           = useState(1);
  const [workArea,       setWorkArea]       = useState("");
  const [goal,           setGoal]           = useState("");
  const [templateId,     setTemplateId]     = useState("");
  const [primaryColor,   setPrimaryColor]   = useState(COLORS[0].hex);
  const [workspaceName,  setWorkspaceName]  = useState("");

  function handleBuild() {
    onSubmit({
      workArea,
      whatToAutomate: goal,
      templateId,
      primaryColor,
      workspaceName: workspaceName.trim(),
    });
  }

  // ── Step indicator ──────────────────────────────────────────────────
  const StepDots = () => (
    <div className="flex items-center justify-center gap-1.5 mb-6">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className="rounded-full transition-all"
          style={{
            width: s === step ? 20 : 6,
            height: 6,
            background: s === step ? "#3b82f6" : s < step ? "#93c5fd" : "#e2e8f0",
          }}
        />
      ))}
    </div>
  );

  // ── Step 1: Context ──────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 mb-4 text-2xl">⚡</div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Build your first tool</h1>
          <p className="text-slate-500 mt-1.5 text-sm">Tell us about yourself — we'll personalise your app.</p>
        </div>

        <StepDots />

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>
        )}

        <Card variant="default" className="p-6">
          <Card.Content className="p-0 flex flex-col gap-6">
            {/* Work area */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">What area do you work in?</p>
              <div className="flex flex-wrap gap-2">
                {WORK_AREAS.map((area) => (
                  <Chip
                    key={area}
                    variant={workArea === area ? "primary" : "secondary"}
                    color={workArea === area ? "accent" : "default"}
                    size="md"
                    className="cursor-pointer"
                    onClick={() => setWorkArea(area)}
                  >
                    {area}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">What do you want to automate or track?</p>
              <div className="flex flex-wrap gap-2">
                {GOALS.map((g) => (
                  <Chip
                    key={g}
                    variant={goal === g ? "primary" : "secondary"}
                    color={goal === g ? "accent" : "default"}
                    size="md"
                    className="cursor-pointer"
                    onClick={() => setGoal(g)}
                  >
                    {g}
                  </Chip>
                ))}
              </div>
            </div>
          </Card.Content>
        </Card>

        <div className="mt-4">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            isDisabled={!workArea || !goal}
            onPress={() => setStep(2)}
          >
            Continue →
          </Button>
        </div>
      </div>
    );
  }

  // ── Step 2: Pick template ────────────────────────────────────────────
  if (step === 2) {
    return (
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pick your app</h1>
          <p className="text-slate-500 mt-1.5 text-sm">Choose the tool that fits your goal.</p>
        </div>

        <StepDots />

        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map((t) => {
            const isActive = templateId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplateId(t.id)}
                className={`text-left rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                  isActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="text-2xl mb-2">{t.icon}</div>
                <p className={`text-sm font-semibold ${isActive ? "text-blue-700" : "text-slate-800"}`}>
                  {t.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">{t.desc}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="lg" onPress={() => setStep(1)} className="flex-shrink-0">
            ←
          </Button>
          <Button
            variant="primary"
            fullWidth
            size="lg"
            isDisabled={!templateId}
            onPress={() => setStep(3)}
          >
            Continue →
          </Button>
        </div>
      </div>
    );
  }

  // ── Step 3: Personalise ──────────────────────────────────────────────
  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Make it yours</h1>
        <p className="text-slate-500 mt-1.5 text-sm">Quick personalizations — takes 10 seconds.</p>
      </div>

      <StepDots />

      <Card variant="default" className="p-6">
        <Card.Content className="p-0 flex flex-col gap-6">
          {/* Color */}
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Pick an accent color</p>
            <div className="flex gap-2">
              {COLORS.map(({ hex, label }) => (
                <button
                  key={hex}
                  type="button"
                  title={label}
                  onClick={() => setPrimaryColor(hex)}
                  className="cursor-pointer transition-transform hover:scale-110"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: hex,
                    border: primaryColor === hex ? `3px solid ${hex}` : "3px solid transparent",
                    outline: primaryColor === hex ? `2px solid white` : "none",
                    outlineOffset: -5,
                    boxShadow: primaryColor === hex ? `0 0 0 2px ${hex}` : "none",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Workspace name */}
          <TextField
            value={workspaceName}
            onChange={setWorkspaceName}
            variant="primary"
            fullWidth
          >
            <Label className="text-sm font-semibold text-slate-700 mb-1 block">
              What should we call your app? <span className="font-normal text-slate-400">(optional)</span>
            </Label>
            <Input placeholder="e.g. My Team Tracker, Sales HQ, Budget 2025" />
          </TextField>
        </Card.Content>
      </Card>

      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="lg" onPress={() => setStep(2)} className="flex-shrink-0">
          ←
        </Button>
        <Button variant="primary" fullWidth size="lg" onPress={handleBuild}>
          🚀 Build my app
        </Button>
      </div>
    </div>
  );
}
