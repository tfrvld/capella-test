CREATE TABLE "nasabah" (
	"id_nasabah" varchar(255) PRIMARY KEY NOT NULL,
	"nama" varchar(255) NOT NULL,
	"nomor_telepon" varchar(50) NOT NULL,
	"pendapatan_bulanan" numeric(12, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pengajuan" (
	"id_pengajuan" varchar(255) PRIMARY KEY NOT NULL,
	"id_nasabah" varchar(255) NOT NULL,
	"tenor" integer NOT NULL,
	"tipe_pengajuan" varchar(100) NOT NULL,
	"nominal_pengajuan" numeric(12, 2) NOT NULL,
	"tanggal_pengajuan" timestamp DEFAULT now() NOT NULL,
	"pembayaran_perbulan" numeric(12, 2) NOT NULL,
	"status" varchar(20) NOT NULL,
	"catatan" text
);
--> statement-breakpoint
ALTER TABLE "pengajuan" ADD CONSTRAINT "pengajuan_id_nasabah_nasabah_id_nasabah_fk" FOREIGN KEY ("id_nasabah") REFERENCES "public"."nasabah"("id_nasabah") ON DELETE cascade ON UPDATE no action;