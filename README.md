# 📘 Prisma + PostgreSQL Setup Guide

> A quickstart guide for setting up Prisma with a PostgreSQL database using Docker.

---

## 🧭 Table of Contents

- [📦 Setup Instructions](#-setup-instructions)
    - [1. Initialize Prisma](#1-initialize-prisma)
    - [2. Configure the Database URL](#2-configure-the-database-url)
    - [3. Run PostgreSQL with Docker](#3-run-postgresql-with-docker)
    - [4. Run the First Migration](#4-run-the-first-migration)
- [✅ You're All Set](#-youre-all-set)

---

## 📦 Setup Instructions

### 1. Initialize Prisma

Initialize Prisma in your project:

```bash
npx prisma init
```

This command creates the following:
<ul>
    <li>prisma/schema.prisma – your Prisma schema</li>
    <li>.env – where your database URL will go</li>
</ul>

### 2. Configure the Database URL

Edit your .env file and set the <b>DATABASE_URL</b> to point to your local database, example:

```DATABASE_URL="postgresql://postgres:postgres@localhost:5435/postgres"```

Make sure this matches the Docker setup below.

### 3. Run PostgreSQL with Docker

If you don’t have PostgreSQL installed, spin up a container using Docker:

``` bash
docker run --name postgres-local \
  -e POSTGRES_PASSWORD=postgres \
  -p 5435:5432 \
  -d postgres
```

This starts a PostgreSQL instance accessible at localhost:5435.

### 4. Run the First Migration

With your database running and .env configured, apply the initial migration:

```bash 
npx prisma migrate dev --name init
```

This will:
<ul>
    <li>Create the initial migration</li>
    <li>Apply it to your database</li>
    <li>Generate Prisma Client code</li>
</ul>

### ✅ You’re All Set

You can now use Prisma to:
<ul>
    <li>Query and mutate your PostgreSQL database</li>
    <li>Generate typed client APIs</li>
    <li>Evolve your schema with migrations</li>
</ul>


to open Prisma DB - you can use command

```bash
 npx prisma studio
 ```


