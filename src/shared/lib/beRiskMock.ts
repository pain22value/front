const STORAGE_KEY = "be-risk-mock-state";
const POST_PAYMENT_WARNING_KEY = "be-risk-mock-post-payment-warning";
const TARGET_EMAIL = "eogus4717@gmail.com";
const INITIAL_RISK_COUNT = 4;
const BLOCK_24H_MS = 24 * 60 * 60 * 1000;

type BeRiskMockState = {
  riskCount: number;
  blockedUntil: number | null;
};

const defaultState = (): BeRiskMockState => ({
  riskCount: INITIAL_RISK_COUNT,
  blockedUntil: null,
});

const normalizeEmail = (email?: string | null) =>
  email?.trim().toLowerCase() ?? "";

const readState = (): BeRiskMockState => {
  if (typeof window === "undefined") return defaultState();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState();

  try {
    const parsed = JSON.parse(raw) as Partial<BeRiskMockState>;
    return {
      riskCount: Math.max(
        typeof parsed.riskCount === "number"
          ? parsed.riskCount
          : INITIAL_RISK_COUNT,
        INITIAL_RISK_COUNT,
      ),
      blockedUntil:
        typeof parsed.blockedUntil === "number" ? parsed.blockedUntil : null,
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
  const isBlocked =
    applies && blockedUntil != null && blockedUntil > Date.now();

  return {
    applies,
    riskCount: applies ? state.riskCount : 0,
    blockedUntil,
    isBlocked,
  };
};

export const prepareBeRiskMockPayment = (
  email?: string | null,
): {
  action: "none" | "allow" | "block24h";
  riskCount: number;
  blockedUntil: number | null;
} => {
  if (!isBeRiskMockTarget(email)) {
    return {
      action: "none",
      riskCount: 0,
      blockedUntil: null,
    };
  }

  const state = readState();

  if (state.blockedUntil != null && state.blockedUntil > Date.now()) {
    return {
      action: "block24h",
      riskCount: state.riskCount,
      blockedUntil: state.blockedUntil,
    };
  }

  const currentRiskCount = Math.max(state.riskCount, INITIAL_RISK_COUNT);

  if (currentRiskCount >= 3) {
    const nextRiskCount = currentRiskCount + 1;
    const blockedUntil = Date.now() + BLOCK_24H_MS;
    writeState({
      riskCount: nextRiskCount,
      blockedUntil,
    });
    return {
      action: "block24h",
      riskCount: nextRiskCount,
      blockedUntil,
    };
  }

  return {
    action: "allow",
    riskCount: currentRiskCount + 1,
    blockedUntil: null,
  };
};

export const markBeRiskMockPendingSuccessWarning = (
  email?: string | null,
  riskCount?: number,
) => {
  if (typeof window === "undefined" || !isBeRiskMockTarget(email) || !riskCount)
    return;

  window.sessionStorage.setItem(
    POST_PAYMENT_WARNING_KEY,
    JSON.stringify({
      email: normalizeEmail(email),
      riskCount,
    }),
  );
};

export const consumeBeRiskMockSuccessWarning = (
  email?: string | null,
): number | null => {
  if (typeof window === "undefined" || !isBeRiskMockTarget(email)) return null;

  const raw = window.sessionStorage.getItem(POST_PAYMENT_WARNING_KEY);
  if (!raw) return null;

  window.sessionStorage.removeItem(POST_PAYMENT_WARNING_KEY);

  try {
    const parsed = JSON.parse(raw) as { email?: string; riskCount?: number };
    if (normalizeEmail(parsed.email) !== normalizeEmail(email)) return null;

    const riskCount =
      typeof parsed.riskCount === "number" ? parsed.riskCount : null;
    if (riskCount == null) return null;

    const state = readState();
    writeState({
      riskCount: Math.max(state.riskCount, riskCount),
      blockedUntil: state.blockedUntil,
    });
    return riskCount;
  } catch {
    return null;
  }
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
