interface ShareButtonProps {
  prompt: string;
}
const ShareButton = ({ prompt }: ShareButtonProps) => {
  const handleShareButtonClick = () => {
    const promptText = `${prompt}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(promptText)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=300');
  };
  return (
    <img onClick={handleShareButtonClick} className="text-blue-500 w-7 h-7 cursor-pointer" src="/twitter.png" alt="Twitter" />
  )
}

export default ShareButton