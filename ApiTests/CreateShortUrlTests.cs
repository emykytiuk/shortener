namespace ApiTests
{
    public class CreateShortUrlTests
    {
        public void Test1()
        {

        }

        public void NewURLIsCreatedWhenShortUrlIsGiven()
        {
            // Test creating url when valid short url is given
        }

        public void NewURLIsCreatedWhenShortUrlIsGiven_SlugWithWhitespace()
        {
            // test creating url with url sent in that has a slug with white space
        }

        public void NewURLIsCreatedNoSlugIsGiven()
        {
            // Test that asserts a URL is created when no slug is sent to the API
        }

        public void NoURLIsCreatedIfSlugAlreadyExists()
        {
            // Enter a slug that exists in the database and check for error thrown
        }

        public void ErrorIsThrownWhenNoURLIsGiven(string slug)
        {
            // Test to ensure server side validation is working
        }
    }
}
