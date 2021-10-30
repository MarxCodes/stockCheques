import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { StockDayPrice } from './models/stock-day-price.model';

interface Stock {
  name: string,
  high: number,
  average:number,
  low: number,
  label: string
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  API_KEY = 'pk_387ac0b58f64491daaf216fa7e624a37';
  T_KEY = 'Tsk_4f37c502f42a445d8596e393a2d8963c';
  url = `https://cloud.iexapis.com/stable/`;
  intraday_url = 'https://cloud.iexapis.com/stable/stock/aapl/intraday-prices?token=';

  // `${this.url}time-series/fundamentals/aapl/quarterly?range=2q&token=${this.API_KEY}
  constructor(private http: HttpClient) { }

  getIntra$tream = this.http.get<Stock[]>(this.url).pipe(
    map(sums => sums.map(
      sum => ({
        ...sum,
        value: sum.high,
        name: sum.label
      }) as Stock
    ))
  )
  getSumJson(data: string = 'aapl') : Observable <StockDayPrice[]> {
    // let join = `${url}${this.API_KEY}`;
    // console.log(join);
  //  return this.http.get(`${this.intraday_url}${this.API_KEY}`);
   return this.http.get<StockDayPrice[]>(`https://sandbox.iexapis.com/stable/stock/${data}/intraday-prices?token=${this.T_KEY}`)
   .pipe(
     map(stocks =>
          stocks.map(stock => ({
            ...stock,
            name: stock.label,
            value: stock.average
          }) as StockDayPrice)
          ),
      tap(i => console.log('tapped stock day price:', i)))

  }

  // WORKING
  getIntraday():Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.intraday_url}${this.API_KEY}`);
  }

  getBIntraDay(data: string = 'aapl') {
    // return this.http.get<Stock[]>(`https://sandbox.iexapis.com/stable/stock/IBM/quote?token=${this.T_KEY}`)
    return this.http.get(`https://sandbox.iexapis.com/stable/stock/${data}/quote?token=${this.T_KEY}`)

    // `https://sandbox.iexapis.com/stable/stock/aapl/intraday-prices?token=${this.T_KEY}`
  }

  //SAYS ONLY ON FREE TIERS
  getIncomeStatement(): Observable<Stock[]> {
    // return this.http.get<Stock[]>(`https://cloud.iexapis.com/stable/stock/aapl/income?token=${this.API_KEY}`);
    return this.http.get<Stock[]>(`https://sandbox.iexapis.com/stable/stock/aapl/income?token=${this.T_KEY}`)


    // https://cloud.iexapis.com/stable/stock/aapl/incometime-series/REPORTED_FINANCIALS/aapl?token=${this.API_KEY}
  }

  getFundOwnership(symbol) {
    return this.http.get(`${this.url}/symbol/income?token${this.API_KEY}`)
  }
  // WORKING
  getTimeSeries() {
    return this.http.get(`https://cloud.iexapis.com/stable/time-series/REPORTED_FINANCIALS/AAPL?token=${this.API_KEY}`);
  }
  getBTime():Observable<Stock[]> {
    return this.http.get<Stock[]>(`https://sandbox.iexapis.com/stable/time-series/REPORTED_FINANCIALS/AAPL?token=${this.T_KEY}`)
  }

  // /time-series/REPORTED_FINANCIALS/AAPL
  // GET /time-series/fundamentals/{symbol}/{period}
  getFundamentals() {
    // return this.http.get(`https://cloud.iexapis.com/stable/stock/time-series/fundamentals/aapl/quarterly?range=2q&token=${this.API_KEY}`);
    // return this.http.get(`https://cloud.iexapis.com/stable/time-series/FUNDAMENTALS/AAPL?limit=1&subattribute=fiscalQuarter|3,fiscalYear|2020?token=${this.API_KEY}`)
    return this.http.get<Stock[]>(`https://sandbox.iexapis.com/stable/time-series/FUNDAMENTALS/AAPL?token=${this.T_KEY}`)

  }
  // 1) fetch & cache top 10/25 popular stocks
  //

 /*
  get intraday
 */

}
