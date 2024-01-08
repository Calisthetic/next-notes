import { ChangeEvent } from "react";

interface CheckButtonProps {
  checkOn?: () => void
  checkOff?: () => void
}

export default function CheckButton({checkOn, checkOff}:CheckButtonProps) {
  const voidFunc = () => {}

  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer"
        onChange={(event:ChangeEvent<HTMLInputElement>) => {
          event.target.checked ? checkOn ? checkOn() : voidFunc() : checkOff ? checkOff() : voidFunc()
        }}/>
        <div className="w-9 h-5 bg-gray-500 rounded-full peer peer-checked:after:translate-x-full 
        rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
        after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-white after:border 
        after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-button"></div>
      </label>
    </div>
  );
}