export type TopicName = 
  | 'all' 
  | 'etc' 
  | 'ktx' 
  | 'netflix' 
  | 'watcha' 
  | 'share' 
  | 'roommate'
  | 'adobe'
export type Topic = {
  id: number,
  name: TopicName
}

export type TopicList = Topic[];