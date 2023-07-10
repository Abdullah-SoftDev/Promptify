import Promptcard from "@/components/Promptcard";
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { DocumentData, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Metadata } from "next";
import { Balancer } from "react-wrap-balancer";

type Props = {
  params: { uid: string };
  searchParams: { [username: string]: string | string[] | undefined };
};

// or Dynamic metadata
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const username = Array.isArray(searchParams.username)
    ? searchParams.username[0] // Take the first element if it's an array
    : searchParams.username; // Otherwise, use the value as is

  return {
    title: username || '', // Ensure a string value for the title
  };
}

const page = async ({ params }: Props) => {
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
    <div className="max-w-5xl mx-auto px-2 xl:px-0 pt-10 sm:pt-14 pb-14">
      <h1 className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center display text-3xl h-full md:text-4xl font-bold pb-1">
        <Balancer>
          {userData?.displayName} profile
        </Balancer>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 sm:pt-14">
        {posts.map((post) => (
          // Rendering Promptcard component for each fetched post
          <Promptcard key={post.postId} {...post} />
        ))}
      </div>
    </div>
  );
};

export default page;
