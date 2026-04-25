"use client";

interface Props {
  onSubmit: (data: {
    workArea: string;
    whatToAutomate: string;
    forWhom: string;
  }) => void;
  error?: string | null;
}

const EXAMPLES = [
  { label: "Task tracker", workArea: "Operations", whatToAutomate: "Track team tasks", forWhom: "My team" },
  { label: "Budget tracker", workArea: "Finance", whatToAutomate: "Track expenses and budget", forWhom: "Just me" },
  { label: "Pipeline board", workArea: "Sales", whatToAutomate: "Track deals and leads", forWhom: "Sales team" },
  { label: "KPI dashboard", workArea: "Marketing", whatToAutomate: "Track marketing KPIs", forWhom: "My manager" },
];

export default function FormScreen({ onSubmit, error }: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const workArea = (form.elements.namedItem("workArea") as HTMLInputElement).value.trim();
    const whatToAutomate = (form.elements.namedItem("whatToAutomate") as HTMLInputElement).value.trim();
    const forWhom = (form.elements.namedItem("forWhom") as HTMLInputElement).value.trim();
    if (workArea && whatToAutomate && forWhom) {
      onSubmit({ workArea, whatToAutomate, forWhom });
    }
  }

  function fillExample(ex: (typeof EXAMPLES)[0]) {
    const form = document.getElementById("onboarding-form") as HTMLFormElement;
    if (!form) return;
    (form.elements.namedItem("workArea") as HTMLInputElement).value = ex.workArea;
    (form.elements.namedItem("whatToAutomate") as HTMLInputElement).value = ex.whatToAutomate;
    (form.elements.namedItem("forWhom") as HTMLInputElement).value = ex.forWhom;
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

      {/* Error banner */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm screen-enter">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        id="onboarding-form"
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            What area do you work in?
          </label>
          <input
            type="text"
            name="workArea"
            required
            placeholder="e.g. Marketing, Sales, HR, Engineering"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            What do you want to automate or track?
          </label>
          <input
            type="text"
            name="whatToAutomate"
            required
            placeholder="e.g. track tasks, manage budget, collect feedback"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Who will use it?
          </label>
          <input
            type="text"
            name="forWhom"
            required
            placeholder="e.g. just me, my team of 5, my manager"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder:text-slate-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 text-sm transition-colors cursor-pointer"
        >
          Build my app →
        </button>
      </form>

      {/* Examples */}
      <div className="mt-5">
        <p className="text-xs text-slate-400 text-center mb-3">Not sure? Try one of these:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => fillExample(ex)}
              className="text-xs bg-white border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-pointer"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
