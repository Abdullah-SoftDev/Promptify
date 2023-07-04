'use client'
import Promptcard from "@/components/Promptcard";
import { auth, db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { CollectionReference, DocumentData, collection, QuerySnapshot, getDocs, doc, getDoc, DocumentSnapshot, DocumentReference, WriteBatch, writeBatch } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const page = () => {
  const [user] = useAuthState(auth);
  const [myPrompts, setMyPrompts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(false)
  const getMyPrompts = async (userId: any) => {
    setLoading(true);
    const snippetQuery: CollectionReference<DocumentData> = collection(db, `users/${userId}/post`);
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
    getMyPrompts(user?.uid)
  }, [user])

  const deletePrompt = async (postId: string) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      const docRef = doc(db, `users/${user?.uid}/post`, postId);
      const newDocRef = doc(db, "post", postId);
      try {
        // Create a batch write operation for atomicity
        const batch: WriteBatch = writeBatch(db);
        batch.delete(docRef);
        batch.delete(newDocRef);
        // Commit the batch write operation
        await batch.commit();
        const filteredPosts = myPrompts?.filter((item) => item.postId !== postId);
        setMyPrompts(filteredPosts)
      } catch (error) {
        // Handle errors during form submission
        alert("Deleting post error" + error);
      }
    }
  };

  if (loading) {
    return <p className="text-red-600 text-center text-4xl">Loading...</p>
  }

  return (
    <>
      <h1 className='text-5xl text-center font-bold pt-14 max-w-6xl mx-auto'>
        <span className='bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center'>Welcome to your personalised profile feed
        </span>
      </h1>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 py-10  lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {myPrompts.map((post) => (
            <Promptcard key={post.postId} {...post} deletePrompt={deletePrompt} />
          ))}
        </div>
      </div>
    </>
  )
}

export default page