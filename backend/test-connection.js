// Quick test to verify Supabase connection
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Present' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\nTesting Supabase connection...');
    
    // Test query
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(5);
    
    if (error) {
      console.log('❌ Error:', error);
    } else {
      console.log('✅ Connected! Found', data.length, 'users');
      console.log('Users:', data.map(u => ({ email: u.email, id: u.id })));
      
      // Check password field
      if (data.length > 0) {
        const user = data[0];
        console.log('\nSample user password field:', user.password);
        console.log('Password field exists:', !!user.password);
        console.log('Password length:', user.password ? user.password.length : 0);
      }
    }
  } catch (err) {
    console.log('❌ Connection failed:', err.message);
  }
}

testConnection();
