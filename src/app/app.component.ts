import { Component, NgZone } from '@angular/core';
import { Web3Service } from './services/web3.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Charity';
  active = 1;
  public isWeb3Ready = false;
  private subscription = new Subscription()

  constructor(private web3Service: Web3Service) {
    this.listenToIsWeb3Ready();
  }

  private listenToIsWeb3Ready(): void {
    this.web3Service.isWeb3Ready$.subscribe(async isReady => {
      if (isReady) {
        this.isWeb3Ready = isReady;
        const accounts = await this.web3Service.web3.eth.getAccounts();
        this.web3Service.owner = accounts[0];
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
