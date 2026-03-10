import { actors } from "./actors";

export const memberships = [
  {
    id: 1,
    name: actors[0].name,
    imageUrl: actors[0].image,
    joinDate: "2025.01.15",
    nextPaymentDate: "2026.04.15",
    daysLeft: "D-40",
    price: "5,000원",
  },
  {
    id: 2,
    name: actors[1].name,
    imageUrl: actors[1].image,
    joinDate: "2025.03.01",
    nextPaymentDate: "2026.04.01",
    daysLeft: "D-26",
    price: "5,000원",
  },
  {
    id: 3,
    name: actors[2].name,
    imageUrl: actors[2].image,
    joinDate: "2025.06.10",
    nextPaymentDate: "2026.04.10",
    daysLeft: "D-35",
    price: "5,000원",
  },
];
