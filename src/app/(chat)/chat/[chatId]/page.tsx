import { ChatHeader } from "@/features/chat/ui/ChatHeader";
import { ChatMessages } from "@/features/chat/ui/ChatMessages";
import { ChatInput } from "@/features/chat/ui/ChatInput";
import { MOCK_CHATS } from "@/shared/data/chats";

type Params = Promise<{ chatId: string }>;

export default async function ChatPage({ params }: { params: Params }) {
  const { chatId } = await params;
  const chat = MOCK_CHATS[chatId] || MOCK_CHATS["1"];

  return (
    <>
      <ChatHeader name={chat.name} artistId={chat.artistId} />
      <ChatMessages chat={chat} />
      <ChatInput />
    </>
  );
}

