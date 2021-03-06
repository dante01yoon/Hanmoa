export interface Topic {
  category: string;
  url: string;
}
export interface GetTopicListPayload {
  topicList: Array<Topic>;
};
