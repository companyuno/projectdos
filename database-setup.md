# Database Setup for Investment Website

## Recommended: Supabase (PostgreSQL)

### Why Supabase?
- **Free tier** - 500MB database, 50MB file storage
- **Real-time** - Live updates for admin panel
- **Auth built-in** - User management
- **Edge functions** - Serverless API endpoints
- **Dashboard** - Easy admin interface

### Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  accredited_investor BOOLEAN,
  accredited_selections TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Permissions table
CREATE TABLE permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  granted_at TIMESTAMP DEFAULT NOW(),
  granted_by VARCHAR
);

-- Visitor logs table
CREATE TABLE visitor_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  accredited_investor BOOLEAN,
  accredited_selections TEXT[],
  access_attempt BOOLEAN DEFAULT FALSE,
  has_access BOOLEAN DEFAULT FALSE,
  access_type VARCHAR,
  request_type VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Migration Steps

1. **Sign up for Supabase** - supabase.com
2. **Create new project**
3. **Run schema SQL** in SQL editor
4. **Update API routes** to use Supabase client
5. **Add environment variables** for Supabase URL/key

### Benefits
- **Persistent data** - Users stay logged in across devices
- **Admin analytics** - Track user behavior, access patterns
- **Security** - Server-side data storage
- **Scalability** - Handle thousands of users
- **Backup** - Automatic database backups

### Implementation Time
- **Setup**: 1-2 hours
- **Migration**: 2-3 hours
- **Testing**: 1 hour

Would you like me to implement the Supabase integration? 