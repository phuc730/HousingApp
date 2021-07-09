import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from '../property-list/IProperty.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyForm! : NgForm ;
  @ViewChild('formTabs', { static: false }) formTabs!: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartment', 'Deplex'];
  purnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  locationToMoves: Array<string> = ['East', 'West', 'South', 'North'];
  propertyView: IProperty = {
    Id: null,
    Name: "",
    Price: null,
    SellRent: null,
    Type: "",
    Image: "p1"
  };
  constructor(private route : Router) { }

  ngOnInit() {
  }

  onBack(){
    this.route.navigate(['/']);
  }
  onSubmit(){
    console.log('Submit success!');
    console.log(this.addPropertyForm);
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }
}
