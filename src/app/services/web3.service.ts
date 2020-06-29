import { Injectable } from '@angular/core';
import Web3 from 'web3';
//import { AbiItem } from 'web3-utils';
import { Observable, BehaviorSubject } from 'rxjs';
//import { Web3WsProvider } from 'web3-providers-ws';

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private CHARITY_ARTIFACTS = require('../../../build/contracts/SupplyChain.json');
  public web3: Web3;
  //private contractAddress = "0x97a5f686fFb2669165395A8186520F4AF9639a75";
  //private contractAddress = "0xae3F8D3Fe2b5ED359D35c45a5014489680E4AF86"; //ropsten

  private contractABI = this.CHARITY_ARTIFACTS;
  public contract: any;
  private isWeb3Ready: BehaviorSubject<boolean>;
  public isWeb3Ready$: Observable<boolean>
  public owner: string = '';

  constructor() {
    this.isWeb3Ready = new BehaviorSubject(false);
    this.isWeb3Ready$ = this.isWeb3Ready.asObservable();
    this.initContract();
  }

  private initContract() {
    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    //this.web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545')); // this allows for the allEvents to work.
    //this.web3 = new Web3(new Web3.providers.HttpProvider('https://api.infura.io/v1/jsonrpc/ropsten')); // this allows for the allEvents to work.
    //this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // keeping this for future reference.
    this.initWeb3();
  }

  private initWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== 'undefined') {
      // Use Mist/MetaMask's provider
      window.ethereum.enable().then(async () => {
        let contractAddress = "0x4aC2C790405D71452446f41237B71Be014150373"; //ropsten
        alert('Connecting to MetaMask');
        this.web3 = new Web3(window.ethereum);
        this.contract = new this.web3.eth.Contract(
          this.contractABI.abi,
          contractAddress
        );
        this.initEventSubscriptions();
        this.isWeb3Ready.next(true);
      });
    } else {
      alert('No web3? You should consider trying MetaMask!');

      // let options = {
      //   timeout: 30000, // ms

      //   // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
      //   headers: {
      //     authorization: 'Basic username:password'
      //   },

      //   clientConfig: {
      //     // Useful if requests are large
      //     maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
      //     maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

      //     // Useful to keep a connection alive
      //     keepalive: true,
      //     keepaliveInterval: 60000 // ms
      //   },

      //   // Enable auto reconnection
      //   reconnect: {
      //     auto: true,
      //     delay: 5000, // ms
      //     maxAttempts: 5,
      //     onTimeout: false
      //   }
      // };
      let contractAddress = "0x1905f5460729db1740c409a49df0F901CD552bF1";
      //let contractAddress = "0x4fa7c2933A553b9346a44ebd9DF6962747a606d4"; //ropsten
      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      //Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      //this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545')); // this allows for the allEvents to work.
      //this.web3 = new Web3(new Web3.providers.HttpProvider('https://api.infura.io/v1/jsonrpc/ropsten')); // keeping this for future reference.
      // let Web3WsProvider = require('web3-providers-ws');
      // let ws = new Web3WsProvider('ws://api.infura.io/v1/jsonrpc/ropsten',options);
      // this.web3 = new Web3(ws);
      //this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://api.infura.io/v1/jsonrpc/ropsten',options)); // keeping this for future reference.
      //this.web3 = new Web3(new Web3.providers.HttpProvider('https://api.infura.io/v1/jsonrpc/ropsten')); // keeping this for future reference.
      this.contract = new this.web3.eth.Contract(
        //this.contractABI.abi,
        this.contractABI.abi,
        contractAddress
      );
      this.initEventSubscriptions();
      this.isWeb3Ready.next(true);
    }
  }

  private initEventSubscriptions(): void {
    this.contract.events.allEvents({ fromBlock: 'latest' }, async (error, event) => {
      console.log('event=', event);
      console.log('error=', error);
      if (!error) {
        alert(JSON.stringify(event));
      } else {
        alert(JSON.stringify(error))
      }
      // if (event.returnValues._deliveryHash) {
      //   const deliveryHash = event.returnValues._deliveryHash;
      //   const delivery = await this.getDelivery(deliveryHash);
      //   this.deliveryStream.next(delivery);
      // }
    });
  }
}
