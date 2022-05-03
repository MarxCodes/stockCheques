import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { from, merge, Observable, of } from 'rxjs';
import { catchError, tap, map, skip, filter, mergeMap, take, shareReplay } from 'rxjs/operators';
import { StockDayPrice } from './models/stock-day-price.model';
import { AlphaStock } from './models/AlphaStock';
interface Stock {
  name: string,
  minute: string,
  average:number,
  value: number
  nameTing: string,
}

interface Bock {
  name: string,
  minute: string,
  average:number,
  value: number
  nameTing: string,
  high: number
}


@Injectable({
  providedIn: 'root'
})


export class DataService {
  Americas = {};
  APAC = {};
  EMEA = {};
  Commodiies = {};
  Industrial = {};
  retrievedData = {};
  API_KEY = 'pk_387ac0b58f64491daaf216fa7e624a37';
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  T_KEY = 'Tsk_4f37c502f42a445d8596e393a2d8963c';
  iexTestKey = 'sk_5cdd0b31d33942728f4acb8c2569e07a';
  url = `https://cloud.iexapis.com/stable/`;
  private iexBaseUrL = `https://cloud.iexapis.com/stable`;

  private intraday_url = (name) => `https://cloud.iexapis.com/stable/stock/${name}/intraday-prices?token=`;
  multi$ = [];
  barr = [];
  selectedComparisonArray = [];
  showCharts = false ;
  detailArray;
  alphaUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBRX&interval=60min&slice=year1month1&apikey=VG2FOU0O6XNVE1F6';
  alphaUrlBase = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=60min&';
  alphaBase = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=';
  alphaEnd = '&interval=60min&slice=year1month1&apikey=VG2FOU0O6XNVE1F6';
  alphaMonth= 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=';
  alphaAPIKEY = '&apikey=VG2FOU0O6XNVE1F6';
  // alphaKEY = '&apikey=VG2FOU0O6XNVE1F6';
  alphaKEY = '&apikey=demo';

  // offed = of(this.http.get(this.alphaUrl,{responseType: 'text'}))
  // frommed = from(this.http.get(this.alphaUrl, { responseType: 'text'}))
  timeSpan = {
    // today: 'intraday',
    month: {m: 2, y:2},
    sixMonth: {m: 7, y:2},
    year: {m: 13, y:2},
    twoYr: {y:3, m:13}
  }

  monthlyChange;
  annualChange;
  stockData!: Observable <AlphaStock[]>;

  // @Output() showCharts: EventEmitter<boolean> = new EventEmitter(false);
  constructor(private http: HttpClient) {
    // console.log(this.intraday_url('named'))
   }

   calculateMonthlyChange(first,second) {
    return ((second - first) / first) * 100
   }
  //  calculateAnnualChange() {
  //   ((data[0].close - data[11].close) / data[11].close) * 100
  //  }

   alphaMonthly(symbol: string, name: string) {
    return this.http.get(this.alphaMonth + symbol + this.alphaAPIKEY).pipe(
      map(data => Object.values(data['Monthly Time Series'])),
      map(da =>  da.map(he => ({
          open: he["1. open"],
          high: he["2. high"],
          low: he["3. low"],
          close: he["4. close"],
          volume: he["5. volume"],
          monthChange: this.calculateMonthlyChange(da[da.length-1]["4. close"], da[da.length-2]["4. close"] ),
          annualChange: this.calculateMonthlyChange(da[da.length-1]["4. close"], da[da.length-11]["4. close"] ),
          name: name,
          symbol: symbol
        }))),
      )
   }

   alphaMonthlyTyped(symbol: string, name: string): Observable<AlphaStock[]> {
    return this.stockData = this.http.get<AlphaStock[]>(this.alphaMonth + symbol + this.alphaAPIKEY).pipe(
      map(data => Object.values(data['Monthly Time Series'])),
      map(da =>  da.map(he => ({
          open: he["1. open"],
          high: he["2. high"],
          low: he["3. low"],
          close: he["4. close"],
          volume: he["5. volume"],
          monthChange: this.calculateMonthlyChange(da[da.length-1]["4. close"], da[da.length-2]["4. close"] ),
          annualChange: this.calculateMonthlyChange(da[da.length-1]["4. close"], da[da.length-11]["4. close"] ),
          name: name,
          symbol: symbol
        }))),
        shareReplay(1)
      )
   }

   alphaDataByMonth(symbol: string, name?:string):Observable<AlphaStock[]> {
    return this.http.get<AlphaStock[]>(this.alphaMonth + symbol + this.alphaAPIKEY).pipe(
      map(data => Object.values(data['Monthly Time Series'])),
      map(da =>  da.map(he => ({
          open: he["1. open"],
          high: he["2. high"],
          low: he["3. low"],
          close: he["4. close"],
          volume: he["5. volume"],
          monthChange: this.calculateMonthlyChange(da[da.length-2]["4. close"], da[da.length-1]["4. close"] ),
          annualChange: this.calculateMonthlyChange(da[da.length-11]["4. close"], da[da.length-1]["4. close"] ),
          name: name,
          symbol: symbol,
        }))),
        shareReplay(1)
      )
   }
   getMonthyData(id: any) {
    return this.stockData.pipe(
      map(data => data.find(i => id === i))
    )
   }


   alphaStock(pal: string,name: string) {
      return this.http.get(this.alphaBase + pal + this.alphaEnd, { responseType: 'text'}).pipe(
        map(el => el === ' ' ? el.split(' ') : el.split('\r\n')),
        map(elem => elem.map(elemen => elemen.split(',')).map(element => ({
          time: element[0],
          open: element[1],
          high: element[2],
          low: element[3],
          close: element[4],
          volume: element[5],
          name: name
        })))
      )
   }

