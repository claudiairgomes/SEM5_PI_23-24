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
    return this.http.post<Passages>('http://localhost:4000/api/passage', passage, httpOptions);
  }

  getPassages(): Observable<Passages[]> {
    console.log("Service");
    return this.http.get<Passages[]>('http://localhost:4000/api/passage/findAll');
  }

  getPassageById(id: string): Observable<Passages> {
    return this.http.get<Passages>(`http://localhost:4000/api/passage/${id}`);
  }

  updatePassage(passage: Passages): Observable<Passages> {
    const body: {
      id: any,
      name: any,
      fromFloor: any,
      toFloor: any,
      description: any
    } = {
      id: passage.id,
      name: passage.name,
      fromFloor: passage.fromFloor,
      toFloor:passage.toFloor,
      description: passage.description
    }
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.patch<Passages>(`http://localhost:4000/api/passage`, body, httpOptions);
  }
}
