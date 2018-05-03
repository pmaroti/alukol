import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ProjectItemsStore extends EventEmitter {
  constructor() {
    super()
    this.projectItems = [];
  }

  getProjectItems() {
    return this.projectItems;
  }

 
  handleActions(action) {
    switch(action.type) {
      case "PROJECTITEMS_RECEIVED": {
        this.projectItems = action.projectItems;
        this.emit("change");
        break;
      }

      case "PROJECTITEM_ADDED": {
        this.projectItems = action.projectItems;
        this.emit("needchange");
        break;
      }

      case "PROJECTITEM_DELETED": {
        this.projectItems = action.projectItems;
        this.emit("deletesuccess");
        this.emit("needchange");
        break;
      }
    }
  }

}

const projectItemsStore = new ProjectItemsStore;
dispatcher.register(projectItemsStore.handleActions.bind(projectItemsStore));

export default projectItemsStore;
