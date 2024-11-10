import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "database", "dataWedding.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const weddingData = JSON.parse(fileData);

    return new Response(JSON.stringify(weddingData), {
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
