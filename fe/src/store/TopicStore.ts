import BasicStore from "@store/BasicStore";
import { action, observable, makeObservable} from "mobx";
import RootStore from "@store/RootStore";
import { http } from "@apis/httpModule";
import { GetTopicListPayload } from "@payload/index";

class TopicStore extends BasicStore{
  @observable topicList: GetTopicListPayload["topicList"];
  constructor({root, state}: {root: RootStore, state: TopicStore}) {
    super({root});
    makeObservable(this);
    this.topicList = state?.topicList ?? [];
  }
  
  async fetchTopicList() {
    const [error, response] = await http.GET<GetTopicListPayload>("/topic/list")
    if(response){
      this.update(response.data);
    }
    if(error){
      throw Error(error.error);
    }    
  }

  @action
  update({topicList}: GetTopicListPayload){
    this.topicList = topicList;
  }
}

export default TopicStore