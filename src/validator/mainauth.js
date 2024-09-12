import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import con from "../utils/Connection";
import { Mysql2Adapter } from "@lucia-auth/adapter-mysql";

// const adapter = new Mysql2Adapter(con);

// export const lucia = new Lucia(adapter, {
// 	sessionCookie: {
// 		attributes: {
// 			secure: process.env.NODE_ENV === "production"
// 		}
// 	},
// 	getUserAttributes: (attributes) => {
// 		return {
// 			username: attributes.user_name
// 		};
// 	}
// });

const adapter = new Mysql2Adapter(con, {
  user: "user",
  session: "user_session",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    console.log("attributes==============================>", attributes);
    return {
      username: attributes.user_name,
    };
  },
});

export const validateRequest = cache(async () => {
	console.log('lucia',lucia);
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  console.log("sessionId", sessionId);

  const result = await lucia.validateSession(sessionId);
  console.log("result", result);

  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {
    console.log("errorthrow=>", error);
  }
  return result;
});

// declare module "lucia" {
// 	interface Register {
// 		Lucia: typeof lucia;
// 		DatabaseUserAttributes: Omit<DatabaseUser, "id">;
// 	}
// }
