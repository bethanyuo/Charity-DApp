export class Client {
    public name: string;
    public address: string;
    public request: string;
    public members: number;
    public primaryContact: string;
    public urgent: boolean;
    public category: number;
    constructor() {
      this.name = '';
      this.address = '';
      this.request = '';
      this.members = 0;
      this.primaryContact = '';
      this.category = 0;
      this.urgent = false;
    }
  }
  