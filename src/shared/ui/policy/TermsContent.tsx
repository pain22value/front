"use client";

import { Separator } from "@/components/ui/separator";
import { ELECTRONIC_FINANCIAL_TRANSACTION_TERMS, SERVICE_TERMS } from "@/shared/constants/terms";

export default function TermsContent({ type }: { type: "service" | "finance" }) {
  const data = type === "service" ? SERVICE_TERMS : ELECTRONIC_FINANCIAL_TRANSACTION_TERMS;

  return (
    <div className="space-y-12 pb-10">
      {data.map((section, i) => (
        <div key={i}>
          <h2 className="text-xl font-semibold mb-6">{section.title}</h2>
          <div className="space-y-8">
            {section.articles.map((article, j) => (
              <div key={j}>
                <h3 className="font-medium mb-1">{article.title}</h3>
                <Separator className="mb-2" />
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{article.content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
