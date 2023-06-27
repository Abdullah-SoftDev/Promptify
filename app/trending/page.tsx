import Promptsection from "@/components/Promptsection"

const page = () => {
  return (
   <>
    <h1 className="text-5xl text-center font-bold tracking-tight text-gray-900 pt-14 max-w-6xl mx-auto px-6 bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent">
        Top Trending Prompts of the day
    </h1>
    <Promptsection/>
   </>
  )
}

export default page