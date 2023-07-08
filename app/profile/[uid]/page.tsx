import Promptcard from "@/components/Promptcard";
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { DocumentData, collection, getDocs, getDoc, doc } from "firebase/firestore";

const page = async ({ params }: { params: { uid: string } }) => {
  const { uid } = params; // Extracting uid from params object

  // Fetch user data
  const userRef = doc(db, `users/${uid}`);
  const userSnapshot = await getDoc(userRef);
  const userData = userSnapshot.data() as DocumentData;

  // Fetch user's profile posts
  const postsQuerySnapshot = await getDocs(
    collection(db, `users/${uid}/posts`)
  );
  const posts: PostData[] = postsQuerySnapshot.docs.map((doc) => {
    const data = doc.data() as PostData; // Explicitly cast doc.data() as PostData
    return {
      id: doc.id,
      ...data,
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <h1 className="text-5xl text-center font-bold pt-14 max-w-6xl mx-auto">
        <span className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center">
          {userData?.displayName} profile feed
        </span>
      </h1>
      <div className="space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3 mt-10">
        {posts.map((post) => (
          // Rendering Promptcard component for each fetched post
          <Promptcard key={post.postId} {...post} />
        ))}
      </div>
    </div>
  );
};

export default page;
