/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { WizardStorageService } from '@sedeh/wizard-storage';
import * as i0 from "@angular/core";
import * as i1 from "@sedeh/wizard-storage";
var TaggerService = /** @class */ (function () {
    function TaggerService(storage) {
        this.storage = storage;
    }
    /**
     * @param {?} id
     * @param {?} tagged
     * @param {?} info
     * @return {?}
     */
    TaggerService.prototype.updateTag = /**
     * @param {?} id
     * @param {?} tagged
     * @param {?} info
     * @return {?}
     */
    function (id, tagged, info) {
        /** @type {?} */
        var item = this.getTaggedItems(id);
        if (item) {
            if (tagged) {
                item.push(info);
                this.storage.session.setItem(id, item);
            }
            else {
                /** @type {?} */
                var i = this.indexOfTaggedItem(id, info);
                if (i >= 0) {
                    item.splice(i, i + 1);
                    this.storage.session.setItem(id, item);
                }
            }
        }
        else {
            this.storage.session.setItem(id, tagged ? [info] : []);
        }
    };
    /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    TaggerService.prototype.indexOfTaggedItem = /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    function (id, info) {
        /** @type {?} */
        var item = this.getTaggedItems(id);
        /** @type {?} */
        var result = -1;
        if (item) {
            result = item.indexOf(info);
        }
        return result;
    };
    /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    TaggerService.prototype.hasTaggedItem = /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    function (id, info) {
        return this.indexOfTaggedItem(id, info) >= 0;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TaggerService.prototype.getTaggedItems = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.storage.session.getItem(id);
    };
    TaggerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    TaggerService.ctorParameters = function () { return [
        { type: WizardStorageService }
    ]; };
    /** @nocollapse */ TaggerService.ngInjectableDef = i0.defineInjectable({ factory: function TaggerService_Factory() { return new TaggerService(i0.inject(i1.WizardStorageService)); }, token: TaggerService, providedIn: "root" });
    return TaggerService;
}());
export { TaggerService };
if (false) {
    /** @type {?} */
    TaggerService.prototype.storage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvdGFnZ2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC90YWdnZXIvdGFnZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7SUFPekQsdUJBQW9CLE9BQTZCO1FBQTdCLFlBQU8sR0FBUCxPQUFPLENBQXNCO0tBQUc7Ozs7Ozs7SUFFcEQsaUNBQVM7Ozs7OztJQUFULFVBQVUsRUFBVSxFQUFFLE1BQWUsRUFBRSxJQUFTOztRQUM1QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDMUM7WUFBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ0osSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUMxQzthQUNKO1NBQ0o7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxRDtLQUNKOzs7Ozs7SUFDRCx5Q0FBaUI7Ozs7O0lBQWpCLFVBQWtCLEVBQVUsRUFBQyxJQUFTOztRQUNsQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztRQUNyQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1AsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2pCOzs7Ozs7SUFDRCxxQ0FBYTs7Ozs7SUFBYixVQUFjLEVBQVUsRUFBQyxJQUFTO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoRDs7Ozs7SUFFRCxzQ0FBYzs7OztJQUFkLFVBQWUsRUFBVTtRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzNDOztnQkF0Q0osVUFBVSxTQUFDO29CQUNYLFVBQVUsRUFBRSxNQUFNO2lCQUNsQjs7OztnQkFKUSxvQkFBb0I7Ozt3QkFIN0I7O1NBUWEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiovXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgV2l6YXJkU3RvcmFnZVNlcnZpY2UgfSBmcm9tICdAc2VkZWgvd2l6YXJkLXN0b3JhZ2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG5cdHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnZ2VyU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yYWdlOiBXaXphcmRTdG9yYWdlU2VydmljZSl7fVxyXG5cclxuICAgIHVwZGF0ZVRhZyhpZDogc3RyaW5nLCB0YWdnZWQ6IGJvb2xlYW4sIGluZm86IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFRhZ2dlZEl0ZW1zKGlkKTtcclxuICAgICAgICBpZiAoaXRlbSkgeyBcclxuICAgICAgICAgICAgaWYgKHRhZ2dlZCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgaXRlbSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpID0gdGhpcy5pbmRleE9mVGFnZ2VkSXRlbShpZCwgaW5mbyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zcGxpY2UoaSwgaSsxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIHRhZ2dlZCA/IFtpbmZvXSA6IFtdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbmRleE9mVGFnZ2VkSXRlbShpZDogc3RyaW5nLGluZm86IGFueSl7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VGFnZ2VkSXRlbXMoaWQpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAtMTtcclxuICAgICAgICBpZiAoaXRlbSkgeyBcclxuICAgICAgICAgICAgcmVzdWx0ID0gaXRlbS5pbmRleE9mKGluZm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgaGFzVGFnZ2VkSXRlbShpZDogc3RyaW5nLGluZm86IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4T2ZUYWdnZWRJdGVtKGlkLCBpbmZvKSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRhZ2dlZEl0ZW1zKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnNlc3Npb24uZ2V0SXRlbShpZCk7XHJcbiAgICB9XHJcbn1cclxuIl19