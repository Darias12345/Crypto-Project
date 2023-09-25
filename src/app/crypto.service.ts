import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private apiUrl = 'https://data.messari.io/api/v1';
  private cryptoList: any[] = [];

  constructor(private http: HttpClient) {}

  getCryptoList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/assets`);
  }

  getCryptoDetail(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/assets/${id}/metrics`);
  }




  // Implement methods to add and remove cryptocurrencies
  addCrypto(crypto: any) {
    this.cryptoList.push(crypto);
  }

  removeCrypto(id: string) {
    if (this.cryptoList.length === 0) {
      console.log('CryptoList is empty. Cryptocurrency cannot be removed.');
      return;
    }

    console.log('Removing cryptocurrency with ID:', id);
    console.log('Current cryptoList:', this.cryptoList);

    const index = this.cryptoList.findIndex(crypto => crypto.id === id);
    if (index !== -1) {
      console.log('Found cryptocurrency at index:', index);
      this.cryptoList.splice(index, 1);
      console.log('Cryptocurrency removed.');
    } else {
      console.log('Cryptocurrency not found in the list.');
    }
  }

  // Methods to store the list of removed cryptocurrencies to local storage and retrieve it from local storage
  storeRemovedCryptos(removedCryptos: string[]): void {
    localStorage.setItem('removedCryptos', JSON.stringify(removedCryptos));
  }

  getRemovedCryptos(): string[] {
    const removedCryptosJson = localStorage.getItem('removedCryptos');
    return removedCryptosJson ? JSON.parse(removedCryptosJson) : [];
  }

}
