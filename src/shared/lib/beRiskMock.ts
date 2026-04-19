const STORAGE_KEY = "be-risk-mock-state";
const TARGET_EMAIL = "eogus4717@gmail.com";
const INITIAL_RISK_COUNT = 2;
const BLOCK_24H_MS = 24 * 60 * 60 * 1000;

type BeRiskMockState = {
  riskCount: number;
  blockedUntil: number | null;
};

const defaultState = (): BeRiskMockState => ({
  riskCount: INITIAL_RISK_COUNT,
  blockedUntil: null,
});

const normalizeEmail = (email?: string | null) => email?.trim().toLowerCase() ?? "";

const readState = (): BeRiskMockState => {
  if (typeof window === "undefined") return defaultState();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState();

  try {
    const parsed = JSON.parse(raw) as Partial<BeRiskMockState>;
    return {
      riskCount: Math.max(
        typeof parsed.riskCount === "number" ? parsed.riskCount : INITIAL_RISK_COUNT,
        INITIAL_RISK_COUNT,
      ),
      blockedUntil: typeof parsed.blockedUntil === "number" ? parsed.blockedUntil : null,
    };
  } catch {
    return defaultState();
  }
};

const writeState = (state: BeRiskMockState) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const isBeRiskMockTarget = (email?: string | null) =>
  normalizeEmail(email) === TARGET_EMAIL;

export const getBeRiskMockStatus = (email?: string | null) => {
  const state = readState();
  const applies = isBeRiskMockTarget(email);
  const blockedUntil = applies ? state.blockedUntil : null;
  const isBlocked = applies && blockedUntil != null && blockedUntil > Date.now();

  return {
    applies,
    riskCount: applies ? state.riskCount : 0,
    blockedUntil,
    isBlocked,
  };
};

export const consumeBeRiskMockAttempt = (email?: string | null): "none" | "warn" | "block24h" => {
  if (!isBeRiskMockTarget(email)) return "none";

  const state = readState();

  if (state.blockedUntil != null && state.blockedUntil > Date.now()) {
    return "block24h";
  }

  const nextRiskCount = Math.max(state.riskCount, INITIAL_RISK_COUNT) + 1;

  if (nextRiskCount >= 4) {
    writeState({
      riskCount: nextRiskCount,
      blockedUntil: Date.now() + BLOCK_24H_MS,
    });
    return "block24h";
  }

  writeState({
    riskCount: nextRiskCount,
    blockedUntil: null,
  });
  return "warn";
};

export const formatBeRiskMockRemaining = (blockedUntil?: number | null) => {
  if (!blockedUntil) return "24시간";

  const remainingMs = blockedUntil - Date.now();
  if (remainingMs <= 0) return "24시간";

  const totalMinutes = Math.ceil(remainingMs / (60 * 1000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) return `${minutes}분`;
  if (minutes === 0) return `${hours}시간`;
  return `${hours}시간 ${minutes}분`;
};
