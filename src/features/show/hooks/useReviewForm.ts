import { useState } from "react";

export function useReviewForm() {
  const [sentiment, setSentiment] = useState<"good" | "bad" | null>(null);
  const [charmPoints, setCharmPoints] = useState<CharmPoint[]>([]);
  const [emotionPoints, setEmotionPoints] = useState<EmotionPoint[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const toggleCharmPoint = (point: CharmPoint) => {
    setCharmPoints((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]
    );
  };

  const toggleEmotionPoint = (point: EmotionPoint) => {
    setEmotionPoints((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]
    );
  };

  const reset = () => {
    setSentiment(null);
    setCharmPoints([]);
    setEmotionPoints([]);
    setTitle("");
    setContent("");
  };

  return {
    sentiment,
    setSentiment,
    charmPoints,
    toggleCharmPoint,
    emotionPoints,
    toggleEmotionPoint,
    title,
    setTitle,
    content,
    setContent,
    reset,
  };
}
