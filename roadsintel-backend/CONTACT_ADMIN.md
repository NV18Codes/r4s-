# Database Access Issue

## Problem
Access denied to MySQL server `89.116.25.62`

## What You Need

Your IP address `49.43.242.248` is trying to connect but doesn't have permission.

## Solution Options

### Option 1: Ask Admin to Whitelist Your IP

Contact your database administrator and ask them to:

1. Allow remote connections from IP: `49.43.242.248`
2. Verify username `dev45` has the correct password
3. Grant CREATE DATABASE permission to user `dev45`

### Option 2: Create Database Remotely

If you have access to a different MySQL client or server:

1. Use phpMyAdmin, MySQL Workbench, or similar tool
2. Connect to `89.116.25.62:3306` with credentials
3. Run: `CREATE DATABASE roadsintel;`

### Option 3: Use SSH Tunnel

If you have SSH access to the server:

```bash
ssh -L 3306:localhost:3306 user@89.116.25.62
```

Then connect to `localhost:3306` instead

---

## After Database is Created

Once database is created (by any method), run:

```bash
npx prisma db push
npm run start:dev
```
