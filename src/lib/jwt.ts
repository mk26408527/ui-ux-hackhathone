import { SignJWT, jwtVerify } from "jose";
import { JWTPayload } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function createToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<object | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
