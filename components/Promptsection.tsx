import Promptcard from "./Promptcard";
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto'

const Promptsection = async () => {
  // Fetching the prompts posts for the homepage
  const snippetQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
  );
  const snippetDocs = await getDocs(snippetQuery);
  const posts: PostData[] = snippetDocs.docs.map((doc) => {
    const data = doc.data() as PostData; // Explicitly cast doc.data() as PostData
    return {
      id: doc.id,
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
    <div className="max-w-5xl mx-auto px-2 xl:px-0 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
