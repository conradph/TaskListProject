import { Component, Input, OnInit } from '@angular/core';
import { task } from 'app/Task';
import { TaskService } from 'app/task.service';
import { DatePipe } from '@angular/common';
import { threadId } from 'worker_threads';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
  providers: [DatePipe]
})
export class EditTaskComponent implements OnInit {
  @Input() id:number;
  task?:task;
  taskDate:string;

  constructor(private taskDAL: TaskService, private datePipe:DatePipe, private activatedRoute:ActivatedRoute) {
    
   }

  ngOnInit() {
    console.log("This is happening");
    console.log(this.activatedRoute.snapshot.paramMap.get("id"));
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.id = parseInt(params.get('id'));
      this.taskDAL.getTask(this.id).subscribe(
        (result:task) => {
          this.task = result;
          console.log(result);
          console.log(this.task.dueDate);
          this.taskDate = this.datePipe.transform(this.task.dueDate, 'yyyy-MM-dd');
        }
      )
    })
    //this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    ;
  }
  editTask() {
    let tmName:string = (<HTMLInputElement>document.getElementById("tmName"+this.id)).value;
    console.log(tmName);
    let description:string = (<HTMLInputElement>document.getElementById("description"+this.id)).value;
    let date:string = (<HTMLInputElement>document.getElementById("date"+this.id)).value;
    let dueDate:Date = new Date(date);
    console.log(this.id);
    let task:task = {id:this.id, tmName: tmName, description:description, dueDate:dueDate, isCompleted: false};
    this.taskDAL.editTask(task);
  }

}
