using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MediatR;
using url_shortener.Models;
using url_shortener.Requests;
using Microsoft.AspNetCore.Http;
using url_shortener.Common;

namespace url_shortener.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UrlShortenerController : ControllerBase
    {
        private readonly ILogger<UrlShortenerController> _logger;
        private readonly IMediator _mediator;

        public UrlShortenerController(ILogger<UrlShortenerController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet("{slug}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ShortUrl))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ShortUrlActionResponse> GetUrlFromSlug(string slug)
        {
            var response = new ShortUrlActionResponse();

            try
            {
                if (string.IsNullOrEmpty(slug))
                {
                    throw new ArgumentException("No Slug Sent in");
                }

                var result = await _mediator.Send(new GetUrlFromSlugRequest { Slug = slug });
                if (result == null)
                {
                    response.Message = string.Format("Could not find matching slug {0}", slug);
                }
                else
                {
                    response.ShortUrl = result;
                }
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return response;
        }

        [HttpPost]
        public async Task<ShortUrlActionResponse> CreateShortUrl([FromBody] ShortUrl url)
        {
            var response = new ShortUrlActionResponse();

            try
            {
                if (string.IsNullOrEmpty(url.Url))
                {
                    throw new ArgumentException("No URL Sent in");
                }

                var result = await _mediator.Send(new CreateShortUrlRequest { ShortUrl = url });
                response.ShortUrl = result;
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }

            return response;
        }
    }
}
