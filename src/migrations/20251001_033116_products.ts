import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_variants_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__variants_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__variants_v_published_locale" AS ENUM('vi', 'en');
  CREATE TYPE "public"."enum_pages_blocks_category_showcase_spacing" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_category_showcase_layout" AS ENUM('container', 'full', 'wide', 'narrow');
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_views" numeric DEFAULT 0,
  	"version_sales" numeric DEFAULT 0,
  	"version_name" varchar,
  	"version_color" varchar,
  	"version_pricing_price" numeric,
  	"version_pricing_discount" numeric DEFAULT 0,
  	"version_sizes_s_use_global_price" boolean DEFAULT false,
  	"version_sizes_s_pricing_price" numeric,
  	"version_sizes_s_pricing_discount" numeric DEFAULT 0,
  	"version_sizes_s_inventory_sku" varchar,
  	"version_sizes_s_inventory_stock" numeric DEFAULT 0,
  	"version_sizes_m_use_global_price" boolean DEFAULT false,
  	"version_sizes_m_pricing_price" numeric,
  	"version_sizes_m_pricing_discount" numeric DEFAULT 0,
  	"version_sizes_m_inventory_sku" varchar,
  	"version_sizes_m_inventory_stock" numeric DEFAULT 0,
  	"version_sizes_l_use_global_price" boolean DEFAULT false,
  	"version_sizes_l_pricing_price" numeric,
  	"version_sizes_l_pricing_discount" numeric DEFAULT 0,
  	"version_sizes_l_inventory_sku" varchar,
  	"version_sizes_l_inventory_stock" numeric DEFAULT 0,
  	"version_sizes_xl_use_global_price" boolean DEFAULT false,
  	"version_sizes_xl_pricing_price" numeric,
  	"version_sizes_xl_pricing_discount" numeric DEFAULT 0,
  	"version_sizes_xl_inventory_sku" varchar,
  	"version_sizes_xl_inventory_stock" numeric DEFAULT 0,
  	"version_status" "enum__products_v_version_status" DEFAULT 'draft',
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_taxonomies_gender_id" integer,
  	"version_taxonomies_type_id" integer,
  	"version_taxonomies_category_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_folder_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__products_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_products_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_content" jsonb,
  	"version_long_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"variants_id" integer,
  	"media_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "variants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"name" varchar,
  	"color" varchar,
  	"sizes_s_use_global_price" boolean DEFAULT false,
  	"sizes_s_pricing_price" numeric,
  	"sizes_s_pricing_discount" numeric DEFAULT 0,
  	"sizes_s_inventory_sku" varchar,
  	"sizes_s_inventory_stock" numeric DEFAULT 0,
  	"sizes_m_use_global_price" boolean DEFAULT false,
  	"sizes_m_pricing_price" numeric,
  	"sizes_m_pricing_discount" numeric DEFAULT 0,
  	"sizes_m_inventory_sku" varchar,
  	"sizes_m_inventory_stock" numeric DEFAULT 0,
  	"sizes_l_use_global_price" boolean DEFAULT false,
  	"sizes_l_pricing_price" numeric,
  	"sizes_l_pricing_discount" numeric DEFAULT 0,
  	"sizes_l_inventory_sku" varchar,
  	"sizes_l_inventory_stock" numeric DEFAULT 0,
  	"sizes_xl_use_global_price" boolean DEFAULT false,
  	"sizes_xl_pricing_price" numeric,
  	"sizes_xl_pricing_discount" numeric DEFAULT 0,
  	"sizes_xl_inventory_sku" varchar,
  	"sizes_xl_inventory_stock" numeric DEFAULT 0,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_variants_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_variants_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_name" varchar,
  	"version_color" varchar,
  	"version_sizes_s_use_global_price" boolean DEFAULT false,
  	"version_sizes_s_pricing_price" numeric,
  	"version_sizes_s_pricing_discount" numeric DEFAULT 0,
  	"version_sizes_s_inventory_sku" varchar,
  	"version_sizes_s_inventory_stock" numeric DEFAULT 0,
  	"version_sizes_m_use_global_price" boolean DEFAULT false,
  	"version_sizes_m_pricing_price" numeric,
  	"version_sizes_m_pricing_discount" numeric DEFAULT 0,
  	"version_sizes_m_inventory_sku" varchar,
  	"version_sizes_m_inventory_stock" numeric DEFAULT 0,
  	"version_sizes_l_use_global_price" boolean DEFAULT false,
  	"version_sizes_l_pricing_price" numeric,
  	"version_sizes_l_pricing_discount" numeric DEFAULT 0,
  	"version_sizes_l_inventory_sku" varchar,
  	"version_sizes_l_inventory_stock" numeric DEFAULT 0,
  	"version_sizes_xl_use_global_price" boolean DEFAULT false,
  	"version_sizes_xl_pricing_price" numeric,
  	"version_sizes_xl_pricing_discount" numeric DEFAULT 0,
  	"version_sizes_xl_inventory_sku" varchar,
  	"version_sizes_xl_inventory_stock" numeric DEFAULT 0,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__variants_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__variants_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "pages_blocks_category_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing" "enum_pages_blocks_category_showcase_spacing",
  	"gender_id" integer NOT NULL,
  	"type_id" integer NOT NULL,
  	"category_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_category_showcase_locales" (
  	"layout" "enum_pages_blocks_category_showcase_layout" DEFAULT 'container',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "products_sizes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants_sizes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_sizes" CASCADE;
  DROP TABLE "products_variants_sizes" CASCADE;
  DROP TABLE "products_variants" CASCADE;
  ALTER TABLE "categories_locales" DROP CONSTRAINT "categories_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_taxonomies_sub_category_id_categories_id_fk";
  
  ALTER TABLE "products_locales" DROP CONSTRAINT "products_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "posts_locales" DROP CONSTRAINT "posts_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "products" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "products" ALTER COLUMN "status" SET DEFAULT 'draft'::text;
  ALTER TABLE "products" ALTER COLUMN "_status" SET DATA TYPE text;
  ALTER TABLE "products" ALTER COLUMN "_status" SET DEFAULT 'draft'::text;
  DROP TYPE "public"."enum_products_status";
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  ALTER TABLE "products" ALTER COLUMN "status" SET DEFAULT 'draft'::"public"."enum_products_status";
  ALTER TABLE "products" ALTER COLUMN "status" SET DATA TYPE "public"."enum_products_status" USING "status"::"public"."enum_products_status";
  ALTER TABLE "products" ALTER COLUMN "_status" SET DEFAULT 'draft'::"public"."enum_products_status";
  ALTER TABLE "products" ALTER COLUMN "_status" SET DATA TYPE "public"."enum_products_status" USING "_status"::"public"."enum_products_status";
  DROP INDEX "categories_meta_meta_image_idx";
  DROP INDEX "products_taxonomies_taxonomies_sub_category_idx";
  DROP INDEX "products_slug_idx";
  DROP INDEX "products_meta_meta_image_idx";
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "posts_meta_meta_image_idx";
  ALTER TABLE "categories_blocks_media_block_locales" ALTER COLUMN "aspect" SET DEFAULT 'wide';
  ALTER TABLE "products" ALTER COLUMN "color" DROP NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "pricing_price" DROP NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "pricing_discount" DROP NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "taxonomies_gender_id" DROP NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "taxonomies_category_id" DROP NOT NULL;
  ALTER TABLE "products_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_hero_block_locales" ALTER COLUMN "aspect" SET DEFAULT 'wide';
  ALTER TABLE "pages_blocks_hero_block_locales" ALTER COLUMN "type" SET DEFAULT 'single';
  ALTER TABLE "pages_blocks_media_block_locales" ALTER COLUMN "aspect" SET DEFAULT 'wide';
  ALTER TABLE "categories" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "categories" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "categories" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "products" ADD COLUMN "sizes_s_use_global_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_s_pricing_price" numeric;
  ALTER TABLE "products" ADD COLUMN "sizes_s_pricing_discount" numeric DEFAULT 0;
  ALTER TABLE "products" ADD COLUMN "sizes_s_inventory_sku" varchar;
  ALTER TABLE "products" ADD COLUMN "sizes_s_inventory_stock" numeric DEFAULT 0;
  ALTER TABLE "products" ADD COLUMN "sizes_m_use_global_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_m_pricing_price" numeric;
  ALTER TABLE "products" ADD COLUMN "sizes_m_pricing_discount" numeric DEFAULT 0;
  ALTER TABLE "products" ADD COLUMN "sizes_m_inventory_sku" varchar;
  ALTER TABLE "products" ADD COLUMN "sizes_m_inventory_stock" numeric DEFAULT 0;
  ALTER TABLE "products" ADD COLUMN "sizes_l_use_global_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_l_pricing_price" numeric;
  ALTER TABLE "products" ADD COLUMN "sizes_l_pricing_discount" numeric DEFAULT 0;
  ALTER TABLE "products" ADD COLUMN "sizes_l_inventory_sku" varchar;
  ALTER TABLE "products" ADD COLUMN "sizes_l_inventory_stock" numeric DEFAULT 0;
  ALTER TABLE "products" ADD COLUMN "sizes_xl_use_global_price" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "sizes_xl_pricing_price" numeric;
  ALTER TABLE "products" ADD COLUMN "sizes_xl_pricing_discount" numeric DEFAULT 0;
  ALTER TABLE "products" ADD COLUMN "sizes_xl_inventory_sku" varchar;
  ALTER TABLE "products" ADD COLUMN "sizes_xl_inventory_stock" numeric DEFAULT 0;
  ALTER TABLE "products" ADD COLUMN "slug" varchar;
  ALTER TABLE "products" ADD COLUMN "taxonomies_type_id" integer;
  ALTER TABLE "products" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "products" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "products" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "products" ADD COLUMN "_status" "enum_products_status" DEFAULT 'draft';
  ALTER TABLE "products_locales" ADD COLUMN "long_content" jsonb;
  ALTER TABLE "products_rels" ADD COLUMN "variants_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "variants_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "variants_id" integer;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_taxonomies_gender_id_categories_id_fk" FOREIGN KEY ("version_taxonomies_gender_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_taxonomies_type_id_categories_id_fk" FOREIGN KEY ("version_taxonomies_type_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_taxonomies_category_id_categories_id_fk" FOREIGN KEY ("version_taxonomies_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_folder_id_payload_folders_id_fk" FOREIGN KEY ("version_folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_variants_fk" FOREIGN KEY ("variants_id") REFERENCES "public"."variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "variants" ADD CONSTRAINT "variants_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_variants_v" ADD CONSTRAINT "_variants_v_parent_id_variants_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_variants_v" ADD CONSTRAINT "_variants_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_showcase" ADD CONSTRAINT "pages_blocks_category_showcase_gender_id_categories_id_fk" FOREIGN KEY ("gender_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_showcase" ADD CONSTRAINT "pages_blocks_category_showcase_type_id_categories_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_showcase" ADD CONSTRAINT "pages_blocks_category_showcase_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_showcase" ADD CONSTRAINT "pages_blocks_category_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_showcase_locales" ADD CONSTRAINT "pages_blocks_category_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_category_showcase"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_sizes_s_inventory_version_sizes_s_in_idx" ON "_products_v" USING btree ("version_sizes_s_inventory_sku");
  CREATE INDEX "_products_v_version_sizes_m_inventory_version_sizes_m_in_idx" ON "_products_v" USING btree ("version_sizes_m_inventory_sku");
  CREATE INDEX "_products_v_version_sizes_l_inventory_version_sizes_l_in_idx" ON "_products_v" USING btree ("version_sizes_l_inventory_sku");
  CREATE INDEX "_products_v_version_sizes_xl_inventory_version_sizes_xl__idx" ON "_products_v" USING btree ("version_sizes_xl_inventory_sku");
  CREATE INDEX "_products_v_version_sizes_xl_inventory_version_sizes_x_1_idx" ON "_products_v" USING btree ("version_sizes_xl_inventory_sku");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_taxonomies_version_taxonomies_gender_idx" ON "_products_v" USING btree ("version_taxonomies_gender_id");
  CREATE INDEX "_products_v_version_taxonomies_version_taxonomies_type_idx" ON "_products_v" USING btree ("version_taxonomies_type_id");
  CREATE INDEX "_products_v_version_taxonomies_version_taxonomies_catego_idx" ON "_products_v" USING btree ("version_taxonomies_category_id");
  CREATE INDEX "_products_v_version_meta_version_meta_image_idx" ON "_products_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_products_v_version_version_folder_idx" ON "_products_v" USING btree ("version_folder_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" USING btree ("snapshot");
  CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" USING btree ("published_locale");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_variants_id_idx" ON "_products_v_rels" USING btree ("variants_id");
  CREATE INDEX "_products_v_rels_media_id_idx" ON "_products_v_rels" USING btree ("media_id");
  CREATE INDEX "_products_v_rels_tags_id_idx" ON "_products_v_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "variants_sizes_s_inventory_sizes_s_inventory_sku_idx" ON "variants" USING btree ("sizes_s_inventory_sku");
  CREATE UNIQUE INDEX "variants_sizes_m_inventory_sizes_m_inventory_sku_idx" ON "variants" USING btree ("sizes_m_inventory_sku");
  CREATE UNIQUE INDEX "variants_sizes_l_inventory_sizes_l_inventory_sku_idx" ON "variants" USING btree ("sizes_l_inventory_sku");
  CREATE UNIQUE INDEX "variants_sizes_xl_inventory_sizes_xl_inventory_sku_idx" ON "variants" USING btree ("sizes_xl_inventory_sku");
  CREATE UNIQUE INDEX "variants_sizes_xl_inventory_sizes_xl_inventory_sku_1_idx" ON "variants" USING btree ("sizes_xl_inventory_sku");
  CREATE INDEX "variants_meta_meta_image_idx" ON "variants" USING btree ("meta_image_id");
  CREATE INDEX "variants_updated_at_idx" ON "variants" USING btree ("updated_at");
  CREATE INDEX "variants_created_at_idx" ON "variants" USING btree ("created_at");
  CREATE INDEX "variants__status_idx" ON "variants" USING btree ("_status");
  CREATE INDEX "_variants_v_parent_idx" ON "_variants_v" USING btree ("parent_id");
  CREATE INDEX "_variants_v_version_sizes_s_inventory_version_sizes_s_in_idx" ON "_variants_v" USING btree ("version_sizes_s_inventory_sku");
  CREATE INDEX "_variants_v_version_sizes_m_inventory_version_sizes_m_in_idx" ON "_variants_v" USING btree ("version_sizes_m_inventory_sku");
  CREATE INDEX "_variants_v_version_sizes_l_inventory_version_sizes_l_in_idx" ON "_variants_v" USING btree ("version_sizes_l_inventory_sku");
  CREATE INDEX "_variants_v_version_sizes_xl_inventory_version_sizes_xl__idx" ON "_variants_v" USING btree ("version_sizes_xl_inventory_sku");
  CREATE INDEX "_variants_v_version_sizes_xl_inventory_version_sizes_x_1_idx" ON "_variants_v" USING btree ("version_sizes_xl_inventory_sku");
  CREATE INDEX "_variants_v_version_meta_version_meta_image_idx" ON "_variants_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_variants_v_version_version_updated_at_idx" ON "_variants_v" USING btree ("version_updated_at");
  CREATE INDEX "_variants_v_version_version_created_at_idx" ON "_variants_v" USING btree ("version_created_at");
  CREATE INDEX "_variants_v_version_version__status_idx" ON "_variants_v" USING btree ("version__status");
  CREATE INDEX "_variants_v_created_at_idx" ON "_variants_v" USING btree ("created_at");
  CREATE INDEX "_variants_v_updated_at_idx" ON "_variants_v" USING btree ("updated_at");
  CREATE INDEX "_variants_v_snapshot_idx" ON "_variants_v" USING btree ("snapshot");
  CREATE INDEX "_variants_v_published_locale_idx" ON "_variants_v" USING btree ("published_locale");
  CREATE INDEX "_variants_v_latest_idx" ON "_variants_v" USING btree ("latest");
  CREATE INDEX "pages_blocks_category_showcase_order_idx" ON "pages_blocks_category_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_category_showcase_parent_id_idx" ON "pages_blocks_category_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_category_showcase_path_idx" ON "pages_blocks_category_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_category_showcase_gender_idx" ON "pages_blocks_category_showcase" USING btree ("gender_id");
  CREATE INDEX "pages_blocks_category_showcase_type_idx" ON "pages_blocks_category_showcase" USING btree ("type_id");
  CREATE INDEX "pages_blocks_category_showcase_category_idx" ON "pages_blocks_category_showcase" USING btree ("category_id");
  CREATE UNIQUE INDEX "pages_blocks_category_showcase_locales_locale_parent_id_unique" ON "pages_blocks_category_showcase_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "categories" ADD CONSTRAINT "categories_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_taxonomies_type_id_categories_id_fk" FOREIGN KEY ("taxonomies_type_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_variants_fk" FOREIGN KEY ("variants_id") REFERENCES "public"."variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_variants_fk" FOREIGN KEY ("variants_id") REFERENCES "public"."variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_variants_fk" FOREIGN KEY ("variants_id") REFERENCES "public"."variants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "categories_meta_meta_image_idx" ON "categories" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "products_sizes_s_inventory_sizes_s_inventory_sku_idx" ON "products" USING btree ("sizes_s_inventory_sku");
  CREATE UNIQUE INDEX "products_sizes_m_inventory_sizes_m_inventory_sku_idx" ON "products" USING btree ("sizes_m_inventory_sku");
  CREATE UNIQUE INDEX "products_sizes_l_inventory_sizes_l_inventory_sku_idx" ON "products" USING btree ("sizes_l_inventory_sku");
  CREATE UNIQUE INDEX "products_sizes_xl_inventory_sizes_xl_inventory_sku_idx" ON "products" USING btree ("sizes_xl_inventory_sku");
  CREATE UNIQUE INDEX "products_sizes_xl_inventory_sizes_xl_inventory_sku_1_idx" ON "products" USING btree ("sizes_xl_inventory_sku");
  CREATE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_taxonomies_taxonomies_type_idx" ON "products" USING btree ("taxonomies_type_id");
  CREATE INDEX "products_meta_meta_image_idx" ON "products" USING btree ("meta_image_id");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX "products_rels_variants_id_idx" ON "products_rels" USING btree ("variants_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id","locale");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "search_rels_variants_id_idx" ON "search_rels" USING btree ("variants_id");
  CREATE INDEX "payload_locked_documents_rels_variants_id_idx" ON "payload_locked_documents_rels" USING btree ("variants_id");
  ALTER TABLE "categories_locales" DROP COLUMN "meta_title";
  ALTER TABLE "categories_locales" DROP COLUMN "meta_description";
  ALTER TABLE "categories_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "products" DROP COLUMN "taxonomies_sub_category_id";
  ALTER TABLE "products_locales" DROP COLUMN "slug";
  ALTER TABLE "products_locales" DROP COLUMN "meta_title";
  ALTER TABLE "products_locales" DROP COLUMN "meta_description";
  ALTER TABLE "products_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN "meta_title";
  ALTER TABLE "pages_locales" DROP COLUMN "meta_description";
  ALTER TABLE "pages_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "posts_locales" DROP COLUMN "meta_title";
  ALTER TABLE "posts_locales" DROP COLUMN "meta_description";
  ALTER TABLE "posts_locales" DROP COLUMN "meta_image_id";
  DROP TYPE "public"."enum_products_sizes_size";
  DROP TYPE "public"."enum_products_variants_sizes_size";
  DROP TYPE "public"."enum_products_variants_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_sizes_size" AS ENUM('S', 'M', 'L', 'XL', 'XXL');
  CREATE TYPE "public"."enum_products_variants_sizes_size" AS ENUM('S', 'M', 'L', 'XL', 'XXL');
  CREATE TYPE "public"."enum_products_variants_status" AS ENUM('draft', 'published', 'out-of-stock', 'archived');
  ALTER TYPE "public"."enum_products_status" ADD VALUE 'out-of-stock';
  ALTER TYPE "public"."enum_products_status" ADD VALUE 'archived';
  CREATE TABLE "products_sizes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_products_sizes_size" NOT NULL,
  	"inventory_sku" varchar,
  	"inventory_stock" numeric DEFAULT 0
  );
  
  CREATE TABLE "products_variants_sizes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_products_variants_sizes_size" NOT NULL,
  	"pricing_price" numeric,
  	"pricing_discount" numeric DEFAULT 0,
  	"inventory_sku" varchar,
  	"inventory_stock" numeric DEFAULT 0
  );
  
  CREATE TABLE "products_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"color" varchar NOT NULL,
  	"status" "enum_products_variants_status" DEFAULT 'draft'
  );
  
  ALTER TABLE "_products_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_variants_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_category_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_category_showcase_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_locales" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  DROP TABLE "variants" CASCADE;
  DROP TABLE "_variants_v" CASCADE;
  DROP TABLE "pages_blocks_category_showcase" CASCADE;
  DROP TABLE "pages_blocks_category_showcase_locales" CASCADE;
  ALTER TABLE "categories" DROP CONSTRAINT "categories_meta_image_id_media_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_taxonomies_type_id_categories_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_meta_image_id_media_id_fk";
  
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_variants_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_media_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_variants_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_variants_fk";
  
  DROP INDEX "categories_meta_meta_image_idx";
  DROP INDEX "products_sizes_s_inventory_sizes_s_inventory_sku_idx";
  DROP INDEX "products_sizes_m_inventory_sizes_m_inventory_sku_idx";
  DROP INDEX "products_sizes_l_inventory_sizes_l_inventory_sku_idx";
  DROP INDEX "products_sizes_xl_inventory_sizes_xl_inventory_sku_idx";
  DROP INDEX "products_sizes_xl_inventory_sizes_xl_inventory_sku_1_idx";
  DROP INDEX "products_slug_idx";
  DROP INDEX "products_taxonomies_taxonomies_type_idx";
  DROP INDEX "products_meta_meta_image_idx";
  DROP INDEX "products__status_idx";
  DROP INDEX "products_rels_variants_id_idx";
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "pages_rels_media_id_idx";
  DROP INDEX "posts_meta_meta_image_idx";
  DROP INDEX "search_rels_variants_id_idx";
  DROP INDEX "payload_locked_documents_rels_variants_id_idx";
  ALTER TABLE "categories_blocks_media_block_locales" ALTER COLUMN "aspect" DROP DEFAULT;
  ALTER TABLE "products" ALTER COLUMN "color" SET NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "pricing_price" SET NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "pricing_discount" SET NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "taxonomies_gender_id" SET NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "taxonomies_category_id" SET NOT NULL;
  ALTER TABLE "products_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_hero_block_locales" ALTER COLUMN "aspect" DROP DEFAULT;
  ALTER TABLE "pages_blocks_hero_block_locales" ALTER COLUMN "type" SET DEFAULT 'media';
  ALTER TABLE "pages_blocks_media_block_locales" ALTER COLUMN "aspect" DROP DEFAULT;
  ALTER TABLE "categories_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "categories_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "categories_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "products" ADD COLUMN "taxonomies_sub_category_id" integer NOT NULL;
  ALTER TABLE "products_locales" ADD COLUMN "slug" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "posts_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "products_sizes" ADD CONSTRAINT "products_sizes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants_sizes" ADD CONSTRAINT "products_variants_sizes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_sizes_order_idx" ON "products_sizes" USING btree ("_order");
  CREATE INDEX "products_sizes_parent_id_idx" ON "products_sizes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_sizes_inventory_inventory_sku_idx" ON "products_sizes" USING btree ("inventory_sku");
  CREATE INDEX "products_variants_sizes_order_idx" ON "products_variants_sizes" USING btree ("_order");
  CREATE INDEX "products_variants_sizes_parent_id_idx" ON "products_variants_sizes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_variants_sizes_inventory_inventory_sku_idx" ON "products_variants_sizes" USING btree ("inventory_sku");
  CREATE INDEX "products_variants_order_idx" ON "products_variants" USING btree ("_order");
  CREATE INDEX "products_variants_parent_id_idx" ON "products_variants" USING btree ("_parent_id");
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_taxonomies_sub_category_id_categories_id_fk" FOREIGN KEY ("taxonomies_sub_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "categories_meta_meta_image_idx" ON "categories_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "products_taxonomies_taxonomies_sub_category_idx" ON "products" USING btree ("taxonomies_sub_category_id");
  CREATE INDEX "products_slug_idx" ON "products_locales" USING btree ("slug","_locale");
  CREATE INDEX "products_meta_meta_image_idx" ON "products_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  ALTER TABLE "categories" DROP COLUMN "meta_title";
  ALTER TABLE "categories" DROP COLUMN "meta_description";
  ALTER TABLE "categories" DROP COLUMN "meta_image_id";
  ALTER TABLE "products" DROP COLUMN "sizes_s_use_global_price";
  ALTER TABLE "products" DROP COLUMN "sizes_s_pricing_price";
  ALTER TABLE "products" DROP COLUMN "sizes_s_pricing_discount";
  ALTER TABLE "products" DROP COLUMN "sizes_s_inventory_sku";
  ALTER TABLE "products" DROP COLUMN "sizes_s_inventory_stock";
  ALTER TABLE "products" DROP COLUMN "sizes_m_use_global_price";
  ALTER TABLE "products" DROP COLUMN "sizes_m_pricing_price";
  ALTER TABLE "products" DROP COLUMN "sizes_m_pricing_discount";
  ALTER TABLE "products" DROP COLUMN "sizes_m_inventory_sku";
  ALTER TABLE "products" DROP COLUMN "sizes_m_inventory_stock";
  ALTER TABLE "products" DROP COLUMN "sizes_l_use_global_price";
  ALTER TABLE "products" DROP COLUMN "sizes_l_pricing_price";
  ALTER TABLE "products" DROP COLUMN "sizes_l_pricing_discount";
  ALTER TABLE "products" DROP COLUMN "sizes_l_inventory_sku";
  ALTER TABLE "products" DROP COLUMN "sizes_l_inventory_stock";
  ALTER TABLE "products" DROP COLUMN "sizes_xl_use_global_price";
  ALTER TABLE "products" DROP COLUMN "sizes_xl_pricing_price";
  ALTER TABLE "products" DROP COLUMN "sizes_xl_pricing_discount";
  ALTER TABLE "products" DROP COLUMN "sizes_xl_inventory_sku";
  ALTER TABLE "products" DROP COLUMN "sizes_xl_inventory_stock";
  ALTER TABLE "products" DROP COLUMN "slug";
  ALTER TABLE "products" DROP COLUMN "taxonomies_type_id";
  ALTER TABLE "products" DROP COLUMN "meta_title";
  ALTER TABLE "products" DROP COLUMN "meta_description";
  ALTER TABLE "products" DROP COLUMN "meta_image_id";
  ALTER TABLE "products" DROP COLUMN "_status";
  ALTER TABLE "products_locales" DROP COLUMN "long_content";
  ALTER TABLE "products_rels" DROP COLUMN "variants_id";
  ALTER TABLE "pages" DROP COLUMN "meta_title";
  ALTER TABLE "pages" DROP COLUMN "meta_description";
  ALTER TABLE "pages" DROP COLUMN "meta_image_id";
  ALTER TABLE "pages_rels" DROP COLUMN "media_id";
  ALTER TABLE "posts" DROP COLUMN "meta_title";
  ALTER TABLE "posts" DROP COLUMN "meta_description";
  ALTER TABLE "posts" DROP COLUMN "meta_image_id";
  ALTER TABLE "search_rels" DROP COLUMN "variants_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "variants_id";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_variants_status";
  DROP TYPE "public"."enum__variants_v_version_status";
  DROP TYPE "public"."enum__variants_v_published_locale";
  DROP TYPE "public"."enum_pages_blocks_category_showcase_spacing";
  DROP TYPE "public"."enum_pages_blocks_category_showcase_layout";`)
}
