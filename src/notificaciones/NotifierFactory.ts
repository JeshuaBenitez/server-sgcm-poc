// notificaciones/NotifierFactory.ts
import { INotifier } from "./INotifier.js";
class EmailNotifier implements INotifier { async send(){ /*…*/ } }
class SmsNotifier implements INotifier { async send(){ /*…*/ } }
export class NotifierFactory {
  static create(channel:"email"|"sms"): INotifier {
    return channel==="email"? new EmailNotifier() : new SmsNotifier();
  }
}
