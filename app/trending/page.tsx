import Promptcard from "@/components/Promptcard";
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { Query, DocumentData, query, collection, orderBy, QuerySnapshot, getDocs, limit } from "firebase/firestore";

const page = async () => {
  const snippetQuery: Query<DocumentData> = query(
    collection(db, "posts"),
    orderBy("like", "asc"),
    limit(5)
  );

  const snippetDocs: QuerySnapshot<DocumentData> = await getDocs(snippetQuery);
  const posts: PostData[] = snippetDocs.docs.map((doc) => {
    const data = doc.data() as PostData; // Explicitly cast doc.data() as PostData
    return {
      ...data,
    };
  });
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h1 className='pt-14 text-5xl font-bold leading-[1.15] text-black sm:text-6xl text-center'>
          <span className='bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center'>Top Trending Prompts of the day</span>
        </h1>
        <div className="space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3 mt-10">
          {posts.map((post) => (
            <Promptcard key={post.postId} {...post} />
          ))}
        </div>
      </div>
    </>
  )
}

export default page