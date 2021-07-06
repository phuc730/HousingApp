import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { HousingService } from 'src/app/services/housing.service';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: any;

  constructor(private housingService : HousingService) { }

  ngOnInit(): void {
    this.housingService.getListOfProperties().subscribe(
      data => {
        this.properties = data;
        console.log(data);
      }, error => {
        console.log(error)
      }
    );
    // this.http.get('data/properties.json').subscribe(
    //   data => {
    //     this.properties = data;
    //     console.log(data);
    //   }
    // );
  }


}
