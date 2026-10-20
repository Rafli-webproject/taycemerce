"use client";

import { useEffect, useState } from "react";
import { ProductForm } from "@/components/product-form";
import { ProductTable } from "@/components/product-table";
import type { Product, ProductInput } from "@/lib/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Gagal memuat produk");
      const data = await res.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleSubmit(data: ProductInput) {
    try {
      const isEdit = !!editing;
      const url = isEdit ? `/api/products/${editing.id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menyimpan");
      }

      setEditing(null);
      await fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin hapus produk ini?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus produk");
      if (editing?.id === id) setEditing(null);
      await fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  }

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-primary">Tayemmerce</h1>
          <p className="mt-1 text-sm text-fg-muted">
            Manajemen Produk • {products.length} item
          </p>
        </header>

        {error && (
          <div className="mb-4 rounded-md border border-danger/30 bg-red-50 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        <ProductForm
          key={editing?.id ?? "new"}
          onSubmit={handleSubmit}
          editing={editing}
          onCancelEdit={() => setEditing(null)}
        />

        <div className="mt-8">
          {loading ? (
            <div className="rounded-lg border border-border bg-white p-10 text-center shadow-sm">
              <p className="text-sm text-fg-muted">Memuat data...</p>
            </div>
          ) : (
            <ProductTable
              products={products}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </main>
  );
}