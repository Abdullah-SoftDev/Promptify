import { Timestamp } from "firebase/firestore";

export type PostData = {
  like: number;
  prompt: string;
  postId: string;
  tag: string;
  createdAt: Timestamp;
  creatorUid: string;
  deletePrompt?: (postId: string) => void;
};
