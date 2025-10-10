# 🧙‍♂️ Express.js Fantasy REST API Project

`README Disclaimer: README.md is partially generated and formatted using AI`


A RESTful Express.js server for managing a fantasy RPG world — including **players**, **items**, and **quests**.  
The project demonstrates usage of **middleware**, **routing**, **validation**, **error handling**, and **EJS templates** for rendering dynamic views.

---

## 🚀 Features

### ✅ Core API Endpoints
- **/players** – Manage player entities (CRUD operations)
- **/items** – Manage inventory items with advanced query filtering
- **/quests** – Manage quests and their completion status

### 🧩 Middleware
- **logger.js** – Custom request logger (skips `.well-known` requests)
- **idValidation.js** – Ensures IDs are positive integers
- **errorHandler.js** – Global error handling with descriptive messages

### 💡 Rendering
- **EJS** template engine used to render filtered lists of items via `/items` route.
- Users can filter items by `quality`, `type`, `value range`, `playerId`, and `sort` order.
- A simple form with dynamic data refresh.

### 🧰 Data Sources
Static data in `/data` folder:
- `players.js` – Example list of fantasy characters
- `items.js` – Equipment and consumables
- `quests.js` – Tasks and missions for players

---

## 📦 Project Structure

```
.
├── data/
│   ├── items.js
│   ├── players.js
│   └── quests.js
├── middleware/
│   ├── errorHandler.js
│   ├── idValidation.js
│   └── logger.js
├── routes/
│   ├── r-items.js
│   ├── r-players.js
│   └── r-quests.js
├── views/
│   └── items.ejs
├── index.js
├── package.json
├── package-lock.json
├── gradingHELP.md
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your_repo_url>
cd project_folder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the server
```bash
node index.js
```
Server will start at:
```
http://localhost:3000
```

---

## 🧭 Available Routes

### Base routes
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/` | Welcome message |
| GET | `/test-error` | Triggers error for testing middleware |

### Players API
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/players` | Get all players |
| GET | `/players/:id` | Get player by ID |
| POST | `/players` | Add new player |
| PUT | `/players/:id` | Replace player |
| PATCH | `/players/:id` | Update player partially |
| DELETE | `/players/:id` | Delete player |

### Items API (includes rendered EJS view)
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/items` | Get all or filtered items |
| GET | `/items/:id` | Get item by ID |
| POST | `/items` | Add new item |
| PUT | `/items/:id` | Replace item |
| PATCH | `/items/:id` | Update item partially |
| DELETE | `/items/:id` | Delete item |

### Quests API
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/quests` | Get all quests |
| GET | `/quests/:id` | Get quest by ID |
| POST | `/quests` | Add new quest |
| PUT | `/quests/:id` | Replace quest |
| PATCH | `/quests/:id` | Update quest partially |
| DELETE | `/quests/:id` | Delete quest |

## 🎨 USE Postman collection to Run all request
[This is an external link to Postman collection for the project](https://speeding-rocket-249301.postman.co/workspace/My-Workspace~4ec445f8-a412-4504-8e0a-4f25bba9620b/collection/27560236-0a3e7ac4-44f1-44c3-bf27-c36a33e319de?action=share&creator=27560236)

---

## 🎨 EJS Template Example

Example view used for `/items`:

```ejs
<form id="filterForm" action="/items" method="get">
  <input type="text" name="quality" placeholder="Quality" />
  <input type="text" name="type" placeholder="Type" />
  <input type="number" name="minValue" placeholder="Min Value" />
  <input type="number" name="maxValue" placeholder="Max Value" />
  <input type="number" name="playerId" placeholder="Player ID" />
  <select name="sort">
    <option value="">Sort</option>
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>
  <button type="submit">Filter</button>
</form>
```

---

## 🧠 Key Concepts Demonstrated

- RESTful routing and CRUD operations
- Modular Express architecture
- Middleware chaining
- Request validation
- EJS rendering for dynamic filtering
- Centralized error handling

---

## 🏁 Author

**Dmitrii Izrailit**  
*Express.js | REST API | EJS Views | Middleware Enthusiast*