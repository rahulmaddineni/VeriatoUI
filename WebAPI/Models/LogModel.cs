using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class LogModel
    {

        public LogModel()
        {
        }

        [Key]
        public int logId { get; set; }

        [Required]
        [StringLength(50)]
        public String header { get; set; }

        [Required]
        public String username { get; set; }

        public String useremail { get; set; }

        public String phone { get; set; }

        [Required]
        public String type { get; set; }

        [Required]
        public String description { get; set; }

    }
}