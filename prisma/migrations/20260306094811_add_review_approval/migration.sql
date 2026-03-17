/*
  Warnings:

  - Added the required column `proofImage` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "proofImage" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "firmId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Review_firmId_fkey" FOREIGN KEY ("firmId") REFERENCES "PropFirm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("authorId", "content", "createdAt", "firmId", "id", "rating", "proofImage", "status", "updatedAt") 
SELECT "authorId", "content", "createdAt", "firmId", "id", "rating", 'https://via.placeholder.com/400x300?text=Legacy+Review', 'approved', CURRENT_TIMESTAMP FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
