import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor(private web3Service: Web3Service) { }

  public async selectCharity(charityName: string, supplierName: string, supplierID: string): Promise<boolean> {
    console.log("SELECT CLIENT");
    try {
      //let owner: string = await this.web3Service.contract.methods.getCurrentOwner().call();
      //let owner: string = "0x81E0ABF825FA3DF39E2EF2B063504C344B9702D3A".toUpperCase();
      let owner: string = this.web3Service.owner;
      return await this.web3Service.contract.methods.selectCharity(charityName, supplierName, supplierID).send({ from: owner, gas: 3000000 });
    } catch (err) {
      console.log('SelectService.selectCharity(): failed:', err);
      alert('SelectService.selectCharity(): failed:' + err);
      return err;
    }
  }
}
