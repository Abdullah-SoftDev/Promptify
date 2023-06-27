import { PostsPromps } from "@/types/types"
import { ClipboardIcon, HeartIcon } from "@heroicons/react/24/solid"

const Promptcard = (post: PostsPromps) => {
    return (
        <article key={post.id} className="flex flex-col items-start justify-between bg-gray-100/50 p-3 border border-gray-200 rounded-md">
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
                    <img className="text-blue-500 w-7 h-7 cursor-pointer" src="/twitter.png" />
                    <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                        <ClipboardIcon className="text-blue-500 w-5 h-5 cursor-pointer" />
                    </div>
                </div>
            </div>
            <div className="group relative">
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
            </div>
            <div className="relative mt-8 flex items-center justify-between w-full">
                <div className="flex gap-4 items-center">
                    <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                            <a href={post.author.href}>
                                <span className="absolute inset-0" />
                                {post.author.name}
                            </a>
                        </p>
                        <p className="text-gray-600">{post.author.role}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <HeartIcon className="w-6 h-6 text-red-500" />
                    <p>123</p>
                </div>
            </div>
        </article>
    )
}

export default Promptcard