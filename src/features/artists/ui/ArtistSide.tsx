"use client";

import { useArtistStore } from "../stores/useArtistStore";
import ArtistLiveChat from "./ArtistLiveChat";
import ArtistCommentSidebar from "./post/ArtistCommentSidebar";

export default function ArtistSide({ artistId }: { artistId: string }) {
  const { activeTab } = useArtistStore();

  return (
    <div className="h-[calc(100vh-var(--header-height)-120px)]">
      {activeTab === "posts" ? <ArtistCommentSidebar /> : <ArtistLiveChat artistId={artistId} />}
    </div>
  );
}
