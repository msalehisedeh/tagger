/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { WizardStorageService } from '@sedeh/wizard-storage';
import * as i0 from "@angular/core";
import * as i1 from "@sedeh/wizard-storage";
/**
 * @record
 */
export function TagInfo() { }
/** @type {?} */
TagInfo.prototype.tagDate;
/** @type {?} */
TagInfo.prototype.taggedItem;
export class TaggerService {
    /**
     * @param {?} storage
     */
    constructor(storage) {
        this.storage = storage;
    }
    /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    tagItem(id, info) {
        /** @type {?} */
        const item = this.getTaggedItems(id);
        if (item) {
            item.push(info);
            this.storage.session.setItem(id, item);
        }
        else {
            this.storage.session.setItem(id, [info]);
        }
    }
    /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    releaseTaggedItem(id, info) {
        /** @type {?} */
        const item = this.getTaggedItems(id);
        if (item) {
            /** @type {?} */
            const i = this.indexOfTaggedItem(id, info);
            if (i >= 0) {
                item.splice(i, i + 1);
                this.storage.session.setItem(id, item);
            }
        }
        else {
            this.storage.session.setItem(id, []);
        }
    }
    /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    indexOfTaggedItem(id, info) {
        /** @type {?} */
        const items = this.getTaggedItems(id);
        /** @type {?} */
        let result = -1;
        if (items && items.length) {
            /** @type {?} */
            const x = items[0];
            if (x.taggedItem) {
                items.map((item, i) => {
                    if (item.taggedItem == info) {
                        result = i;
                    }
                });
            }
            else {
                result = items.indexOf(info);
            }
        }
        return result;
    }
    /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    hasTaggedItem(id, info) {
        return this.indexOfTaggedItem(id, info) >= 0;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getTaggedItems(id) {
        return this.storage.session.getItem(id);
    }
    /**
     * @param {?} id
     * @param {?} list
     * @return {?}
     */
    setTaggedItems(id, list) {
        this.storage.session.setItem(id, list);
    }
}
TaggerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TaggerService.ctorParameters = () => [
    { type: WizardStorageService }
];
/** @nocollapse */ TaggerService.ngInjectableDef = i0.defineInjectable({ factory: function TaggerService_Factory() { return new TaggerService(i0.inject(i1.WizardStorageService)); }, token: TaggerService, providedIn: "root" });
if (false) {
    /** @type {?} */
    TaggerService.prototype.storage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvdGFnZ2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC90YWdnZXIvdGFnZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7Ozs7Ozs7O0FBVTdELE1BQU07Ozs7SUFFRixZQUFvQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtLQUFHOzs7Ozs7SUFFcEQsT0FBTyxDQUFDLEVBQVUsRUFBRSxJQUFTOztRQUN6QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDMUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzVDO0tBQ0o7Ozs7OztJQUNELGlCQUFpQixDQUFDLEVBQVUsRUFBRSxJQUFTOztRQUNuQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBQ1AsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDMUM7U0FDSjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN4QztLQUNKOzs7Ozs7SUFDRCxpQkFBaUIsQ0FBQyxFQUFVLEVBQUUsSUFBUzs7UUFDbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUFDdEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztZQUN4QixNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FDTCxDQUFDLElBQWEsRUFBRSxDQUFTLEVBQUUsRUFBRTtvQkFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixNQUFNLEdBQUcsQ0FBQyxDQUFDO3FCQUNkO2lCQUNKLENBQ0osQ0FBQzthQUNMO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEM7U0FDSjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDakI7Ozs7OztJQUNELGFBQWEsQ0FBQyxFQUFVLEVBQUMsSUFBUztRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEQ7Ozs7O0lBRUQsY0FBYyxDQUFDLEVBQVU7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMzQzs7Ozs7O0lBRUQsY0FBYyxDQUFDLEVBQVUsRUFBRSxJQUFXO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDMUM7OztZQXpESixVQUFVLFNBQUM7Z0JBQ1gsVUFBVSxFQUFFLE1BQU07YUFDbEI7Ozs7WUFUUSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFdpemFyZFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnQHNlZGVoL3dpemFyZC1zdG9yYWdlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFnSW5mbyB7XHJcbiAgICB0YWdEYXRlOiBEYXRlLFxyXG4gICAgdGFnZ2VkSXRlbTogYW55XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuXHRwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhZ2dlclNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmFnZTogV2l6YXJkU3RvcmFnZVNlcnZpY2Upe31cclxuXHJcbiAgICB0YWdJdGVtKGlkOiBzdHJpbmcsIGluZm86IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFRhZ2dlZEl0ZW1zKGlkKTtcclxuICAgICAgICBpZiAoaXRlbSkgeyBcclxuICAgICAgICAgICAgaXRlbS5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBpdGVtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBbaW5mb10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbGVhc2VUYWdnZWRJdGVtKGlkOiBzdHJpbmcsIGluZm86IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFRhZ2dlZEl0ZW1zKGlkKTtcclxuICAgICAgICBpZiAoaXRlbSkgeyBcclxuICAgICAgICAgICAgY29uc3QgaSA9IHRoaXMuaW5kZXhPZlRhZ2dlZEl0ZW0oaWQsIGluZm8pO1xyXG4gICAgICAgICAgICBpZiAoaSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNwbGljZShpLCBpKzEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5kZXhPZlRhZ2dlZEl0ZW0oaWQ6IHN0cmluZywgaW5mbzogYW55KXtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuZ2V0VGFnZ2VkSXRlbXMoaWQpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAtMTtcclxuICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoKSB7IFxyXG4gICAgICAgICAgICBjb25zdCB4ID0gaXRlbXNbMF07XHJcbiAgICAgICAgICAgIGlmICh4LnRhZ2dlZEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLm1hcChcclxuICAgICAgICAgICAgICAgICAgICAoaXRlbTogVGFnSW5mbywgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnRhZ2dlZEl0ZW0gPT0gaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpdGVtcy5pbmRleE9mKGluZm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBoYXNUYWdnZWRJdGVtKGlkOiBzdHJpbmcsaW5mbzogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXhPZlRhZ2dlZEl0ZW0oaWQsIGluZm8pID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFnZ2VkSXRlbXMoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5nZXRJdGVtKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUYWdnZWRJdGVtcyhpZDogc3RyaW5nLCBsaXN0OiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIGxpc3QpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==