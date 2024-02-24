ALTER TABLE "cred_account" DROP CONSTRAINT "cred_account_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "cred_account" ADD COLUMN "id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cred_account" DROP COLUMN IF EXISTS "userId";