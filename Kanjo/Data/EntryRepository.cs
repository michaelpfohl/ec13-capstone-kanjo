using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kanjo.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Dapper;

namespace Kanjo.Data
{
    public class EntryRepository
    {
        readonly string ConnectionString;

        public EntryRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("Kanjo");
        }

        public List<Entry> GetAllByUser(int userId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Entries WHERE User_Id = @userId AND Active = 1";
            return db.Query<Entry>(sql, new { userId = userId }).ToList();
        }

        public Entry Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Entries WHERE Id = @id";
            return db.QueryFirstOrDefault<Entry>(sql, new { id = id });
        }

        public void Add(Entry entry)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"INSERT INTO [dbo].[Entries]
                               ([User_Id])
                         VALUES
                               (@User_Id)";
            var id = db.ExecuteScalar<int>(sql, entry);
            entry.Id = id;
        }

        public void UpdateDate(Entry entry)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE [dbo].[Entries]
                           SET [Date] = @Date
                        WHERE Id = @id";
            db.Execute(sql, entry);
        }

        public void Delete(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE Entries
                        SET Active = 0
                        WHERE Id = @id";
            db.Execute(sql, new { id = id });
        }

        public Entry GetMostRecent(int userId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT TOP 1 * FROM Entries 
                        WHERE user_Id = @userId
                        ORDER BY Date DESC";
            return db.QueryFirstOrDefault<Entry>(sql, new { userId = userId });
        }
    }
}
