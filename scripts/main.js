import {Project} from "./modules/Project.js";
import {ProjectStatus} from "./modules/ProjectStatus.js";
import {Task} from "./modules/Task.js";
import {TaskStatus} from "./modules/TaskStatus.js";
import {LocalStorage} from "./modules/localStorage.js";
import {Member} from "./modules/Member.js";
import {ProjectMember} from "./modules/ProjectMember.js";

LocalStorage.registerSavableClass(Project, Task,Member, ProjectMember);