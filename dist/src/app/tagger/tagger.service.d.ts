import { WizardStorageService } from '@sedeh/wizard-storage';
export interface TagInfo {
    tagDate: Date;
    taggedItem: any;
}
export declare class TaggerService {
    private storage;
    constructor(storage: WizardStorageService);
    tagItem(id: string, info: any): void;
    releaseTaggedItem(id: string, info: any): void;
    indexOfTaggedItem(id: string, info: any): number;
    hasTaggedItem(id: string, info: any): boolean;
    getTaggedItems(id: string): any;
    setTaggedItems(id: string, list: any[]): void;
}
