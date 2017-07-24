namespace WebAPI.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class SuspictionModel : DbContext
    {
        public SuspictionModel()
            : base("SuspictionModel")
        {
            // Set the custom initializer
            //Database.SetInitializer<ErrorModel>(new ProjectDBInitializer());
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<SuspictionModel, WebAPI.Models.ProjectDBInitializer>("SuspictionModel"));
        }

        public DbSet<LogModel> Logs { get; set; }
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
