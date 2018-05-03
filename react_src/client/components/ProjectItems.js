import React from 'react';
import ReactDOM from 'react-dom';
import MaterialTrackTable from './MaterialTrackTable.js';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ProjectItemsStore from '../stores/ProjectItemsStore';
import  * as ProjectItemActions from '../actions/ProjectItemActions';


export default class ProjectItems extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          handsontableData : [],
          origRowNr: 0,
          addNewDialogOpen: false,
          newData: [],
          rowsToDelete: [],
          ...props,
      };
      this.emptyData = {
        id: 0, projectnr:  props.projectnr, projectname: props.projectname, ordernr: '', secordernr: '', typeofwork: 'anyagrendelés', workdescription: 'Sika tömítőanyag', responsible: '', plannr: '', structurename: '', orderer: '', orderdate: '', confirmeddate: '', deliverydate: '', handoverdate: '', deliverynr: '', price: '', comment: ''
      };
      ProjectItemActions.getProjectItems(props.projectnr);
    };

    componentWillMount() {
        ProjectItemsStore.on("change", this.getResults);
        ProjectItemsStore.on("needchange", this.updateFromServer);
        ProjectItemsStore.on("deletesuccess", this.afterDelete);
      }
    
    componentWillUnmount() {
        ProjectItemsStore.removeListener("change", this.getResults);
        ProjectItemsStore.removeListener("needchange", this.updateFromServer);
        ProjectItemsStore.removeListener("deletesuccess", this.afterDelete);
    }

    getResults = () => {
        var res = ProjectItemsStore.getProjectItems();
        console.log("megjottek a project itemek", res);
        this.setState({
            handsontableData: res,
            origRowNr: res.length
        });
    }

    updateFromServer = () => {
        ProjectItemActions.getProjectItems(this.state.projectnr);
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

    addNewRow = () => {
        ProjectItemActions.getMaxId(this.state.projectnr).then((result) => {
            console.log("itten a maxid", result);
            var nn  = this.state.handsontableData;
            var a = {...this.emptyData};
            a['id']=result+1;
            a['orderdate'] = this.formatDate(Date());
            nn.push(a);
            this.setState({
                handsontableData: nn
            });
        });
    }

    saveData = () => {
        var toBeSaved = [];
        for(var i = 0; i<this.state.handsontableData.length; i++ ) {
            console.log(i);
            if(i<this.state.origRowNr) continue;
            var p = this.state.handsontableData[i]
            delete p['Del']
            toBeSaved.push(p);
        }
        console.log("tobesaved", toBeSaved);
        ProjectItemActions.addProjectItem(this.state.projectnr, toBeSaved);
    }

    deleteData = () => {
        var toBeDeleted = [];
        for(var i = 0; i<this.state.rowsToDelete.length; i++ ) {
            console.log(i);
            var p = this.state.handsontableData[this.state.rowsToDelete[i]]
            toBeDeleted.push(p);
        }
        console.log("tobedeleted", toBeDeleted);
        ProjectItemActions.deleteProjectItem(this.state.projectnr, toBeDeleted);

    }

    afterDelete = () => {
        this.setState({ rowsToDelete: []});
        this.materialTableInstance.afterDelete();
        console.log("delete rowstobedeleted");
    }

    returnToMainPage = () => {
        this.state.back();
    }

    delcb = (rows) => {
        console.log("Rows 4 delete:", rows);
        this.setState({
            rowsToDelete: rows
        })
    }

    render() {
        const style = {
            margin: 12,
          };

        const customContentStyle = {
            width: '100%',
            maxWidth: 'none',
          };

        return (
          <div id="sampleTable">
            <RaisedButton label="<--" primary={true} style={style} onClick={this.returnToMainPage}/>
            <MaterialTrackTable ref={instance => { this.materialTableInstance = instance; }} handsontableData={this.state.handsontableData} readonly={false} readOnlyRows={this.state.origRowNr} deleteRowEnabled={true} deleteSelectionCallback={this.delcb}/>
            <RaisedButton label="Add New" primary={true} style={style} onClick={this.addNewRow}/>
            <RaisedButton label="Save" primary={true} style={style} onClick={this.saveData} disabled={this.state.origRowNr>=this.state.handsontableData.length}/>
            <RaisedButton label="Delete" primary={true} style={style} onClick={this.deleteData} disabled={this.state.rowsToDelete.length===0}/>
          </div>
        )
    };
}
