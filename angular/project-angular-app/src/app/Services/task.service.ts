import {Component, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import SurveillanceTask from '../Interfaces/surveillanceTask';
import PickupAndDeliveryTask from '../Interfaces/pickupAndDeliveryTask';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

    private isVisible = new BehaviorSubject<boolean>(false);

    private taskSur = new BehaviorSubject<SurveillanceTask>({} as SurveillanceTask);
  private taskPic = new BehaviorSubject<PickupAndDeliveryTask>({} as PickupAndDeliveryTask);




  private searchByUserSurveillanceUrl = 'api/SurveillanceTasks/searchByUser/';
  private searchByUserPickupAndDeliveryUrl = 'api/PickupAndDeliveryTasks/searchByUser/';

  constructor(private http: HttpClient) {
  }

  approveSurveillanceTask(surveillanceTask: SurveillanceTask): Observable<SurveillanceTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<SurveillanceTask>('http://localhost:5095/api/SurveillanceTasks/approveSurveillanceTask/', surveillanceTask, httpOptions)
      .pipe(
        //catchError(this.handleError('approSurveillanceTask', surveillanceTask ))
      )
  }

  denySurveillanceTask(surveillanceTask: SurveillanceTask): Observable<SurveillanceTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<SurveillanceTask>('http://localhost:5095/api/SurveillanceTasks/denySurveillanceTask/', surveillanceTask, httpOptions)
      .pipe(
        //catchError(this.handleError('approSurveillanceTask', surveillanceTask ))
      )
  }

  approvePickupAndDeliveryTask(pickupAndDeliveryTask: PickupAndDeliveryTask): Observable<PickupAndDeliveryTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<PickupAndDeliveryTask>('http://localhost:5095/api/PickupAndDeliveryTasks/approvePickupAndDeliveryTask/', pickupAndDeliveryTask, httpOptions)
      .pipe(
        //catchError(this.handleError('approSurveillanceTask', surveillanceTask ))
      )
  }

  denyPickupAndDeliveryTask(pickupAndDeliveryTask: PickupAndDeliveryTask): Observable<PickupAndDeliveryTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<PickupAndDeliveryTask>('http://localhost:5095/api/PickupAndDeliveryTasks/denyPickupAndDeliveryTask/', pickupAndDeliveryTask, httpOptions)
      .pipe(
        //catchError(this.handleError('approSurveillanceTask', surveillanceTask ))
      )
  }

  createSurveillanceTask(surveillanceTask: SurveillanceTask): Observable<SurveillanceTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<SurveillanceTask>('http://localhost:5095/api/SurveillanceTasks', surveillanceTask, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  createPickupAndDeliveryTask(pickupAndDeliveryTask: PickupAndDeliveryTask): Observable<PickupAndDeliveryTask> {
    const httpOptions = { withCredentials: true };

    return this.http.post<PickupAndDeliveryTask>('http://localhost:5095/api/PickUpAndDeliveryTasks', pickupAndDeliveryTask, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByStatusSurveillanceTask(status: string): Observable<SurveillanceTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SurveillanceTask[]>('http://localhost:5095/api/SurveillanceTasks/searchByStatus/' + status, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByStatusPickupAndDelivery(status: string): Observable<PickupAndDeliveryTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<PickupAndDeliveryTask[]>('http://localhost:5095/api/PickupAndDeliveryTasks/searchByStatus/' + status, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getAllSurveillanceTask(): Observable<SurveillanceTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SurveillanceTask[]>('http://localhost:5095/api/SurveillanceTasks', httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getAllPickupAndDelivery(): Observable<PickupAndDeliveryTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<PickupAndDeliveryTask[]>('http://localhost:5095/api/PickUpAndDeliveryTasks', httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByUserSurveillanceTask(userId: string): Observable<SurveillanceTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<SurveillanceTask[]>('http://localhost:5095/api/SurveillanceTasks/searchByUser/' + userId, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  getByUserPickupAndDelivery(userId: string): Observable<PickupAndDeliveryTask[]> {
    const httpOptions = { withCredentials: true };

    return this.http.get<PickupAndDeliveryTask[]>('http://localhost:5095/api/PickupAndDeliveryTasks/searchByUser/' + userId, httpOptions)
      .pipe(
      //catchError(this.handleError('addBuilding', building))
    );
  }

  openForm(task: SurveillanceTask) {
    this.taskSur.next(task);
    this.isVisible.next(true);
  }

  openForm1(task: PickupAndDeliveryTask) {
    this.taskPic.next(task);
    this.isVisible.next(true);
  }



}
