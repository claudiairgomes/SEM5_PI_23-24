import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Robots } from "../Interfaces/robots";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class RobotService {
    constructor(private http:HttpClient) { }

    createRobot(robot: Robots): Observable<Robots> {
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Robots>('http://localhost:4000/api/robots', robot, httpOptions);
    }

    getRobots(): Observable<Robots[]> {
        return this.http.get<Robots[]>('http://localhost:4000/api/robots/findAll');
    }

    getRobotsById(id: string): Observable<Robots> {
        return this.http.get<Robots>(`http://localhost:4000/api/robots/${id}`);
    }

    updateRobot(robot: Robots): Observable<Robots> {
        const body: {
            id: any,
            codRobot: any,
            name: any,
            type: any,
            serialNumber: any,
            description: any,
            isActive: any,
        } = {
            id: robot.id,
            codRobot: robot.codRobot,
            name: robot.name,
            type: robot.type,
            serialNumber:robot.serialNumber,
            description:robot.description,
            isActive:robot.isActive,

        }
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.patch<Robots>(`http://localhost:4000/api/robots`, body, httpOptions);
    }

  deactivateRobot(robot: Robots): Observable<Robots> {
    return this.http.patch<Robots>('http://localhost:4000/api/robots/deactivate', robot)
      .pipe(
        //catchError(this.handleError('addRobot', robot))
      );
  }
}
