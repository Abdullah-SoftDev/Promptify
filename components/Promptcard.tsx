"use client";
import { PostData } from "@/types/typescript.types";
import Link from "next/link";
import CopyButton from "./CopyButton";
import { usePathname } from "next/navigation";
import HeartButton from "./HeartButton";
import { db } from "@/firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import ChatgptButton from "./ChatgptButton";

const Promptcard = ({ like, prompt, postId, tag, creatorUid, deletePrompt }: PostData) => {
  const pathName = usePathname();
  const [dbUser, setDbUser] = useState<DocumentData>({});
  const [dbLike, setDbLike] = useState(like);
  const [loading, setLoading] = useState(false);

  // Get user information from database
  const getUser = async (userId: string) => {
    setLoading(true);
    const ref = doc(db, `users/${userId}`);
    const res = await getDoc(ref);
    if (res.exists()) {
      const userData = res.data() as DocumentData;
      setDbUser(userData);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (creatorUid) {
      getUser(creatorUid);
    }
  }, [creatorUid]);

  return (
    <>
      <article className="flex flex-col items-start justify-between bg-zinc-50 relative overflow-hidden break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter w-full h-fit">
        <div className="flex items-center justify-between gap-x-4 text-xs w-full">
          <p className="relative z-10 rounded-full bg-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-200">
            #{tag}
          </p>
          <div className="flex space-x-4 items-center">
            <ChatgptButton />
            <CopyButton prompt={prompt} />
          </div>
        </div>
        <div className="group relative">
          <p className="py-5 font-medium text-sm leading-6 text-gray-600">
            {prompt}
          </p>
        </div>
        <div className="group relative flex items-center justify-between w-full">
          {loading ? (
            <div className="animate-pulse">
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="w-40 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ) : (
            <Link
              href={`/profile/${creatorUid}/?username=${dbUser?.displayName}`}
            >
              <div className="flex gap-4 items-center">
                <img
                  src={dbUser.photoURL}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    {dbUser.displayName}
                  </p>
                </div>
              </div>
            </Link>
          )}
          <HeartButton
            postId={postId}
            dbLike={dbLike}
            setDbLike={setDbLike}
            creatorUid={creatorUid}
          />
        </div>
        {pathName === "/my-prompts" && (
          <div className="pt-5 flex justify-between w-full">
            <button
              onClick={() => {
                if (deletePrompt) {
                  deletePrompt(postId);
                }
              }}
              type="button"
              className="px-4 py-2 text-sm font-medium bg-rose-500 text-white rounded-md hover:bg-rose-600"
            >
              Delete
            </button>

            <Link
              href={`/update-prompt/${postId}`}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
              Edit
            </Link>
          </div>
        )}
      </article>
    </>
  );
};

export default Promptcard;
