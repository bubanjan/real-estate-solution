# 🏣 Real Estate App – Backend

**Tech Stack:**  
C# ASP.NET Core Web API + Entity Framework Core + SQLite (will later be migrated to SQL Server)  
Authorization via JWT + HttpOnly Cookies

This is the backend part of a full-stack real estate application. Frontend (React) will be added soon in a separate repo.
⛵ The project is still in progress — some parts of the code may change soon.

---

## Features

-   ✅ Custom DTO-to-Entity mapping
-   ✅ EF Core + SQL DB
-   ✅ Role-based Authorization (JWT tokens in HttpOnly cookies)
-   ✅ Admin & Agent roles with access control on endpoints
-   ✅ CRUD for Real Estates, Tags, and Photos
-   ✅ Pagination, Sorting, Filtering, and Text Search
-   ✅ Many-to-Many (Tags), One-to-Many (Photos) relationships
-   ✅ Logging using Serilog
-   ✅ API Documentation via Swagger
-   ✅ Test users seeded for easy local testing

---

## Test Users

These demo users are seeded in the database and ready to use:

### Admin

```json
{
    "userName": "Admin4",
    "email": "admin4@example.com",
    "password": "admin4@@@",
    "role": "Admin"
}
```

### Agent

```json
{
    "userName": "Agent4",
    "email": "agent4@example.com",
    "password": "agent4@@@",
    "role": "Agent"
}
```

---

## How to Run This Backend Locally

-   No need to configure connection strings or set up a database — a ready-to-use SQLite file with test data is included.
-   Just open the project in **Visual Studio** and run it using the **Debug (F5)** button.

API will be available at: `https://localhost:7209/api/estates`

### Test with Swagger

Navigate to: `https://localhost:7209/swagger`

-   Use the login endpoint with the test credentials (username: Admin4, password: admin4@@@) or (Agent4, agent4@@@)
-   JWT token is stored in an **HttpOnly cookie** after login
-   You can now test protected routes directly from Swagger

## Authorization

-   Admin can: create/delete users, delete estates and see seller contact info for every estate
-   Admin & Agent can: create/update estates and see seller contact info for every estate
-   Public users: can browse, search, filter, and view listings (without seller contact info)

---

## Project Highlights

### Entities & Relationships

-   `User` (Admin, Agent roles)
-   `Estate`
-   `Tag` – many-to-many with Estate (`SeaView`, `NewBuild`, etc.)
-   `ImageLink` – one-to-many with Estate

### Filtering & Search

-   Filter by: `price`, `size`, `city`
-   Sort: ascending/descending by price or size
-   Text search in estate description

## Notes

-   Some files (e.g., DB and appsettings) **excluded from .gitignore** temporarily for easier testing

---

## Future Tasks TODO

-   [ ] Finish React frontend
-   [ ] Change database from SQLite to SQL Server
-   [ ] Deploy backend, frontend, and database to Azure  
         (Azure App Service, Azure SQL Database, Azure Static Web Apps – or Netlify for frontend)
