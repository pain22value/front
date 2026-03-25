"use client";

import { PRIVACY_POLICY } from "@/shared/data/privacy-policy";

export default function PrivacyPolicyContent() {
  const renderContent = (content: PolicyContent, idx: string | number) => {
    const table = content.table;
    return (
      <div key={idx} className="mb-10">
        <h2 className="text-lg font-semibold mb-3">{content.title}</h2>
        {content.description && <p className="text-sm text-gray-600 whitespace-pre-line mb-4">{content.description}</p>}
        {table && (
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="w-full text-sm border-collapse table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  {table.headers.map((h: string, i: number) => (
                    <th
                      style={{ width: `${100 / table.headers.length}%` }}
                      key={i}
                      className="text-left px-3 py-2 border border-gray-200 font-medium text-gray-600"
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
                      <td key={cIdx} className="px-3 py-2 align-top border border-gray-200 text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {content.note && <p className="text-xs text-gray-500 mt-3">{content.note}</p>}
      </div>
    );
  };

  return (
    <div className="text-gray-800 pb-10">
      {PRIVACY_POLICY.map((section, idx) => (
        <div key={idx}>
          {renderContent(section, idx)}
          {section.subSections?.map((sub, sIdx) => renderContent(sub, `${idx}-${sIdx}`))}
        </div>
      ))}
    </div>
  );
}
