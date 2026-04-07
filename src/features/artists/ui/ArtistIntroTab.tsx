import ArtistNotice from "./ArtistNotice";
import ArtistShowList from "./ArtistShowList";
import { NOTICE_LIST } from "@/shared/constants/notices";

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

  return (
    <div className="space-y-12">
      <ArtistNotice notices={notices.length > 0 ? notices.map((n) => n.content) : NOTICE_LIST} />
      <ArtistShowList artistId={artistId} data={data} isLoading={isLoading} />
    </div>
  );
}
