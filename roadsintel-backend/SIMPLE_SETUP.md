# Simple Database Setup

## Quick Steps

### Step 1: Connect to your MySQL database

You need to create the database. Here are 3 easy ways:

**Option A: Use a SQL client (Easiest)**

1. Open any SQL client (MySQL Workbench, DBeaver, phpMyAdmin, etc.)
2. Connect with these details:
   - Host: `89.116.25.62`
   - Port: `3306`
   - Username: `dev45`
   - Password: `Steve@45`
3. Run this SQL command:
   ```sql
   CREATE DATABASE roadsintel;
   ```
4. Done!

**Option B: Download MySQL Workbench**

1. Download: https://dev.mysql.com/downloads/workbench/
2. Install and open
3. Click "+" to add connection
4. Fill in:
   - Hostname: `89.116.25.62`
   - Port: `3306`
   - Username: `dev45`
   - Password: `Steve@45`
5. Click "Test Connection"
6. Click "OK" and double-click to connect
7. Type `CREATE DATABASE roadsintel;` and run it

**Option C: Use Command Line (if MySQL is installed)**

```bash
mysql -h 89.116.25.62 -P 3306 -u dev45 -p
# Enter password: Steve@45
CREATE DATABASE roadsintel;
EXIT;
```

---

### Step 2: After database is created, run these commands in your backend folder:

```bash
cd roadsintel-backend
npx prisma db push
npm run start:dev
```

Your backend will be running on http://localhost:3001

---

## That's it! 🎉

You just need to:
1. Create the database (one SQL command)
2. Run 2 commands to start your backend
