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
var TaggerService = /** @class */ (function () {
    function TaggerService(storage) {
        this.storage = storage;
    }
    /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    TaggerService.prototype.tagItem = /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    function (id, info) {
        /** @type {?} */
        var item = this.getTaggedItems(id);
        if (item) {
            item.push(info);
            this.storage.session.setItem(id, item);
        }
        else {
            this.storage.session.setItem(id, [info]);
        }
    };
    /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    TaggerService.prototype.releaseTaggedItem = /**
     * @param {?} id
     * @param {?} info
     * @return {?}
     */
    function (id, info) {
        /** @type {?} */
        var item = this.getTaggedItems(id);
        if (item) {
            /** @type {?} */
            var i = this.indexOfTaggedItem(id, info);
            if (i >= 0) {
                item.splice(i, i + 1);
                this.storage.session.setItem(id, item);
            }
        }
        else {
            this.storage.session.setItem(id, []);
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
        var items = this.getTaggedItems(id);
        /** @type {?} */
        var result = -1;
        if (items && items.length) {
            /** @type {?} */
            var x = items[0];
            if (x.taggedItem) {
                items.map(function (item, i) {
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
    /**
     * @param {?} id
     * @param {?} list
     * @return {?}
     */
    TaggerService.prototype.setTaggedItems = /**
     * @param {?} id
     * @param {?} list
     * @return {?}
     */
    function (id, list) {
        this.storage.session.setItem(id, list);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvdGFnZ2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC90YWdnZXIvdGFnZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7Ozs7Ozs7OztJQVl6RCx1QkFBb0IsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7S0FBRzs7Ozs7O0lBRXBELCtCQUFPOzs7OztJQUFQLFVBQVEsRUFBVSxFQUFFLElBQVM7O1FBQ3pCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMxQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDNUM7S0FDSjs7Ozs7O0lBQ0QseUNBQWlCOzs7OztJQUFqQixVQUFrQixFQUFVLEVBQUUsSUFBUzs7UUFDbkMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUNQLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzFDO1NBQ0o7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDeEM7S0FDSjs7Ozs7O0lBQ0QseUNBQWlCOzs7OztJQUFqQixVQUFrQixFQUFVLEVBQUUsSUFBUzs7UUFDbkMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUFDdEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztZQUN4QixJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FDTCxVQUFDLElBQWEsRUFBRSxDQUFTO29CQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQzFCLE1BQU0sR0FBRyxDQUFDLENBQUM7cUJBQ2Q7aUJBQ0osQ0FDSixDQUFDO2FBQ0w7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQztTQUNKO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNqQjs7Ozs7O0lBQ0QscUNBQWE7Ozs7O0lBQWIsVUFBYyxFQUFVLEVBQUMsSUFBUztRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEQ7Ozs7O0lBRUQsc0NBQWM7Ozs7SUFBZCxVQUFlLEVBQVU7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMzQzs7Ozs7O0lBRUQsc0NBQWM7Ozs7O0lBQWQsVUFBZSxFQUFVLEVBQUUsSUFBVztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzFDOztnQkF6REosVUFBVSxTQUFDO29CQUNYLFVBQVUsRUFBRSxNQUFNO2lCQUNsQjs7OztnQkFUUSxvQkFBb0I7Ozt3QkFIN0I7O1NBYWEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiovXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgV2l6YXJkU3RvcmFnZVNlcnZpY2UgfSBmcm9tICdAc2VkZWgvd2l6YXJkLXN0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWdJbmZvIHtcclxuICAgIHRhZ0RhdGU6IERhdGUsXHJcbiAgICB0YWdnZWRJdGVtOiBhbnlcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG5cdHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnZ2VyU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yYWdlOiBXaXphcmRTdG9yYWdlU2VydmljZSl7fVxyXG5cclxuICAgIHRhZ0l0ZW0oaWQ6IHN0cmluZywgaW5mbzogYW55KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VGFnZ2VkSXRlbXMoaWQpO1xyXG4gICAgICAgIGlmIChpdGVtKSB7IFxyXG4gICAgICAgICAgICBpdGVtLnB1c2goaW5mbyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIGl0ZW0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIFtpbmZvXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVsZWFzZVRhZ2dlZEl0ZW0oaWQ6IHN0cmluZywgaW5mbzogYW55KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VGFnZ2VkSXRlbXMoaWQpO1xyXG4gICAgICAgIGlmIChpdGVtKSB7IFxyXG4gICAgICAgICAgICBjb25zdCBpID0gdGhpcy5pbmRleE9mVGFnZ2VkSXRlbShpZCwgaW5mbyk7XHJcbiAgICAgICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc3BsaWNlKGksIGkrMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIFtdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbmRleE9mVGFnZ2VkSXRlbShpZDogc3RyaW5nLCBpbmZvOiBhbnkpe1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRUYWdnZWRJdGVtcyhpZCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGgpIHsgXHJcbiAgICAgICAgICAgIGNvbnN0IHggPSBpdGVtc1swXTtcclxuICAgICAgICAgICAgaWYgKHgudGFnZ2VkSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbXMubWFwKFxyXG4gICAgICAgICAgICAgICAgICAgIChpdGVtOiBUYWdJbmZvLCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udGFnZ2VkSXRlbSA9PSBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGl0ZW1zLmluZGV4T2YoaW5mbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGhhc1RhZ2dlZEl0ZW0oaWQ6IHN0cmluZyxpbmZvOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mVGFnZ2VkSXRlbShpZCwgaW5mbykgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWdnZWRJdGVtcyhpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5zZXNzaW9uLmdldEl0ZW0oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhZ2dlZEl0ZW1zKGlkOiBzdHJpbmcsIGxpc3Q6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgbGlzdCk7XHJcbiAgICB9XHJcbn1cclxuIl19