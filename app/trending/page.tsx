import Promptcard from "@/components/Promptcard";
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { query, collection, orderBy, getDocs, limit, QueryDocumentSnapshot } from "firebase/firestore";
import { Balancer } from "react-wrap-balancer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Trending Prompts | Promptify',
  description: 'Discover and create trending prompts for AI. Explore popular prompts created by the community and unleash your creativity. Copy and use prompts directly in AI tools!',
};


const page = async () => {
  const postsRef = collection(db, "posts"); // Getting reference to "posts" collection
  const snippetQuery = query(postsRef, orderBy("like", "desc"), limit(5)); // Creating a query to get top 5 posts ordered by likes
  const snippetDocs = await getDocs(snippetQuery); // Getting the query snapshot
  const fetchedPosts: PostData[] = snippetDocs.docs.map(
    (doc: QueryDocumentSnapshot) => {
      const data = doc.data() as PostData; // Casting document data as PostData type
      return {
        ...data,
      };
    }
  );
  return (
    <>
      <div className="max-w-5xl mx-auto px-2 xl:px-0 pt-14">
        <h1 className="text-5xl text-center font-bold">
          <span className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center display">
            <Balancer>
              Top Trending Prompts of the day
            </Balancer>
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-14">
          {fetchedPosts.map((post) => (
            // Rendering Promptcard component for each fetched post
            <Promptcard key={post.postId} {...post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
