import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'My Published Prompts | Promptify',
    description: 'View all your published prompts in one place. Explore the prompts you have created and shared with the community. Discover the impact of your creativity!',
  };

export default function MyPropmtsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}