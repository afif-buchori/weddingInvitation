// export async function POST(req) {
//   try {
//     const { username, password } = await req.json();
//     if (username === "admin" && password === "testingPass") {
//       return new Response(JSON.stringify({ message: "Login successful" }), {
//         status: 200,
//       });
//     } else {
//       return new Response(JSON.stringify({ error: "Invalid credentials" }), {
//         status: 401,
//       });
//     }
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//     });
//   }
// }

import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const filePath = path.join(process.cwd(), "database", "dataUser.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(fileData);
    const user = users.find((user) => user.name === username);

    if (user && user.pass === password) {
      return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
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
