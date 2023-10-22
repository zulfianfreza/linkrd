import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { env } from "~/env.mjs";
import * as schema from "./schema";

const client = new Client({
  connectionString: env.DATABASE_URL,
});

// or

await client.connect();
export const db = drizzle(client, { schema });
