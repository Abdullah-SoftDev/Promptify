interface ShareButtonProps {
  prompt: string;
}
const ShareButton = ({ prompt }: ShareButtonProps) => {
  const handleShareButtonClick = () => {
    const chatgptUrl = 'https://chat.openai.com/?model=text-davinci-002-render-sha';
    window.open(chatgptUrl, '_blank', 'width=600,height=300');
  };
  return (
    <img onClick={handleShareButtonClick} className="w-6 h-6 cursor-pointer" src="https://img.icons8.com/?size=1x&id=4GhGzHg3nZeG&format=png" alt="Twitter" />
  )
}

export default ShareButton