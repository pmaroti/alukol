import dispatcher from "../dispatcher";
import * as axios from 'axios';
import {appsettings} from '../configuration/config.js';

export function getProjects() {
    axios.get(appsettings.serverURL + 'projects')
    .then((response)=> {
        console.log("action get response:",response)
        dispatcher.dispatch({
            type: "PROJECTS_RECEIVED",
            projects : response.data
        });
    });
}