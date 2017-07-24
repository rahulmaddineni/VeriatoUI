using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TestClient
{
    class Client
    {
        private static int SERVICE_PORT = 17433;
        private static string SERVICE_URL = "http://localhost:{0}";
        private static string ADD_LOG = "Api/Rest/AddLog";
        
        public Client()
        {
            
        }

        public void Log()
        {
            try { 
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(String.Format(SERVICE_URL, SERVICE_PORT));

                var response = client.PostAsync(ADD_LOG, null).Result;

                String result;

                if (response.IsSuccessStatusCode)
                {
                    Task<string> task = response.Content.ReadAsStringAsync();  // returns immediately
                    string temp = task.Result;  // blocks until task completes

                    result = temp.ToString();
                    Console.WriteLine(result);
                }
                else
                {

                    result = string.Format("ERROR: {0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
                    Console.WriteLine(result);
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
            }
        }
        
        public static void Main(string[] args)
        {
            Client client = new Client();
            //Thread.Sleep(3000); 
            client.Log();
        }
    }
}
