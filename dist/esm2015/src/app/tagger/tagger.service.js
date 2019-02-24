/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { WizardStorageService } from '@sedeh/wizard-storage';
import * as i0 from "@angular/core";
import * as i1 from "@sedeh/wizard-storage";
export class TaggerService {
    /**
     * @param {?} storage
     */
    constructor(storage) {
        this.storage = storage;
    }
    /**
     * @param {?} id
     * @param {?} tagged
     * @param {?} info
     * @return {?}
     */
    updateTag(id, tagged, info) {
        /** @type {?} */
        const item = this.getTaggedItems(id);
        if (item) {
            if (tagged) {
                item.push(info);
                this.storage.session.setItem(id, item);
            }
            else {
                /** @type {?} */
                const i = this.indexOfTaggedItem(id, info);
                if (i >= 0) {
                    item.splice(i, i + 1);
                    this.storage.session.setItem(id, item);
                }
            }
        }
        else {
            this.storage.session.setItem(id, tagged ? [info] : []);
        }
    }
    /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    indexOfTaggedItem(id, info) {
        /** @type {?} */
        const item = this.getTaggedItems(id);
        /** @type {?} */
        let result = -1;
        if (item) {
            result = item.indexOf(info);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvdGFnZ2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC90YWdnZXIvdGFnZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQUs3RCxNQUFNOzs7O0lBRUYsWUFBb0IsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7S0FBRzs7Ozs7OztJQUVwRCxTQUFTLENBQUMsRUFBVSxFQUFFLE1BQWUsRUFBRSxJQUFTOztRQUM1QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDMUM7WUFBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ0osTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUMxQzthQUNKO1NBQ0o7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxRDtLQUNKOzs7Ozs7SUFDRCxpQkFBaUIsQ0FBQyxFQUFVLEVBQUMsSUFBUzs7UUFDbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUFDckMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNqQjs7Ozs7O0lBQ0QsYUFBYSxDQUFDLEVBQVUsRUFBQyxJQUFTO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoRDs7Ozs7SUFFRCxjQUFjLENBQUMsRUFBVTtRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzNDOzs7WUF0Q0osVUFBVSxTQUFDO2dCQUNYLFVBQVUsRUFBRSxNQUFNO2FBQ2xCOzs7O1lBSlEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuKi9cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBXaXphcmRTdG9yYWdlU2VydmljZSB9IGZyb20gJ0BzZWRlaC93aXphcmQtc3RvcmFnZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcblx0cHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdnZXJTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JhZ2U6IFdpemFyZFN0b3JhZ2VTZXJ2aWNlKXt9XHJcblxyXG4gICAgdXBkYXRlVGFnKGlkOiBzdHJpbmcsIHRhZ2dlZDogYm9vbGVhbiwgaW5mbzogYW55KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VGFnZ2VkSXRlbXMoaWQpO1xyXG4gICAgICAgIGlmIChpdGVtKSB7IFxyXG4gICAgICAgICAgICBpZiAodGFnZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnB1c2goaW5mbyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBpdGVtKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGkgPSB0aGlzLmluZGV4T2ZUYWdnZWRJdGVtKGlkLCBpbmZvKTtcclxuICAgICAgICAgICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNwbGljZShpLCBpKzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgdGFnZ2VkID8gW2luZm9dIDogW10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluZGV4T2ZUYWdnZWRJdGVtKGlkOiBzdHJpbmcsaW5mbzogYW55KXtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRUYWdnZWRJdGVtcyhpZCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGlmIChpdGVtKSB7IFxyXG4gICAgICAgICAgICByZXN1bHQgPSBpdGVtLmluZGV4T2YoaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBoYXNUYWdnZWRJdGVtKGlkOiBzdHJpbmcsaW5mbzogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXhPZlRhZ2dlZEl0ZW0oaWQsIGluZm8pID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFnZ2VkSXRlbXMoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5nZXRJdGVtKGlkKTtcclxuICAgIH1cclxufVxyXG4iXX0=