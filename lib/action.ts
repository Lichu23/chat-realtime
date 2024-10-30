"use server"

import { StreamChat } from "stream-chat"

//serverClient se conecta con streamAPI para poder generar el token
//y asi le pasamos un userID y nos devuelve un token para poder
//autenticar el usuario con nuestro chat interface

const serverClient = StreamChat.getInstance(
    process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    process.env.STREAM_API_SECRET
)


export  default async function createToken(userId: string): Promise<string> {
  //create token when user logging 
    return serverClient.createToken(userId) 
}
