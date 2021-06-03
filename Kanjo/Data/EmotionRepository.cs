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
    public class EmotionRepository
    {
        readonly string ConnectionString;

        public EmotionRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("Kanjo");
        }

        public List<Emotion> GetAll(int userId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT e.id, e.Name, e.User_Id, COUNT(ee.Entry_Id) AS Frequency FROM Emotions AS e
                        LEFT JOIN Entry_Emotions AS ee ON e.Id = ee.Emotion_Id
                        WHERE e.User_Id = 6 OR e.User_Id = 8 AND e.Active = 1
                        GROUP BY e.Id, e.Name, e.User_Id
                        ORDER BY count(ee.Entry_Id) DESC";
            return db.Query<Emotion>(sql, new { userId = userId }).ToList();
        }

        public List<Emotion> GetAllPublic()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Emotions WHERE Active = 1 AND User_Id = 6";
            return db.Query<Emotion>(sql).ToList();
        }

        public List<Emotion> GetAllByUser(int userId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * FROM Emotions WHERE User_Id = @userId AND Active = 1";
            return db.Query<Emotion>(sql, new { userId = userId }).ToList();
        }

        public Emotion Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Emotions WHERE Id = @id";
            return db.QueryFirstOrDefault<Emotion>(sql, new { id = id });
        }

        public void Add(Emotion emotion)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"INSERT INTO [dbo].[Emotions]
                               ([Name]
                               ,[User_Id]
                               ,[Description])
                         VALUES
                               (@Name
                               ,@User_Id
                               ,@Description)";
            var id = db.ExecuteScalar<int>(sql, emotion);
            emotion.Id = id;
        }

        public void Update(Emotion emotion)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE [dbo].[Emotions]
                           SET [Name] = @Name
                              ,[Description] = @Description
                        WHERE Id = @id";
            db.Execute(sql, emotion);
        }

        public void Delete(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE Emotions
                        SET Active = 0
                        WHERE Id = @id";
            db.Execute(sql, new { id = id });
        }
    }
}
