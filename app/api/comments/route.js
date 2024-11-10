import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "database", "dataComment.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const comments = JSON.parse(fileData);

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error reading file:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const filePath = path.join(process.cwd(), "database", "dataComment.json");

    // Baca data saat ini
    const fileData = fs.readFileSync(filePath, "utf8");
    const comments = JSON.parse(fileData);

    // Data baru yang akan menggantikan
    const updatedData = await req.json();

    // Perbarui data berdasarkan input
    const mergedData = [updatedData, ...comments];

    // Simpan perubahan ke file
    fs.writeFileSync(filePath, JSON.stringify(mergedData, null, 2), "utf8");

    return new Response(
      JSON.stringify({ message: "Data updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating data:", error);
    return new Response(JSON.stringify({ error: "Failed to update data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
