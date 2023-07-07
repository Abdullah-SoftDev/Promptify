'use client'
import NextTopLoader from 'nextjs-toploader';

export default function TopLoaderBar() {

    return <>
        <NextTopLoader color="#FF0000"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200} />
    </>
}