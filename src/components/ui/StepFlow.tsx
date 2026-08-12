export interface Step {
  title: string;
  description: string;
}

export function StepFlow({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[--color-saffron] font-[family-name:--font-display] text-lg font-semibold text-white">
            {i + 1}
          </div>
          <h3 className="mt-4 font-[family-name:--font-display] text-lg font-semibold">
            {step.title}
          </h3>
          <p className="mt-2 text-sm text-[--color-ink]/75">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
