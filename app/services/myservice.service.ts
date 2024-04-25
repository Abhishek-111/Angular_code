import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../Interfaces/person/IPerson';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http:HttpClient) { }

  public updateSalary(id:number):Observable<number>{
    //console.log("Helo");
    return this.http.get<number>(`https://localhost:44373/api/Employee/update/${id}`);
  }

  public fetchDetails():Observable<IPerson[]>{
    return this.http.get<IPerson[]>("https://localhost:44373/api/Employee/alldetails");
  }
}
