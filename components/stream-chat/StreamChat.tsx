"use client";

import createToken from "@/lib/action";
import { useCallback } from "react";
import { Chat, useCreateChatClient } from "stream-chat-react";

interface StreamDataProps {
  userData: {
    id: string;
    name?: string;
    image?: string;
  };
}

function StreamChat({ userData }: StreamDataProps) {

  const tokenProvider = useCallback(async () => {
    //es async porque la funcion que vamos a llamar proviene del backend
    return await createToken(userData.id);
  }, [userData.id, createToken]);

  const client = useCreateChatClient({
    userData,
    tokenOrProvider: tokenProvider,
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  });

  if(!client) return <div>Setting up client & connection...</div>

  return (
    <Chat client={client}>Chat with client is ready</Chat>
  )
}
export default StreamChat
