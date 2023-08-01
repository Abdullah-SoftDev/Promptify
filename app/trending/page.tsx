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

type Props = {
  searchParams: { title: string };
}

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto'

const Page = async ({ searchParams }: Props) => {
  console.log(searchParams.title)
  const postsRef = collection(db, "posts");
  const snippetQuery = query(postsRef, orderBy("like", "desc"), limit(5));
  const snippetDocs = await getDocs(snippetQuery);
  const fetchedPosts: PostData[] = snippetDocs.docs.map(
    (doc: QueryDocumentSnapshot) => {
      const data = doc.data() as PostData;
      return {
        ...data,
      };
    }
  )

  return (
    <>
      <div className="max-w-5xl mx-auto px-2 xl:px-0 pt-10 sm:pt-14 pb-14">
        <h1 className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center display text-3xl h-full md:text-4xl font-bold pb-1">
          <Balancer>
            Hottest Prompts of the Day
          </Balancer>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 sm:pt-14">
          {fetchedPosts.map((post) => (
            <Promptcard key={post.postId} {...post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
