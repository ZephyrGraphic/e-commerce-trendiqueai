const fs = require('fs');
const content = `DATABASE_URL="postgresql://postgres.zycswfmncnxbgzruxsbh:Kaydeen2002K@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.zycswfmncnxbgzruxsbh:Kaydeen2002K@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
BETTER_AUTH_SECRET="trendique-auth-secret-change-in-prod-2024"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"`;

fs.writeFileSync('.env', content);
console.log('.env file created successfully');
