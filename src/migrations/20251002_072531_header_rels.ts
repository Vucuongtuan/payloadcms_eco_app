import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_variant_types_fk";
  
  ALTER TABLE "_products_v_rels" DROP CONSTRAINT "_products_v_rels_variant_types_fk";
  
  DROP INDEX "products_rels_variant_types_id_idx";
  DROP INDEX "_products_v_autosave_idx";
  DROP INDEX "_products_v_rels_variant_types_id_idx";
  ALTER TABLE "categories" ALTER COLUMN "level" SET DEFAULT 'level3';
  ALTER TABLE "variants_product" ALTER COLUMN "sizes_s_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "variants_product" ALTER COLUMN "sizes_m_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "variants_product" ALTER COLUMN "sizes_l_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "variants_product" ALTER COLUMN "sizes_xl_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "_variants_product_v" ALTER COLUMN "version_sizes_s_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "_variants_product_v" ALTER COLUMN "version_sizes_m_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "_variants_product_v" ALTER COLUMN "version_sizes_l_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "_variants_product_v" ALTER COLUMN "version_sizes_xl_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "products" ALTER COLUMN "pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "products" ALTER COLUMN "sizes_s_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "products" ALTER COLUMN "sizes_m_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "products" ALTER COLUMN "sizes_l_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "products" ALTER COLUMN "sizes_xl_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "_products_v" ALTER COLUMN "version_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "_products_v" ALTER COLUMN "version_sizes_s_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "_products_v" ALTER COLUMN "version_sizes_m_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "_products_v" ALTER COLUMN "version_sizes_l_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "_products_v" ALTER COLUMN "version_sizes_xl_pricing_price" SET DATA TYPE varchar;
  ALTER TABLE "variants_product" ADD COLUMN "sizes_s_custom_price" boolean DEFAULT false;
  ALTER TABLE "variants_product" ADD COLUMN "sizes_m_custom_price" boolean DEFAULT false;
  ALTER TABLE "variants_product" ADD COLUMN "sizes_l_custom_price" boolean DEFAULT false;
  ALTER TABLE "variants_product" ADD COLUMN "sizes_xl_custom_price" boolean DEFAULT false;
  ALTER TABLE "_variants_product_v" ADD COLUMN "version_sizes_s_custom_price" boolean DEFAULT false;
  ALTER TABLE "_variants_product_v" ADD COLUMN "version_sizes_m_custom_price" boolean DEFAULT false;
  ALTER TABLE "_variants_product_v" ADD COLUMN "version_sizes_l_custom_price" boolean DEFAULT false;
  ALTER TABLE "_variants_product_v" ADD COLUMN "version_sizes_xl_custom_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_s_custom_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_m_custom_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_l_custom_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_xl_custom_price" boolean DEFAULT false;
  ALTER TABLE "products_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_sizes_s_custom_price" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN "version_sizes_m_custom_price" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN "version_sizes_l_custom_price" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN "version_sizes_xl_custom_price" boolean DEFAULT false;
  ALTER TABLE "_products_v_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_jobs_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_rels_categories_id_idx" ON "products_rels" USING btree ("categories_id");
  CREATE INDEX "_products_v_rels_categories_id_idx" ON "_products_v_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  CREATE INDEX "header_rels_categories_id_idx" ON "header_rels" USING btree ("categories_id");
  CREATE INDEX "header_rels_products_id_idx" ON "header_rels" USING btree ("products_id");
  CREATE INDEX "footer_rels_categories_id_idx" ON "footer_rels" USING btree ("categories_id");
  CREATE INDEX "footer_rels_products_id_idx" ON "footer_rels" USING btree ("products_id");
  ALTER TABLE "variants_product" DROP COLUMN "sizes_s_use_global_price";
  ALTER TABLE "variants_product" DROP COLUMN "sizes_m_use_global_price";
  ALTER TABLE "variants_product" DROP COLUMN "sizes_l_use_global_price";
  ALTER TABLE "variants_product" DROP COLUMN "sizes_xl_use_global_price";
  ALTER TABLE "_variants_product_v" DROP COLUMN "version_sizes_s_use_global_price";
  ALTER TABLE "_variants_product_v" DROP COLUMN "version_sizes_m_use_global_price";
  ALTER TABLE "_variants_product_v" DROP COLUMN "version_sizes_l_use_global_price";
  ALTER TABLE "_variants_product_v" DROP COLUMN "version_sizes_xl_use_global_price";
  ALTER TABLE "products" DROP COLUMN "sizes_s_use_global_price";
  ALTER TABLE "products" DROP COLUMN "sizes_m_use_global_price";
  ALTER TABLE "products" DROP COLUMN "sizes_l_use_global_price";
  ALTER TABLE "products" DROP COLUMN "sizes_xl_use_global_price";
  ALTER TABLE "products" DROP COLUMN "inventory";
  ALTER TABLE "products" DROP COLUMN "enable_variants";
  ALTER TABLE "products" DROP COLUMN "price_in_u_s_d_enabled";
  ALTER TABLE "products" DROP COLUMN "price_in_u_s_d";
  ALTER TABLE "products_rels" DROP COLUMN "variant_types_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_sizes_s_use_global_price";
  ALTER TABLE "_products_v" DROP COLUMN "version_sizes_m_use_global_price";
  ALTER TABLE "_products_v" DROP COLUMN "version_sizes_l_use_global_price";
  ALTER TABLE "_products_v" DROP COLUMN "version_sizes_xl_use_global_price";
  ALTER TABLE "_products_v" DROP COLUMN "version_inventory";
  ALTER TABLE "_products_v" DROP COLUMN "version_enable_variants";
  ALTER TABLE "_products_v" DROP COLUMN "version_price_in_u_s_d_enabled";
  ALTER TABLE "_products_v" DROP COLUMN "version_price_in_u_s_d";
  ALTER TABLE "_products_v" DROP COLUMN "autosave";
  ALTER TABLE "_products_v_rels" DROP COLUMN "variant_types_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_jobs_log" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_categories_fk";
  
  ALTER TABLE "_products_v_rels" DROP CONSTRAINT "_products_v_rels_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_categories_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_products_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_categories_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_products_fk";
  
  DROP INDEX "products_rels_categories_id_idx";
  DROP INDEX "_products_v_rels_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_payload_jobs_id_idx";
  DROP INDEX "header_rels_categories_id_idx";
  DROP INDEX "header_rels_products_id_idx";
  DROP INDEX "footer_rels_categories_id_idx";
  DROP INDEX "footer_rels_products_id_idx";
  ALTER TABLE "categories" ALTER COLUMN "level" SET DEFAULT 'level1';
  ALTER TABLE "variants_product" ALTER COLUMN "sizes_s_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "variants_product" ALTER COLUMN "sizes_m_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "variants_product" ALTER COLUMN "sizes_l_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "variants_product" ALTER COLUMN "sizes_xl_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "_variants_product_v" ALTER COLUMN "version_sizes_s_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "_variants_product_v" ALTER COLUMN "version_sizes_m_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "_variants_product_v" ALTER COLUMN "version_sizes_l_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "_variants_product_v" ALTER COLUMN "version_sizes_xl_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "products" ALTER COLUMN "pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "products" ALTER COLUMN "sizes_s_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "products" ALTER COLUMN "sizes_m_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "products" ALTER COLUMN "sizes_l_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "products" ALTER COLUMN "sizes_xl_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "_products_v" ALTER COLUMN "version_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "_products_v" ALTER COLUMN "version_sizes_s_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "_products_v" ALTER COLUMN "version_sizes_m_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "_products_v" ALTER COLUMN "version_sizes_l_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "_products_v" ALTER COLUMN "version_sizes_xl_pricing_price" SET DATA TYPE numeric;
  ALTER TABLE "variants_product" ADD COLUMN "sizes_s_use_global_price" boolean DEFAULT false;
  ALTER TABLE "variants_product" ADD COLUMN "sizes_m_use_global_price" boolean DEFAULT false;
  ALTER TABLE "variants_product" ADD COLUMN "sizes_l_use_global_price" boolean DEFAULT false;
  ALTER TABLE "variants_product" ADD COLUMN "sizes_xl_use_global_price" boolean DEFAULT false;
  ALTER TABLE "_variants_product_v" ADD COLUMN "version_sizes_s_use_global_price" boolean DEFAULT false;
  ALTER TABLE "_variants_product_v" ADD COLUMN "version_sizes_m_use_global_price" boolean DEFAULT false;
  ALTER TABLE "_variants_product_v" ADD COLUMN "version_sizes_l_use_global_price" boolean DEFAULT false;
  ALTER TABLE "_variants_product_v" ADD COLUMN "version_sizes_xl_use_global_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_s_use_global_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_m_use_global_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_l_use_global_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_xl_use_global_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "inventory" numeric DEFAULT 0;
  ALTER TABLE "products" ADD COLUMN "enable_variants" boolean;
  ALTER TABLE "products" ADD COLUMN "price_in_u_s_d_enabled" boolean;
  ALTER TABLE "products" ADD COLUMN "price_in_u_s_d" numeric;
  ALTER TABLE "products_rels" ADD COLUMN "variant_types_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_sizes_s_use_global_price" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN "version_sizes_m_use_global_price" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN "version_sizes_l_use_global_price" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN "version_sizes_xl_use_global_price" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN "version_inventory" numeric DEFAULT 0;
  ALTER TABLE "_products_v" ADD COLUMN "version_enable_variants" boolean;
  ALTER TABLE "_products_v" ADD COLUMN "version_price_in_u_s_d_enabled" boolean;
  ALTER TABLE "_products_v" ADD COLUMN "version_price_in_u_s_d" numeric;
  ALTER TABLE "_products_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_products_v_rels" ADD COLUMN "variant_types_id" integer;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_variant_types_fk" FOREIGN KEY ("variant_types_id") REFERENCES "public"."variant_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_variant_types_fk" FOREIGN KEY ("variant_types_id") REFERENCES "public"."variant_types"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_rels_variant_types_id_idx" ON "products_rels" USING btree ("variant_types_id");
  CREATE INDEX "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX "_products_v_rels_variant_types_id_idx" ON "_products_v_rels" USING btree ("variant_types_id");
  ALTER TABLE "variants_product" DROP COLUMN "sizes_s_custom_price";
  ALTER TABLE "variants_product" DROP COLUMN "sizes_m_custom_price";
  ALTER TABLE "variants_product" DROP COLUMN "sizes_l_custom_price";
  ALTER TABLE "variants_product" DROP COLUMN "sizes_xl_custom_price";
  ALTER TABLE "_variants_product_v" DROP COLUMN "version_sizes_s_custom_price";
  ALTER TABLE "_variants_product_v" DROP COLUMN "version_sizes_m_custom_price";
  ALTER TABLE "_variants_product_v" DROP COLUMN "version_sizes_l_custom_price";
  ALTER TABLE "_variants_product_v" DROP COLUMN "version_sizes_xl_custom_price";
  ALTER TABLE "products" DROP COLUMN "sizes_s_custom_price";
  ALTER TABLE "products" DROP COLUMN "sizes_m_custom_price";
  ALTER TABLE "products" DROP COLUMN "sizes_l_custom_price";
  ALTER TABLE "products" DROP COLUMN "sizes_xl_custom_price";
  ALTER TABLE "products_rels" DROP COLUMN "categories_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_sizes_s_custom_price";
  ALTER TABLE "_products_v" DROP COLUMN "version_sizes_m_custom_price";
  ALTER TABLE "_products_v" DROP COLUMN "version_sizes_l_custom_price";
  ALTER TABLE "_products_v" DROP COLUMN "version_sizes_xl_custom_price";
  ALTER TABLE "_products_v_rels" DROP COLUMN "categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_jobs_id";
  ALTER TABLE "header_rels" DROP COLUMN "categories_id";
  ALTER TABLE "header_rels" DROP COLUMN "products_id";
  ALTER TABLE "footer_rels" DROP COLUMN "categories_id";
  ALTER TABLE "footer_rels" DROP COLUMN "products_id";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
