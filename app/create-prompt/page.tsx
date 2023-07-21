import Form from "@/components/Form"
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Create and Share Prompts | Promptify',
  description: 'Generate creative prompts to inspire and challenge others. Share your prompts for others to use with AI tools and spark their creativity. Start creating and sharing prompts now!',
};

 
const Page = () => {
    return (
      <Form/>
    )
}

export default Page