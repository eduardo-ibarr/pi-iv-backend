/*
  Warnings:

  - You are about to drop the column `sensor_id` on the `readings` table. All the data in the column will be lost.
  - You are about to drop the `sensors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sensor` to the `readings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "readings" DROP CONSTRAINT "readings_sensor_id_fkey";

-- AlterTable
ALTER TABLE "readings" DROP COLUMN "sensor_id",
ADD COLUMN     "sensor" TEXT NOT NULL;

-- DropTable
DROP TABLE "sensors";
