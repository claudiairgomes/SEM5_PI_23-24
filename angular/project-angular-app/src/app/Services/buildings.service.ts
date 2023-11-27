import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Buildings } from "../Interfaces/buildings";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class BuildingService {
    constructor(private http:HttpClient) { }

    createBuilding(building: Buildings): Observable<Buildings> {
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Buildings>('http://localhost:4000/api/buildings', building, httpOptions);
    }

    getBuildings(): Observable<Buildings[]> {
        console.log("Service");
        return this.http.get<Buildings[]>('http://localhost:4000/api/buildings');
    }

    getBuildingById(id: string): Observable<Buildings> {
        return this.http.get<Buildings>(`http://localhost:4000/api/buildings/${id}`);
    }

    updateBuilding(building: Buildings): Observable<Buildings> {
        const body: {
            id: any,
            name: any,
            description: any,
            dimension: any,
            code: any
        } = {
            id: building.id,
            name: building.name,
            description: building.description,
            dimension: building.dimension,
            code: building.code
        }
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.patch<Buildings>(`http://localhost:4000/api/buildings`, body, httpOptions);
    }
}