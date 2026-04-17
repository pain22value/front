"use client";

import { useMutation } from "@tanstack/react-query";
import { challengeService } from "../services/challengeService";

export const useStartChallenge = () => {
  return useMutation({
    mutationFn: challengeService.startChallenge,
  });
};

export const useJudgeChallenge = () => {
  return useMutation({
    mutationFn: challengeService.judgeChallenge,
  });
};
