const ChatgptButton = () => {
  const handleShareButtonClick = () => {
    const chatgptUrl = 'https://chat.openai.com/?model=text-davinci-002-render-sha';
    window.open(chatgptUrl, '_blank', 'width=600,height=300');
  };
  return (
    <img onClick={handleShareButtonClick} className="w-6 h-6 cursor-pointer" src="/chatgptIcon.png" alt="chatgpt-image" />
  )
}

export default ChatgptButton