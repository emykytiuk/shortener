# URL Shortener

This is a React webapp that uses C# ASP.NET backend. Though there are faster ways redirecting (such as redirecting directly from http respponse) I decided to run it via the Redux channels as Redux something I would be using in this role. I'd love to discuss other design decisions as well as answer any other questions you may have.

Due to time I only stubbed out the server side tests to show what I would test but I have added client side tests on the react reducers.

You can view a working version here: https://em-url-shortener.azurewebsites.net/

Installation Steps:

1. Create SQL Server/Database
2. Create table on the newly created database by running Scripts/CreateShortUrlTable.sql
3. Ensure dotnet CLI is installed
4. Add database connection string to secrets. Under the root folder run command:
   dotnet user-secrets set "ConnectionStrings:DefaultConnection" "YOUR CONNECTION STRING HERE"
5. In the ClientApp directory, run "npm install" command to install node modules
6. In the root directory run "dotnet run"

To run client side tests:

1. Go into /ClientApp and run npm test
