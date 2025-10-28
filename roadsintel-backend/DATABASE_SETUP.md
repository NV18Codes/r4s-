# Database Setup Instructions

## The Issue
The `roadsintel` database doesn't exist yet on your MySQL server. You need to create it first.

## ✅ Option 1: Using MySQL Workbench (Easiest)

1. Open **MySQL Workbench**
2. Connect to: `89.116.25.62:3306`
3. Username: `navya`
4. Password: `45nvr@ESS_SuperAd25!`
5. Once connected, open a SQL tab
6. Run this command:
   ```sql
   CREATE DATABASE roadsintel;
   ```
7. Done! ✅

---

## ✅ Option 2: Using phpMyAdmin (If you have access)

1. Go to phpMyAdmin
2. Connect to the MySQL server
3. Click "Databases" tab
4. Enter database name: `roadsintel`
5. Click "Create"
6. Done! ✅

---

## ✅ Option 3: Using Command Line (If MySQL CLI is installed)

```bash
mysql -h 89.116.25.62 -u navya -p
# Enter password when prompted: 45nvr@ESS_SuperAd25!
```

Then run:
```sql
CREATE DATABASE roadsintel;
EXIT;
```

---

## ✅ Option 4: Using Hosting Panel (cPanel, Plesk, etc.)

1. Log into your hosting control panel
2. Find "MySQL Databases" or "Database Management"
3. Create a new database named `roadsintel`
4. Grant permissions to user `navya`
5. Done! ✅

---

## After Creating the Database

Once the database exists, come back here and I'll run:

```bash
npx prisma db push
```

This will create all the tables for crack detection.

---

## Quick Test

After creating the database, we can test if it's accessible. Let me know when you've created it!

