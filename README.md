# URL Shortener

Installation Steps
1. Create SQL Server/Database
2. Create table on the newly created database by running Scripts/CreateShortUrlTable.sql
3. Ensure dotnet CLI is installed
4. Add database connection string to secrets. Under the root folder run command:
	dotnet user-secrets set "ConnectionStrings:DefaultConnection" "YOUR CONNECTION STRING HERE"
5. In the ClientApp directory, run "npm -i" command to install node modules
6. In the root directory run "dotnet start"


To run tests: (client side)
	1. Go into /ClientApp and run dotnet test
