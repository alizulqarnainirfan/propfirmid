-- Add priceTag column to PropFirm table
ALTER TABLE "PropFirm" ADD COLUMN "priceTag" TEXT DEFAULT 'Best Price';

-- Update existing records to have a default price tag
UPDATE "PropFirm" SET "priceTag" = 'Best Price' WHERE "priceTag" IS NULL;