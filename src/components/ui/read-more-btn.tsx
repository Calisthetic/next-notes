'use client'

import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

interface ReadMoreButtonProps {
  path: string
}
 
const ReadMoreButton: FunctionComponent<ReadMoreButtonProps> = ({path}:ReadMoreButtonProps) => {
  const navigation = useRouter();
  const Navigate = (path: string = "/") => {
    navigation.push(path);
  }
  return (
    <button className="flex items-center capitalize transition-colors text-button w-min px-1
    hover:underline hover:text-button-hover duration-300 transform"
    onClick={() => Navigate(path)}>
      <span className="whitespace-nowrap">read more</span>
      <svg className="w-4 h-4 ml-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
      </svg>
    </button>
  );
}
 
export default ReadMoreButton;