namespace API.Entities
{
    public class Connection
    {
        public string ConnectionId { get; set; }

        public string UserName { get; set; }

        public Connection()
        {

        }

        public Connection(string connectionId, string username)
        {
            ConnectionId = connectionId;
            UserName = username;
        }
    }
}