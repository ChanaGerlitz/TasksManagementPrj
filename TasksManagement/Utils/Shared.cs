using TasksManagement.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using WeatherAppServer.Models;
using Microsoft.AspNetCore.Mvc;

namespace TasksManagement.Utils
{
    public class Shared
    {
        public static JsonResult ExceptionResponse(Exception ex)
        {
            var metadata = new MetaData(((int)Enums.MessageCodeTypes.Failure).ToString(), ex.Message);
            var json = JsonConvert.SerializeObject(new { data = "", metaData = metadata }, Formatting.None);
            return new JsonResult(json);
        }
        public static JsonResult ConvertObject(object obj)
        {
            var json = JsonConvert.SerializeObject(new { data = obj, metaData = new MetaData("0", "ok") }, Formatting.None);
            return new JsonResult(json);
        }
    }
}