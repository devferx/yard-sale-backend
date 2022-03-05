const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin1234';
  const hash = '$2b$10$RA3tUgjLqZyEHJX5IvvwW.7Oz0zLRDkXJ1H1syHsjFtWpd3oSPqF6';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
