"use client";

import { useState } from "react";
import { Button, Card, Chip, Input, Label, TextField } from "@heroui/react";

interface Props {
  onSubmit: (data: { workArea: string; whatToAutomate: string; forWhom: string }) => void;
  error?: string | null;
}

const EXAMPLES = [
  { label: "Task tracker",   workArea: "Operations", whatToAutomate: "Track team tasks",          forWhom: "My team"    },
  { label: "Budget tracker", workArea: "Finance",    whatToAutomate: "Track expenses and budget",  forWhom: "Just me"    },
  { label: "Pipeline board", workArea: "Sales",      whatToAutomate: "Track deals and leads",      forWhom: "Sales team" },
  { label: "KPI dashboard",  workArea: "Marketing",  whatToAutomate: "Track marketing KPIs",       forWhom: "My manager" },
];

export default function FormScreen({ onSubmit, error }: Props) {
  const [workArea, setWorkArea]           = useState("");
  const [whatToAutomate, setWhatToAutomate] = useState("");
  const [forWhom, setForWhom]             = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (workArea.trim() && whatToAutomate.trim() && forWhom.trim()) {
      onSubmit({ workArea: workArea.trim(), whatToAutomate: whatToAutomate.trim(), forWhom: forWhom.trim() });
    }
  }

  function fillExample(ex: (typeof EXAMPLES)[0]) {
    setWorkArea(ex.workArea);
    setWhatToAutomate(ex.whatToAutomate);
    setForWhom(ex.forWhom);
  }

  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 mb-4 text-2xl">
          ⚡
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Build your first tool
        </h1>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
          Tell us what you want to automate. We&apos;ll build a working app in seconds.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <Card variant="default" className="p-6">
        <Card.Content className="p-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField
              value={workArea}
              onChange={setWorkArea}
              variant="primary"
              fullWidth
              isRequired
            >
              <Label className="text-sm font-semibold text-slate-700 mb-1 block">
                What area do you work in?
              </Label>
              <Input placeholder="e.g. Marketing, Sales, HR, Engineering" />
            </TextField>

            <TextField
              value={whatToAutomate}
              onChange={setWhatToAutomate}
              variant="primary"
              fullWidth
              isRequired
            >
              <Label className="text-sm font-semibold text-slate-700 mb-1 block">
                What do you want to automate or track?
              </Label>
              <Input placeholder="e.g. track tasks, manage budget, collect feedback" />
            </TextField>

            <TextField
              value={forWhom}
              onChange={setForWhom}
              variant="primary"
              fullWidth
              isRequired
            >
              <Label className="text-sm font-semibold text-slate-700 mb-1 block">
                Who will use it?
              </Label>
              <Input placeholder="e.g. just me, my team of 5, my manager" />
            </TextField>

            <Button type="submit" variant="primary" fullWidth size="lg">
              Build my app →
            </Button>
          </form>
        </Card.Content>
      </Card>

      {/* Examples */}
      <div className="mt-5 text-center">
        <p className="text-xs text-slate-400 mb-3">Not sure? Try one of these:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLES.map((ex) => (
            <Chip
              key={ex.label}
              variant="secondary"
              size="sm"
              className="cursor-pointer"
              onClick={() => fillExample(ex)}
            >
              {ex.label}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
