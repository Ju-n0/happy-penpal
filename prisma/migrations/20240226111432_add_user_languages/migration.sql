-- CreateTable
CREATE TABLE "_LanguageToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LanguageToUser_AB_unique" ON "_LanguageToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguageToUser_B_index" ON "_LanguageToUser"("B");

-- AddForeignKey
ALTER TABLE "_LanguageToUser" ADD CONSTRAINT "_LanguageToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToUser" ADD CONSTRAINT "_LanguageToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
