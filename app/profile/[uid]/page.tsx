import Promptcard from "@/components/Promptcard";
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { DocumentData, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Balancer } from "react-wrap-balancer";

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
    <div className="max-w-5xl mx-auto px-2 xl:px-0 pt-14">
      <h1 className="text-5xl text-center font-bold">
        <span className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center">
          <Balancer>
          {userData?.displayName} profile feed
          </Balancer>
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-14">
        {posts.map((post) => (
          // Rendering Promptcard component for each fetched post
          <Promptcard key={post.postId} {...post} />
        ))}
      </div>
    </div>
  );
};

export default page;
