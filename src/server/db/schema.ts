// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `home-bernardus_${name}`);

export const posts = createTable("posts", {
  post_id: serial("post_id").primaryKey(),
  post_name: varchar("post_name", { length: 256 }),
  post_created_at: timestamp("post_created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  post_updated_at: timestamp("post_updated_at", { withTimezone: true }),
  post_content: text("post_content"),
});

export const quotes = createTable("quotes", {
  quote_id: serial("quote_id").primaryKey(),
  quote_content: varchar("quote_content", { length: 1024 }),
  quote_author: varchar("quote_author", { length: 512 }),
  quote_created_at: timestamp("quote_created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  quote_updated_at: timestamp("quote_updated_at", { withTimezone: true }),
});
