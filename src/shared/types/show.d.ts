interface Show {
  id: number | string;
  title: string;
  venue: string;
  period: string;
  image: string;
}

interface Artist {
  id: number;
  name: string;
  image: string;
  description?: string;
  isMember?: boolean;
}
