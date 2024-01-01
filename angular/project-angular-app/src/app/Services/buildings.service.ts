import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Buildings } from "../Interfaces/buildings";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class BuildingService {

  private building = new BehaviorSubject<Buildings>({} as Buildings);

  constructor(private http:HttpClient) { }

  private isVisible = new BehaviorSubject<boolean>(false);


  createBuilding(building: Buildings): Observable<Buildings> {
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Buildings>('http://localhost:4000/api/buildings', building, httpOptions);
    }

    getBuildings(): Observable<Buildings[]> {
        console.log("Service");

        return this.http.get<Buildings[]>('http://localhost:4000/api/buildings/findAll');

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
    return this.http.put<Buildings>(`http://localhost:4000/api/buildings/update`, body, httpOptions);
    }

  openForm(building: Buildings) {
    this.building.next(building);
    this.isVisible.next(true);
  }

  closeForm() {
    this.isVisible.next(false);
  }

  getFormVisibility() {
    return this.isVisible.asObservable();
  }

}
