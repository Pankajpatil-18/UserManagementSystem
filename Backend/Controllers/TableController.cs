using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TableController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public TableController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("table-names")]
        public async Task<IActionResult> GetTableNames()
        {
            try
            {
                var tableNames = await _dataContext.GetTableNamesAsync();
                return Ok(tableNames);
            }
            catch (Exception ex)
            {
                // Log exception details here
                return StatusCode(500, "An error occurred while fetching table names.");
            }
        }

        [HttpGet("table-data")]
        public async Task<IActionResult> GetTableData(string tableName)
        {
            try
            {
                // Use Microsoft.Data.SqlClient.SqlParameter instead of System.Data.SqlClient.SqlParameter
                var param = new Microsoft.Data.SqlClient.SqlParameter("@TableName", tableName);

                // Use ADO.NET for executing stored procedure
                var connection = _dataContext.Database.GetDbConnection();
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "GetTableData";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(param);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var dataTable = new DataTable();
                        dataTable.Load(reader);

                        // Convert DataTable to List of Dictionaries
                        var tableData = ConvertDataTableToList(dataTable);

                        return Ok(tableData);
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception details here
                return StatusCode(500, $"An error occurred while fetching data for the table: {tableName}. Exception: {ex.Message}");
            }
        }

        // Helper method to convert DataTable to List<Dictionary<string, object>>
        public static List<Dictionary<string, object>> ConvertDataTableToList(DataTable dataTable)
        {
            var columns = dataTable.Columns.Cast<DataColumn>();
            return dataTable.AsEnumerable()
                .Select(row => columns.ToDictionary(column => column.ColumnName, column => row[column]))
                .ToList();
        }
    }
        

    
}
