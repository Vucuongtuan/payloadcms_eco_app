import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_categories_level" AS ENUM('level1', 'level2', 'level3');
  DROP INDEX "categories_slug_idx";
  DROP INDEX "tags_slug_idx";
  ALTER TABLE "categories" ADD COLUMN "slug" varchar;
  ALTER TABLE "categories" ADD COLUMN "level" "enum_categories_level" DEFAULT 'level1' NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "categories" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "tags" ADD COLUMN "slug" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  ALTER TABLE "categories_locales" DROP COLUMN "slug";
  ALTER TABLE "categories_locales" DROP COLUMN "meta_title";
  ALTER TABLE "categories_locales" DROP COLUMN "meta_description";
  ALTER TABLE "tags_locales" DROP COLUMN "slug";
  ALTER TABLE "posts_locales" DROP COLUMN "meta_title";
  ALTER TABLE "posts_locales" DROP COLUMN "meta_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "categories_slug_idx";
  DROP INDEX "tags_slug_idx";
  ALTER TABLE "categories_locales" ADD COLUMN "slug" varchar;
  ALTER TABLE "categories_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "categories_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "tags_locales" ADD COLUMN "slug" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "meta_description" varchar;
  CREATE INDEX "categories_slug_idx" ON "categories_locales" USING btree ("slug","_locale");
  CREATE INDEX "tags_slug_idx" ON "tags_locales" USING btree ("slug","_locale");
  ALTER TABLE "categories" DROP COLUMN "slug";
  ALTER TABLE "categories" DROP COLUMN "level";
  ALTER TABLE "categories" DROP COLUMN "meta_title";
  ALTER TABLE "categories" DROP COLUMN "meta_description";
  ALTER TABLE "tags" DROP COLUMN "slug";
  ALTER TABLE "pages" DROP COLUMN "meta_title";
  ALTER TABLE "pages" DROP COLUMN "meta_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "posts" DROP COLUMN "meta_title";
  ALTER TABLE "posts" DROP COLUMN "meta_description";
  DROP TYPE "public"."enum_categories_level";`)
}
