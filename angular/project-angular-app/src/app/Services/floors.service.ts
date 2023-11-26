import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Floors } from "../Interfaces/floors";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class FloorService {
    constructor(private http:HttpClient) { }

    createBuilding(floor: Floors): Observable<Floors> {
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Floors>('http://localhost:4000/api/floors', floor, httpOptions);
    }

    getFloors(): Observable<Floors[]> {
        return this.http.get<Floors[]>('http://localhost:4000/api/floors');
    }

    getFloorsById(id: string): Observable<Floors> {
        return this.http.get<Floors>(`http://localhost:4000/api/floors/${id}`);
    }

    updateFloor(floor: Floors): Observable<Floors> {
        const body: {
            id: any,
            buildingId: any,
            floorNumber: any,
            description: any
        } = {
            id: floor.id,
            buildingId: floor.buildingId,
            floorNumber: floor.floorNumber,
            description: floor.description
        }
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.patch<Floors>(`http://localhost:4000/api/floors`, body, httpOptions);
    }
}
