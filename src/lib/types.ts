export type Product = {
  id: number;
  nama: string;
  deskripsi: string | null;
  harga: number;
  stok: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = {
  nama: string;
  deskripsi: string;
  harga: number;
  stok: number;
};