import { CardData} from './card'; 
export type TopicName = 
  'all' 
  | 'etc' 
  | 'ktx' 
  | 'netflix' 
  | 'watcha' 
  | 'share' 
  | 'roommate'
  | 'adobe'
export type TopicData = {
  name: TopicName
  data: CardData[]
}