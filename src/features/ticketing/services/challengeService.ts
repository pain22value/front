"use client";

import axios from "axios";

const challengeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_BASE_URL || "http://localhost:8090",
  withCredentials: false,
});

export type ChallengeStartResponse = {
  flow_session_id: string;
  puzzle_type: string;
  puzzle_config: Record<string, unknown>;
  flow_complete: boolean;
};

export type ChallengeJudgeResponse = {
  passed: boolean;
  flow_complete: boolean;
  blocked: boolean;
  module?: string | null;
  is_human?: boolean | null;
  next_puzzle_type?: string | null;
  next_puzzle_config?: Record<string, unknown> | null;
};

export type ChallengeRiskLevel = "LOW" | "MEDIUM" | "HIGH";

const startChallenge = async (payload: {
  performance_id: string;
  user_key: string;
  risk_level: ChallengeRiskLevel;
}) => {
  const { data } = await challengeApi.post<ChallengeStartResponse>("/challenge/start", payload);
  return data;
};

const judgeChallenge = async (payload: {
  flow_session_id: string;
  answer: Record<string, unknown>;
  events?: Array<Record<string, unknown>>;
}) => {
  const { data } = await challengeApi.post<ChallengeJudgeResponse>("/challenge/judge", payload);
  return data;
};

export const challengeService = {
  startChallenge,
  judgeChallenge,
};
