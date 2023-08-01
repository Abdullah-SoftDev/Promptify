import Feed from "@/components/Feed";
import Footer from "@/components/Footer";
import Herosection from "@/components/Herosection";

type Props = {
  searchParams: { title: string };
}

const page = async ({ searchParams }: Props) => {
  console.log(searchParams.title)
  return (
    <>
      <Herosection />
      <Feed />
      <Footer />
    </>
  )
}

export default page