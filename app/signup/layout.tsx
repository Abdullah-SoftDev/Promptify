import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sign Up | Promptify',
    description: 'Create a new account and join our platform. Sign up to access exclusive features, connect with others, and unlock exciting opportunities. Get started today!',
  };
  
export default function SignUpLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}