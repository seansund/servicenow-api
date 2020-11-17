import {Container, Scope} from 'typescript-ioc';
import {TaskApi} from './task.api';
import {TaskService} from './task.service';
import {ProjectApi} from './project.api';
import {ProjectService} from './project.service';
import {ChangeRequestApi} from './change-request.api';
import {ChangeRequestMock} from './change-request.mock';

export * from './project.api';
export * from './project.service';
export * from './task.api';
export * from './task.service';
export * from './change-request.api';

Container.bind(TaskApi).to(TaskService).scope(Scope.Singleton);
Container.bind(ProjectApi).to(ProjectService).scope(Scope.Singleton);
Container.bind(ChangeRequestApi).to(ChangeRequestMock).scope(Scope.Singleton);