  getAlphaHistory() {
    let months = this.timeSpan['year'].m;
    let years = this.timeSpan['year'].y;
    let arr = [];
    for(let i = 1; i < years; i++) {
      for(let j = 1; j < months; j++) {
        //  return arr.push(this.alphaUrlBase + `slice=year${i}month${j}` + this.alphaKEY)
          // console.log(i, j)
          arr.push(`slice=year${i}month${j}`)
        }
      }
      return arr.map(el => this.getMeAlphaBaby(this.alphaUrlBase + el + this.alphaKEY).pipe(tap(console.log)));
    // return arr.map(el => {return this.getMeAlphaBaby(el)})
  }
  getMeAlphaBaby(url: string) {
    // return this.frommed.pipe(map(el => console.log(el)));
    return this.http.get(this.alphaUrlBase + url + this.alphaKEY,{responseType: 'text'}).pipe(
      map(el => el === ' ' ? el.split(' ') : el.split('\r\n')),
      map(elem => elem.map(elemen => elemen.split(',')).map(element => ({
          time: element[0],
          open: element[1],
          high: element[2],
          low: element[3],
          close: element[4],
          volume: element[5]
      }) )
    ), tap(console.log))
  }

  // 'SX5E:IND'

  changeChartsView() {
    this.showCharts = true;
    // this.showCharts.emit(true);
    // console.log(this.showCharts)
  }
  getBinalArrItems() {
    console.log(this.multi$, "multeee")
     let finalCounter;
     return [...this.multi$].forEach(o => {
       console.log('o series:', o.series)
       let first = o.series[0].value
       let last = o.series[o.series.length - 1].value;
       finalCounter = o.series[o.series.length - 1];
       let benign = {
         ...finalCounter,
         first,
         last
        }

        console.log('fisting:', benign)
       this.barr.push(benign);
     })
   }

   getDetailChartItems() {
     return [...this.detailArray].forEach(o => {
      let first = o.series[0].value
      let last = o.series[o.series.length - 1].value;
      let finalCounter = o.series[o.series.length - 1];
      let benign = {
        ...finalCounter,
        first,
        last
       }
     })
   }
  getSumJson(data: string = 'aapl') : Observable <Stock[]> {
   return this.http.get<Stock[]>(`https://sandbox.iexapis.com/stable/stock/${data}/intraday-prices?token=${this.T_KEY}`)
   .pipe(
     map(stocks =>
      stocks.map(stock => ({
        nameTing: data,
        name: stock.minute,
        value: stock.average


          }) as Stock)
          ),
          // skip(10),
      // filter((val, i) => ),
      tap(i => console.log('tapped stock day price:', i)))

  }
  getBarmy(data: string = 'aapl') : Observable <Bock[]> {
    return this.http.get<Bock[]>(`https://sandbox.iexapis.com/stable/stock/${data}/intraday-prices?token=${this.T_KEY}`)
    .pipe(
      map(stocks =>
       stocks.map(stock => ({
        nameTing: data,
        name: stock.minute,
        value: stock.average,
        high: stock.high
          // ...stock
          //  name: st/
           }) as Bock)
           ),
           // skip(10),
       // filter((val, i) => ),
       tap(i => console.log('tapped stock day price:', i)))

   }
   getFinalArrItems() {
    // console.log(this.ds.multi$, "multeee")
     let finalCounter;
     return [...this.multi$].forEach(o => {
       console.log('o series:', o.series)
       finalCounter = o.series[o.series.length - 1];
       this.barr.push(finalCounter);
      })

    }

   getSlimy(data: string) : Observable <Bock[]> {
     console.log(data);
    return this.http.get<Bock[]>(`${this.iexBaseUrL}/stock/${data}/intraday-prices?token=${this.API_KEY}`)
    // return this.http.get<Bock[]>(`${this.intraday_url(data)}${this.API_KEY}`)
    .pipe(
      map(stocks =>
        stocks.map(stock => ({
          ...stock,
          // namey: data.name,
          nameTing: data,
          // blame: data.Name,
          name: stock.minute,
          value: stock.average,
          high: stock.high
        }) as Bock).filter(val => val.value !== null),
        // this.formatJSON(stocks)
        ),
        // map(i => this.formatJSON(i)),
        // tap(i => console.log('tapped stock day price:', i)),
        // map(con => this.formatJSON(con))
        )

      }

      // WORKING
      getTimeSeries(code: string) {
        return this.http.get(`${this.iexBaseUrL}/time-series/REPORTED_FINANCIALS/${code}?token=${this.iexTestKey}`);
      }
  //  getFirst(arr) {
  //   this.first =
  //  }

   formatJSON(con, el) {
  //   if(el.value === null) {
  //     console.log('is null?: ', el);
  //  }

   return {
     name: con.Symbol,
     series: el
   }
   }


   formatJJ(el) {
     return {
       name: el.Symbol,
       series: el
      }
    }

   clearSelectedArray() {
     this.selectedComparisonArray = [];
    }

   add(val) {
     this.selectedComparisonArray.push(val);
    console.log(this.selectedComparisonArray)
    return this.selectedComparisonArray;
    console.log(this.selectedComparisonArray);
  }

  deleteItem(i, fn) {
    // if(this.selectedComparisonArray.length === 0) {

    // }
    this.selectedComparisonArray.splice(i, 1);
    if (this.selectedComparisonArray.length === 0) {
      fn();
    }
    // console.log(this.selectedArr);
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
