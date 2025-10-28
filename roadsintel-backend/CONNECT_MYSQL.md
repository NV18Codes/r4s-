# How to Connect to MySQL and Setup Database

## Step-by-Step Instructions

### Option 1: Using MySQL Command Line

1. **Open Command Prompt or Terminal**

2. **Connect to your MySQL server:**
   ```bash
   mysql -h 89.116.25.62 -P 3306 -u dev45 -p
   ```

3. **Enter password when prompted:**
   ```
   Steve@45
   ```

4. **Create the database:**
   ```sql
   CREATE DATABASE roadsintel;
   ```

5. **Exit MySQL:**
   ```sql
   EXIT;
   ```

---

### Option 2: Using MySQL Workbench (Recommended - Visual Tool)

1. **Download MySQL Workbench:**
   - Go to: https://dev.mysql.com/downloads/workbench/
   - Download and install

2. **Open MySQL Workbench**

3. **Click "+" to add a new connection**

4. **Enter connection details:**
   - Connection Name: `RoadsIntel Server`
   - Hostname: `89.116.25.62`
   - Port: `3306`
   - Username: `dev45`
   - Password: `Steve@45`
   - Click "Test Connection"
   - If successful, click "OK"

5. **Connect to the server:**
   - Double-click the connection

6. **Create the database:**
   - In the query window, type:
   ```sql
   CREATE DATABASE roadsintel;
   ```
   - Click the lightning bolt icon to execute
   - You should see: "1 row(s) affected"

7. **Verify database created:**
   - In the left sidebar under "SCHEMAS"
   - Click refresh icon
   - You should see `roadsintel` database

8. **Close MySQL Workbench**

---

### Option 3: Using Online Tool (phpMyAdmin or Adminer)

If you have phpMyAdmin access:

1. Login to your phpMyAdmin panel
2. Click "New" to create database
3. Name: `roadsintel`
4. Collation: `utf8mb4_unicode_ci`
5. Click "Create"

---

## After Database is Created

Go back to your backend terminal and run:

```bash
cd roadsintel-backend
npx prisma db push
```

Then start your server:

```bash
npm run start:dev
```

Your backend will be running on **http://localhost:3001** 🚀

## Test the API

Once running, test with:

**Upload an image:**
```bash
POST http://localhost:3001/images
```

**Get work orders:**
```bash
GET http://localhost:3001/workorders
```
