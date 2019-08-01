import { combineReducers } from "redux";

import authorization from "./authorization";
import plants from "./plants";
import reminders from "./reminders";
import user from "./user";

export default combineReducers({ authorization, user, plants, reminders });
