using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace TaskListFullStackProject.Models
{
    public class TaskDAL
    {
        public List<TaskItem> GetTasks()
        {
            using (var connect = new MySqlConnection(Secret.Connection))
            {
                var sql = "select * from Tasks";
                connect.Open();
                List<TaskItem> tasks = connect.Query<TaskItem>(sql).ToList();
                connect.Close();
                return tasks;
            }
        }
        public TaskItem GetTask(int id)
        {
            using (var connect = new MySqlConnection(Secret.Connection))
            {
                string sql = $"select * from Tasks where id = {id}";
                connect.Open();
                TaskItem task = connect.Query<TaskItem>(sql).First();
                connect.Close();
                return task;
            }
        }
        public void CreateTask(TaskItem t)
        {
            using (var connect = new MySqlConnection(Secret.Connection))
            {
                string sql = $"insert into tasks values (" +
                    $"0, '{t.TMName}', '{t.Description}', '{t.DueDate.ToString("yyyy-MM-dd")} 12:00:00', {t.IsCompleted});";
                connect.Open();
                connect.Query<TaskItem>(sql);
                connect.Close();
            }
        }
        public void DeleteTask(int id)
        {
            using (var connect = new MySqlConnection(Secret.Connection))
            {
                string sql = $"delete from tasks where id = {id}";
                connect.Open();
                connect.Query<TaskItem>(sql);
                connect.Close();
            }
        }
        public void EditTask(TaskItem t)
        {
            using (var connect = new MySqlConnection(Secret.Connection))
            {
                string sql = $"update tasks set " +
                    $"TMname = '{t.TMName}', " +
                    $"description = '{t.Description}', " +
                    $"dueDate = '{t.DueDate.ToString("yyyy-MM-dd")} 12:00:00', " +
                    $"isCompleted = {t.IsCompleted} " +
                    $" where id = {t.ID}";
                connect.Open();
                connect.Query<TaskItem>(sql);
                connect.Close();
            }
        }
    }
}
