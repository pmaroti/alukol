import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ProjectStore extends EventEmitter {
  constructor() {
    super()
    this.projects = [];
  }

  getProjects() {
    return this.projects;
  }

 
  handleActions(action) {
    switch(action.type) {
      case "PROJECTS_RECEIVED": {
        this.projects = action.projects;
        this.emit("change");
        break;
      }
    }
  }

}

const projectStore = new ProjectStore;
dispatcher.register(projectStore.handleActions.bind(projectStore));

export default projectStore;
