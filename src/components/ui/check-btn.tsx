import { cn } from "@/src/lib/utils";
import { useState } from "react";

interface CheckButtonProps {
  checkOn?: () => void
  checkOff?: () => void
  defaultChecked?: boolean
}

export default function CheckButton({checkOn, checkOff, defaultChecked}:CheckButtonProps) {
  const [state, setState] = useState(defaultChecked)
  function ChangeState() {
    setState(!state)
    if (state) {
      checkOn ? checkOn() : null
    } else {
      checkOff ? checkOff() : null
    }
  }

  return (
      <button onClick={() => ChangeState()}
      className="rounded-full h-5 w-5 outline outline-1 outline-button overflow-hidden">
        <svg fill="none" height="24" className="stroke-button h-5 w-5 absolute" strokeLinecap="round" 
        strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <div className={cn("bg-primary h-5 w-5 transition-transform", {
          "translate-x-5": state,
          "translate-x-0": !state
        })}></div>
      </button>
      // <label className="relative inline-flex items-center cursor-pointer">
      //   <input type="checkbox" value="" className="sr-only peer" defaultChecked={defaultChecked}
      //   onChange={(event:ChangeEvent<HTMLInputElement>) => {
      //     event.target.checked ? checkOn ? checkOn() : null : checkOff ? checkOff() : null
      //   }}/>
      //   <div className="w-9 h-5 bg-gray-500 rounded-full peer peer-checked:after:translate-x-full 
      //   rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
      //   after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-white after:border 
      //   after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-button"></div>
      // </label>
  );
}