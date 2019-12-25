/*
*/
import { Injectable } from '@angular/core';
import { WizardStorageService } from '@sedeh/wizard-storage';

export interface TagInfo {
    tagDate: Date,
    taggedItem: any
}

@Injectable({
	providedIn: 'root'
})
export class TaggerService {

    constructor(private storage: WizardStorageService){}

    tagItem(id: string, info: any) {
        const item = this.getTaggedItems(id);
        if (item) { 
            item.push(info);
            this.storage.session.setItem(id, item);
        } else {
            this.storage.session.setItem(id, [info]);
        }
    }
    releaseTaggedItem(id: string, info: any) {
        const item = this.getTaggedItems(id);
        if (item) { 
            const i = this.indexOfTaggedItem(id, info);
            if (i >= 0) {
                item.splice(i, i+1);
                this.storage.session.setItem(id, item);
            }
        } else {
            this.storage.session.setItem(id, []);
        }
    }
    indexOfTaggedItem(id: string, info: any){
        const items = this.getTaggedItems(id);
        let result = -1;
        if (items && items.length) { 
            const x = items[0];
            if (x.taggedItem) {
                items.map(
                    (item: TagInfo, i: number) => {
                        if (item.taggedItem == info) {
                            result = i;
                        }
                    }
                );
            } else {
                result = items.indexOf(info);
            }
        }
        return result;
    }
    hasTaggedItem(id: string,info: any) {
        return this.indexOfTaggedItem(id, info) >= 0;
    }

    getTaggedItems(id: string) {
        return this.storage.session.getItem(id);
    }

    setTaggedItems(id: string, list: any[]) {
        this.storage.session.setItem(id, list);
    }
}
