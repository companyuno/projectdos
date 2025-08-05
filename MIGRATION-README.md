# Database Migration for Industry Decompositions

## Problem
The industry decomposition pages are not showing up in the admin "Select Thesis" dropdown on production because the database is empty and the decompositions haven't been migrated.

## Solution
Run the migration script to add the decomposition entries to the production database.

## Steps to Run Migration

### 1. Install Dependencies (if not already installed)
```bash
npm install @supabase/supabase-js dotenv
```

### 2. Set Environment Variables
Make sure you have these environment variables set:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (not the anon key)

### 3. Run the Migration
```bash
node migrate-decompositions.js
```

## What the Migration Does

1. **Adds the `featured` column** to the `thesis_data` table if it doesn't exist
2. **Inserts 6 decomposition entries**:
   - Long Term Care Industry Decomposition
   - Construction Technology Industry Decomposition  
   - Healthcare E-Learning Industry Decomposition
   - Accounting Services Industry Decomposition
   - B2B Sales & Marketing Technology Decomposition
   - DTC Healthcare Industry Decomposition

3. **Verifies the migration** by checking that all entries were inserted

## Expected Output
```
Starting decomposition migration...
Adding featured column if it doesn't exist...
Inserting Long Term Care Industry Decomposition...
✅ Successfully inserted Long Term Care Industry Decomposition
Inserting Construction Technology Industry Decomposition...
✅ Successfully inserted Construction Technology Industry Decomposition
...
Found 6 decomposition entries in database:
- Long Term Care Industry Decomposition (long-term-care)
- Construction Technology Industry Decomposition (construction-tech)
...
Migration completed!
```

## After Migration
Once the migration is complete, the decomposition pages should appear in the admin thesis editor at `/admin/thesis` and be fully editable with live/featured toggles. 