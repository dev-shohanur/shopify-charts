/*
  Warnings:

  - Added the required column `month` to the `BarChartTwo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BarChartTwo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "actual" TEXT NOT NULL,
    "expected" TEXT NOT NULL
);
INSERT INTO "new_BarChartTwo" ("actual", "expected", "id", "shop") SELECT "actual", "expected", "id", "shop" FROM "BarChartTwo";
DROP TABLE "BarChartTwo";
ALTER TABLE "new_BarChartTwo" RENAME TO "BarChartTwo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
