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
        <div className='w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer' onClick={handleCopy}>
        <img
          src={
            copied === prompt
              ? "/tick.svg"
              : "/copy.svg"
          }
          alt={copied === prompt ? "tick_icon" : "copy_icon"}
          width={20}
          height={20}
        />
      </div>
    )
}

export default CopyButton