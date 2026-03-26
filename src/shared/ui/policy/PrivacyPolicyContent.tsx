"use client";

import { PRIVACY_POLICY } from "@/shared/data/privacy-policy";
import PolicyContentRenderer from "../PolicyContentRenderer";

export default function PrivacyPolicyContent() {
  return <PolicyContentRenderer sections={PRIVACY_POLICY} />;
}

