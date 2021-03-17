export interface Topic {
  category: string;
  url: string;
  image: string;
}
export interface GetTopicListPayload {
  topicList: Array<Topic>;
};
