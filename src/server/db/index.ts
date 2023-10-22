import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { env } from "~/env.mjs";

const client = new Client({
  connectionString: env.DATABASE_URL,
});

// or

await client.connect();
export const db = drizzle(client);
