import { Component, OnInit } from '@angular/core';
import { task } from 'app/Task';
import { TaskService } from 'app/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  constructor(private taskDAL: TaskService) { }

  ngOnInit() {
  }
  CreateTask() {
    let tmName:string = (<HTMLInputElement>document.getElementById("tmName")).value;
    document.getElementById("tmName")
    let description:string = (<HTMLInputElement>document.getElementById("description")).value;
    let date:string = (<HTMLInputElement>document.getElementById("date")).value;
    let dueDate:Date = new Date(date);
    let task:task = {id:0, tmName: tmName, description:description, dueDate:dueDate, isCompleted: false};
    this.taskDAL.createTask(task);
    location.reload();
  }

}
