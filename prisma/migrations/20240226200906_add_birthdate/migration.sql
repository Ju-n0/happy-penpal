/*
  Warnings:

  - Added the required column `birthdate` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL;
