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

export type HeartButtonProps = {
  postId: string;
  dbLike: number;
  setDbLike: React.Dispatch<React.SetStateAction<number>>;
  creatorUid: string;
};

export interface ProfileForm {
  image: string;
  name: string;
}

