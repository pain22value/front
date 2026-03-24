// search.d.ts

type SearchArtist = {
  artistId: number;
  artistName: string;
  profileImageUrl: string;
  appearanceInfo: string;
};

type SearchShow = {
  showId: number;
  posterUrl: string;
  title: string;
  venueName: string;
  date: string;
};

// 요청 바디

type SearchParams = {
  keyword: string;
  artistOffset?: number;
  artistLimit?: number;
  showOffset?: number;
  showLimit?: number;
};

// 응답

type SearchResponse = {
  keyword: string;
  artistCount: number;
  showCount: number;
  hasMoreArtists: boolean;
  hasMoreShows: boolean;
  artists: SearchArtist[];
  shows: SearchShow[];
};
