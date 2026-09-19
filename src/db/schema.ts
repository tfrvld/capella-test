import {
  pgTable,
  varchar,
  integer,
  decimal,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const nasabah = pgTable("nasabah", {
  idNasabah: varchar("id_nasabah", { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  nama: varchar("nama", { length: 255 }).notNull(),
  nomorTelepon: varchar("nomor_telepon", { length: 50 }).notNull(),
  pendapatanBulanan: decimal("pendapatan_bulanan", {
    precision: 12,
    scale: 2,
  }).notNull(),
});

export const pengajuan = pgTable("pengajuan", {
  idPengajuan: varchar("id_pengajuan", { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  idNasabah: varchar("id_nasabah", { length: 255 })
    .notNull()
    .references(() => nasabah.idNasabah, { onDelete: "cascade" }),
  tenor: integer("tenor").notNull(),
  tipePengajuan: varchar("tipe_pengajuan", { length: 100 }).notNull(),
  nominalPengajuan: decimal("nominal_pengajuan", {
    precision: 12,
    scale: 2,
  }).notNull(),
  tanggalPengajuan: timestamp("tanggal_pengajuan").defaultNow().notNull(),
  pembayaranPerbulan: decimal("pembayaran_perbulan", {
    precision: 12,
    scale: 2,
  }).notNull(),
  status: varchar("status", { length: 20 })
    .notNull()
    .$type<"approve" | "pending" | "reject">(),
  catatan: text("catatan"),
});

export const nasabahRelations = relations(nasabah, ({ many }) => ({
  pengajuan: many(pengajuan),
}));

export const pengajuanRelations = relations(pengajuan, ({ one }) => ({
  nasabah: one(nasabah, {
    fields: [pengajuan.idNasabah],
    references: [nasabah.idNasabah],
  }),
}));
