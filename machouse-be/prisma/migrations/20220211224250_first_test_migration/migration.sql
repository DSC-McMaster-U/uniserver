-- CreateTable
CREATE TABLE "task" (
    "Id" SERIAL NOT NULL,
    "User-Id" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Date" DATE NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "user" (
    "Id" SERIAL NOT NULL,
    "Name" VARCHAR(64) NOT NULL,
    "Email" VARCHAR(64) NOT NULL,
    "Color" char,
    "Online" BOOLEAN NOT NULL,
    "Last-online" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_User-Id_fkey" FOREIGN KEY ("User-Id") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;
