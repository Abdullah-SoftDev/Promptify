import Promptcard from "./Promptcard";
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

export const dynamic = "auto";
const Promptsection = async () => {
  // Fetching the prompts posts for the homepage
  const LIMIT = 5;
  const snippetQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );
  const snippetDocs = await getDocs(snippetQuery);
  let posts: PostData[] = snippetDocs.docs.map((doc) => {
    const data = doc.data() as PostData; // Explicitly cast doc.data() as PostData
    return {
      ...data,
    };
  });

  // async function getMorePost() {
  //   'use server'
  //   const last = posts[posts.length - 1];
  //   console.log("last",last)
  //   const cursor =  last.createdAt;
  //   console.log("cursor", cursor)
  //   const queryy = query(collectionGroup(db, 'posts'), orderBy('createdAt', 'desc'), startAfter(cursor), limit(LIMIT));
  //   const snippetDocs = await getDocs(queryy);
  //   const newPosts = snippetDocs.docs.map((doc) => {
  //     const data = doc.data() as PostData;
  //     return {
  //       ...data,
  //     };
  //   });
  //   console.log("newPosts",newPosts)
  //   return newPosts;
  // }

  // const newPosts = await getMorePost();
  // posts = posts.concat(newPosts);
  // console.log("Finalposts",posts)
  // revalidatePath("/");

  return (
    <div className="max-w-5xl mx-auto px-2 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-14">
          {posts.map((post) => (
            // Rendering Promptcard component for each fetched post
            <Promptcard key={post.postId} {...post} />
          ))}
        </div>
       {/* <LoadMoreButton getMorePost={getMorePost} /> */}
      </div>
  );
};

export default Promptsection;
