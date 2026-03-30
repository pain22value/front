import { ARTIST_LIST } from "./artists";

export const MEMBERSHIP_LIST = [
  {
    id: 1,
    name: ARTIST_LIST[0].artistName,
    imageUrl: ARTIST_LIST[0].profileImageUrl,
    joinDate: "2025.01.15",
    nextPaymentDate: "2026.04.15",
    daysLeft: "D-40",
    price: "5,000원",
  },
  {
    id: 2,
    name: ARTIST_LIST[1].artistName,
    imageUrl: ARTIST_LIST[1].profileImageUrl,
    joinDate: "2025.03.01",
    nextPaymentDate: "2026.04.01",
    daysLeft: "D-26",
    price: "5,000원",
  },
  {
    id: 3,
    name: ARTIST_LIST[2].artistName,
    imageUrl: ARTIST_LIST[2].profileImageUrl,
    joinDate: "2025.06.10",
    nextPaymentDate: "2026.04.10",
    daysLeft: "D-35",
    price: "5,000원",
  },
];
