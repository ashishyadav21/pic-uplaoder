-- CreateTable
CREATE TABLE "images" (
    "filename" VARCHAR NOT NULL,
    "filepath" VARCHAR NOT NULL,
    "mimetype" VARCHAR NOT NULL,
    "size" BIGINT NOT NULL,
    "id" UUID NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "dateofbirth" VARCHAR,
    "firstname" VARCHAR,
    "lastname" VARCHAR,
    "email" VARCHAR,
    "id" UUID NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
