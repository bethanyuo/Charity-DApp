import { Component, OnInit, Input } from '@angular/core';
import { SelectService } from 'src/app/services/select.service';
import { NgForm } from '@angular/forms';
import { Charity } from '../models/charity';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  // @Input()
  // public selected = false;

  @Input()
  public name: string = "";

  public submitted = false;
  public model = new Charity();

  constructor(private selectService: SelectService, private searchService: SearchService) { }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm) {
    //this.searchService.charityName
    console.log(form);
    this.submitted = true;
    this.model.name = this.name;
    this.model.supplierName = form.controls['supplierName'].value;
    this.model.supplierID = form.controls['supplierID'].value;
    this.selectService.selectCharity(this.name,
      form.controls['supplierName'].value,
      form.controls['supplierID'].value)
      .then(res => {
        if (res !== undefined) {
          console.log('SUCCESS: ', res);
          console.log("DEBUG");
          console.log("charity name = " + this.name);
          // if (res === true) {
          //   this.unselected = false;
          // }
        } else {
          console.log('SelectComponent.onSubmit(): getCharityInfo() returned no data');
        }
      }).catch(err => {
        console.log(err);
      });
  }

}
