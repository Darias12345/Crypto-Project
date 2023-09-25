import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { CryptoUpdateService } from '../crypto-update.service';
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css'],
})
export class CryptoListComponent implements OnInit {
  cryptoList: any[] = [];
  cryptoToAdd: string = '';
  iconPath = 'assets/images/';
  private cryptoDataSubscription!: Subscription;

  constructor(private cryptoService: CryptoService, private cryptoUpdateService: CryptoUpdateService) {}

  ngOnInit() {

    // Load removed cryptocurrencies from local storage
    this.getCryptoList().subscribe(() => {
      this.restoreRemovedCryptos();
    });

    // Update cryptoList with the latest data
    this.cryptoDataSubscription = this.cryptoUpdateService.cryptoData$.subscribe((data: any[]) => {
      this.cryptoList = data;
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the crypto data updates on component destroy
    if (this.cryptoDataSubscription) {
      this.cryptoDataSubscription.unsubscribe();
    }
  }

  getCryptoList() {
    return this.cryptoService.getCryptoList().pipe(
        map((data: any) => {
          this.cryptoList = data.data;
          console.log('dat', this.cryptoList);
        })
    );
  }


  addCrypto() {

    if (!this.cryptoToAdd) {
      console.log('Error: Please enter a cryptocurrency symbol.');
      return;
    }

    this.cryptoService.getCryptoDetail(this.cryptoToAdd).subscribe(
        (cryptoData: any) => {
          if (cryptoData && cryptoData.data) {
            const cryptoToAdd = cryptoData.data;

            const isCryptoInList = this.cryptoList.some(
                (crypto) => crypto.id === cryptoToAdd.id
            );

            if (!isCryptoInList) {
              this.cryptoList.unshift(cryptoToAdd);
              this.cryptoService.addCrypto(cryptoToAdd);
              this.cryptoToAdd = '';
            } else {
              console.log('Cryptocurrency is already in the list.');
            }
          } else {
            console.log('Cryptocurrency data not found.');
          }
        },
        (error) => {
          console.error('Error fetching cryptocurrency details:', error);
        }
    );
  }


  removeCrypto(id: string) {
    if (this.cryptoList.length === 0) {
      console.log('Cryptocurrency list is empty. Data may not be loaded yet.');
      return;
    }

    const index = this.cryptoList.findIndex(crypto => crypto.id === id);
    if (index !== -1) {
      this.cryptoList.splice(index, 1);
      console.log('Cryptocurrency removed.');
    } else {
      console.log('Cryptocurrency not found in the list.');
    }
    this.cryptoService.removeCrypto(id); // Remove from local list
    this.cryptoService.storeRemovedCryptos([...this.cryptoService.getRemovedCryptos(), id]); // Store in local storage
  }

  // Function to restore removed cryptocurrencies from local storage
  restoreRemovedCryptos() {
    const removedCryptos = this.cryptoService.getRemovedCryptos();
    // Filter out removed cryptocurrencies from the list
    this.cryptoList = this.cryptoList.filter((crypto) => !removedCryptos.includes(crypto.id));
  }
}
