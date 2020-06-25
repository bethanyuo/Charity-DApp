import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { NgForm } from '@angular/forms';
//import { Charity } from '../models/charity';
import { Search } from '../models/search';

interface Type {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private types: Type[] = [
    { value: 0, viewValue: 'Food' },
    { value: 1, viewValue: 'Clothing' },
    { value: 2, viewValue: 'Furniture' },
    { value: 3, viewValue: 'Education' },
    { value: 4, viewValue: 'Transport' },
    { value: 5, viewValue: 'Medical' },
    { value: 6, viewValue: 'Funding' }
  ];
  public submitted = false;
  public charityName: string;
  // public unselected = true;
  public model = new Search();
  public isFetching: boolean = false;
  // public loadedRequests: Charity[] = [];
  public loadedRequests: Search[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  public newRequest() {
    this.submitted = false;
    this.model = new Search();
    this.loadedRequests = [];
  }

  // public selected(): boolean {
  //   if (this.model.selected === true) {
  //     return true;
  //   }
  // }

  //datePmtReceived
  public onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    console.log(this.model);
    // Here we need to call the solidity contract to get the list of invoice numbers and then retrieve the invoices one at a time.
    this.isFetching = true;
    this.charityName = form.controls['name'].value;
    this.searchService.getCharityInfo(form.controls['name'].value)
      .then(charity => {
        this.isFetching = false;
        if (charity !== undefined) {
          console.log('SUCCESS: ', charity);

          let viewCharity: Search = new Search();
          viewCharity.name = this.charityName;
          viewCharity.ID = charity.ID;
          viewCharity.members = charity.members;
          viewCharity.primaryContact = charity.primaryContact;
          viewCharity.request = charity.request;
          viewCharity.category = this.types[charity.category].viewValue;
          viewCharity.tokenReward = charity.tokenReward;
          viewCharity.selected = charity.selected;

          this.loadedRequests.push(viewCharity);
          //charity.selected = this.model.selected;
          // if (charity.selected === true || charity.selected === null) {
          //   this.unselected = false;
          // }
        } else {
          console.log('SearchComponent.onSubmit(): getCharityInfo() returned no data');
        }
      }).catch(err => {
        this.isFetching = false;
        console.log(err);
        alert('SearchComponent.onSubmit(): failed.  Most likely the client does not exist.');
      });
  }

  public showFormControls(form: any) {
    let rVal: string = "";
    if (form !== undefined) {
      if (form.controls['name'] !== undefined) {
        //console.log('Invoice Number:' + form.controls['invoiceNumber'].value);
        rVal =
          'Charity Name: ' + form.controls['name'].value;
        //console.log(rVal);
      }
    }
    return rVal;
  }

}
