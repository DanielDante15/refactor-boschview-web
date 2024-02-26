export interface User{
  id:number
  name:string
  username:string
  profile_picture:string
  stack:string
  projects:Project[]
 }
 


export interface Project {
  id: number;
  project_name: string;
  students: User[];
  area: string;
  course: string;
  created_date: string;
  description: string;
  techs: string; 
  contact: string;
  finish_ratio: number;
  status: string;
  price:number;
  proposal:string
  outside_scope_items:string
  requirements:string
  image: string;
}

export interface Notificate {
  notificate: (
    notificationMessage: string,
    severity?: "error" | "warning" | "info" | "success"
  ) => void;
}

