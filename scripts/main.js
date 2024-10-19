import {Project} from "./modules/Project.js";
import {ProjectStatus} from "./modules/ProjectStatus.js";
import {Task} from "./modules/Task.js";
import {TaskStatus} from "./modules/TaskStatus.js";
import {LocalStorage} from "./modules/localStorage.js";

LocalStorage.registerSavableClass(Project);
LocalStorage.registerSavableClass(Task);