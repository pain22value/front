"use client";

import { Separator } from "@/components/ui/separator";

export default function PolicyContentRenderer({
  sections,
  showSeparator = false,
}: {
  sections: PolicySection[];
  showSeparator?: boolean;
}) {
  const renderItem = (content: PolicyContent, idx: string | number) => {
    const table = content.table;
    return (
      <div key={idx} className="mb-10">
        <h2 className="text-lg font-semibold mb-3">{content.title}</h2>
        {showSeparator && <Separator className="mb-4" />}
        {content.description && (
          <p className="text-sm text-muted-foreground whitespace-pre-line mb-4">{content.description}</p>
        )}
        {content.items && (
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground mb-4">
            {content.items.map((itemValue, i) => (
              <li key={i}>• {itemValue}</li>
            ))}
          </ul>
        )}
        {table && (
          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full text-sm border-collapse table-fixed">
              <thead className="bg-muted/50">
                <tr>
                  {table.headers.map((h: string, i: number) => (
                    <th
                      key={i}
                      style={{ width: `${100 / table.headers.length}%` }}
                      className="text-left px-3 py-2 border border-border font-medium text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row: string[], rIdx: number) => (
                  <tr key={rIdx}>
                    {row.map((cell: string, cIdx: number) => (
                      <td key={cIdx} className="px-3 py-2 align-top border border-border text-muted-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {content.note && <p className="text-xs text-muted-foreground/70 mt-3">{content.note}</p>}
      </div>
    );
  };

  return (
    <div className="text-foreground pb-10">
      {sections.map((section: PolicySection, idx: number) => (
        <div key={idx}>
          {renderItem(section, idx)}
          {section.subSections?.map((sub: PolicyContent, sIdx: number) => renderItem(sub, `${idx}-${sIdx}`))}
        </div>
      ))}
    </div>
  );
}
