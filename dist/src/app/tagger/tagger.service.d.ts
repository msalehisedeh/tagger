import { WizardStorageService } from '@sedeh/wizard-storage';
export declare class TaggerService {
    private storage;
    constructor(storage: WizardStorageService);
    updateTag(id: string, tagged: boolean, info: any): void;
    indexOfTaggedItem(id: string, info: any): number;
    hasTaggedItem(id: string, info: any): boolean;
    getTaggedItems(id: string): any;
}
