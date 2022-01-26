using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskListFullStackProject.Models;

namespace TaskListFullStackProject.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        TaskDAL db = new TaskDAL();
        [HttpGet]
        public List<TaskItem> GetTasks()
        {
            return db.GetTasks();
        }
        [HttpGet("get/{id}")]
        public TaskItem GetTask(int id)
        {
            return db.GetTask(id);
        }
        [HttpPost("Create")]
        public void CreateTask(TaskItem t)
        {
            db.CreateTask(t);
        }
        [HttpDelete("Delete/{id}")]
        public void DeleteTask(int id)
        {
            db.DeleteTask(id);
        }
        [HttpPut("Edit")]
        public void EditTask(TaskItem t)
        {
            db.EditTask(t);
        }
    }
}
