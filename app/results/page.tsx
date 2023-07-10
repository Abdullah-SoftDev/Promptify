import Promptcard from "@/components/Promptcard";
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { DocumentData, query, collection, orderBy, getDocs } from "firebase/firestore";
import Fuse from "fuse.js";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  searchParams: { search_query?: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const title = Array.isArray(searchParams.search_query)
    ? searchParams.search_query[0]
    : searchParams.search_query;

  return {
    title: `Search - ${title}` || '',
  };
}

const Page = async ({ searchParams }: Props) => {
  const search = searchParams?.search_query; // Extract the search query

  let posts: PostData[] = []; // Declare an empty array to store the posts

  if (search) {
    const snippetQuery = query(collection(db, "posts"), orderBy("tag"), orderBy("createdAt", "desc"));
    const snippetDocs = await getDocs(snippetQuery);

    const matchedResults = search
      ? fuzzyMatch(search, snippetDocs.docs.map((doc) => doc.data()))
      : [];

    posts = matchedResults
      .map((result: any) => {
        const matchingDoc = snippetDocs.docs.find(
          (doc) =>
            doc.data().tag === result.tag ||
            doc.data().prompt === result.prompt ||
            doc.data().creatorName === result.creatorName
        );

        if (matchingDoc) {
          const data = matchingDoc.data() as PostData;
          return {
            ...data,
          };
        }
        return null;
      })
      .filter(Boolean) as PostData[];
  }

  // Function to perform fuzzy matching
  function fuzzyMatch(query: any, results: DocumentData[]) {
    const fuse = new Fuse(results, {
      keys: ["tag", "prompt", "creatorName"],
      includeScore: true,
      threshold: 0.2,
    });

    const matches = fuse.search(query);
    const sortedMatches = matches.sort((a, b) => a.score! - b.score!);
    const matchedResults = sortedMatches.map((match) => match.item);

    return matchedResults;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-2 xl:px-0 pt-10 sm:pt-14 pb-14">
        {posts.length === 0 && notFound()}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Promptcard key={post.postId} {...post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;