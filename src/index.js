import { Lucia, TimeSpan } from "lucia";
// import { Discord } from "arctic";
// import { env } from "@/env.js";
import con from "./utils/Connection";
import { Mysql2Adapter } from "@lucia-auth/adapter-mysql";
// Uncomment the following lines if you are using nodejs 18 or lower. Not required in Node.js 20, CloudFlare Workers, Deno, Bun, and Vercel Edge Functions.
// import { webcrypto } from "node:crypto";
// globalThis.crypto = webcrypto as Crypto;

// const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
const adapter = new Mysql2Adapter(con);



export const lucia = new Lucia(adapter, {
  getSessionAttributes: (/* attributes */) => {
    return {};
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      avatar: attributes.avatar,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  },
  sessionExpiresIn: new TimeSpan(30, "d"),
  sessionCookie: {
    name: "session",
    expires: false, // session cookies have very long lifespan (2 years)
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

// export const discord = new Discord(
//   env.DISCORD_CLIENT_ID,
//   env.DISCORD_CLIENT_SECRET,
//   absoluteUrl("/login/discord/callback")
// );


