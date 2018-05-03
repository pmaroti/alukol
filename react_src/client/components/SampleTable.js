import React from 'react';
import ReactDOM from 'react-dom';
import MaterialTrackTable from './MaterialTrackTable.js';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class SampleTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          handsontableData : [
              { id:  1, projectnr:  1703, projectname: 'V47', ordernr: '', secordernr: 'M18-0122', typeofwork: 'anyagrendelés', workdescription: 'Sika tömítőanyag', responsible: 'NA', plannr: '', structurename: '', orderer: 'SZZ', orderdate: '2/14/2018', confirmeddate: '', deliverydate: '', handoverdate: '', deliverynr: '', price: '', comment: '' },
              { id:  2, projectnr:  1714, projectname: 'C5', ordernr: '', secordernr: 'M18-0120', typeofwork: 'anyagrendelés', workdescription: 'szerelési és gyártási segédanyag', responsible: 'NA', plannr: 'AR-02; 03', structurename: '', oderer: 'IL', orderdate: '2/14/2018', confirmeddate: '2/14/2018', deliverydate: '8.hét', handoverdate: '', deliverynr: '', price: '760 000Ft', comment: ''}
          ],
          origRowNr: 2,
          addNewDialogOpen: false,
          newData: [],
          ...props,
      };
      this.emptyData = {
        id: 0, projectnr:  0, projectname: '', ordernr: '', secordernr: '', typeofwork: 'anyagrendelés', workdescription: 'Sika tömítőanyag', responsible: '', plannr: '', structurename: '', orderer: '', orderdate: '', confirmeddate: '', deliverydate: '', handoverdate: '', deliverynr: '', price: '', comment: ''
      };
    };

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
        var nn  = this.state.handsontableData;
        var a = {...this.emptyData};
        a['orderdate'] = this.formatDate(Date());
        nn.push(a);
        this.setState({
            handsontableData: nn
        });
    }

    saveData = () => {
        console.log("It should be saved.");
    }

    returnToMainPage = () => {
        this.state.back();
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
            <MaterialTrackTable handsontableData={this.state.handsontableData} readonly={false} readOnlyRows={this.state.origRowNr}/>
            <RaisedButton label="Add New" primary={true} style={style} onClick={this.addNewRow}/>
            <RaisedButton label="Save" primary={true} style={style} onClick={this.saveData} disabled={this.state.origRowNr>=this.state.handsontableData.length}/>
          </div>
        )
    };
}
