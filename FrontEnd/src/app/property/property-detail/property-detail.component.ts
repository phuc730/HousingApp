import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/Property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public productId: number = 0;
  property = new Property();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit() {
    this.productId = +this.route.snapshot.params['id'];

    this.route.params.subscribe(
      params => {
        this.productId = +params['id'];
        this.housingService.getProperty(this.productId).subscribe(
          (data: any) => {
            this.property = data;
            console.log(this.property)
          }, error => this.router.navigate(['/'])
        )
      }
    );
  }

  onSelctChange(){
    this.productId +=1;
    this.router.navigate(["property-detail", this.productId]);
  }

}
