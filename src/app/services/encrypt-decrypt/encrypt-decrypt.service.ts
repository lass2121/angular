import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EncryptDecryptService {
  constructor() {}

  encryptPayload(payload: any) {
    return crypto.AES.encrypt(payload, environment.privateKeyCrypto).toString();
  }

  decryptPayload(payloadEncrypt: string) {
    return crypto.AES.decrypt(
      payloadEncrypt,
      environment.privateKeyCrypto
    ).toString(crypto.enc.Utf8);
  }
}
