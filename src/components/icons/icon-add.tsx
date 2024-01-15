import { ClassesProps } from "@/src/lib/interfaces/classes-props";

export default function IconAdd({classes}:ClassesProps) {
  return (
    <svg className={classes} height="512px" version="1.1" viewBox="0 0 512 512" width="512px" xmlns="http://www.w3.org/2000/svg">
      <path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256 
      c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32 
      C448,238.3,434.3,224,417.4,224z"/>
    </svg>
  );
}