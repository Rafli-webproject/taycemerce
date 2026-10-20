"use client";

import type { Product } from "@/lib/types";

type Props = {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
};

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

export function ProductTable({ products, onEdit, onDelete }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-fg-muted">Belum ada produk.</p>
      </div>
    );
  }

  return (
    <>
      {/* MOBILE */}
      <div className="space-y-3 sm:hidden">
        {products.map((p) => (
          <div key={p.id} className="rounded-lg border border-border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-fg">{p.nama}</p>
                <p className="mt-1 line-clamp-2 text-xs text-fg-muted">{p.deskripsi || "-"}</p>
                <p className="mt-2 text-xs text-fg-muted">Stok: {p.stok}</p>
              </div>
              <p className="shrink-0 text-sm font-medium text-primary">{formatRupiah(p.harga)}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => onEdit(p)} className="flex-1 rounded-md border border-border py-2 text-xs font-medium hover:bg-surface">Edit</button>
              <button onClick={() => onDelete(p.id)} className="flex-1 rounded-md border border-border py-2 text-xs font-medium hover:border-danger hover:text-danger">Hapus</button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden overflow-hidden rounded-lg border border-border bg-white shadow-sm sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-primary text-left">
              <th className="px-4 py-3 font-medium text-white">Nama</th>
              <th className="px-4 py-3 font-medium text-white">Deskripsi</th>
              <th className="px-4 py-3 font-medium text-white">Harga</th>
              <th className="px-4 py-3 font-medium text-white">Stok</th>
              <th className="px-4 py-3 text-right font-medium text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface/50">
                <td className="px-4 py-3 font-medium text-fg">{p.nama}</td>
                <td className="px-4 py-3 text-fg-muted">{p.deskripsi ?? "-"}</td>
                <td className="px-4 py-3 text-fg">{formatRupiah(p.harga)}</td>
                <td className="px-4 py-3 text-fg">{p.stok}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(p)} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-primary-soft hover:border-primary hover:text-primary transition-colors">Edit</button>
                    <button onClick={() => onDelete(p.id)} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:border-danger hover:text-danger transition-colors">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}