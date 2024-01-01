import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import RobotType  from "../Interfaces/robotType";
import {BehaviorSubject, Observable} from "rxjs";
import TaskType  from "../Interfaces/taskType";

@Injectable({
    providedIn: "root"
})
export class RobotTypeService {

  constructor(private http:HttpClient) { }


  createRobotType(robotType: RobotType): Observable<RobotType> {
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<RobotType>('http://localhost:4000/api/robotTypes', robotType, httpOptions);
    }

    getRobotTypes(): Observable<RobotType[]> {
        console.log("Service");

        return this.http.get<RobotType[]>('http://localhost:4000/api/robotTypes/findAll');

    }

    getRobotTypeById(id: string): Observable<RobotType> {
        return this.http.get<RobotType>(`http://localhost:4000/api/robotTypes/${id}`);
    }

  getTaskType(name: string): Observable<TaskType> {
    const httpOptions = { withCredentials: true };

    return this.http.get<TaskType>('http://localhost:4000/api/taskTypes/getTaskType/'+name)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }
}
