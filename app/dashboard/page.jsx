import axios from "axios";
import React from "react";
import Button from "../components/button/Button";
import TableView from "./Partials/TableView";
import { LogOut } from "lucide-react";

export default async function Dashboard() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/data-wedding`
    );

    return (
      <>
        <div className="w-full max-w-2xl mx-auto p-4 flex justify-end gap-4">
          <form action="/api/auth" method="GET">
            <Button type="submit" className="ml-auto gap-4">
              <LogOut size={16} /> Logout
            </Button>
          </form>
        </div>
        <div className="max-w-xl mx-auto px-4">
          <TableView weddingData={res.data} />
          {/* <pre>{JSON.stringify(weddingData, null, 2)}</pre> */}
        </div>
      </>
    );
  } catch (error) {
    // console.error("Failed to fetch data:", error);
    return (
      <div className="w-full min-h-screen grid place-content-center">
        <p className="text-xl font-bold">Internal Server Error</p>
      </div>
    );
  }
}

// import { cookies } from "next/headers";
// import React from "react";

// function DashboardPage() {
//   const cookieStore = cookies();
//   const tes = cookieStore.get("authToken").value.toString();
//   return (
//     <div>
//       <div className="max-w-xl mx-auto px-4 py-16">tsting</div>
//       <p>{tes}</p>
//     </div>
//   );
// }

// export default DashboardPage;
