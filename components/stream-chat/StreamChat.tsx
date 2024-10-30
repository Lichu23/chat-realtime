"use client";

import createToken from "@/lib/action";
import { useCallback } from "react";
import { ChannelFilters, ChannelOptions, ChannelSort } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  Thread,
  useCreateChatClient,
  Window,
} from "stream-chat-react";
import { EmojiPicker } from "stream-chat-react/emojis";
import { init, SearchIndex } from "emoji-mart";
import data from "emoji-mart";

init({ data });

import 'stream-chat-react/dist/css/v2/index.css';
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface StreamDataProps {
  userData: {
    id: string;
    name?: string;
    image?: string;
  };
}

function StreamChat({ userData }: StreamDataProps) {

  const {resolvedTheme} = useTheme()

  const tokenProvider = useCallback(async () => {
    //es async porque la funcion que vamos a llamar proviene del backend
    return await createToken(userData.id);
  }, [userData.id]);

  const client = useCreateChatClient({
    userData,
    tokenOrProvider: tokenProvider,
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  });

  const sort: ChannelSort<DefaultStreamChatGenerics> = { last_message_at: -1 };
  const filters: ChannelFilters<DefaultStreamChatGenerics> = {
    //Obtener solo los canales que sean de este tipo "messaging"
    type: "messaging",

    //user id debe estar en el conjunto de miembros de esos canales asi que solo muestre los canales de los que este usuario forma parte
    members: { $in: [userData.id] },
  };

  const options: ChannelOptions = {
    //max 10 channels
    limit: 10,
  };

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat 
    theme={cn(
      resolvedTheme === "dark"
      ? "str-chat__theme-dark" : "str-chat__theme-light"
    )}
    client={client}>
      <ChannelList
        sort={sort} //como ordenar los canales
        filters={filters} //que filtros usar eg. que canales mostrar
        options={options}
      />
      <Channel EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}
export default StreamChat;
