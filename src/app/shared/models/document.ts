

export class Document {
  DocId: number;
  DocName: string;
  DocType: string;
  Creator: string;
  DocPath: string;
  DownloadURL: string;

  
  constructor(DocId: number, DocName: string, DocType: string, Creator: string,DocPath: string, apiKey: string, baseurl: string) {
    this.DocId = DocId;
    this.DocName = DocName;
    this.DocType = DocType;
    this.Creator = Creator;
    this.DocPath = DocPath;
    this.DownloadURL = baseurl +"sfcrmapi/Downloadattach/" + apiKey + "/" + DocPath.split("\\")[1].split("_")[0] + "/" + DocPath.split("\\")[1].split("_")[1] + "/" + DocName;
  }
}

