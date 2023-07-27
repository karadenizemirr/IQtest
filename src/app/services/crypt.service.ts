import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class EncryptedCookieService {
  private algorithm = 'aes-256-cbc';
  private key = 'your-secret-key'; // Güvenli bir anahtar kullanın
  private iv = randomBytes(16).toString('hex'); // Güvenli bir IV kullanın

  constructor(private cookieService: CookieService) {}

  encryptAndSetCookie(name: string, value: string): void {
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    this.cookieService.set(name, encrypted);
  }

  getAndDecryptCookie(name: string): string {
    const encryptedValue = this.cookieService.get(name);
    if (encryptedValue) {
      const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
      let decrypted = decipher.update(encryptedValue, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    }
    return "null";
  }

  deleteCookie(name: string): void {
    this.cookieService.delete(name);
  }
}
