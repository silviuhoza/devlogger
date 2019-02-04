import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { of } from "rxjs";

import { Log } from "../models/log";

@Injectable({
  providedIn: 'root'
})
export class LogService {
logs: Log[];

private logSource = new BehaviorSubject<Log>({id: null, text:null, date: null});
selectedLogs = this.logSource.asObservable();

private stateSource = new BehaviorSubject<boolean>(true);
stateClear = this.stateSource.asObservable();


  constructor() { 

    // this.logs = [
    //   {
    //     id: '1', text: 'Generated Components', date: new Date('02/02/2019 20:00:00')
    //   },
    //   {
    //     id: '2', text: 'Added Bootstrap', date: new Date('02/02/2019 20:00:00')
    //   },
    //   {
    //     id: '3', text: 'Added Logs Component', date: new Date('02/02/2019 20:00:00')
    //   }
    // ];
    this.logs = [];
  }

  // getLogs (){
  //   return this.logs;
  // }
  getLogs(): Observable<Log[]> {
   
    //Get logs from local storage
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    }else{
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

    return of(this.logs.sort((a, b) => {
      return b.date - a.date;
    }));
  }

  setFormLog (log: Log){
    this.logSource.next(log);
  }

  addLog (log: Log){
      this.logs.unshift(log);

      //Add to local Storage
      localStorage.setItem('logs', JSON.stringify(this.logs));
  }


  updateLog (log: Log){
    this.logs.forEach((cur, index) => {
          if (log.id === cur.id) {
            this.logs.splice(index, 1);
          }
        });
    this.logs.unshift(log);

    //Update to local Storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }


  deleteLog (log: Log){
    this.logs.forEach((cur, index) => {
          if (log.id === cur.id) {
            this.logs.splice(index, 1);
          }
        });
    //Delete from local Storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState(){
    this.stateSource.next(true);
  }

}
