import { useQuery } from "@tanstack/react-query";
import { shows } from "@/shared/data/shows";

// This is a mock function. In a real app, this would be an API call.
const fetchShows = async (category: "now" | "tobe" | "closed") => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // For now, we don't have a way to distinguish 'now' shows from the mock data.
  // So we'll just return all shows if the category is 'now'.
  // In a real scenario, you would filter based on the category from the API.
  if (category === "now") {
    return shows;
  }

  return [];
};

export const useShows = (category: "now" | "tobe" | "closed") => {
  return useQuery({
    queryKey: ["shows", category],
    queryFn: () => fetchShows(category),
  });
};
