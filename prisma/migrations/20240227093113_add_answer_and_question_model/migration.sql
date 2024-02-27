-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,
    "answerer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "questions_name_key" ON "questions"("name");

-- CreateIndex
CREATE INDEX "questions_name_idx" ON "questions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "answers_name_key" ON "answers"("name");

-- CreateIndex
CREATE INDEX "answers_name_idx" ON "answers"("name");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_answerer_id_fkey" FOREIGN KEY ("answerer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
