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

        public List<Emotion> GetAllEmotionsUserAndPublic(int userId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT e.id, e.Active, e.Name, e.User_Id, COUNT(ee.Entry_Id) AS Frequency FROM Emotions AS e
                        LEFT JOIN Entry_Emotions AS ee ON e.Id = ee.Emotion_Id
                        WHERE (e.User_Id = 6 OR e.User_Id = 8)
                        GROUP BY e.Id, e.Name, e.User_Id, e.Active
                        ORDER BY count(ee.Entry_Id) DESC";
            return db.Query<Emotion>(sql, new { userId = userId }).ToList();
        }

        public List<Emotion> GetAllEmotionsWithEntries(int userId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT e.id, e.Name, e.User_Id, e.Active, COUNT(ee.Entry_Id) AS Frequency FROM Emotions AS e
                        LEFT JOIN Entry_Emotions AS ee ON e.Id = ee.Emotion_Id
                        WHERE (e.User_Id = 6 OR e.User_Id = @userId) AND ee.Active = 1
                        GROUP BY e.Id, e.Name, e.User_Id, e.Active
                        ORDER BY count(ee.Entry_Id) DESC";
            return db.Query<Emotion>(sql, new { userId = userId }).ToList();
        }

        public List<Emotion> GetAllWithFrequencyBetweenDateRange(int userId, string startDate, string endDate)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT e.id, e.Name, e.User_Id, e.Active, COUNT(ee.Entry_Id) AS Frequency FROM Emotions AS e
                        LEFT JOIN Entry_Emotions AS ee ON e.Id = ee.Emotion_Id
                        LEFT JOIN Entries AS en ON ee.Entry_Id = en.Id
                        WHERE (e.User_Id = 6 OR e.User_Id = @userId) AND ee.Active = 1 AND en.Date BETWEEN @startDate AND DATEADD(s,-1,DATEADD(d,1,@endDate))
                        GROUP BY e.Id, e.Name, e.User_Id, e.Active
                        ORDER BY count(ee.Entry_Id) DESC";
            return db.Query<Emotion>(sql, new { userId = userId, startDate = startDate, endDate = endDate }).ToList();
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
