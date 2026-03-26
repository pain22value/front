"use client";

import { SHOW_NOTICE } from "@/shared/data/show-notice";
import PolicyContentRenderer from "@/shared/ui/PolicyContentRenderer";

export default function ShowNoticeContent() {
  return <PolicyContentRenderer sections={SHOW_NOTICE} showSeparator={true} />;
}

