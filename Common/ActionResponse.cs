using url_shortener.Models;

namespace url_shortener.Common
{
    public class ShortUrlActionResponse
    {
        public string Message { get; set; }
        public ShortUrl ShortUrl { get; set; }
    }
}
