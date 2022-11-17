import { EmailDto } from '../dto/EmailDto';

export interface EmailClient {
  notifyEmail(): Promise<EmailDto>;
}
