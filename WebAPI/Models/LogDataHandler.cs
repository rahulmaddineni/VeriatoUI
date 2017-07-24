using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PusherServer;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class LogDataHandler
    {
        public LogDataHandler()
        {

        }

        // Notify UI of Changes in db
        public async Task<bool> triggerPusher()
        {
            var options = new PusherOptions
            {
                Cluster = "us2",
                Encrypted = true
            };

            var pusher = new Pusher(
              "371768",
              "75d54ea280ff5eed009e",
              "70f250bcf7dc2f271fc5",
              options);

            var result = await pusher.TriggerAsync(
              "my-channel",
              "my-event",
              new { message = "Update UI" });

            return true;
        }

        public IEnumerable<LogModel> GetAllLogs()
        {
            using (var suspect = new SuspictionModel())
            {
                return suspect.Logs.ToList();
            }
        }

        public LogModel GetLogByID(int id)
        {
            using (var suspect = new SuspictionModel())
            {
                return suspect.Logs.First(x => x.logId == id);
            }
        }

        public bool AddLog(LogModel logToSave)
        {
            LogModel log = logToSave;
            using (var suspect = new SuspictionModel())
            {
                suspect.Logs.Add(log);
                suspect.SaveChanges();
                var res = triggerPusher();
            }
            return false;
        }

        public bool UpdateLog(LogModel log)
        {
            LogModel logToSave = log;
            using (var suspect = new SuspictionModel())
            {
                LogModel logToUpdate = suspect.Logs.First(x => x.logId == logToSave.logId);
                logToUpdate.header = logToSave.header;
                logToUpdate.phone = logToSave.phone;
                logToUpdate.useremail = logToSave.useremail;
                logToUpdate.username = logToSave.username;
                logToUpdate.type = logToSave.type;
                suspect.SaveChanges();
                var res = triggerPusher();
            }
            return false;
        }

        public bool DeleteLog(int id)
        {
            using (var suspect = new SuspictionModel())
            {
                suspect.Logs.Remove(suspect.Logs.First(x => x.logId == id));
                suspect.SaveChanges();
                var res = triggerPusher();
            }
            return false;
        }

        public String[] getChartInfo()
        {
            String[] data = new String[3];
            using (var suspect = new SuspictionModel())
            {
                data[0] = suspect.Logs.Where(x => x.type == "Insider").ToList().Count().ToString();
                data[1] = suspect.Logs.Where(x => x.type == "Outsider").ToList().Count().ToString();
                data[2] = suspect.Logs.Where(x => x.type == "Not Sure").ToList().Count().ToString();
            }
            return data;
        }
    }
}