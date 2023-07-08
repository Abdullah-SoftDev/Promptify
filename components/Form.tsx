"use client";
import { auth, db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { Timestamp, WriteBatch, collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Form = ({ prompt, tag, postId }: { prompt?:string, tag?:string, postId?:string }) => {
  const pathName = usePathname();
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [createPromptForm, setCreatePromptForm] = useState({
    tag: tag || "",
    prompt: prompt || "",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCreatePromptForm({ ...createPromptForm, [name]: value });
  };

  // Submit the form data to Firebase
  const createPrompt = async (e: FormEvent) => {
    e.preventDefault();
    if (createPromptForm.tag.length < 5 || createPromptForm.tag.length > 15) {
      alert("Tag length must be between 5 and 15 characters.");
      return;
    }
    if (createPromptForm.prompt.length < 15) {
      alert("Prompt length must be at least 15 characters.");
      return;
    }
    // Generate a new unique postId for the prompt
    const newPostId = doc(collection(db, "ids")).id;
    // Set up document references for the user's post and the general post collection
    const userPostRef = doc(db, `users/${user?.uid}/posts`, newPostId);
    const generalPostRef = doc(db, "posts", newPostId);
    // Set the loading state to indicate form submission in progress
    setLoading(true);
    try {
      // Create a batch write operation for atomicity
      const batch: WriteBatch = writeBatch(db);
      // Create a new prompt object with the form data
      const newPrompt: PostData = {
        postId: newPostId,
        tag: createPromptForm.tag,
        prompt: createPromptForm.prompt,
        creatorUid: user?.uid!,
        like: 0,
        createdAt: serverTimestamp() as Timestamp,
      };
      // Add the new prompt to the user's post collection and the general post collection
      batch.set(userPostRef, newPrompt);
      batch.set(generalPostRef, newPrompt);
      // Commit the batch write operation
      await batch.commit();
      // Reset the create prompt form fields
      setCreatePromptForm({
        tag: "",
        prompt: "",
      });
      // Navigate to the home page
      router.push("/");
      router.refresh();
    } catch (error) {
      // Handle errors during form submission
      alert("Error occurred while submitting the form: " + error);
    }
    // Set the loading state back to false
    setLoading(false);
  };

  // Update the form data to Firebase
  const handleUpdatePrompt = async (e: FormEvent) => {
    e.preventDefault();
    if(user && postId){
      const userPostRef = doc(db, `users/${user?.uid}/posts`, postId);
      const generalPostRef = doc(db, "posts", postId);
    setLoading(true);
    try {
      // Create a batch write operation for atomicity
      const batch: WriteBatch = writeBatch(db);
      const updatedSnippet = {
        tag: createPromptForm.tag,
        prompt: createPromptForm.prompt,
      };
      // Update the prompt in the user's post collection and the general post collection
      batch.update(userPostRef, updatedSnippet);
      batch.update(generalPostRef, updatedSnippet);
      // Commit the batch write operation
      await batch.commit();
      // Reset the create prompt form fields
      setCreatePromptForm({
        tag: "",
        prompt: "",
      });
      // Navigate to the my prompts page
      router.push("/my-prompts");
    } catch (error) {
      // Handle errors during form submission
      alert("Error occurred while updating the prompt: " + error);
    }
    // Set the loading state back to false
    setLoading(false);
  };
}

  // Cancel form submission
  const handelCancel = () => {
    setCreatePromptForm({
      tag: tag || "",
      prompt: prompt || "",
    });
  };

  return (
    <div className="bg-white px-6 py-20 lg:px-8 ">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-5xl font-bold leading-[1.15] text-black sm:text-6xl text-center">
          <span className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center">
            Create Prompt
          </span>
        </h1>
        <p className="mt-7 text-lg text-gray-600 sm:text-xl max-w-2xl">
          Create and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Field of Prompt (#product, #webdevelopment, #idea, etc.)
            </label>
            <div className="mt-2.5">
              <input
                value={createPromptForm.tag}
                onChange={handleInputChange}
                type="text"
                name="tag"
                id="company"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Your AI Prompt
            </label>
            <div className="mt-2.5">
              <textarea
                value={createPromptForm.prompt}
                name="prompt"
                onChange={handleInputChange}
                id="text"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-between">
          <button
            type="button"
            onClick={handelCancel}
            className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-300 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          {pathName === `/update-prompt/${postId}` && (
            <button
              onClick={handleUpdatePrompt}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          )}
          {pathName === "/create-prompt" && (
            <button
              onClick={createPrompt}
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              {loading ? "Loading..." : "Create"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
