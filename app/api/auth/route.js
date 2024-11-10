import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// LOGIN
export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const filePath = path.join(process.cwd(), "database", "dataUser.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(fileData);
    const user = users.find((user) => user.name === username);

    if (user && user.pass === password) {
      // Buat token JWT
      const token = jwt.sign({ username: user.name }, SECRET_KEY, {
        expiresIn: "1h", // Token berlaku selama 1 jam
      });

      return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
        headers: {
          "Set-Cookie": `authToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict;`,
        },
      });
    } else {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// LOGOUT
export async function GET(req) {
  try {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("authToken", "", { path: "/", maxAge: 0 });
    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Invalid or expired token" }),
      { status: 401 }
    );
  }
}
