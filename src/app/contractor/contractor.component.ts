import { Component, OnInit } from '@angular/core';
import { ContractorService } from 'src/app/services/contractor.service';
import { NgForm } from '@angular/forms';
import { Charity } from '../models/charity';

interface Type {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit {

  constructor(private contractorService: ContractorService) { }

  selectedValue: number;

  types: Type[] = [
    { value: 0, viewValue: 'Food' },
    { value: 1, viewValue: 'Clothing' },
    { value: 2, viewValue: 'Furniture' },
    { value: 3, viewValue: 'Education' },
    { value: 4, viewValue: 'Transport' },
    { value: 5, viewValue: 'Medical' },
    { value: 6, viewValue: 'Funding' }
  ];

  public submitted: boolean = false;
  //model = new Client('0xdd18cbfab0297cdea52b16f7ed06625dc5ff6b12', 'test');
  public model: Charity = new Charity();
  // invoiceTracker: ethers.Contract;

  public ngOnInit(): void { }

  public newContractor() {
    this.submitted = false;
    this.model = new Charity();
  }

  /**
   * @description - called from the html template.  never use async on methods called from the template.
   * @param {NgForm} form
   */
  public onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    console.log(form.controls);

    // let flag: boolean;
    // flag = form.controls['urgent'].value;
    // console.log("DEBUG1 flag=",flag);
    this.contractorService.createContractor(form.controls['supplierName'].value, form.controls['supplierID'].value, 
                                    form.controls['members'].value, form.controls['primaryContact'].value, 
                                    form.controls['type'].value)
       .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  }

}
