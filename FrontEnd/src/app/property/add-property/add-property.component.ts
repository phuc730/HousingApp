import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/IPropertyBase';
import { Property } from 'src/app/model/Property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../property-list/IProperty.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form') addPropertyForm! : NgForm ;
  @ViewChild('formTabs', { static: false }) formTabs!: TabsetComponent;

  addPropertyForm!: FormGroup;
  nextClick: boolean = false;
  property = new Property();

  propertyTypes: Array<string> = ['House', 'Apartment', 'Deplex'];
  purnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  locationToMoves: Array<string> = ['East', 'West', 'South', 'North'];
  propertyView: IPropertyBase = {
    Id: 0,
    Name: "",
    Price: 0,
    SellRent: 0,
    Image: "prop-1",
    BHK: 0,
    BuiltArea: 0,
    City: "",
    FType: "",
    PType: "",
    RTM: 0
  };
  constructor(private route : Router,
              private fb: FormBuilder,
              private housingService: HousingService,
              private alertifyjs: AlertifyService) { }

  ngOnInit() {
    this.createAddPropertyForm();
  }

  onBack(){
    this.route.navigate(['/']);
  }
  onSubmit(){
    this.nextClick = true;
    if(this.allTabsValid()){
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertifyjs.success("Add new Property success !");

      if(this.SellRent.value == 2){
        this.route.navigate(['/rent-property'])
      }
      else{
        this.route.navigate(['/']);
      }
    }
    else{
      this.alertifyjs.error("Please review your form !")
    }

  }
  allTabsValid(): boolean{
    if(this.BasicInfo.invalid){
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if(this.PriceInfo.invalid){
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if(this.AddressInfo.invalid){
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if(this.OtherInfo.invalid){
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }
  createAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: [1, Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),
      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),
      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })

    });
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropId();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Posession = this.Posession.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
    this.property.Image = "prop-1";
  }


  selectTab(tabId: number, isCurrentTabValid: boolean) {
    this.nextClick = true;
    if(isCurrentTabValid){
      this.formTabs.tabs[tabId].active = true;
      this.nextClick = false;
    }
  }

  // -------------------
  // Getter method
  // -------------------
  //#region  FormGroup
  get BasicInfo(){
    return this.addPropertyForm.controls.BasicInfo as FormGroup;
  }

  get PriceInfo(){
    return this.addPropertyForm.controls.PriceInfo as FormGroup;
  }

  get AddressInfo(){
    return this.addPropertyForm.controls.AddressInfo as FormGroup;
  }

  get OtherInfo(){
    return this.addPropertyForm.controls.OtherInfo as FormGroup;
  }

  //#region FormControl
  get SellRent(){
    return this.BasicInfo.controls.SellRent as FormControl;
  }

  get Price(){
    return this.PriceInfo.controls.Price as FormControl;
  }

  get BHK() {
    return this.BasicInfo.controls.BHK as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls.PType as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls.FType as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls.Name as FormControl;
  }

  get City() {
    return this.BasicInfo.controls.City as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.controls.BuiltArea as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.controls.CarpetArea as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls.Security as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls.Maintenance as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls.FloorNo as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls.TotalFloor as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls.Address as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.controls.LandMark as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls.RTM as FormControl;
  }

  get Posession() {
    return this.OtherInfo.controls.Posession as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls.AOP as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls.Gated as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls.MainEntrance as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls.Description as FormControl;
  }
}
