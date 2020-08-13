using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using TasksManagement.Models;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net;

namespace TasksManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksManagementController : Controller
    {
        private IMemoryCache _cache;
        public TasksManagementController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        [Route("UpdateTasksList")]
        [HttpPost("[action]")]
        public IActionResult UpdateTasksList([FromBody] Tasks task)
        {
            try
            {
                List<Tasks> tasksList = new List<Tasks>();
                var sessionTasksList = HttpContext.Session.GetString("task");
                if (sessionTasksList != null)
                {
                    tasksList = JsonConvert.DeserializeObject<List<Tasks>>(sessionTasksList);
                }
                tasksList.Add(task);
                HttpContext.Session.SetString("task", JsonConvert.SerializeObject(tasksList));
                List<Tasks> cacheTasksList;
                cacheTasksList = (List<Tasks>)_cache.Get("cacheTasks");
                if (cacheTasksList == null)
                    cacheTasksList = new List<Tasks>();
                task.SessionId = HttpContext.Session.Id;
                cacheTasksList.Add(task);
                _cache.Set<List<Tasks>>("cacheTasks", cacheTasksList);
                return Utils.Shared.ConvertObject(tasksList);
            }
            catch (Exception ex)
            {
                return Utils.Shared.ExceptionResponse(ex);
            }
        }
        [Route("GetAllTasks")]
        [HttpGet("[action]")]
        public IActionResult GetAllTasks()
        {
            try
            {
                List<Tasks> tasksList = new List<Tasks>();
                var cacheTasksList = (List<Tasks>)_cache.Get("cacheTasks");
                if (cacheTasksList != null)
                    tasksList = cacheTasksList.Where(t => t.SessionId != HttpContext.Session.Id).ToList();
                return Utils.Shared.ConvertObject(tasksList);
            }
            catch (Exception ex)
            {
                return Utils.Shared.ExceptionResponse(ex);
            }

        }
        [Route("GetUserTasks")]
        [HttpGet("[action]")]
        public IActionResult GetUserTasks()
        {
            try
            {
                List<Tasks> tasksList = new List<Tasks>();
                var sessionTasksList = HttpContext.Session.GetString("task");

                if (sessionTasksList != null)
                {
                    tasksList = JsonConvert.DeserializeObject<List<Tasks>>(sessionTasksList);
                }
                return Utils.Shared.ConvertObject(tasksList);
            }
            catch (Exception ex)
            {
                return Utils.Shared.ExceptionResponse(ex);
            }
        }

    }
}