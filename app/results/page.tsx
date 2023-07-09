"use client";
import Promptcard from "@/components/Promptcard";
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import Loader from "@/components/Loader";
import { DocumentData, query, collection, orderBy, getDocs } from "firebase/firestore";
import {  useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

const page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search_query");
  alert(search)
  const cleanedSearchQuery = search?.toLowerCase().trim().replace(/[^\w\s]+/g, "").replace(/\s+/g, "");
  const [searchResult, setsearchResult] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);

  const getSearchResult = async () => {
    setLoading(true);
    if(cleanedSearchQuery){
      const snippetQuery = query(collection(db, "posts"), orderBy("tag"), orderBy("createdAt", "desc")); // Creating a query
    const snippetDocs = await getDocs(snippetQuery); // Getting the query snapshot
    // Perform fuzzy matching on the search query against the database results
    const matchedResults = cleanedSearchQuery
      ? fuzzyMatch(
        cleanedSearchQuery,
        snippetDocs.docs.map((doc) => doc.data())
      )
      : [];
    const posts: PostData[] = matchedResults
      .map((result) => {
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
    setsearchResult(posts);
    }
    setLoading(false);
  };

  // Function to perform fuzzy matching
  function fuzzyMatch(query: string, results: DocumentData[]) {
    const fuse = new Fuse(results, {
      keys: ["tag", "prompt", "creatorName"], // Use 'tag' property for matching
      includeScore: true,
      threshold: 0.2, // Adjust the threshold value to control the matching sensitivity
    });

    const matches = fuse.search(query);
    const sortedMatches = matches.sort((a, b) => a.score! - b.score!); // Sort based on the score
    const matchedResults = sortedMatches.map((match) => match.item); // Extract the matched document

    return matchedResults;
  }

  // Fetch the searched prompts
  useEffect(() => {
    getSearchResult();
  }, [search]);

  // Render the Loader component while loading
  if (loading) {
    return <div className="pt-2">
      <Loader />;
    </div>
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-2 xl:px-0 pt-6">
        <h1 className="md:text-5xl text-2xl text-center font-bold">
          <span className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center">
            {searchResult.length === 0 ?"No Searched Results" : "Your Searched Results"}</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
          {(
            searchResult.map((post) => (
              <Promptcard key={post.postId} {...post} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default page;
