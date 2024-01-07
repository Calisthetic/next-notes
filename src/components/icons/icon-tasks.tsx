import { ClassesProps } from "@/src/lib/interfaces/classes-props";
import { FunctionComponent } from "react";
 
const IconTasks: FunctionComponent<ClassesProps> = ({classes}:ClassesProps) => {
  return (
    <svg className={classes} fill="none" height="24" stroke-width="1.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6L20 6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.80002 5.79999L4.60002 6.59998L6.60001 4.59999" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.80002 11.8L4.60002 12.6L6.60001 10.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.80002 17.8L4.60002 18.6L6.60001 16.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 12L20 12" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 18L20 18" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}
 
export default IconTasks;