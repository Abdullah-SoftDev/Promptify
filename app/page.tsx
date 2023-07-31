import Feed from "@/components/Feed";
import Footer from "@/components/Footer";
import Herosection from "@/components/Herosection";
import { Metadata } from "next";

type Props = {
  searchParams: { search_query?: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const title = Array.isArray(searchParams.search_query)
    ? searchParams.search_query[0]
    : searchParams.search_query;

  return {
    title: `Search - ${title}` || '',
  };
}

const page = async () => {
  return (
    <>
      <Herosection />
      <Feed />
      <Footer />
    </>
  )
}

export default page