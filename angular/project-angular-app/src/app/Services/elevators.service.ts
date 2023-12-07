import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Elevators } from "../Interfaces/elevators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ElevatorsService {
    constructor(private http:HttpClient) { }

    createElevator(elevator: Elevators): Observable<Elevators> {
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Elevators>('http://localhost:4000/api/elevators', elevator, httpOptions);
    }

    getElevators(): Observable<Elevators[]> {
        console.log("Service");
        return this.http.get<Elevators[]>('http://localhost:4000/api/elevators');
    }

    getElevatorById(id: string): Observable<Elevators> {
        return this.http.get<Elevators>(`http://localhost:4000/api/elevators/${id}`);
    }

    updateElevator(elevator: Elevators): Observable<Elevators> {
        const body: {
            id: any,
            building: any,
            floorList: any,
            brand: any,
            model : any,
            serialNumber: any,
            description: any,

        } = {
            id: elevator.id,
        building: elevator.building,
        floorList: elevator.floorList,
        brand: elevator.brand,
        model: elevator.model,
        serialNumber: elevator.serialNumber,
        description: elevator.description,

        }
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.patch<Elevators>(`http://localhost:4000/api/elevators`, body, httpOptions);
    }
}
