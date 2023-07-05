'use client'
import { auth, db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { Timestamp, WriteBatch, collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";

const Form = ({ prompt, tag, postId }: any) => {
    const pathName = usePathname();
    console.log(pathName)
    // Set up the state for the create prompt form fields
    const [createPromptForm, setCreatePromptForm] = useState({
        tag: tag || "",
        prompt: prompt || "",
    });

    // Set up the state for the loading indicator
    const [loading, setLoading] = useState(false);

    // Get the authenticated user from Firebase
    const [user] = useAuthState(auth);

    // Get the router object for navigation
    const router = useRouter();

    // Handle input changes for the form fields
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCreatePromptForm({ ...createPromptForm, [name]: value });
    };

    // Submit the form data to Firebase
    const submitFormToFirebase = async (e: FormEvent) => {
        e.preventDefault();
        if (createPromptForm.tag.length < 5 || createPromptForm.tag.length > 15) {
            alert("Tag length must be greater than 3 and less than 15 characters.");
            return;
        }
        if (createPromptForm.prompt.length < 15) {
            alert("Prompt length must be greater than 15 characters.");
            return;
        }
        // Generate a new unique postId for the prompt
        const newPostId = doc(collection(db, 'ids')).id;

        // Set up document references for the user's post and the general post collection
        const docRef = doc(db, `users/${user?.uid}/posts`, newPostId);
        const newDocRef = doc(db, 'posts', newPostId);

        // Set the loading state to indicate form submission in progress
        setLoading(true);

        try {
            // Create a batch write operation for atomicity
            const batch: WriteBatch = writeBatch(db);

            // Create a new prompt object with the form data
            const newSnippet: PostData = {
                postId: newPostId,
                tag: createPromptForm.tag,
                prompt: createPromptForm.prompt,
                creatorUid: user?.uid!,
                like: 0,
                createdAt: serverTimestamp() as Timestamp,
            };

            // Add the new prompt to the user's post collection and the general post collection
            batch.set(docRef, newSnippet);
            batch.set(newDocRef, newSnippet);

            // Commit the batch write operation
            await batch.commit();

            // Reset the create prompt form fields
            setCreatePromptForm({
                tag: "",
                prompt: ""
            });

            // Navigate to the home page
            router.push("/");
        } catch (error) {
            // Handle errors during form submission
            alert("Create Prompt Form Error" + error);
        }

        // Set the loading state back to false
        setLoading(false);
    };

    // Update the form data to Firebase
    const handelUpdatePrompt = async (e: FormEvent) => {
        e.preventDefault();
        const docRef = doc(db, `users/${user?.uid}/posts`, postId);
        const newDocRef = doc(db, 'posts', postId);
        setLoading(true)
        try {
            // Create a batch write operation for atomicity
            const batch: WriteBatch = writeBatch(db);
            const newSnippet: any = {
                tag: createPromptForm.tag,
                prompt: createPromptForm.prompt,
            };
            // Add the new prompt to the user's post collection and the general post collection
            batch.update(docRef, newSnippet);
            batch.update(newDocRef, newSnippet);

            // Commit the batch write operation
            await batch.commit();

            // Reset the create prompt form fields
            setCreatePromptForm({
                tag: "",
                prompt: ""
            });

            // Navigate to the home page
            router.push("/my-prompts");
        } catch (error) {
            // Handle errors during form submission
            alert("Create Prompt Form Error" + error);
        }

        // Set the loading state back to false
        setLoading(false);
    };

    const handelCancel = () => {
        setCreatePromptForm({
            tag: tag || "",
            prompt: prompt || "",
        });
    }

    return (
        <div className="isolate bg-white px-6 py-20 lg:px-8 ">
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>

            <div className="mx-auto max-w-2xl text-center">
                <h1 className='text-5xl font-bold leading-[1.15] text-black sm:text-6xl text-center'>
                    <span className='bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center'>Create Prompt</span>
                </h1>
                <p className="mt-7 text-lg text-gray-600 sm:text-xl max-w-2xl">Create and share amazing prompts with the world, and let your
                    imagination run wild with any AI-powered platform.</p>
            </div>
            <div className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
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
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            Your AI Prompt
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                value={createPromptForm.prompt}
                                name="prompt"
                                onChange={handleInputChange}
                                id="text"
                                rows={4}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </textarea>
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
                    {pathName === `/update-prompt/${postId}` && <button
                        onClick={handelUpdatePrompt}
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        {loading ? "Loading..." : "Update"}
                    </button>}
                    {pathName === '/create-prompt' && <button
                        onClick={submitFormToFirebase}
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                        {loading ? "Loading..." : "Create"}
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default Form