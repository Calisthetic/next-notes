import { ChangeEvent } from "react";

interface CheckButtonProps {
  checkOn?: () => void
  checkOff?: () => void
  defaultChecked?: boolean
}

export default function CheckButton2({checkOn, checkOff, defaultChecked}:CheckButtonProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" defaultChecked={defaultChecked}
      onChange={(event:ChangeEvent<HTMLInputElement>) => {
        event.target.checked ? checkOn ? checkOn() : null : checkOff ? checkOff() : null
      }}/>
      <div className="w-9 h-5 bg-secondary rounded-full peer 
      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[4px] after:start-[2px] after:bg-white after:border-gray-300 
      after:border after:rounded-full after:w-4 after:h-4 after:transition-all dark:border-gray-600 peer-checked:bg-button"></div>
    </label>
  );
}