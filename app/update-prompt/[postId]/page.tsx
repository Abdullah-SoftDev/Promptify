import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Form from "@/components/Form";

const page = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  const docSnapshot = await getDoc(doc(db, "posts", postId));
  const getPromptsById = docSnapshot.data();
  
  return <Form key={getPromptsById?.postId} {...getPromptsById} />;
};

export default page;
