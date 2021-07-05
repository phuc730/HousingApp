import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  properties: Array<any> = [
    {
      Id: 1,
      Name: 'Vinpearl House',
      Type: 'House',
      Price: 10000
    },

    {
      Id: 2,
      Name:'White House',
      Type: 'House',
      Price: 20000
    },

    {
      Id: 3,
      Name: 'Black House',
      Type: 'House',
      Price: 30000
    },

    {
      Id: 4,
      Name: 'Red House',
      Type: 'House',
      Price: 40000
    },

    {
      Id: 5,
      Name: 'Purple House',
      Type: 'House',
      Price: 50000
    },

    {
      Id: 6,
      Name: 'Yellow House',
      Type: 'House',
      Price: 60000
    },
  ]

}
