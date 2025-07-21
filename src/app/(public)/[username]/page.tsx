import PublicCardServerSide from "@/components/name-card-serverside/public-card-serverside";
import { CardResponse } from "@/app/store/types/card-type";

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

    const cards: CardResponse = await res.json();

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
