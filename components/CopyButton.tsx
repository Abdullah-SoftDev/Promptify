import { ArrowRightIcon, CheckBadgeIcon, ClipboardIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
interface CopyButtonProps {
    prompt: string;
}

const CopyButton = ({ prompt }: CopyButtonProps) => {
    const [copied, setCopied] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(prompt);
        setTimeout(() => setCopied(""), 1000);
    };
    return (
        <div onClick={handleCopy} className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
            {copied ? <CheckBadgeIcon className="text-blue-500 w-7 h-7 cursor-pointer" /> : <ClipboardIcon className="text-blue-500 w-5 h-5 cursor-pointer" />}
        </div>
    )
}

export default CopyButton