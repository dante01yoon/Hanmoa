import { Request } from "express";

export const reqParser = (req: Request, index: number) => {
  const [_, ...params] = req.path.split("/");
  if (index > params.length - 1) {
    return "";
  }
  return params[index];
}
