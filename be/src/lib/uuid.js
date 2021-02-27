import { v4 as uuidv4 } from "uuid";

const createUUID  = () => {
  return uuidv4()
    .replace(/\-/g, "")
    .substring(0,5);
} 

export default createUUID;