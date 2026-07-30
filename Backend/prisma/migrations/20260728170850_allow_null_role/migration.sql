-- DropForeignKey
ALTER TABLE "AdminUser" DROP CONSTRAINT "AdminUser_roleId_fkey";

-- AlterTable
ALTER TABLE "AdminUser" ALTER COLUMN "roleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AdminUser" ADD CONSTRAINT "AdminUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
