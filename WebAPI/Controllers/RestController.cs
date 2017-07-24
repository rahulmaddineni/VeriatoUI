using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class RestController : ApiController
    {
        

        [HttpGet]
        public IEnumerable<LogModel> GetLogs()
        {
            LogDataHandler loghandler = new LogDataHandler();
            return loghandler.GetAllLogs();
        }

        [HttpGet]
        public LogModel GetLogByID(int id)
        {
            LogDataHandler loghandler = new LogDataHandler();
            return loghandler.GetLogByID(id);
        }


        [HttpGet]
        public void DeleteLogByID(int id)
        {
            LogDataHandler loghandler = new LogDataHandler();
            loghandler.DeleteLog(id);
        }

        [HttpGet]
        public String[] GetChartInfo()
        {
            LogDataHandler loghandler = new LogDataHandler();
            return loghandler.getChartInfo();
        }

        [HttpPost]
        public void AddLog(LogModel log)
        {
            LogDataHandler loghandler = new LogDataHandler();
            loghandler.AddLog(log);
        }

        [HttpPost]
        public void UpdateLog(LogModel log)
        {
            LogDataHandler loghandler = new LogDataHandler();
            loghandler.UpdateLog(log);
        }
    }
}
