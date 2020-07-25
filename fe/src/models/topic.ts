import { ICardData } from "./card";
export type TTopicName =
  | "all"
  | "etc"
  | "ktx"
  | "netflix"
  | "watcha"
  | "share"
  | "roommate"
  | "adobe";
export type TTopicData = {
  topic: TTopicName;
  data: ICardData[];
};
