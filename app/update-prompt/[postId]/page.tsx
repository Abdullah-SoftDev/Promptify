import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Form from "@/components/Form";

const page = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params; // Extracting postId from params object
  const docSnapshot = await getDoc(doc(db, "posts", postId)); // Retrieving document snapshot for the specified postId
  const getPromptsById = docSnapshot.data(); // Extracting data from the document snapshot

  // Rendering the Form component with the data
  return <Form key={getPromptsById?.postId} {...getPromptsById} />;
};

export default page;
