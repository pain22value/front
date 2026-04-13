import ArtistNotice from "./ArtistNotice";
import ArtistShowList from "./ArtistShowList";
import { NOTICE_LIST } from "@/shared/constants/notices";
import { useArtistPastShows } from "../hooks/useArtist";

export default function ArtistIntroTab({
  artistId,
  data,
  isLoading,
}: {
  artistId: string;
  data: ArtistDetail;
  isLoading: boolean;
}) {
  const { notices } = data;
  const { data: pastShowsData, isLoading: isPastShowsLoading } = useArtistPastShows(artistId);

  return (
    <div className="space-y-12">
      <ArtistNotice notices={notices.length > 0 ? notices.map((n) => n.content) : NOTICE_LIST} />
      <ArtistShowList 
        artistId={artistId} 
        data={data} 
        pastShowsData={pastShowsData}
        isLoading={isLoading || isPastShowsLoading} 
      />
    </div>
  );
}
