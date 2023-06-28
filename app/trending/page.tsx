import Promptsection from "@/components/Promptsection"

const page = () => {
  return (
    <>
      <h1 className='pt-14 text-5xl font-bold leading-[1.15] text-black sm:text-6xl text-center'>
        <span className='bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center'>Top Trending Prompts of the day</span>
      </h1>
      <Promptsection />
    </>
  )
}

export default page