import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Rooms } from "../Interfaces/rooms";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class RoomService {
    constructor(private http:HttpClient) { }

    createRoom(room: Rooms): Observable<Rooms> {
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Rooms>('http://localhost:4000/api/rooms', room, httpOptions);
    }

    getRooms(): Observable<Rooms[]> {
        console.log("Service");

        return this.http.get<Rooms[]>('http://localhost:4000/api/rooms/findAll');

    }

    getRoomById(id: string): Observable<Rooms> {
        return this.http.get<Rooms>(`http://localhost:4000/api/rooms/${id}`);
    }

    updateRoom(room: Rooms): Observable<Rooms> {
        const body: {
            id: any,
            name: any,
            description: any,
            dimension: any,
            code: any,
            floorId: any,
        } = {
            id: room.id,
            name: room.name,
            description: room.description,
            dimension: room.dimension,
            code: room.code,
            floorId: room.floorId,
        }
        const httpOptions = {
            headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.patch<Rooms>(`http://localhost:4000/api/rooms`, body, httpOptions);
    }
}
