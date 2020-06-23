import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private web3Service: Web3Service) { }

  public async completeDelivery(charityName: string, supplierName: string, supplierID: string): Promise<boolean> {
    console.log("SELECT CLIENT");
    console.log("Charity name = " + charityName);
    try {
      //let owner: string = await this.web3Service.contract.methods.getCurrentOwner().call();
      //let owner: string = "0x81E0ABF825FA3DF39E2EF2B063504C344B9702D3A".toUpperCase();
      let owner: string = this.web3Service.owner;
      return await this.web3Service.contract.methods.deliverRequest(charityName, supplierName, supplierID).send({ from: owner, gas: 3000000 });
    } catch (err) {
      console.log('SelectService.selectCharity(): failed:', err);
      alert('SelectService.selectCharity(): failed:' + err);
      return err;
    }
  }
}