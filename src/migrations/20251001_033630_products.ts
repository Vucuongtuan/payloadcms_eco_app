import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "variants" ADD COLUMN "slug" varchar;
  ALTER TABLE "variants" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "_variants_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_variants_v" ADD COLUMN "version_slug_lock" boolean DEFAULT true;
  CREATE INDEX "variants_slug_idx" ON "variants" USING btree ("slug");
  CREATE INDEX "_variants_v_version_version_slug_idx" ON "_variants_v" USING btree ("version_slug");
  ALTER TABLE "products" DROP COLUMN "name";
  ALTER TABLE "_products_v" DROP COLUMN "version_name";
  ALTER TABLE "variants" DROP COLUMN "name";
  ALTER TABLE "_variants_v" DROP COLUMN "version_name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "variants_slug_idx";
  DROP INDEX "_variants_v_version_version_slug_idx";
  ALTER TABLE "products" ADD COLUMN "name" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_name" varchar;
  ALTER TABLE "variants" ADD COLUMN "name" varchar;
  ALTER TABLE "_variants_v" ADD COLUMN "version_name" varchar;
  ALTER TABLE "variants" DROP COLUMN "slug";
  ALTER TABLE "variants" DROP COLUMN "slug_lock";
  ALTER TABLE "_variants_v" DROP COLUMN "version_slug";
  ALTER TABLE "_variants_v" DROP COLUMN "version_slug_lock";`)
}
