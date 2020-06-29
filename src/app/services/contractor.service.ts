import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {

  constructor(private web3Service: Web3Service) { }

  public async createContractor(supplierName: string, supplierID: string, members: number, primaryContact: string, category: Category): Promise<string> {
    console.log("CREATE CONTRACTOR");
    try {
      //let owner: string = await this.web3Service.contract.methods.getCurrentOwner().call();
      //let owner: string = "0x81E0ABF825FA3DF39E2EF2B063504C344B9702D3A".toUpperCase();
      // const accounts = await this.web3Service.web3.eth.getAccounts();
      // const from = accounts[0];
      //let owner: string = this.web3Service.owner;
      return await this.web3Service.contract.methods.addSupplier(supplierName, supplierID, members, primaryContact, category).send({ from: supplierID, gas: 3000000 });
    } catch (err) {
      console.log('SelectService.selectCharity(): failed:', err);
      alert('SelectService.selectCharity(): failed:' + err);
      return err;
    }
  }

  public async callContractor(supplierName: string, supplierID: string, members: number, primaryContact: string, category: Category): Promise<string> {
    console.log("CALL CONTRACTOR");
    try {
      //let owner: string = await this.web3Service.contract.methods.getCurrentOwner().call();
      //let owner: string = "0x81E0ABF825FA3DF39E2EF2B063504C344B9702D3A".toUpperCase();
      //let owner: string = this.web3Service.owner;
      return await this.web3Service.contract.methods.addSupplier(supplierName, supplierID, members, primaryContact, category).call();
    } catch (err) {
      console.log('SelectService.selectCharity(): failed:', err);
      alert('SelectService.selectCharity(): failed:' + err);
      return err;
    }
  }
}
