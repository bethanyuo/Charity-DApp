import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { NgForm } from '@angular/forms';
import { Charity } from '../models/charity';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public submitted = false;
  public unselected = true;
  public model = new Charity();
  public isFetching: boolean = false;
  public loadedRequests: Charity[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  public newRequest() {
    this.submitted = false;
    this.model = new Charity();
    this.loadedRequests = [];
  }
  //datePmtReceived
  public onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    console.log(this.model);
    // Here we need to call the solidity contract to get the list of invoice numbers and then retrieve the invoices one at a time.
    this.isFetching = true;
    this.searchService.getCharityInfo(form.controls['name'].value)
      .then(charity => {
        this.isFetching = false;
        if (charity !== undefined) {
          console.log('SUCCESS: ', charity);
          this.loadedRequests.push(charity);
          if (charity.selected === true || charity.selected === null) {
            this.unselected = false;
          }
        } else {
          console.log('SearchComponent.onSubmit(): getCharityInfo() returned no data');
        }
      }).catch(err => {
        this.isFetching = false;
        console.log(err);
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
