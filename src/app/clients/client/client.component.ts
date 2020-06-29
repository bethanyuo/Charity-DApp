import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { NgForm } from '@angular/forms';
import { Client } from '../../models/client';

interface Type {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private clientService: ClientService) { }

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
  public model: Client = new Client();


  public ngOnInit(): void { }

  public newClient() {
    this.submitted = false;
    this.model = new Client();
  }

  /**
   * @description - called from the html template.  never use async on methods called from the template.
   * @param {NgForm} form
   */
  public onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    console.log(form.controls);
    this.model.reqType = this.types[this.model.category].viewValue;

    // let flag: boolean;
    // flag = form.controls['urgent'].value;
    // console.log("DEBUG1 flag=",flag);
    this.clientService.createClient(form.controls['name'].value, form.controls['accountAddress'].value, 
                                    form.controls['request'].value, form.controls['members'].value, 
                                    form.controls['primaryContact'].value, form.controls['urgent'].value, 
                                    parseInt(form.controls['type'].value))
       .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  }

  // TODO: Remove this when we're done
  public get diagnostic() { return JSON.stringify(this.model); }

  // Reveal in html:
  // Name via form.controls = {{showFormControls(clientForm)}}
  public showFormControls(form: any) {
    let rVal: string = "";
    if (form !== undefined) {
      if (form.controls['name'] !== undefined) {
        // console.log('Name:' + form.controls['name'].value);
        rVal =
          'Name: ' + form.controls['name'].value +
          ',   Account Address: ' + form.controls['accountAddress'].value +
          ',   Urgency: ' + form.controls['urgent'].value + ',   Category: ' + form.controls['type'].value;
        //console.log(rVal);
      }
    }
    return rVal;
  }

}
