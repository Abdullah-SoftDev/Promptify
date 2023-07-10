import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'My Profile | Promptify',
  description: 'View and edit your profile information. Customize your personal details, update your bio, and manage your preferences. Enhance your profile and make it uniquely yours!',
};

export default function MyProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}