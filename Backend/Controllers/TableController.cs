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
        private string _connectionString;

        public TableController(DataContext dataContext,IConfiguration icongif)
        {
            _dataContext = dataContext;
            _connectionString=icongif.GetConnectionString("DefaultConnection");
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

        // Add Data
        // Add Data
        [HttpPost("add")]
        public async Task<IActionResult> AddTableData([FromQuery] string tableName, [FromQuery] string columns, [FromBody] Dictionary<string, object> values)
        {
            if (string.IsNullOrEmpty(tableName) || values == null || values.Count == 0 || string.IsNullOrEmpty(columns))
            {
                return BadRequest("Table name, columns, and values are required.");
            }

            // Construct values string
            var valuesString = string.Join(", ", values.Select(v => $"'{v.Value.ToString().Replace("'", "''")}'"));

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    using (var command = new SqlCommand("AddTableData", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TableName", tableName);
                        command.Parameters.AddWithValue("@Columns", columns);
                        command.Parameters.AddWithValue("@Values", valuesString);

                        await command.ExecuteNonQueryAsync();
                    }
                }

                return Ok("Data added successfully.");
            }
            catch (SqlException ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateTableData([FromQuery] string tableName, [FromQuery] string primaryKeyColumn, [FromBody] Dictionary<string, object> values, [FromQuery] int id)
        {
            if (string.IsNullOrEmpty(tableName) || values == null || values.Count == 0 || id <= 0 || string.IsNullOrEmpty(primaryKeyColumn))
            {
                return BadRequest("Table name, values, ID, and primary key column are required.");
            }

            // Construct SET clause
            var setClause = string.Join(", ", values.Select(v => $"{v.Key} = '{v.Value.ToString().Replace("'", "''")}'"));

            // Construct WHERE clause
            var whereClause = $"{primaryKeyColumn} = {id}";

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    using (var command = new SqlCommand("UpdateTableData", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TableName", tableName);
                        command.Parameters.AddWithValue("@SetClause", setClause);
                        command.Parameters.AddWithValue("@WhereClause", whereClause);

                        await command.ExecuteNonQueryAsync();
                    }
                }

                return Ok("Data updated successfully.");
            }
            catch (SqlException ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteTableData([FromQuery] string tableName, [FromQuery] string primaryKeyColumn, [FromQuery] int id)
        {
            if (string.IsNullOrEmpty(tableName) || id <= 0 || string.IsNullOrEmpty(primaryKeyColumn))
            {
                return BadRequest("Table name, ID, and primary key column are required.");
            }

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    using (var command = new SqlCommand("DeleteTableData", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TableName", tableName);
                        command.Parameters.AddWithValue("@PrimaryKeyColumn", primaryKeyColumn);
                        command.Parameters.AddWithValue("@Id", id);

                        await command.ExecuteNonQueryAsync();
                    }
                }

                return Ok("Data deleted successfully.");
            }
            catch (SqlException ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }



    }
        

    
}
