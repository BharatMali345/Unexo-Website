export interface UserData {
  model: string;
  pk: string;
  fields: User;
}
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
  phoneNo: string;
  userType: string;
  captcha: string;
  status: string;
  referralCode: string;
  myReferralCode: string;
  referralPoints: string;
  otpVerify: boolean;
  phoneOtpVerify: boolean;
}
