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
    public class UserRepository
    {
        readonly string ConnectionString;

        public UserRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("Kanjo");
        }

        public User GetUser(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT *
                        FROM Users
                        WHERE Id = @id";
            return db.QueryFirstOrDefault<User>(sql, new { id = id });
        }

        public User GetUserByFirebaseUid(string firebase_Uid)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM Users 
                        WHERE Firebase_Uid = @firebase_Uid";
            var user = db.QueryFirstOrDefault<User>(sql, new { firebase_Uid = firebase_Uid });
            return user;
        }

        public void AddUser(User user)
        {
            using var db = new SqlConnection(ConnectionString);
            var user_created_date = DateTime.Now;
            user.User_Created_Date = user_created_date;
            var sql = @"INSERT INTO [dbo].[Users]
                               ([Name]
                               ,[Email]
                               ,[Profile_Picture]
                               ,[Firebase_Uid])
                         VALUES
                               (@Name
                               ,@Email
                               ,@Profile_Picture
                               ,@Firebase_Uid)";
            var id = db.ExecuteScalar<int>(sql, user);
            user.Id = id;
        }

        public void UpdateUser(User user)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE [dbo].[Users]
                           SET [Name] = @Name
                              ,[Email] = @Email
                              ,[Profile_Picture] = @Profile_Picture
                              ,[User_Created_Date] = @User_Created_Date
                              ,[Active] = @Active
                              ,[Firebase_Uid] = @Firebase_Uid
                         WHERE [Id] = @Id";
            db.Execute(sql, user);
        }

        public void DeleteUser(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"UPDATE [Users]
                        SET Active = 0
                        WHERE Id = @id";
            db.Execute(sql, new { id = id });
        }
    }
}
