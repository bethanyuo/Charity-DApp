import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Category } from '../models/category';
declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(private web3Service: Web3Service) { 

  }
  
  public async createClient(charityName: string, charityID: string, request: string, members: number, primaryContact: string, urgent: boolean, requestType: Category): Promise<any> {
    console.log("CREATE CLIENT");
    try {
      //let owner: string = await this.web3Service.contract.methods.getCurrentOwner().call();
      //let owner: string = "0x81E0ABF825FA3DF39E2EF2B063504C344B9702D3A".toUpperCase();
      let owner: string = this.web3Service.owner;
      return await this.web3Service.contract.methods.addCharity(charityName, charityID, request, members, primaryContact, urgent, requestType).send({ from: owner, gas: 3000000 });
    } catch (err) {
      console.log('ClientService.createClient(): failed:', err);
      alert('ClientService.createClient(): failed:' + err);
      return err;
    }
  }
}
