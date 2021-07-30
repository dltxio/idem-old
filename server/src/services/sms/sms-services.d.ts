declare namespace smsService {
  interface SMSService {
    sendPhoneVerificationSMS: (
      phoneNumber: string,
      code: string  
    ) => Promise<string>;
  }
}
