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
        return this.http.get<Robots[]>('http://localhost:4000/api/robots');
    }

    getRobotsById(id: string): Observable<Robots> {
        return this.http.get<Robots>(`http://localhost:4000/api/robots/${id}`);
    }

    updateRobot(robot: Robots): Observable<Robots> {
        const body: {
            id: any,
            codRobot: any,
            nickName: any,
            type: any,
            serialNumber: any,
            description: any
        } = {
            id: robot.id,
            codRobot: robot.codRobot,
            nickName: robot.nickName,
            type: robot.type,
            serialNumber:robot.serialNumber,
            description:robot.description

        }
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.patch<Robots>(`http://localhost:4000/api/robots`, body, httpOptions);
    }
}
