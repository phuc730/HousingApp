import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { IPropertyBase } from '../model/IPropertyBase';
import { Property } from '../model/Property';
import { IProperty } from '../property/property-list/IProperty.interface';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

constructor(private http:HttpClient) { }

getProperty(id: number){
  return this.getListOfProperties().pipe(
    map(propertiesArray => {
      throw new Error("Some error");
      return propertiesArray.find(p => p.Id == id);
    })
  );
}

getListOfProperties(SellRent?: number) : Observable<IPropertyBase[]>{
  return this.http.get('data/properties.json').pipe(
    map(data => {
      const propertiesArray : Array<IPropertyBase> = [];
      const localProperties = JSON.parse(localStorage.getItem('NewProperty') as any);
      if(localProperties){
        for(const item in localProperties) {
          if(SellRent){
            if(localProperties.hasOwnProperty(item) && localProperties[item].SellRent === SellRent) {
              propertiesArray.push(localProperties[item]);
            }
          } else{
              propertiesArray.push(localProperties[item]);
          }
        }
      }
      for(const item in data) {
        if(SellRent){
          if(data.hasOwnProperty(item) && data[item].SellRent === SellRent) {
            propertiesArray.push(data[item]);
          }
        }else{
            propertiesArray.push(data[item]);
      }
      }
      return propertiesArray;
    })
  );
}

addProperty(property: Property){
  let properties= [property];
  if(localStorage.getItem('NewProperty')){
    properties = JSON.parse(localStorage.getItem('NewProperty') as any);
    properties = [property, ...properties];
  }
  localStorage.setItem('NewProperty', JSON.stringify(properties));
}

newPropId(){
  if(localStorage.getItem('PID')){
    localStorage.setItem('PID', String(Number.parseInt(localStorage.getItem('PID') as any) + 1));
    return Number.parseInt(localStorage.getItem('PID') as any);
  }
  else{
    localStorage.setItem('PID', '101');
  }
  return 101;
}

}
