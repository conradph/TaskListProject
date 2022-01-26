import { Component, OnInit } from '@angular/core';
import { task } from 'app/Task';
import { TaskService } from 'app/task.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [DatePipe]
})
export class TaskListComponent implements OnInit {

  tasks?:task[];

  constructor(private taskDAL:TaskService, public datepipe:DatePipe) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks() {
    this.taskDAL.getTasks().subscribe(
      (result:task[]) => {
        this.tasks = result;
        console.log(result);
      }
    )
  }
  deleteTask(id:number, index:number) {
    this.taskDAL.deleteTask(id);
    this.tasks.splice(index,1);
  }
  markComplete(id:number, index:number) {
    let t:task;
    console.log("Here")
    this.taskDAL.getTask(id).subscribe(
      (result:task) => {
        t = result;
        t.isCompleted = true;
        console.log(t);
        this.taskDAL.editTask(t);
        this.tasks[index] = t;
      }
    )
  }
  EditTask(id:number)
  {
    let displayPanel = document.getElementById("display"+ id);
    let editPanel = document.getElementById("edit" + id);

    if(displayPanel.style.display === "" || displayPanel.style.display === "inherit") {
      displayPanel.style.display = "none";
      editPanel.style.display = "inherit";
      console.log(editPanel.style.display);
    }
    else if(displayPanel.style.display === "none") {
      editPanel.style.display = "none";
      displayPanel.style.display = "inherit";
      console.log(editPanel.style.display);
    }
  }
}
