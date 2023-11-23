const speakeasy = require('speakeasy');

const secret = speakeasy.generateSecret({ length: 20 });

const otp = speakeasy.totp({
  secret: secret.base32,
  encoding: 'base32',
  step: 60,
  digits: 4,
});

console.log('Secret:', secret.base32);
console.log('OTP:', otp);

const storedSecret = secret.base32;
const userOTP = otp;

const verification = speakeasy.totp.verifyDelta({
  secret: storedSecret,
  encoding: 'base32',
  token: userOTP,
  step: 60,
  digits: 4,
  window: 1,
});

if (verification) {
  console.log('OTP is valid. Login successful.');
} else {
  console.log('OTP is not valid. Login failed.');
}
