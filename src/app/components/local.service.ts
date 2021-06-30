import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  encryptSecretKey = 'unexosecretkey2020';
  constructor() { }


  encryptData(data) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
    }
  }

  decryptData(data) {

    try {
      if (data) {
        const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
        if (bytes.toString()) {
          return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return data;
      }

    } catch (e) {
    }
  }
}
