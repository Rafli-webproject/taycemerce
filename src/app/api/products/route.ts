import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// POST /api/products
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, deskripsi, harga, stok } = body;

    if (!nama || typeof nama !== "string") {
      return NextResponse.json({ error: "Nama produk wajib diisi" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        nama: nama.trim(),
        deskripsi: deskripsi?.trim() || null,
        harga: Number(harga) || 0,
        stok: Number(stok) || 0,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[POST /api/products]", error);
    return NextResponse.json({ error: "Gagal menambah produk" }, { status: 500 });
  }
}