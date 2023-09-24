import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';


@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css'],
})
export class CryptoListComponent implements OnInit {
  cryptoList: any[] = [];
  cryptoToAdd: string = '';
  iconPath = 'assets/images/';



  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.restoreRemovedCryptos(); // Load removed cryptocurrencies from local storage
    this.getCryptoList(); // Fetch the initial cryptocurrency list
  }

  getCryptoList() {
    this.cryptoService.getCryptoList().subscribe((data: any) => {
      this.cryptoList = data.data.slice(0,3);
      console.log('dat', this.cryptoList);
    });
  }


// Function to restore removed cryptocurrencies from local storage
  restoreRemovedCryptos() {
    const removedCryptos = this.cryptoService.getRemovedCryptos();
    // Filter out removed cryptocurrencies from the list
    this.cryptoList = this.cryptoList.filter((crypto) => !removedCryptos.includes(crypto.id));
  }

  addCrypto() {
    // Check if cryptoToAdd is not empty
    if (!this.cryptoToAdd) {
      console.log('Error: Please enter a cryptocurrency symbol.');
      return;
    }

    // Fetch cryptocurrency data from the API based on 'cryptoToAdd'
    this.cryptoService.getCryptoDetail(this.cryptoToAdd).subscribe(
        (cryptoData: any) => {
          console.log('Fetched cryptocurrency data:', cryptoData);

          if (cryptoData && cryptoData.data) {
            const cryptoToAdd = cryptoData.data;
            console.log('Crypto to add:', cryptoToAdd);

            // Check if the cryptocurrency is already in the list
            const isCryptoInList = this.cryptoList.some(
                (crypto) => crypto.id === cryptoToAdd.id
            );

            if (!isCryptoInList) {
              // If not in the list, add it
              this.cryptoList.unshift(cryptoToAdd); // Add to the beginning of the list
              this.cryptoService.addCrypto(cryptoToAdd);
              this.cryptoToAdd = ''; // Clear the input field
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


}
