import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// PUT /api/products/:id
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const body = await request.json();
    const { nama, deskripsi, harga, stok } = body;

    if (!nama || typeof nama !== "string") {
      return NextResponse.json({ error: "Nama produk wajib diisi" }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        nama: nama.trim(),
        deskripsi: deskripsi?.trim() || null,
        harga: Number(harga) || 0,
        stok: Number(stok) || 0,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PUT /api/products/:id]", error);
    return NextResponse.json({ error: "Gagal mengupdate produk" }, { status: 500 });
  }
}

// DELETE /api/products/:id
export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    await prisma.product.delete({ where: { id: productId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/products/:id]", error);
    return NextResponse.json({ error: "Gagal menghapus produk" }, { status: 500 });
  }
}