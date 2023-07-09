"use client";
import { FIREBASE_ERRORS } from "@/firebase/error";
import { auth, db } from "@/firebase/firebaseConfig";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [displayedError, setDisplayedError] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update the login form state based on input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  // Handle form submission
  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (loginForm.password !== loginForm.confirmPassword) {
      setDisplayedError("Passwords do not match.");
      return;
    }
    await createUserWithEmailAndPassword(loginForm.email, loginForm.password);
    await signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  // Handle useEffect to display error message if an error occurs
  useEffect(() => {
    if (error) {
      setDisplayedError((error).message);
    }
  }, [error]);

  // Redirect if user is already signed in
  if (user) {
    router.push("/");
  }

  // Create user document in Firestore on email authentication 
  const createUserDocumentOnEmailauth = async (user: User) => {
    const docRef = doc(db, "users", user?.uid);
    await setDoc(docRef, JSON.parse(JSON.stringify(user)));
  };
  useEffect(() => {
    if (user) {
      createUserDocumentOnEmailauth(user.user);
    }
  }, [user]);

  return (
    <>
      {displayedError && (
        <>
          {toast.error(FIREBASE_ERRORS[displayedError])}
          {setDisplayedError(null)}
        </>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmitForm} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleInputChange}
                  type="email"
                  autoComplete="email"
                  required
                  className="block outline-none p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleInputChange}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block outline-none p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="confirmPassword"
                  value={loginForm.confirmPassword}
                  onChange={handleInputChange}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block outline-none p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-md text-gray-500">
            Back to sign In?{" "}
            <Link
              href="/signIn"
              className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
