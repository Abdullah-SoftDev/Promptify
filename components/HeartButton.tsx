import { auth, db } from "@/firebase/firebaseConfig";
import { HeartIcon } from "@heroicons/react/24/solid"
import { WriteBatch, doc, increment, writeBatch } from "firebase/firestore";
import { FormEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from 'react-firebase-hooks/firestore';

const HeartButton = ({ postId }: any) => {
    const [user] = useAuthState(auth);
    const [heartDoc] = useDocument(doc(db, `users/${user?.uid}/posts/${postId}/hearts/${user?.uid}`));

    const addHeart = async (e: FormEvent) => {
        e.preventDefault();
        const userPostHeartRef = doc(db, `users/${user?.uid}/posts/${postId}/hearts/${user?.uid}`);
        const userPostRef = doc(db, `users/${user?.uid}/posts/${postId}`);
        const postRef = doc(db, `posts/${postId}`);
        try {
            const batch: WriteBatch = writeBatch(db);
            batch.update(postRef, { like: increment(1) });
            batch.update(userPostRef, { like: increment(1) });
            batch.set(userPostHeartRef, { uid: user?.uid });
            await batch.commit();
        } catch (error) {
            alert("Add Heart Error" + error);
        }
    }

    const removeHeart = async (e: FormEvent) => {
        e.preventDefault();
        const userPostHeartRef = doc(db, `users/${user?.uid}/posts/${postId}/hearts/${user?.uid}`);
        const userPostRef = doc(db, `users/${user?.uid}/posts/${postId}`);
        const postRef = doc(db, `posts/${postId}`);
        try {
            const batch: WriteBatch = writeBatch(db);
            batch.update(postRef, { like: increment(-1) });
            batch.update(userPostRef, { like: increment(-1) });
            batch.delete(userPostHeartRef);
            await batch.commit();
        } catch (error) {
            alert("Remove Heart Error" + error);
        }
    }

    return (
        <div className="flex items-center space-x-1">
            {!(heartDoc?.exists()) ? <HeartIcon onClick={addHeart} className="w-6 h-6 text-gray-300 cursor-pointer" /> : <HeartIcon onClick={removeHeart} className="w-6 h-6 text-red-500 cursor-pointer" />
            }
            <p className="font-medium">999</p>
        </div>
    )
}

export default HeartButton