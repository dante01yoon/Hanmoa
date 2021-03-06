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
    console.log("state: ", state);
    this.topicList = state?.topicList ?? [];
  }
  
  async fetchTopicList() {
    console.log("response before api.GET: ",);

    const [error, response] = await this.api.GET<GetTopicListPayload>("/topic/list")
    console.log("response after api.GET: ", response);
    if(response){
      console.log("response.data: ", response.data);
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