import Form from "@/components/Form"
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const page = async ({ params }: any) => {
  const { postId } = params;
  const docRef = doc(
    db,
    "posts",
    postId
  );
  const getPromptsById = (await getDoc(docRef)).data();
  return (
    <Form key={getPromptsById && getPromptsById.postId} {...getPromptsById}/>
  )
}

export default page