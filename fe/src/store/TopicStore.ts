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
  
  @action
  async fetchTopicList() {
    const [error, response] = await http.GET<GetTopicListPayload>("")
    if(response){
      this.topicList = response.data.topicList;
    }
  }
}

export default TopicStore