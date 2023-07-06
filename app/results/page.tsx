'use client'
import Promptcard from "@/components/Promptcard"
import { db } from "@/firebase/firebaseConfig"
import { PostData } from "@/types/typescript.types"
import { Query, DocumentData, query, collection, orderBy, QuerySnapshot, getDocs } from "firebase/firestore"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Fuse from 'fuse.js';

const page = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('search_query')
    const cleanedSearchQuery = search?.toLowerCase().trim().replace(/[^\w\s]+/g, '').replace(/\s+/g, '');

    const [myPrompts, setMyPrompts] = useState<PostData[]>([])
    const [loading, setLoading] = useState(false)

    const getMyPrompts = async () => {
        setLoading(true);

        const snippetQuery: Query<DocumentData> = query(
            collection(db, 'posts'),
            orderBy('tag'),
            orderBy('createdAt', 'desc')
        );

        const snippetDocs: QuerySnapshot<DocumentData> = await getDocs(snippetQuery);

        // Perform fuzzy matching on the search query against the database results
        const matchedResults = cleanedSearchQuery ? fuzzyMatch(cleanedSearchQuery, snippetDocs.docs.map((doc) => doc.data())) : [];
        const posts: PostData[] = matchedResults.map((result) => {
            const matchingDoc = snippetDocs.docs.find((doc) => (doc.data().tag === result.tag) || doc.data().prompt === result.prompt || doc.data().creatorName
                === result.creatorName
            );
            if (matchingDoc) {
                const data = matchingDoc.data() as PostData;
                return {
                    ...data,
                };
            }
            return null;
        }).filter(Boolean) as PostData[];

        setMyPrompts(posts);
        setLoading(false);
    };

    // Function to perform fuzzy matching
    function fuzzyMatch(query: string, results: DocumentData[]) {
        const fuse = new Fuse(results, {
            keys: ['tag', 'prompt', 'creatorName'], // Use 'tag' property for matching
            includeScore: true,
            threshold: 0.2, // Adjust the threshold value to control the matching sensitivity
        });

        const matches = fuse.search(query);
        const sortedMatches = matches.sort((a, b) => a.score! - b.score!); // Sort based on the score
        const matchedResults = sortedMatches.map((match) => match.item); // Extract the matched document

        return matchedResults;
    }

    useEffect(() => {
        getMyPrompts()
    }, [search])

    if (loading) {
        return <p className="text-red-600 text-center text-4xl">Loading...</p>
    }

    return <>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h1 className='pt-14 text-5xl font-bold leading-[1.15] text-black sm:text-6xl text-center'>
                <span className='bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center'>Searched Prompts</span>
            </h1>
            <div className="space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3 mt-10">
                {myPrompts.map((post) => (
                    <Promptcard key={post.postId} {...post} />
                ))}
            </div>
        </div>
    </>
}

export default page