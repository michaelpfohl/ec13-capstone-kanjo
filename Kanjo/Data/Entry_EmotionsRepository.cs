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
    public class Entry_EmotionsRepository
    {
        readonly string ConnectionString;

        public Entry_EmotionsRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("Kanjo");
        }

        public List<Entry_Emotion> GetAllByUser(int userId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT ee.* FROM Entry_Emotions AS ee
                        JOIN Entries AS e on e.Id = ee.Entry_Id
                        JOIN Users AS u on u.Id = e.User_Id
                        WHERE u.Id = @userId";
            return db.Query<Entry_Emotion>(sql, new { userId = userId }).ToList();
        }

        public List<Entry_Emotion> GetAllByEntry(int entryId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Entry_Emotions WHERE Entry_Id = @entryId AND Active = 1";
            return db.Query<Entry_Emotion>(sql, new { entryId = entryId }).ToList();
        }

        public List<Entry_Emotion> GetAllByEmotion(int emotionId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Entry_Emotions WHERE Emotion_Id = @emotionId AND Active = 1";
            return db.Query<Entry_Emotion>(sql, new { emotionId = emotionId }).ToList();
        }

        public Entry_Emotion Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = "SELECT * FROM Entry_Emotions WHERE Id = @id";
            return db.QueryFirstOrDefault<Entry_Emotion>(sql, new { id = id });
        }

        public void Add(Entry_Emotion entry_emotion)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"INSERT INTO [dbo].[Entry_Emotions]
                               ([Entry_Id]
                               ,[Emotion_Id]
                               ,[Where_Answer]
                               ,[Why_Answer]
                               ,[Who_Answer]
                               ,[When_Answer]
                               ,[How_Answer])
                         VALUES
                               (@Entry_Id
                               ,@Emotion_Id
                               ,@Where_Answer
                               ,@Why_Answer
                               ,@Who_Answer
                               ,@When_Answer
                               ,@How_Answer)";
            var id = db.ExecuteScalar<int>(sql, entry_emotion);
            entry_emotion.Id = id;
        }

        public void Update(Entry_Emotion entry_emotion)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE [dbo].[Entry_Emotions]
                           SET [Where_Answer] = @Where_Answer
                              ,[Why_Answer] = @Why_Answer
                              ,[Who_Answer] = @Who_Answer
                              ,[When_Answer] = @When_Answer
                              ,[How_Answer] = @How_Answer
                        WHERE Id = @id";
            db.Execute(sql, entry_emotion);
        }

        public void Delete(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE Entry_Emotions
                        SET Active = 0
                        WHERE Id = @id";
            db.Execute(sql, new { id = id });
        }
    }
}
