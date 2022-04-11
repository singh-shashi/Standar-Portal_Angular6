import { Serializable } from 'selenium-webdriver';
import { JsonApiService } from '../../core/api/json-api.service';

export class Defect implements Serializable<Defect> {
    DefectID = 0;
    Synopsis = '';
    Status = '';
    CateGory = '';
    SubCategry = '';
    DefType = '';
    SubDate: Date;
    Environ = '';
    Developr = '';
    Submitter = '';
    QAPerson = '';
    FixDate: Date;
    CertFix: Date;
    Details = '';
    Steps = '';
    DPublic = '';

    constructor(defectid?: number, synopsis?: string, status?: string, defType?: string, subDate?: Date,
        environ?: string, developr?: string, submitter?: string, qAPerson?: string, fixDate?: Date,
        certFix?: Date, details?: string, steps?: string, dPublic?: string, cateGory?: string, subCategry?: string) {
        this.DefectID = defectid;
        this.Synopsis = synopsis;
        this.Status = status;
        this.DefType = defType;
        this.SubDate = subDate;
        this.Environ = environ;
        this.Developr = developr;
        this.Submitter = submitter;
        this.QAPerson = qAPerson;
        this.FixDate = fixDate;
        this.CertFix = certFix;
        this.Details = details;
        this.Steps = steps;
        this.DPublic = dPublic;
        this.CateGory= cateGory;
        this.SubCategry= subCategry;
    }
    serialize() {
        return this;
    }

    update(apikey: string, jsonApiService: JsonApiService) {
        const recordId = this.DefectID;
        return jsonApiService.sendToSFApi('update/' + apikey + '/Defect/' + recordId, this.stringify())
    }

    add(apikey: string, jsonApiService: JsonApiService, parentObjectName: string, parentRecordId: number) {
        // this.validate();
        // const dAddObj = this;
        // delete dAddObj.DefectID;

        // const str = JSON.stringify(this);
        // const odata = JSON.parse(str);

        Object.keys(this).forEach(key => {
            if (this[key] === undefined) {
              this[key] = '';
            }
          });

        return jsonApiService.AddRecFun(apikey, parentObjectName, parentRecordId, 'DEFECT', this);
    }

    validate() {
        this.Synopsis = this.Synopsis === undefined ? '' : this.Synopsis;
        this.DefType = this.DefType === undefined ? '' : this.DefType;
        this.Environ = this.Environ === undefined ? '' : this.Environ;
        this.Submitter = this.Submitter === undefined ? '' : this.Submitter;
        this.QAPerson = this.QAPerson === undefined ? '' : this.QAPerson;
        this.Details = this.Details === undefined ? '' : this.Details;
        this.Steps = this.Steps === undefined ? '' : this.Steps;
        this.DPublic = this.DPublic === undefined ? '' : this.DPublic;
    }

    stringify() {
        this.validate();
        return JSON.stringify(this);
    }
    deserialize(input) {
        this.DefectID = input.DefectID;
        this.Synopsis = input.Synopsis;
        this.Status = input.Status;
        this.DefType = input.DefType;
        this.SubDate = input.SubDate;
        this.Environ = input.Environ;
        this.Developr = input.Developr;
        this.Submitter = input.Submitter;
        this.QAPerson = input.QAPerson;
        this.FixDate = input.FixDate;
        this.CertFix = input.CertFix;
        this.Details = input.Details;
        this.Steps = input.Steps;
        this.DPublic = input.DPublic;
        this.CateGory= input.CateGory;
        this.SubCategry= input.SubCategry;
        

        return this;
    }
}
