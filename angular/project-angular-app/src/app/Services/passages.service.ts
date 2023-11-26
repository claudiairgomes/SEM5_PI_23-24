import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Passages } from "../Interfaces/passages";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PassageService {
  constructor(private http:HttpClient) { }

  createPassage(passage: Passages): Observable<Passages> {
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Passages>('http://localhost:4000/api/passages', passage, httpOptions);
  }

  getPassages(): Observable<Passages[]> {
    console.log("Service");
    return this.http.get<Passages[]>('http://localhost:4000/api/passages');
  }

  getPassageById(id: string): Observable<Passages> {
    return this.http.get<Passages>(`http://localhost:4000/api/passages/${id}`);
  }

  updatePassage(passage: Passages): Observable<Passages> {
    const body: {
      id: any,
      fromFloorId: any,
      toFloorId: any,
      description: any
    } = {
      id: passage.id,
      fromFloorId: passage.fromFloorId,
      toFloorId:passage.toFloorId,
      description: passage.description
    }
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.patch<Passages>(`http://localhost:4000/api/passages`, body, httpOptions);
  }
}
