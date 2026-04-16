import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export default function MembershipStepper({ currentStep = 1 }) {
  const steps = [
    { id: 1, label: "플랜 선택" },
    { id: 2, label: "결제" },
    { id: 3, label: "완료" },
  ];

  return (
    <div className="flex items-center justify-center space-x-4 my-10 text-sm font-semibold">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div
            className={cn(
              "flex items-center",
              currentStep === step.id ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-zinc-500",
            )}
          >
            <span
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-2 transition-colors",
                currentStep === step.id
                  ? "bg-slate-800 text-white font-bold dark:bg-white dark:text-black"
                  : currentStep > step.id
                    ? "bg-slate-900 text-white dark:bg-zinc-700"
                    : "bg-slate-200 text-white dark:bg-zinc-800",
              )}
            >
              {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
            </span>
            {step.label}
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-16 h-px transition-colors",
                currentStep > step.id ? "bg-slate-800 dark:bg-zinc-700" : "bg-slate-300 dark:bg-zinc-800",
              )}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
