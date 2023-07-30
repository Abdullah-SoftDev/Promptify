import React, { useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { auth, db } from "@/firebase/firebaseConfig";
import { HeartIcon } from "@heroicons/react/24/solid";
import { WriteBatch, doc, increment, writeBatch } from "firebase/firestore";
import { FormEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useRouter } from "next/navigation";
import { HeartButtonProps } from "@/types/typescript.types";

const HeartButton = ({ postId, dbLike, setDbLike, creatorUid }: HeartButtonProps) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [heartDoc] = useDocument(
    doc(db, `users/${creatorUid}/posts/${postId}/hearts/${user?.uid}`)
  );

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const addHeart = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      setOpen(true);
      return;
    }
    const userPostHeartRef = doc(
      db,
      `users/${creatorUid}/posts/${postId}/hearts/${user?.uid}`
    );
    const userPostRef = doc(db, `users/${creatorUid}/posts/${postId}`);
    const postRef = doc(db, `posts/${postId}`);
    try {
      const batch: WriteBatch = writeBatch(db);
      batch.update(postRef, { like: increment(1) });
      batch.update(userPostRef, { like: increment(1) });
      batch.set(userPostHeartRef, { uid: user?.uid });
      await batch.commit();
      setDbLike((prevCount: number) => prevCount + 1);
    } catch (error) {
      alert("Add Heart Error" + error);
    }
  };

  const removeHeart = async (e: FormEvent) => {
    e.preventDefault();
    const userPostHeartRef = doc(
      db,
      `users/${creatorUid}/posts/${postId}/hearts/${user?.uid}`
    );
    const userPostRef = doc(db, `users/${creatorUid}/posts/${postId}`);
    const postRef = doc(db, `posts/${postId}`);
    try {
      const batch: WriteBatch = writeBatch(db);
      batch.update(postRef, { like: increment(-1) });
      batch.update(userPostRef, { like: increment(-1) });
      batch.delete(userPostHeartRef);
      await batch.commit();
      setDbLike((prevCount: number) => prevCount - 1);
    } catch (error) {
      alert("Remove Heart Error" + error);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-1">
        {!heartDoc?.exists() ? (
          <HeartIcon
            onClick={addHeart}
            className="w-6 h-6 text-gray-300 cursor-pointer"
          />
        ) : (
          <HeartIcon
            onClick={removeHeart}
            className="w-6 h-6 text-rose-500 cursor-pointer"
          />
        )}
        <p className="font-medium">{dbLike}</p>
      </div>

      {/* Modal */}
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block p-5 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationCircleIcon
                        className="h-6 w-6 text-rose-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h1"
                        className="text-xl leading-6 font-medium text-gray-900"
                      >
                        Login First💀
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-md text-gray-500 font-medium">
                          Login first to enjoy this functionality. Your data
                          will be permanently saved.😊
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => router.push("/signIn")}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default HeartButton;
