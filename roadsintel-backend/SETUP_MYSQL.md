# Setup with MySQL

## Step 1: Update Your .env File

Open the `.env` file and replace the `DATABASE_URL` with your MySQL connection string.

### Format:
```
DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE"
```

### Example:
If you have:
- Host: `localhost`
- Port: `3306` (default MySQL port)
- Username: `root`
- Password: `yourpassword`
- Database: `roadsintel`

Then your DATABASE_URL should be:
```
DATABASE_URL="mysql://root:yourpassword@localhost:3306/roadsintel"
```

## Step 2: Create Database

Before running migrations, create the database in MySQL:

### Using MySQL Command Line:
```bash
mysql -u root -p
```

Then in MySQL prompt:
```sql
CREATE DATABASE roadsintel;
EXIT;
```

### Or using MySQL Workbench:
1. Connect to your MySQL server
2. Right-click on Databases
3. Select "Create Database"
4. Name it `roadsintel`

## Step 3: Regenerate Prisma Client

Since we changed from PostgreSQL to MySQL, regenerate the client:

```bash
npx prisma generate
```

## Step 4: Run Migrations

Create the database tables:

```bash
npx prisma migrate dev --name init
```

## Step 5: Start the Server

```bash
npm run start:dev
```

## Update .env File Now

Please update your `.env` file with your MySQL credentials:

1. Open `.env` file in the roadsintel-backend folder
2. Replace the entire DATABASE_URL line with your MySQL connection string
3. Format: `DATABASE_URL="mysql://username:password@localhost:3306/roadsintel"`

Then I'll help you run the migrations!
