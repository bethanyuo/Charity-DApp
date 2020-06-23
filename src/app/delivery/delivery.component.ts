import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../services/delivery.service';
import { NgForm } from '@angular/forms';
import { Charity } from '../models/charity';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  public submitted = false;
  public model = new Charity();

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
  }

  public newDelivery() {
    this.submitted = false;
    this.model = new Charity();
  }

  public onSubmit(form: NgForm) {
    //this.searchService.charityName
    console.log(form);
    this.submitted = true;
    // this.model.supplierName = form.controls['supplierName'].value;
    // this.model.supplierID = form.controls['supplierID'].value;
    this.deliveryService.completeDelivery(form.controls['name'].value,
      form.controls['supplierName'].value,
      form.controls['supplierID'].value)
      .then(res => {
        if (res !== undefined) {
          console.log('SUCCESS: ', res);
          console.log("DEBUG");
          // if (res === true) {
          //   this.unselected = false;
          // }
        } else {
          console.log('DeliveryComponent.onSubmit(): getCharityInfo() returned no data');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

}
