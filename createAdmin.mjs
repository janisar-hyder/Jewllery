import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ugmedalamprynfoljrump.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnbWVkYWxhbXJ5bmZvbGpydW1wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODIyNzczNiwiZXhwIjoyMDkzODAzNzM2fQ.uJPJhEndAC-l_4lxjY8uBidEM7gSfeifrwLNcFCzsHw';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@sufrah.com',
    password: 'Asif-Sufrah-000',
    email_confirm: true
  });

  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('User created successfully:', data.user.email);
  }
}

createAdmin();
