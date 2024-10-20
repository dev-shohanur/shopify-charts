/*
  Warnings:

  - Added the required column `month` to the `LineChartsTwo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LineChartsTwo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "actual" TEXT NOT NULL,
    "expected" TEXT NOT NULL
);
INSERT INTO "new_LineChartsTwo" ("actual", "expected", "id", "shop") SELECT "actual", "expected", "id", "shop" FROM "LineChartsTwo";
DROP TABLE "LineChartsTwo";
ALTER TABLE "new_LineChartsTwo" RENAME TO "LineChartsTwo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
