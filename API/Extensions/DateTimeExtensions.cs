namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime deb)
        {
            var today = DateTime.Today;
            var age = today.Year - deb.Year;
            if (deb.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}