/*
  Warnings:

  - You are about to drop the column `month` on the `LineChartsThree` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LineChartsThree" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "value" TEXT NOT NULL
);
INSERT INTO "new_LineChartsThree" ("id", "shop", "time", "value") SELECT "id", "shop", "time", "value" FROM "LineChartsThree";
DROP TABLE "LineChartsThree";
ALTER TABLE "new_LineChartsThree" RENAME TO "LineChartsThree";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
