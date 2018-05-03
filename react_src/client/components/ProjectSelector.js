import React from 'react';
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ProjectStore from '../stores/ProjectStore'
import  * as ProjectActions from '../actions/ProjectActions';

export default class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.getResults = this.getResults.bind(this);

      this.state = {
          projects: [],
          ...props,
      };

      ProjectActions.getProjects();
    };

    componentWillMount() {
        ProjectStore.on("change", this.getResults);
      }
    
    componentWillUnmount() {
        ProjectStore.removeListener("change", this.getResults);
    }

    getResults() {
        var res = ProjectStore.getProjects();
        console.log("megjottek a projectek", res);
        this.setState({
            projects: res
        });
    }

    select = (projectnr, projectname, event) => {
        console.log("nr",projectnr);
        console.log("name",projectname);
        this.state.selection(projectnr, projectname);
    }

    render() {
        const projectsListItems = this.state.projects.map((trx) => {
            return <ListItem primaryText={trx.projectname} rightIcon={<ActionInfo />} onClick={(event) => this.select(trx.projectnr,trx.projectname, event)}/>
        });

        return (
            <List>
                {projectsListItems}
            </List>
        );
    };
}