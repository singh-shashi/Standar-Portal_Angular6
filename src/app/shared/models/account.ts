export class Account {
    AcctID: number;
    Status: string;
    Company: string;
    Address1: string;
    City: string;
    AccState: string;
    Industry: string;
    ZipCode: string;
    Country: string;
    MainPh: string;

    constructor(accountid?: number, status?: string, company?: string, address1?: string, city?: string,
         accState?: string, industry?: string, zipCode?: string, country?: string, mainPh?: string) {
      this.AcctID = accountid;
      this.Company = company;
      this.Status = status;
      this.Address1 = address1;
      this.City = city;
      this.AccState = accState;
      this.Industry = industry;
      this.ZipCode = zipCode;
      this.MainPh = mainPh;
      this.Country = country;
    }

    serialize() {
      return this;
    }

    deserialize(input) {
      this.AcctID = input.AcctID;
      this.Company = input.Company;
      this.Status = input.Status;
      this.Address1 = input.Address1;
      this.City = input.City;
      this.AccState = input.AccState;
      this.Industry = input.Industry;
      this.ZipCode = input.ZipCode;
      this.MainPh = input.MainPh;
      this.Country = input.Country;

      return this;
    }
  }
