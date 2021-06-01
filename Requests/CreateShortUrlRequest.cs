using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using url_shortener.Models;
using url_shortener.Common;
using Microsoft.Data.SqlClient;
using Dapper;
using url_shortener.Exceptions;
using System;
using System.Linq;

namespace url_shortener.Requests
{
    public class CreateShortUrlRequest : IRequest<ShortUrl>
    {
        public ShortUrl ShortUrl { get; set; }
    }

    public class CreateShortUrlRequestHandler : IRequestHandler<CreateShortUrlRequest, ShortUrl>
    {
        private readonly ILogger<CreateShortUrlRequestHandler> _logger;

        public CreateShortUrlRequestHandler(ILogger<CreateShortUrlRequestHandler> logger)
        {
            _logger = logger;
        }

        public async Task<ShortUrl> Handle(CreateShortUrlRequest request, CancellationToken cancellationToken)
        {
            var connectionString = Global.ConnectionString;
            var shortUrl = new ShortUrl();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                // if no slug is given, create random one
                var slug = string.IsNullOrEmpty(request.ShortUrl.Slug) ? GenerateRandomSlug(6) :
                                String.Concat(request.ShortUrl.Slug.Where(c => !Char.IsWhiteSpace(c)));

                var slugParams = new
                {
                    Slug = slug
                };

                var getSql = "SELECT [URL],[Slug] FROM [dbo].[ShortURL] WHERE Slug = @Slug";
                var existingSlug = await connection.QueryFirstOrDefaultAsync<ShortUrl>(getSql, slugParams);
                if (existingSlug == null)
                {
                    var createSlugParams = new
                    {
                        Slug = slug,
                        Url = request.ShortUrl.Url
                    };

                    var createSql = "INSERT INTO [dbo].[ShortURL]([URL],[Slug]) VALUES (@Url, @Slug)";
                    var result = await connection.QueryAsync<ShortUrl>(createSql, createSlugParams);

                    shortUrl.Url = request.ShortUrl.Url;
                    shortUrl.Slug = slug;
                }
                else
                {
                    throw new AlreadyExistsException("Slug already exists. Please try again with a new one");
                }
                return shortUrl;
            }
        }

        // taken from https://stackoverflow.com/questions/1344221/how-can-i-generate-random-alphanumeric-strings
        private string GenerateRandomSlug(int size)
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[size];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            return new string(stringChars);
        }
    }
}