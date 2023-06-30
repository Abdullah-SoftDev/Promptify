import { Timestamp } from "firebase/firestore";

export type PostsPromps = {
    id: number;
    title: string;
    href: string;
    description: string;
    date: string;
    datetime: string;
    category: {
        title: string;
        href: string;
    };
    author: {
        name: string;
        role: string;
        href: string;
        imageUrl: string;
    };
}

export type CreatePromptForm ={
    postId:string;
    tag: string;
    prompt: string;
    creatorName: string;
    creatorImageUrl?:string;
    creatorUid: string;
    like: number;
    createdAt: Timestamp;
}