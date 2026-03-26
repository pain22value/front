type PolicyTable = {
  headers: string[];
  rows: string[][];
};

type PolicyContent = {
  title: string;
  description?: string;
  items?: string[];
  table?: PolicyTable;
  note?: string;
};

type PolicySection = PolicyContent & {
  subSections?: PolicyContent[];
};

type PolicyType = "service" | "finance" | "privacy";
