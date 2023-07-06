'use client'
import Promptcard from "@/components/Promptcard"
import {  db } from "@/firebase/firebaseConfig"
import { PostData } from "@/types/typescript.types"
import { Query, DocumentData, query, collection, orderBy, limit, QuerySnapshot, getDocs, where } from "firebase/firestore"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const page = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('search_query')
    console.log(search)
    const cleanedSearchQuery = search?.toLowerCase().trim().replace(/[^\w\s]+/g, '').replace(/\s+/g, '');
    const lowercaseSearchQueryEnd = cleanedSearchQuery + '\uf8ff';

    const [myPrompts, setMyPrompts] = useState<PostData[]>([])
    const [loading, setLoading] = useState(false)
    const getMyPrompts = async () => {
        setLoading(true);
        const snippetQuery: Query<DocumentData> = query(
            collection(db, "posts"),
            orderBy("tag"),
            orderBy("createdAt", "desc"),
            where("tag", ">=", cleanedSearchQuery),
            where("tag", "<=", lowercaseSearchQueryEnd)
        );
        const snippetDocs: QuerySnapshot<DocumentData> = await getDocs(snippetQuery);
        const posts: PostData[] = snippetDocs.docs.map((doc) => {
            const data = doc.data() as PostData; // Explicitly cast doc.data() as PostData
            return {
                ...data,
            };
        });
        setMyPrompts(posts)
        setLoading(false)
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