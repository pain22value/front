// 배우

type Artist = {
  artistId: number;
  artistName: string;
  profileImageUrl: string;
  isLiked: boolean;
};

// 아티스트 상세 조회 응답
interface ArtistDetail {
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
}

// 아티스트 지난 출연 작품 조회 응답
interface ArtistPastShowsResponse {
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
}

// 아티스트 멤버십 결제 준비 요청
interface PrepareMembershipPaymentRequest {
  paymentMethod: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
  autoPaymentAgreed: boolean;
}

// 아티스트 멤버십 결제 준비 응답 데이터
interface PrepareMembershipPaymentResponse {
  paymentMethod: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
  autoPaymentAgreed: boolean;
}
