"use client";

import { useState } from "react";
import type { Product, ProductInput } from "@/lib/types";

type Props = {
  onSubmit: (data: ProductInput) => void;
  editing: Product | null;
  onCancelEdit: () => void;
};

const STEP = 500;

export function ProductForm({ onSubmit, editing, onCancelEdit }: Props) {
  const [nama, setNama] = useState(editing?.nama ?? "");
  const [deskripsi, setDeskripsi] = useState(editing?.deskripsi ?? "");
  const [harga, setHarga] = useState(editing ? String(editing.harga) : "");
  const [stok, setStok] = useState(editing ? String(editing.stok) : "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nama.trim()) return;
    onSubmit({
      nama: nama.trim(),
      deskripsi: deskripsi.trim(),
      harga: Number(harga) || 0,
      stok: Number(stok) || 0,
    });
    if (!editing) {
      setNama(""); setDeskripsi(""); setHarga(""); setStok("");
    }
  }

  return (
    <div className="rounded-lg border border-border bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-base font-semibold text-fg">
        {editing ? "Edit Produk" : "Tambah Produk Baru"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-fg">Nama Produk</label>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required
            className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-fg">Deskripsi</label>
          <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows={2}
            className="mt-1.5 w-full resize-none rounded-md border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-fg">Harga (Rp)</label>
            <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} min={0}
              className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-fg">Stok</label>
            <input type="number" value={stok} onChange={(e) => setStok(e.target.value)} min={0}
              className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
          <button type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover sm:w-auto">
            {editing ? "Update" : "Simpan"}
          </button>
          {editing && (
            <button type="button" onClick={onCancelEdit}
              className="w-full rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-fg hover:bg-surface sm:w-auto">
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}