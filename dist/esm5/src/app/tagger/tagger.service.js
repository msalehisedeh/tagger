import * as tslib_1 from "tslib";
/*
*/
import { Injectable } from '@angular/core';
import { WizardStorageService } from '@sedeh/wizard-storage';
import * as i0 from "@angular/core";
import * as i1 from "@sedeh/wizard-storage";
var TaggerService = /** @class */ (function () {
    function TaggerService(storage) {
        this.storage = storage;
    }
    TaggerService.prototype.tagItem = function (id, info) {
        var item = this.getTaggedItems(id);
        if (item) {
            item.push(info);
            this.storage.session.setItem(id, item);
        }
        else {
            this.storage.session.setItem(id, [info]);
        }
    };
    TaggerService.prototype.releaseTaggedItem = function (id, info) {
        var item = this.getTaggedItems(id);
        if (item) {
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
    TaggerService.prototype.indexOfTaggedItem = function (id, info) {
        var items = this.getTaggedItems(id);
        var result = -1;
        if (items && items.length) {
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
    TaggerService.prototype.hasTaggedItem = function (id, info) {
        return this.indexOfTaggedItem(id, info) >= 0;
    };
    TaggerService.prototype.getTaggedItems = function (id) {
        return this.storage.session.getItem(id);
    };
    TaggerService.prototype.setTaggedItems = function (id, list) {
        this.storage.session.setItem(id, list);
    };
    TaggerService.ctorParameters = function () { return [
        { type: WizardStorageService }
    ]; };
    TaggerService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function TaggerService_Factory() { return new TaggerService(i0.ɵɵinject(i1.WizardStorageService)); }, token: TaggerService, providedIn: "root" });
    TaggerService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], TaggerService);
    return TaggerService;
}());
export { TaggerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvdGFnZ2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC90YWdnZXIvdGFnZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0VBQ0U7QUFDRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFVN0Q7SUFFSSx1QkFBb0IsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7SUFBRSxDQUFDO0lBRXBELCtCQUFPLEdBQVAsVUFBUSxFQUFVLEVBQUUsSUFBUztRQUN6QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7SUFDRCx5Q0FBaUIsR0FBakIsVUFBa0IsRUFBVSxFQUFFLElBQVM7UUFDbkMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLElBQUksRUFBRTtZQUNOLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMxQztTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUNELHlDQUFpQixHQUFqQixVQUFrQixFQUFVLEVBQUUsSUFBUztRQUNuQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRTtnQkFDZCxLQUFLLENBQUMsR0FBRyxDQUNMLFVBQUMsSUFBYSxFQUFFLENBQVM7b0JBQ3JCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7d0JBQ3pCLE1BQU0sR0FBRyxDQUFDLENBQUM7cUJBQ2Q7Z0JBQ0wsQ0FBQyxDQUNKLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQztTQUNKO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNELHFDQUFhLEdBQWIsVUFBYyxFQUFVLEVBQUMsSUFBUztRQUM5QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxzQ0FBYyxHQUFkLFVBQWUsRUFBVTtRQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsc0NBQWMsR0FBZCxVQUFlLEVBQVUsRUFBRSxJQUFXO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Z0JBcEQ0QixvQkFBb0I7OztJQUZ4QyxhQUFhO1FBSHpCLFVBQVUsQ0FBQztZQUNYLFVBQVUsRUFBRSxNQUFNO1NBQ2xCLENBQUM7T0FDVyxhQUFhLENBdUR6Qjt3QkFwRUQ7Q0FvRUMsQUF2REQsSUF1REM7U0F2RFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiovXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgV2l6YXJkU3RvcmFnZVNlcnZpY2UgfSBmcm9tICdAc2VkZWgvd2l6YXJkLXN0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWdJbmZvIHtcclxuICAgIHRhZ0RhdGU6IERhdGUsXHJcbiAgICB0YWdnZWRJdGVtOiBhbnlcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG5cdHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnZ2VyU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yYWdlOiBXaXphcmRTdG9yYWdlU2VydmljZSl7fVxyXG5cclxuICAgIHRhZ0l0ZW0oaWQ6IHN0cmluZywgaW5mbzogYW55KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VGFnZ2VkSXRlbXMoaWQpO1xyXG4gICAgICAgIGlmIChpdGVtKSB7IFxyXG4gICAgICAgICAgICBpdGVtLnB1c2goaW5mbyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIGl0ZW0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIFtpbmZvXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVsZWFzZVRhZ2dlZEl0ZW0oaWQ6IHN0cmluZywgaW5mbzogYW55KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VGFnZ2VkSXRlbXMoaWQpO1xyXG4gICAgICAgIGlmIChpdGVtKSB7IFxyXG4gICAgICAgICAgICBjb25zdCBpID0gdGhpcy5pbmRleE9mVGFnZ2VkSXRlbShpZCwgaW5mbyk7XHJcbiAgICAgICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc3BsaWNlKGksIGkrMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIFtdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbmRleE9mVGFnZ2VkSXRlbShpZDogc3RyaW5nLCBpbmZvOiBhbnkpe1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRUYWdnZWRJdGVtcyhpZCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGgpIHsgXHJcbiAgICAgICAgICAgIGNvbnN0IHggPSBpdGVtc1swXTtcclxuICAgICAgICAgICAgaWYgKHgudGFnZ2VkSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbXMubWFwKFxyXG4gICAgICAgICAgICAgICAgICAgIChpdGVtOiBUYWdJbmZvLCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udGFnZ2VkSXRlbSA9PSBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGl0ZW1zLmluZGV4T2YoaW5mbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGhhc1RhZ2dlZEl0ZW0oaWQ6IHN0cmluZyxpbmZvOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mVGFnZ2VkSXRlbShpZCwgaW5mbykgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWdnZWRJdGVtcyhpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5zZXNzaW9uLmdldEl0ZW0oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhZ2dlZEl0ZW1zKGlkOiBzdHJpbmcsIGxpc3Q6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgbGlzdCk7XHJcbiAgICB9XHJcbn1cclxuIl19