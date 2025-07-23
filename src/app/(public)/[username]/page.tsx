import PublicCardServerSide from "@/components/name-card-serverside/public-card-serverside";
import { ICardResponse } from "@/app/store/types/card-type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// Dynamic route page: /[username]
const Page = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  console.log("Page component for username:", username);
  console.log("Fetching card for username:", username);

  try {
    const res = await fetch(
      `http://localhost:8000/api/v1/card/get-card-username/${username}`,
      {
        cache: "no-store", // ensure fresh data on each request
      }
    );

    if (!res.ok) {
      // Handle 404 Not Found gracefully
      if (res.status === 404) {
        return (
          <div className="min-h-screen flex items-center justify-center text-center text-red-500 px-4">
            <p>
              No card found for username: <strong>{username}</strong>
            </p>
          </div>
        );
      }

      // For other errors, throw exception
      throw new Error(`Failed to fetch cards: ${res.status}`);
    }

    const cards: ICardResponse = await res.json();
    const RESERVED_USERNAME = ["profile", "login", "register", "demo", "card"];
    if (RESERVED_USERNAME.includes(username)) {
      return (
        <div className="flex flex-col mt-90 items-center ">
          <div className="min-h-screen items-center justify-center text-center text-red-600 px-4">
            <p>404 | Page Not Found</p>
            <div className="mt-7">
              <Link href="/" className="mt-4 text-blue-600 underline">
                <Button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  Back to home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="p-4 flex items-center justify-center">
          <PublicCardServerSide cards={cards} />
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-600 px-4">
        <p>Something went wrong: {error.message}</p>
      </div>
    );
  }
};

export default Page;
