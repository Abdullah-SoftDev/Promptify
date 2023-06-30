import { Timestamp } from "firebase/firestore";

export type PostData = {
    like: number;
    prompt: string;
    creatorImageUrl: string;
    postId: string;
    tag: string;
    creatorName: string;
    createdAt: Timestamp;
    creatorUid: string;
  };