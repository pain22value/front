// 배우

type Artist = {
  artistId: number;
  artistName: string;
  profileImageUrl: string;
  isLiked: boolean;
};

// 즐겨찾기 아티스트 정보 (배열에 있으면 = 좋아요 상태)
type FavoriteArtist = {
  artistId: number;
  artistName: string;
  profileImageUrl?: string;
};

// 즐겨찾기 상태
type FavoriteState = {
  favorites: FavoriteArtist[];
  // 즐겨찾기 추가
  addFavorite: (artist: FavoriteArtist) => void;
  // 즐겨찾기 제거
  removeFavorite: (artistId: number) => void;
  // 좋아요 여부 확인 (배열에 존재 여부로 판단)
  isFavorite: (artistId: number) => boolean;
};

// 아티스트 상태 (UI)
type ArtistState = {
  activeTab: string;
  selectedPostId: number | null; // 선택된 포스트 ID (null이면 목록 표시)
  setActiveTab: (tab: string) => void;
  selectPost: (postId: number) => void;
  clearPost: () => void;
};

// 아티스트 상세 조회 응답
type ArtistDetail = {
  artist: Artist;
  membership: {
    joined: boolean;
  };
  notices: {
    noticeId: number;
    content: string;
  }[];
  currentShows: {
    showId: number;
    posterUrl: string;
    title: string;
    venueName: string;
    date: string;
  }[];
  pastShows: {
    shows: {
      showId: number;
      posterUrl: string;
      title: string;
      venueName: string;
      date: string;
    }[];
    hasMore: boolean;
  };
};

// ArtistDetail의 show 항목 + showTitle 매핑 타입
type ArtistShow = ArtistDetail["currentShows"][number] & { showTitle: string };

// 아티스트 지난 출연 작품 조회 응답
type ArtistPastShowsResponse = {
  content: {
    showId: number;
    posterUrl: string;
    title: string;
    venueName: string;
    date: string;
  }[];
  totalCount: number;
  totalPages: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

// 아티스트 멤버십 결제 준비 요청
type PrepareMembershipPaymentRequest = {
  paymentMethod: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
  autoPaymentAgreed: boolean;
};

// 아티스트 멤버십 결제 준비 응답 데이터
type PrepareMembershipPaymentResponse = {
  artistId: number;
  artistName: string;
  planName: string;
  amount: number;
  orderId: string;
  paymentMethod: string;
};

// 아티스트 멤버십 가입 완료 정보
type ArtistMembershipCompleteData = {
  artistId: number;
  artistName: string;
  planName: string;
  amount: number;
  joinedAt: string;
  nextBillingAt: string;
};
