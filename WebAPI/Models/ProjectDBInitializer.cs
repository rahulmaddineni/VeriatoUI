using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    internal sealed class ProjectDBInitializer : DbMigrationsConfiguration<WebAPI.Models.SuspictionModel>
    {
        public ProjectDBInitializer()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
            ContextKey = "WebAPI.Models.SuspictionModel";
        }
        /// <summary>
        /// Seeds data into the DB
        /// </summary>
        protected override void Seed(SuspictionModel context)
        {
            //Console.WriteLine(" ### Seeding ###");

            // letting the base method do anything it needs to get done
            //base.Seed(context);

            // Save the changes you made, when adding the data above
            //context.SaveChanges();
        }
    }
}
