// import React...
import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import {columns, columnHeaders} from '../configuration/materialTrackTableConstants';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

// ... and HotTable
import HotTable from 'react-handsontable';

export default class MaterialTrackTable extends React.Component {
  constructor(props) {
    super(props);
    var mycolumns = new Array();
    var mycolHeaders = new Array();

    var arrayLength = columns.length;
    var i=0;
    // is delete checkbox is visible, then it (the first column) can be edited, not read only
    if(!props.deleteRowEnabled) i = 1;
    for (i = 0; i < arrayLength; i++) {
      var d = columns[i];
      if(props.readonly == true) {
        mycolumns.push({
          readOnly: true,
          ...d
        });
      } else {
        mycolumns.push(d);
      }
    }
    
    this.state = {
        columns : mycolumns,
        colHeaders: columnHeaders,
        rowselectedfordel: [],
        ...props,
    };
  };

  componentWillReceiveProps(props) {
    console.log("item prop change",props);
    this.setState({
      ...props
    });
  }

  editcondition = (row,col, prop) => {
    var cellProperties = {};
    if(row<this.state.readOnlyRows) {
      if(!(this.state.deleteRowEnabled && (col==0)))
        cellProperties.readOnly = true;
    }
    return cellProperties;
  }
  
  checkboxLoop  = (changes,source) => {
    //console.log("changes", changes);
    if(!changes) return;
    //{row, prop, olval, newval} = changes[1];

    var rowselectedfordel = this.state.rowselectedfordel;

    for(var i=0;i<changes.length;i++) {
      if(changes[i][1]==="Del") {
        if(changes[i][3]===true) {
          rowselectedfordel.push(changes[i][0]);
        } else {
          //console.log("remove",changes[i][0])
          var filt = rowselectedfordel.filter(e => e !== changes[i][0])
          //console.log("filtered",filt)
          rowselectedfordel = filt;
        }
      }
    }
    //console.log("new",rowselectedfordel);
    this.setState({
      rowselectedfordel: rowselectedfordel
    });

    this.state.deleteSelectionCallback(rowselectedfordel);
  }

  afterDelete = () => {
    this.setState({
      rowselectedfordel: []
    });
    console.log("Itt is torol");
  }


  render() {
    console.log("handson render", this.state);
    return (
      <div id="example-component">
        <HotTable
          data={this.state.handsontableData}
          columns={this.state.columns} 
          colHeaders={this.state.colHeaders}
          rowHeaders={false}
          dropdownMenu={true} 
          manualColumnResize={true}
          allowInsertRow={false}
          maxRows={this.state.handsontableData.length}
          cells={this.editcondition}
          afterChange={this.checkboxLoop}
        />
      </div>
    );
  }
}