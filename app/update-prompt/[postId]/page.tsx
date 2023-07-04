import Form from "@/components/Form"
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const page = async ({ params }: any) => {
  const { postId } = params;
  console.log(postId)
  const docRef = doc(
    db,
    "post",
    postId
  );
  const getPromptsById = (await getDoc(docRef)).data();
  console.log(getPromptsById)
  return (
    <Form key={getPromptsById && getPromptsById.postId} {...getPromptsById}/>
  )
}

export default page