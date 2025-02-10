import { verifyToken } from "./jwt"

export async function verifyAuth(token: string): Promise<boolean> {
  const payload = await verifyToken(token)
  return payload !== null
}

