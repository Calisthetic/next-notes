import { ClassesProps } from "@/src/lib/interfaces/classes-props";

export default function IconAdd({classes}:ClassesProps) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={classes}>
      <path d="M16 7v18M7 16h18" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px"></path>
    </svg>
  );
}