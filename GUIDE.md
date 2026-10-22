# 🚀 Project Setup & Execution Guide

Step-by-step guide to set up and run the Bosco Soft Technologies Laravel + React application from scratch on any machine.

---

## 📋 1. Prerequisites Checklist

Ensure the target machine has the following tools installed:

1. **PHP (>= 8.2 or 8.3)** with the required extensions enabled:
   - `pdo_pgsql` (if using PostgreSQL) or `pdo_mysql` (if using MySQL)
   - `curl`, `mbstring`, `openssl`, `fileinfo`, `xml`, `zip`
2. **Composer** (PHP Dependency Manager)
3. **Node.js (v18+ or v20+) & npm**
4. **Database Engine**:
   - **PostgreSQL** (Default port `5432`) OR **MySQL** (Default port `3306`)
5. **Local Web Server**:
   - **Laragon** (Recommended for Windows) or standalone PHP / Apache / Nginx

> **💡 Windows / Laragon Tip:**  
> If using **Laragon**, simply open the Laragon desktop app and click the **"Terminal"** button. It automatically configures PHP, Composer, and Node.js in your PATH without needing manual system environment variables.

---

## 🛠️ 2. Step-by-Step Setup Process

### Step 1: Open the Project Directory
Open your terminal (PowerShell, Command Prompt, or Laragon Terminal) and navigate to the project directory:
```bash
cd C:\laragon\www\boscosoftwebsite
```
*(or the path where the project was cloned / extracted)*

---

### Step 2: Configure Environment Variables (`.env`)
1. If `.env` does not exist, copy `.env.example`:
   ```bash
   copy .env.example .env
   ```
2. Open `.env` and verify/adjust the application and database settings:

```ini
APP_NAME="Bosco Soft Technologies"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

# -------------------------------------------------------------
# Database Configuration (PostgreSQL - Default)
# -------------------------------------------------------------
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=bsoft_website
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password

# -------------------------------------------------------------
# Alternatively: If using MySQL instead
# -------------------------------------------------------------
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=bsoft_website
# DB_USERNAME=root
# DB_PASSWORD=
```

---

### Step 3: Create the Database
- **PostgreSQL**: Open **pgAdmin** or **HeidiSQL** and create a new database matching `DB_DATABASE` (e.g. `bsoft_website`).
- **MySQL**: Open **phpMyAdmin** or **HeidiSQL** and create the database `bsoft_website`.

---

### Step 4: Install PHP Dependencies
Run Composer to download and install all backend vendor packages:
```bash
composer install
```

---

### Step 5: Application Initialization & Database Migrations
Run the Artisan commands to initialize the project:
```bash
# 1. Generate unique application encryption key
php artisan key:generate

# 2. Run database migrations to create all required tables
php artisan migrate

# 3. Create symbolic link for public uploads & media
php artisan storage:link
```

---

### Step 6: Frontend Setup & Assets

Choose the option suitable for your workflow:

#### Option A: Running with Pre-built Assets (Fastest & Simplest)
The production bundle already exists inside `public/build/`. If you only want to run, test, or demonstrate the application:
- **No frontend build is needed.** You can skip directly to Step 7.

#### Option B: Frontend Development & Rebuilding
If modifying React TSX components, styles, or assets:
```powershell
# 1. Install Node dependencies
npm.cmd install

# 2. Start Vite live development server (Hot Module Reload)
npm.cmd run dev

# OR 3. Create an optimized production build
npm.cmd run build
```
*(Note: On Windows PowerShell, use `npm.cmd` if standard `npm` is blocked by Windows execution policies).*

---

### Step 7: Start the Server

#### Method 1: Using Laravel Artisan (Simplest & Recommended)
Run:
```bash
php artisan serve
```
The application will be live at:
👉 **http://127.0.0.1:8000**

#### Method 2: Using Laragon Virtual Host
1. Ensure the folder is placed in `C:\laragon\www\boscosoftwebsite`.
2. In Laragon, click **"Start All"**.
3. Open your browser and visit:
👉 **http://boscosoftwebsite.test**

---

## ⚠️ 3. Troubleshooting & Common Gotchas

| Issue / Error | Cause | Solution |
| :--- | :--- | :--- |
| **`npm.ps1 cannot be loaded because running scripts is disabled`** | Windows PowerShell execution policy restriction. | Use `npm.cmd run dev` or run PowerShell as Administrator and execute: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| **`composer is not recognized`** | Composer is not added to the global system PATH. | Open terminal using the **"Terminal"** button inside Laragon, or add `C:\laragon\bin\composer` to your Windows PATH. |
| **`SQLSTATE[08006] [7] connection to server at 127.0.0.1, port 5432 failed`** | PostgreSQL service is stopped or port/credentials are wrong. | Start PostgreSQL in Laragon / Windows Services, and verify `DB_PORT`, `DB_USERNAME`, and `DB_PASSWORD` in `.env`. |
| **Page styles or images fail to load / Blank page** | `APP_URL` mismatch or HTTPS forced locally. | Set `APP_ENV=local` and `APP_URL=http://127.0.0.1:8000` in `.env`. Local HTTP asset loading will work seamlessly. |

---

## ⚡ 4. Quick Summary for Developers (Copy & Paste)

```bash
# 1. Go to project directory
cd C:\laragon\www\boscosoftwebsite

# 2. Setup environment file
copy .env.example .env
# (Ensure DB_DATABASE, DB_USERNAME, DB_PASSWORD are set in .env)

# 3. Install backend & run migrations
composer install
php artisan key:generate
php artisan migrate
php artisan storage:link

# 4. Frontend build (if modifying UI code)
npm.cmd install
npm.cmd run build

# 5. Run the web server
php artisan serve

# Open in browser: http://127.0.0.1:8000
```
