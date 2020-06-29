import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Charity } from '../models/charity';
declare let window: any;
declare let charity: string;

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private web3Service: Web3Service) {

  }
  charityName: string = "";

  public async getCharityInfo(charityName: string): Promise<any> {
    console.log("GET CLIENT");
    try {
      //let owner: string = await this.web3Service.contract.methods.getCurrentOwner().call();
      //let owner: string = "0x81E0ABF825FA3DF39E2EF2B063504C344B9702D3A".toUpperCase();
      //let owner: string = this.web3Service.owner;
      let rVal = await this.web3Service.contract.methods.getCharityInfo(charityName).call();
      return rVal;
    } catch (err) {
      // console.log('SearchService.getCharityInfo(): failed:', err);
      // alert('SearchService.getCharityInfo(): failed:' + err);
      throw err;
      //return err;
    }
  }

  public async setCharityInfo(charityName: string): Promise<any> {
    console.log("GET CLIENT");
    try {
      //let owner: string = await this.web3Service.contract.methods.getCurrentOwner().call();
      //let owner: string = "0x81E0ABF825FA3DF39E2EF2B063504C344B9702D3A".toUpperCase();
      const accounts = await this.web3Service.web3.eth.getAccounts();
      const from = accounts[0];
      //let owner: string = this.web3Service.owner;
      let rVal = await this.web3Service.contract.methods.getCharityInfo(charityName).send({ from: from, gas: 3000000 });
      return rVal;
    } catch (err) {
      // console.log('SearchService.getCharityInfo(): failed:', err);
      // alert('SearchService.getCharityInfo(): failed:' + err);
      throw err;
      //return err;
    }
  }

}
