import Promptcard from "./Promptcard"
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { DocumentData, collection, QuerySnapshot, getDocs, orderBy, query, Query } from "firebase/firestore";

export const dynamic = 'auto';
const Promptsection = async () => {
  const snippetQuery: Query<DocumentData> = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
  );

  const snippetDocs: QuerySnapshot<DocumentData> = await getDocs(snippetQuery);
  const posts: PostData[] = snippetDocs.docs.map((doc) => {
    const data = doc.data() as PostData; // Explicitly cast doc.data() as PostData
    return {
      ...data,
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
    <div className="space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3 mt-10">
    {posts.map((post) => (
          <Promptcard key={post.postId} {...post} />
        ))}
    </div>
  </div>
  )
}

export default Promptsection