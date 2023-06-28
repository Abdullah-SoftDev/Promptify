import Promptsection from "@/components/Promptsection"

const page = () => {
  return (
   <>
    <h1 className='text-5xl text-center font-bold pt-14 max-w-6xl mx-auto'>
        <span className='bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center'>Welcome to your personalised profile feed
</span>
      </h1>
    <Promptsection/>
   </>
  )
}

export default page