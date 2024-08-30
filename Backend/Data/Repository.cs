
using Backend.Data;



namespace Backend.Data
{
    public class Repository :IRepository{
        
        private readonly DataContext dataContextEf;
        private readonly IConfiguration _config;

        
        public Repository(IConfiguration config){
            dataContextEf=new DataContext(config);
            _config=config;

        }

        
    }

    
}