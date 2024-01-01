import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Floors } from "../Interfaces/floors";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class FloorService {
    constructor(private http:HttpClient) { }

    createFloor(floor: Floors): Observable<Floors> {
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Floors>('http://localhost:4000/api/floors', floor, httpOptions);
    }

    getFloors(): Observable<Floors[]> {
        console.log("Service");
        return this.http.get<Floors[]>('http://localhost:4000/api/floors/findAll');
    }

    getFloorById(id: string): Observable<Floors> {
        return this.http.get<Floors>(`http://localhost:4000/api/floors/${id}`);
    }

    updateFloor(floor: Floors): Observable<Floors> {
        const body: {
            id: any,
            name:any,
            building: any,
            number: any,
            description: any
        } = {
            id: floor.id,
            name: floor.name,
            building: floor.building,
            number: floor.number,
            description: floor.description
        }
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.patch<Floors>(`http://localhost:4000/api/floors`, body, httpOptions);
    }

  getFloorsFromBuilding(buildingId: string): Observable<Floors[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<Floors[]>('http://localhost:4000/api/floors/'+ buildingId, httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
      );
  }
}
