'use client'

export default function LikeButton({ getMorePost }: any) {
    return (
        <button
            onClick={async () => {
                await getMorePost()
            }}
        >
            Like
        </button>
    )
}