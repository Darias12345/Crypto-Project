import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.component.html',
  styleUrls: ['./crypto-detail.component.css'],
})
export class CryptoDetailComponent implements OnInit {
  cryptoId: string = "";
  cryptoData: any;


  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.cryptoId = params['id'];
      this.getCryptoDetail(this.cryptoId);
    });
  }

  getCryptoDetail(id: string) {
    this.cryptoService.getCryptoDetail(id).subscribe((data: any) => {
      this.cryptoData = data.data;
    });
  }
}
