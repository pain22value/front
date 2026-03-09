import { artists } from "./artists";

export const memberships = [
  {
    id: 1,
    name: artists[0].name,
    imageUrl: artists[0].image,
    joinDate: "2025.01.15",
    nextPaymentDate: "2026.04.15",
    daysLeft: "D-40",
    price: "5,000원",
  },
  {
    id: 2,
    name: artists[1].name,
    imageUrl: artists[1].image,
    joinDate: "2025.03.01",
    nextPaymentDate: "2026.04.01",
    daysLeft: "D-26",
    price: "5,000원",
  },
  {
    id: 3,
    name: artists[2].name,
    imageUrl: artists[2].image,
    joinDate: "2025.06.10",
    nextPaymentDate: "2026.04.10",
    daysLeft: "D-35",
    price: "5,000원",
  },
];
