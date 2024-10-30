import StreamChat from "@/components/stream-chat/StreamChat";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

async function Chat() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userData = {
    id: user.id,
    ...(user.fullName ? {name: user.fullName} : {}),
    ...(user.imageUrl ? {image: user.imageUrl} : {})
  };
  return (
    <section className="py-24 ">
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Chat Page</h1>
        <StreamChat userData={userData}/>
      </div>
    </section>
  );
}

export default Chat;
