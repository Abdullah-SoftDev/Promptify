import { PostsPromps } from "@/types/types"
import { ClipboardIcon, HeartIcon } from "@heroicons/react/24/solid"

const Promptcard = (post: PostsPromps) => {
    return (
        <>
            <article className="flex flex-col items-start justify-between bg-gray-100 p-3 border border-gray-200 rounded-md relative overflow-hidden">
                <div className="flex items-center justify-between gap-x-4 text-xs w-full">
                    <div className="space-x-4">
                        <time dateTime={post.datetime} className="relative z-10 rounded-full bg-gray-300 px-3 py-1.5 font-medium text-gray-700">
                            {post.date}
                        </time>
                        <a
                            href={post.category.href}
                            className="relative z-10 rounded-full bg-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-200"
                        >
                            {post.category.title}
                        </a>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <img className="text-blue-500 w-7 h-7 cursor-pointer" src="/twitter.png" alt="Twitter" />
                        <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                            <ClipboardIcon className="text-blue-500 w-5 h-5 cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="group relative">
                    <p className="py-5 font-medium text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative flex items-center justify-between w-full">
                    <div className="flex gap-4 items-center">
                        <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                        <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                                <a href={post.author.href}>
                                    <span className="absolute inset-0" />
                                    {post.author.name}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <HeartIcon className="w-6 h-6 text-red-500" />
                        <p className="font-medium">999</p>
                    </div>
                </div>
                <div className="pt-5 flex justify-between w-full">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                        Edit
                    </button>
                </div>
            </article>
        </>
    )
}

export default Promptcard