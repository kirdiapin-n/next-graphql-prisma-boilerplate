-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Roles"[];
