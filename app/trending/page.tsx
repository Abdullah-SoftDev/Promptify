import Promptcard from "@/components/Promptcard"; 
import { db } from "@/firebase/firebaseConfig"; 
import { PostData } from "@/types/typescript.types"; 
import { query, collection, orderBy, getDocs, limit, QueryDocumentSnapshot } from "firebase/firestore"; 

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
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h1 className="pt-14 text-5xl font-bold leading-[1.15] text-black sm:text-6xl text-center">
          <span className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center">
            Top Trending Prompts of the day
          </span>
        </h1>
        <div className="space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3 mt-10">
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
