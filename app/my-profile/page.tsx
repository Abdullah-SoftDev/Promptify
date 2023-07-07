'use client'
import { auth, db, storage } from "@/firebase/firebaseConfig";
import { DocumentData, Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";

interface ProfileForm {
  image: string;
  name: string;
}

const Page = () => {
  const [user] = useAuthState(auth);
  const [dbUser, setDbUser] = useState<DocumentData>({});
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const router = useRouter()

  const [profileForm, setProfileForm] = useState<ProfileForm>({
    image: "",
    name: "",
  });

  const imageUploadRef = useRef<HTMLInputElement>(null);

  const getUser = async (userId: string | undefined) => {
    setLoading(true);
    if (userId) {
      const ref = doc(db, `users/${userId}`);
      const res = await getDoc(ref);
      if (res.exists()) {
        const userData = res.data() as DocumentData;
        setDbUser(userData);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser(user?.uid);
  }, [user]);

  useEffect(() => {
    setProfileForm({
      image: dbUser?.photoURL || "",
      name: dbUser?.displayName || "",
    });
  }, [dbUser]);

  const handleImageClick = () => {
    imageUploadRef.current?.click();
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImgLoading(true);
    try {
      const file = e.target.files?.[0];
      if (file) {
        const storageRef = ref(storage, `images/${user?.uid}/${file.name}_${Timestamp.now().seconds}.jpg`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setProfileForm({ ...profileForm, image: downloadURL });
      }
    } catch (error) {
      alert(error)
    }
    setImgLoading(false);
  };

  const updateProfileInDb = async (e: FormEvent) => {
    e.preventDefault();
    await updateProfile({ displayName: profileForm.name, photoURL: profileForm.image });
    const docRef = doc(db, `users/${user?.uid}`);
    await updateDoc(docRef, { displayName: profileForm.name, photoURL: profileForm.image });
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  const SkeletonLoading = () => {
    return (
      <><div className="w-[154px] h-[154px] rounded-full bg-gray-300 animate-pulse mx-auto justify-center items-center"></div><div className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 h-8 bg-gray-300 animate-pulse"></div></>
    );
  };

  return (
    <div className="mx-auto max-w-xl justify-center space-y-14 p-10">
      {loading ? <SkeletonLoading /> :
        (<><div className="justify-center flex">
          <div className="justify-center flex">
            {imgLoading ? <div className="w-[154px] h-[154px] rounded-full bg-gray-300 animate-pulse mx-auto justify-center items-center"></div> : <img
              id="image"
              src={profileForm.image}
              className="w-[154px] h-[154px] rounded-full border border-gray-500 p-0.5 cursor-pointer"
              alt="Image"
              data-name="image"
              onClick={handleImageClick} />}
          </div>
        </div><div>
            <label htmlFor="text" className="block text-lg font-medium leading-6 text-gray-900 pl-4">
              Name
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="text"
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4" />
            </div>
          </div></>)
      }
      <input
        ref={imageUploadRef}
        id="imageUpload"
        name="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <button onClick={(e: React.FormEvent) => {
        updateProfileInDb(e)
        router.push('/')
      }}
      
        type="button"
        className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        {updating ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );
};

export default Page;
