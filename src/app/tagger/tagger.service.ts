/*
*/
import { Injectable } from '@angular/core';
import { WizardStorageService } from '@sedeh/wizard-storage';

@Injectable({
	providedIn: 'root'
})
export class TaggerService {

    constructor(private storage: WizardStorageService){}

    updateTag(id: string, tagged: boolean, info: any) {
        const item = this.getTaggedItems(id);
        if (item) { 
            if (tagged) {
                item.push(info);
                this.storage.session.setItem(id, item);
            } else {
                const i = this.indexOfTaggedItem(id, info);
                if (i >= 0) {
                    item.splice(i, i+1);
                    this.storage.session.setItem(id, item);
                }
            }
        } else {
            this.storage.session.setItem(id, tagged ? [info] : []);
        }
    }
    indexOfTaggedItem(id: string,info: any){
        const item = this.getTaggedItems(id);
        let result = -1;
        if (item) { 
            result = item.indexOf(info);
        }
        return result;
    }
    hasTaggedItem(id: string,info: any) {
        return this.indexOfTaggedItem(id, info) >= 0;
    }

    getTaggedItems(id: string) {
        return this.storage.session.getItem(id);
    }
}
