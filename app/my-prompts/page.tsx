"use client";
import Loader from "@/components/Loader";
import Promptcard from "@/components/Promptcard";
import { auth, db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { collection, getDocs, doc, WriteBatch, writeBatch, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const page = () => {
  const [user] = useAuthState(auth);
  const [myPrompts, setMyPrompts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch user's prompts
  const getMyPrompts = async (userId: string) => {
    setLoading(true);
    const snippetQuery = query(collection(db, `users/${userId}/posts`),orderBy("createdAt", "desc"));
    const snippetDocs = await getDocs(snippetQuery);
    const posts: PostData[] = snippetDocs.docs.map((doc) => {
      const data = doc.data() as PostData; // Explicitly cast doc.data() as PostData
      return {
        ...data,
      };
    });
    setMyPrompts(posts);
    setLoading(false);
  };
  useEffect(() => {
    if (user) {
      getMyPrompts(user?.uid);
    }
  }, [user]);

  // Function to delete a prompt
  const deletePrompt = async (postId: string) => {
    const confirmed = confirm("Are you sure you want to delete this prompt?");
    if (confirmed) {
      const userPostsDocRef = doc(db, `users/${user?.uid}/posts`, postId);
      const allPostsDocRef = doc(db, "posts", postId);
      try {
        // Create a batch write operation for atomicity
        const batch: WriteBatch = writeBatch(db);
        batch.delete(userPostsDocRef);
        batch.delete(allPostsDocRef);
        // Commit the batch write operation
        await batch.commit();
        // Update the UI by filtering out the deleted post
        const updatedPosts = myPrompts?.filter(
          (item) => item.postId !== postId
        );
        setMyPrompts(updatedPosts);
      } catch (error) {
        // Handle errors during post deletion
        alert("Error deleting post: " + error);
      }
    }
  };

  // Render the loader when data is being fetched
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="text-5xl text-center font-bold pt-14 max-w-6xl mx-auto">
        <span className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center">
          Welcome to your personalised profile feed
        </span>
      </h1>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 py-10  lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {myPrompts.map((post) => (
          // Rendering Promptcard component for each fetched post
            <Promptcard key={post.postId} {...post} deletePrompt={deletePrompt} />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
