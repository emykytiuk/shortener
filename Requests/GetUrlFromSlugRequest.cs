using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using url_shortener.Models;
using url_shortener.Common;
using Microsoft.Data.SqlClient;
using Dapper;

namespace url_shortener.Requests
{
    public class GetUrlFromSlugRequest : IRequest<ShortUrl>
    {
        public string Slug { get; set; }
    }
    public class GetUrlFromSlugRequestHandler : IRequestHandler<GetUrlFromSlugRequest, ShortUrl>
    {
        private readonly ILogger<GetUrlFromSlugRequestHandler> _logger;

        public GetUrlFromSlugRequestHandler(ILogger<GetUrlFromSlugRequestHandler> logger)
        {
            _logger = logger;
        }

        public async Task<ShortUrl> Handle(GetUrlFromSlugRequest request, CancellationToken cancellationToken)
        {
            var connectionString = Global.ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                var slugParams = new
                {
                    Slug = request.Slug
                };

                var sql = "SELECT [URL],[Slug] FROM [dbo].[ShortURL] WHERE Slug = @Slug";
                var result = await connection.QueryFirstOrDefaultAsync<ShortUrl>(sql, slugParams);

                return result;
            }
        }
    }
}