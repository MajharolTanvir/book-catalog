/*
  Warnings:

  - You are about to drop the `OrderedBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderedBook" DROP CONSTRAINT "OrderedBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "OrderedBook" DROP CONSTRAINT "OrderedBook_orderId_fkey";

-- DropTable
DROP TABLE "OrderedBook";

-- CreateTable
CREATE TABLE "ordered_book" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ordered_book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ordered_book" ADD CONSTRAINT "ordered_book_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordered_book" ADD CONSTRAINT "ordered_book_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
