CREATE TABLE IF NOT EXISTS "home-bernardus_post" (
	"post_id" serial PRIMARY KEY NOT NULL,
	"post_name" varchar(256),
	"post_created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"post_updated_at" timestamp with time zone,
	"post_content" text
);
