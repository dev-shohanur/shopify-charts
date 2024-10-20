/*
  Warnings:

  - You are about to drop the column `shope` on the `DoughnutPieChartThere` table. All the data in the column will be lost.
  - You are about to drop the column `shope` on the `DoughnutPieChartOne` table. All the data in the column will be lost.
  - You are about to drop the column `shope` on the `DoughnutPieChartTwo` table. All the data in the column will be lost.
  - Added the required column `backgroundColor` to the `DoughnutPieChartThere` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop` to the `DoughnutPieChartThere` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop` to the `DoughnutPieChartOne` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop` to the `DoughnutPieChartTwo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DoughnutPieChartThere" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL
);
INSERT INTO "new_DoughnutPieChartThere" ("id", "label", "value") SELECT "id", "label", "value" FROM "DoughnutPieChartThere";
DROP TABLE "DoughnutPieChartThere";
ALTER TABLE "new_DoughnutPieChartThere" RENAME TO "DoughnutPieChartThere";
CREATE TABLE "new_DoughnutPieChartOne" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL
);
INSERT INTO "new_DoughnutPieChartOne" ("id", "label", "value") SELECT "id", "label", "value" FROM "DoughnutPieChartOne";
DROP TABLE "DoughnutPieChartOne";
ALTER TABLE "new_DoughnutPieChartOne" RENAME TO "DoughnutPieChartOne";
CREATE TABLE "new_DoughnutPieChartTwo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL
);
INSERT INTO "new_DoughnutPieChartTwo" ("id", "label", "value") SELECT "id", "label", "value" FROM "DoughnutPieChartTwo";
DROP TABLE "DoughnutPieChartTwo";
ALTER TABLE "new_DoughnutPieChartTwo" RENAME TO "DoughnutPieChartTwo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
