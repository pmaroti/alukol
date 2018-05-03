import React from 'react';
import ReactDOM from 'react-dom';
//import SampleTable from '../components/SampleTable.js';
import ProjectItems from '../components/ProjectItems.js';
import ProjectSelector from '../components/ProjectSelector.js';
import AppBar from 'material-ui/AppBar';

export default class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isProjectSelected: false,
          ...props,
      };
    };

    projectSelected = (projectnr, projectname) => {
      console.log("selection:", projectnr);
      this.setState({isProjectSelected: true, selectedProjectNr: projectnr, selectedProjectName: projectname});
    }

    returnBack = () => {
      console.log("return...");
      this.setState({isProjectSelected: false});
    }

    render() {
        if(this.state.isProjectSelected) {
          return (
            <div id="sampleTable">
              <AppBar title={"'"+this.state.selectedProjectName+"' Project Details "}/>
              
              <ProjectItems back={this.returnBack} projectnr={this.state.selectedProjectNr} projectname={this.state.selectedProjectName}/>        
              
            </div>
          )
        } else {
          return (
            <div id="sampleTable">
              <AppBar title="Select Project"/>
              <ProjectSelector selection={this.projectSelected}/>        
            </div>
          )
        }
    };
}