import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { IProperty } from '../property/property-list/IProperty.interface';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

constructor(private http:HttpClient) { }

getListOfProperties() : Observable<IProperty[]>{
  return this.http.get('data/properties.json').pipe(
    map(data => {
      const propertiesArray : Array<IProperty> = [];
      for(const item in data) {
        if(data.hasOwnProperty(item)) {
          propertiesArray.push(data[item]);
        }
      }
      return propertiesArray;
    })
  );
}

}
