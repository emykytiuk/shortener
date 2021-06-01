CREATE TABLE ShortURL (
    Id int NOT NULL IDENTITY,
    URL varchar(max) NOT NULL,
    Slug varchar(255) UNIQUE NOT NULL,
    PRIMARY KEY (Id)
); 
GO
