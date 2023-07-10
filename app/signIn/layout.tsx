import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sign In | Promptify',
    description: 'Sign in to access your account. Enter your credentials and get started with our platform. Join our community and unlock a world of opportunities!',
  };

export default function SignInLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}