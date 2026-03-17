-- CreateTable
CREATE TABLE "GiveawaySubscriber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "GiveawaySubscriber_email_key" ON "GiveawaySubscriber"("email");
