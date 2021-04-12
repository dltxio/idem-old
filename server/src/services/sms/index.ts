import messagebird, { MessageBird, Message } from "messagebird";

export default class MessageBirdSMSService implements smsService.SMSService {
  private client: MessageBird;

  constructor(private config: Config["sms"]) {
    this.client = messagebird(config.messageBird.accessKey);
  }

  public sendPhoneVerificationSMS = async (number: string, code: string) => {
    await this.sendMessages({
      numbers: [number],
      body: this.config.phoneNumberVerificationMessage(code)
    });

    return code;
  };

  private sendMessages = async (data: {
    numbers: string[];
    body: string;
  }): Promise<Message> => {
    return new Promise((resolve, reject) => {
      this.client.messages.create(
        {
          originator: this.config.originator,
          recipients: data.numbers,
          body: data.body
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result as Message);
        }
      );
    });
  };
}
