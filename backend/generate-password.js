// Generate correct password hash
const bcrypt = require('bcryptjs');

const password = 'password';
const hash = bcrypt.hashSync(password, 10);

console.log('Password:', password);
console.log('Hash:', hash);
console.log('\nVerification:', bcrypt.compareSync(password, hash));

console.log('\nSQL to update in Supabase:');
console.log(`UPDATE users SET password = '${hash}' WHERE email = 'admin@roadsintel.com';`);
console.log(`UPDATE users SET password = '${hash}' WHERE email = 'inspector@roadsintel.com';`);
