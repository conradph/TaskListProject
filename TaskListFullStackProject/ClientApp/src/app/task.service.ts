import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { task } from './Task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseURL:string;
  constructor(private http:HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.baseURL = baseUrl + 'task';
  }
  
  getTasks():Observable<any> {
    return this.http.get(this.baseURL);
  }
  getTask(id:number):Observable<any> {
    console.log(this.baseURL + '/get/' + id);
    return this.http.get(this.baseURL + '/get/' + id);
  }
  createTask(t:task) {
    this.http.post(this.baseURL + '/Create', t).subscribe(
      (result:any) => {console.log('Worked')}
    );
  }
  deleteTask(id:number){
    this.http.delete(this.baseURL + '/Delete/' + id).subscribe(
      (result:any) => {console.log("It worked!")}
    );
    console.log(this.baseURL + '/Delete/' + id);
  }
  editTask(t:task){
    this.http.put(this.baseURL + '/Edit', t).subscribe(
      (result:any) => {
        console.log(t);
        console.log("It worked!");
      }
    );
  }
}
