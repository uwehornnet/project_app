import {combineReducers} from "redux";
import {ThemeReducer} from "./ThemeReducer";
import {ListReducer} from "./ListReducer";
import {ProjectReducer} from "./ProjectReducer";
import {TaskReducer} from "./TaskReducer";
import {ChecklistReducer} from "./ChecklistReducer";
import {BoardReducer} from "./BoardReducer";
import {SettingsReducer} from "./SettingsReducer";
import {TimerReducer} from "./TimerReducer";
import {CustomerReducer} from "./CustomerReducer";
import {TemplateReducer} from "./TemplateReducer";


const CombinedReducer = combineReducers({
	theme: ThemeReducer,
	boards: BoardReducer,
	customers: CustomerReducer,
	lists: ListReducer,
	projects: ProjectReducer,
	tasks: TaskReducer,
	checklists: ChecklistReducer,
	settings: SettingsReducer,
	timer: TimerReducer,
	templates: TemplateReducer
});

export default CombinedReducer;