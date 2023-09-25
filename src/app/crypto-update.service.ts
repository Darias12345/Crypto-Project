import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CryptoUpdateService {
  private apiUrl = 'https://data.messari.io/api/v1/assets';
  private refreshInterval$: Observable<any>;
  private refreshSubscription: Subscription;

  private cryptoDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cryptoData$: Observable<any[]> = this.cryptoDataSubject.asObservable();

  constructor(private http: HttpClient) {
    // Create an interval for data refresh (e.g., every 24 hours)
    this.refreshInterval$ = interval(24 * 60 * 60 * 1000);

    // Fetch crypto data on startup
    this.refreshCryptoData();

    // Subscribe to refreshInterval and update data
    this.refreshSubscription = this.refreshInterval$.pipe(
        switchMap(() => this.refreshCryptoData())
    ).subscribe();
  }

  private refreshCryptoData(): Observable<any[]> {
    return this.http.get(this.apiUrl).pipe(
        map((data: any) => {
          const cryptoData = data.data || [];
          this.cryptoDataSubject.next(cryptoData);
          return cryptoData;
        })
    );
  }

  ngOnDestroy() {
    // Unsubscribe from the refresh interval on component destroy
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
