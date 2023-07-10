import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Forgot Password | Promptify',
    description: 'Recover your account password. Enter your email address to receive instructions on resetting your password. Regain access to your account now!',
};

export default function ForgotPasswordLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}