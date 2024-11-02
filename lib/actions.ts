"use server"

import { StreamChat } from "stream-chat"
import { z } from "zod"
import { NewConversationFormSchema } from "./schemas"
import {auth} from "@clerk/nextjs/server"
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

type NewConversationInputs = z.infer<typeof NewConversationFormSchema>

//data son los datos del formulario que habiamos validado del lado del ciente
export async function createNewConversationAction(data: NewConversationInputs) {
  const {userId} = await auth()

  //si no estas logueado no podes llamar a esta funcion
  if(!userId) {
    return  {error: "Please log in first"}
  }

  //comprobamos con la validacion que estoy recibiendo los datos correctos
  const result = NewConversationFormSchema.safeParse(data)

  if(result.error) {
    return {error: "Required data is missing"}
  }

  try {
    const channel = serverClient.channel("messaging", {
      name: data.name,
      image: data.imageUrl,
      members: [userId, ...data.selectedUsers], //userId para que el que cree el canal tambien lo meta al canal creado con las peronas seleccionadas
      created_by_id: userId
    })

    //crea el canal
    await channel.create()

    return {succes: true}
  } catch (error: any) {
    return {error: error.message || "Error creating the channel"}
  }
}