import dispatcher from "../dispatcher";
import * as axios from 'axios';
import {appsettings} from '../configuration/config.js';

export function getProjectItems(projectnr) {
    axios.get(appsettings.serverURL + 'items/' + projectnr)
    .then((response)=> {
        console.log("action get response:",response)
        dispatcher.dispatch({
            type: "PROJECTITEMS_RECEIVED",
            projectItems : response.data
        });
    });
}

export function getMaxId(projectnr) {
    return new Promise(function(resolve) {
        axios.get(appsettings.serverURL + 'maxId/' + projectnr).then((response) =>{
            console.log("maxId: ",response.data);
            resolve(response.data);
        })
    });
}

export function addProjectItem(projectnr, projectItem) {
    axios.post(appsettings.serverURL + 'items/' + projectnr, projectItem)
    .then((response) => {
        console.log("project item added.");
        dispatcher.dispatch({
            type: "PROJECTITEM_ADDED"
        })
    });
}

export function deleteProjectItem(projectnr, projectItem) {
    axios.request({
        method: 'delete',
        url: appsettings.serverURL + 'items/' + projectnr,
        data: projectItem
      })
    .then((response) => {
        console.log("project item deleted.");
        dispatcher.dispatch({
            type: "PROJECTITEM_DELETED"
        })
    });
}