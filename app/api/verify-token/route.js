import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    const { token } = body;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    return new Response(JSON.stringify({ valid: true, decoded }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ valid: false, error: error.message }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
