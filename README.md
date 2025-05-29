# 🏡 Full-Stack Real Estate Application

_A real estate web platform built with ASP.NET Core and React_

### 🖼️ App Screenshot

<p align="center">
  <img src="https://raw.githubusercontent.com/bubanjan/real-estate-solution/main/RealEstateFrontend/src/assets/scshot1.png" width="800" alt="App Screenshot" />
</p>

- 🚧 This is a **full-stack** real estate application.
- ✅ The **backend is fully implemented and ready for use**. 📁 Folder: RealEstateAPI
- 🛠️ The **frontend (React) is functionally complete — minor visual and UX improvements are in progress.** 📁 Folder: RealEstateFrontend
- 🧪 **Automated unit & integration tests included**. 📁 Folder: RealEstateAPI.Tests

---

# 🏣 Real Estate App – Backend

**Tech Stack:**  
C# ASP.NET Core Web API + Entity Framework Core + SQLite (will later be migrated to SQL Server)  
Authorization via JWT + HttpOnly Cookies

- This is the backend part of a full-stack real estate application. It includes unit and integration tests to ensure robustness and reliability. The frontend is in the same solution, in a separate folder.

---

## Features

- ✅ Custom DTO-to-Entity mapping
- ✅ Entity Framework Core + SQL DB
- ✅ Unit & Integration Tests using xUnit + EF Core InMemory + WebApplicationFactory
- ✅ Role-based Authorization (JWT tokens in HttpOnly cookies)
- ✅ Admin & Agent roles with access control on endpoints
- ✅ Create, Read, Update, Delete for Real Estates, Tags, and Photos
- ✅ Pagination, Sorting, Filtering, and Text Search
- ✅ Many-to-Many (Tags), One-to-Many (Photos) relationships
- ✅ Logging using Serilog
- ✅ API Documentation via Swagger
- ✅ Test users seeded for easy local testing
- ✅ Images upload with check of size and file type

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

- No need to configure connection strings or set up a database — a ready-to-use SQLite file with test data is included.
- Just open the project in **Visual Studio** and run it using the **Debug (F5)** button.

API will be available at: `https://localhost:7209/api/estates`

### Test with Swagger

Navigate to: `https://localhost:7209/swagger`

- Use the login endpoint with the test credentials (username: Admin4, password: admin4@@@) or (Agent4, agent4@@@)
- JWT token is stored in an **HttpOnly cookie** after login
- You can now test protected routes directly from Swagger

## Authorization

- Admin can: create/delete users, delete estates and see seller contact info for every estate
- Admin & Agent can: create/update estates and see seller contact info for every estate
- Public users: can browse, search, filter, and view listings (without seller contact info)

---

## Project Highlights

### Entities & Relationships

- `User` (Admin, Agent roles)
- `Estate`
- `Tag` – many-to-many with Estate (`SeaView`, `NewBuild`, etc.)
- `ImageLink` – one-to-many with Estate

### Filtering & Search

- Filter by: `price`, `size`, `city`
- Sort: ascending/descending by price or size
- Text search in estate description

## Notes

- Some files (e.g., DB and appsettings) **excluded from .gitignore** temporarily for easier testing

---

# 🖥️ Real Estate App – Frontend (React)

🚧 **NOTE:**  
 The main frontend functionality is complete. Minor enhancements and polishing are still in progress and will be added soon.

**Tech Stack:**  
React (Vite) + React Router + Zustand (global state management) + Material UI + **Axios** + JWT authentication (via HttpOnly cookies) + yet-another-react-lightbox

This is the frontend for the Real Estate platform. It connects to the ASP.NET Core backend and enables users to browse, search, filter, and manage property listings.

---

### ✅ Completed Frontend Features

- ✅ Global state management using **Zustand** (e.g., user session, filters...)
- ✅ GUI built with Material UI
- ✅ Axios is now used for all frontend API calls, replacing the native `fetch` API for better error handling and cleaner syntax
- ✅ Client-side navigation using React Router
- ✅ **List Estates** with pagination, sorting, and search
- ✅ **Filter real estate listings** by price, size, city, and estate type
- ✅ **Frontend form validation** (e.g., required fields, max text length)
- ✅ **Create/Edit/Delete Estate** with dynamic tag selection (multi-select)
- ✅👥 **Role-based access**:
  - ✅ Admin and Agent can create/edit estates and and see/edit seller contact info for every estate
  - ✅ Only Admin can delete estate
  - ✅ Public (unauthenticated) users can search and browse, see estate data, but not modify data and they can not see seller data
- ✅ Real-time validation and error messages in form fields
- ✅ Handles JWT login via HttpOnly cookies (secure session management)
- ✅ Images upload with check of size and file type, in create and edit modal
- ✅ Images are visible as image gallery in estate detail view
- ✅ **Modal confirmation dialogs**

---

### 🚧 TODO · Not finished tasks, Work In Progress

- [ ] Posibility to delete images for each estate, add multiple images at once in edit modal
- [ ] Final UI/UX design polish (colors, photos, logo, backgrounds, dark/other theme, responsive layout for mobile phones, login menu as dropdown)
- [ ] UI where admin can see, add, edit and remove users

---

### 🧪 How to Run the Frontend

- Open backend project (RealEstateAPI) in Visual Studio and run it using the Debug (F5) button, make sure the **backend is running** locally at `https://localhost:7209`.

Then:

```bash
cd RealEstateFrontend
npm install
npm run dev

```

## Test Users

These demo users are seeded in the database you can log in with:

### Admin

```json
{
  "userName": "Admin4",
  "password": "admin4@@@"
}
```

### Agent

```json
{
  "userName": "Agent4",
  "password": "agent4@@@"
}
```

### 📌 Future Tasks (TODO)

- [ ] Change database from SQLite to SQL Server
- [ ] Deploy backend, frontend, and database to Azure  
       (Azure App Service, Azure SQL Database, Azure Static Web Apps – or Netlify for frontend)
