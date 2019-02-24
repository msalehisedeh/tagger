import { Injectable, Directive, Component, ElementRef, ViewContainerRef, Input, Output, EventEmitter, HostListener, Renderer2, ComponentFactoryResolver, NgModule, CUSTOM_ELEMENTS_SCHEMA, defineInjectable, inject } from '@angular/core';
import { WizardStorageService, WizardStorageModule } from '@sedeh/wizard-storage';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
    /** @nocollapse */ TaggerService.ngInjectableDef = defineInjectable({ factory: function TaggerService_Factory() { return new TaggerService(inject(WizardStorageService)); }, token: TaggerService, providedIn: "root" });
    return TaggerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var taggerComponent = /** @class */ (function () {
    function taggerComponent(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this.show = false;
        this.tagged = false;
        this.change = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    taggerComponent.prototype.keyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) { if (event.which == 13) {
        event.target.click();
    } };
    /**
     * @param {?} top
     * @param {?} left
     * @param {?} size
     * @return {?}
     */
    taggerComponent.prototype.position = /**
     * @param {?} top
     * @param {?} left
     * @param {?} size
     * @return {?}
     */
    function (top, left, size) {
        this.renderer.setStyle(this.el.nativeElement, 'top', top);
        this.renderer.setStyle(this.el.nativeElement, 'left', left);
        this.renderer.setStyle(this.el.nativeElement, 'font-size', size);
    };
    /**
     * @param {?} flag
     * @return {?}
     */
    taggerComponent.prototype.showTagger = /**
     * @param {?} flag
     * @return {?}
     */
    function (flag) {
        if (flag) {
            this.renderer.removeClass(this.el.nativeElement, 'hidden');
        }
        else {
            this.renderer.addClass(this.el.nativeElement, 'hidden');
        }
    };
    taggerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'taggerBox',
                    template: "\n    <span \n        class=\"tagger {{taggedClass}}\" \n        tabindex=\"0\" \n        aria-hidden='true'\n        (keyup)=\"keyup($event)\"\n        (click)=\"change.emit($event)\"></span>\n    <span style=\"display:block;position:absolute;left:-9999px;top:-9999px;width:1px;height:1px\">\n    {{tagged ? 'tag this item' : 'remove tag of this item'}}\n    </span>\n    ",
                    styles: [":host{width: 14px;height: 14px;position: absolute;color: #fff;z-index: 2;}",
                        ":host.hidden{top: -9999px !important;left:-9999px !important;}",
                        ":host .tagger:hover{color: red}",
                        ":host .tagger:focus{color: red}"]
                }] }
    ];
    /** @nocollapse */
    taggerComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    taggerComponent.propDecorators = {
        change: [{ type: Output }]
    };
    return taggerComponent;
}());
var taggerDirective = /** @class */ (function () {
    function taggerDirective(el, viewRef, resolver, taggerService, renderer) {
        this.el = el;
        this.viewRef = viewRef;
        this.resolver = resolver;
        this.taggerService = taggerService;
        this.renderer = renderer;
        this.taggedClass = 'fa fa-minus-square';
        this.taggableClass = 'fa fa-tag';
        this.taggerSize = 24;
        this.position = 'top:left';
        this.sticky = false;
        this.taggerChanged = new EventEmitter();
        this.renderer.setStyle(this.el.nativeElement, 'display', 'table');
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
        /** @type {?} */
        var componentFactory = this.resolver.resolveComponentFactory(taggerComponent);
        /** @type {?} */
        var componentRef = this.viewRef.createComponent(componentFactory);
        /** @type {?} */
        var domElem = /** @type {?} */ ((/** @type {?} */ (componentRef.hostView)).rootNodes[0]);
        this.el.nativeElement.appendChild(domElem);
        this.taggerBox = (/** @type {?} */ (componentRef.instance));
        this.taggerBox.change.subscribe(this.onTagSelect.bind(this));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    taggerDirective.prototype.focus = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.taggerBox.showTagger(true);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    taggerDirective.prototype.enter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerTag);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.showTagger(true);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    taggerDirective.prototype.hoverOut = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.sticky && !event.target.showTagger) {
            /** @type {?} */
            var rect = this.el.nativeElement.getBoundingClientRect();
            if (event.x < rect.x ||
                event.clientX >= (rect.x + rect.width) ||
                event.y < rect.y ||
                event.clientY >= (rect.y + rect.height)) {
                this.taggerBox.showTagger(false);
            }
        }
    };
    /**
     * @return {?}
     */
    taggerDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var x = this.position.split(':');
        /** @type {?} */
        var s = (this.taggerSize + 2) + 'px';
        /** @type {?} */
        var top = x[0] === 'top' ? '5px' : (x[0] === 'bottom' ? 'calc(100% - ' + s + ')' : 'calc((100% - ' + s + ')/2)');
        /** @type {?} */
        var left = x[1] === 'left' ? '5px' : (x[1] === 'right' ? 'calc(100% - ' + s + ')' : 'calc((100% - ' + s + ')/2)');
        this.taggerBox.position(top, left, this.taggerSize + 'px');
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerTag);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.showTagger(this.sticky);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    taggerDirective.prototype.onTagSelect = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.taggerBox.tagged = !this.taggerBox.tagged;
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerService.updateTag(this.tagger, this.taggerBox.tagged, this.taggerTag);
        this.taggerChanged.emit(this.tagger);
    };
    taggerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[tagger]'
                },] }
    ];
    /** @nocollapse */
    taggerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: TaggerService },
        { type: Renderer2 }
    ]; };
    taggerDirective.propDecorators = {
        taggedClass: [{ type: Input }],
        taggableClass: [{ type: Input }],
        tagger: [{ type: Input }],
        taggerSize: [{ type: Input }],
        position: [{ type: Input }],
        taggerTag: [{ type: Input }],
        sticky: [{ type: Input }],
        taggerChanged: [{ type: Output, args: ["taggerChanged",] }],
        focus: [{ type: HostListener, args: ['focus', ['$event'],] }],
        enter: [{ type: HostListener, args: ['mouseenter', ['$event'],] }],
        hoverOut: [{ type: HostListener, args: ['mouseout', ['$event'],] }]
    };
    return taggerDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TaggerModule = /** @class */ (function () {
    function TaggerModule() {
    }
    TaggerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        WizardStorageModule
                    ],
                    declarations: [
                        taggerComponent,
                        taggerDirective
                    ],
                    exports: [
                        taggerDirective
                    ],
                    entryComponents: [
                        taggerComponent
                    ],
                    providers: [
                        TaggerService
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return TaggerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { taggerDirective, TaggerService, TaggerModule, taggerComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtdGFnZ2VyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Ac2VkZWgvdGFnZ2VyL3NyYy9hcHAvdGFnZ2VyL3RhZ2dlci5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2VkZWgvdGFnZ2VyL3NyYy9hcHAvdGFnZ2VyL3RhZ2dlci5kaXJlY3RpdmUudHMiLCJuZzovL0BzZWRlaC90YWdnZXIvc3JjL2FwcC90YWdnZXIvdGFnZ2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFdpemFyZFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnQHNlZGVoL3dpemFyZC1zdG9yYWdlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuXHRwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhZ2dlclNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmFnZTogV2l6YXJkU3RvcmFnZVNlcnZpY2Upe31cclxuXHJcbiAgICB1cGRhdGVUYWcoaWQ6IHN0cmluZywgdGFnZ2VkOiBib29sZWFuLCBpbmZvOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRUYWdnZWRJdGVtcyhpZCk7XHJcbiAgICAgICAgaWYgKGl0ZW0pIHsgXHJcbiAgICAgICAgICAgIGlmICh0YWdnZWQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIGl0ZW0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaSA9IHRoaXMuaW5kZXhPZlRhZ2dlZEl0ZW0oaWQsIGluZm8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3BsaWNlKGksIGkrMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCB0YWdnZWQgPyBbaW5mb10gOiBbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5kZXhPZlRhZ2dlZEl0ZW0oaWQ6IHN0cmluZyxpbmZvOiBhbnkpe1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFRhZ2dlZEl0ZW1zKGlkKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gLTE7XHJcbiAgICAgICAgaWYgKGl0ZW0pIHsgXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGl0ZW0uaW5kZXhPZihpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGhhc1RhZ2dlZEl0ZW0oaWQ6IHN0cmluZyxpbmZvOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mVGFnZ2VkSXRlbShpZCwgaW5mbykgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWdnZWRJdGVtcyhpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5zZXNzaW9uLmdldEl0ZW0oaWQpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgVmlld0NvbnRhaW5lclJlZixcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgT25Jbml0LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSG9zdExpc3RlbmVyLFxyXG4gICAgUmVuZGVyZXIyLFxyXG4gICAgQ29tcG9uZW50UmVmLFxyXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRhZ2dlclNlcnZpY2UgfSBmcm9tICcuL3RhZ2dlci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0YWdnZXJCb3gnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxzcGFuIFxyXG4gICAgICAgIGNsYXNzPVwidGFnZ2VyIHt7dGFnZ2VkQ2xhc3N9fVwiIFxyXG4gICAgICAgIHRhYmluZGV4PVwiMFwiIFxyXG4gICAgICAgIGFyaWEtaGlkZGVuPSd0cnVlJ1xyXG4gICAgICAgIChrZXl1cCk9XCJrZXl1cCgkZXZlbnQpXCJcclxuICAgICAgICAoY2xpY2spPVwiY2hhbmdlLmVtaXQoJGV2ZW50KVwiPjwvc3Bhbj5cclxuICAgIDxzcGFuIHN0eWxlPVwiZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi05OTk5cHg7dG9wOi05OTk5cHg7d2lkdGg6MXB4O2hlaWdodDoxcHhcIj5cclxuICAgIHt7dGFnZ2VkID8gJ3RhZyB0aGlzIGl0ZW0nIDogJ3JlbW92ZSB0YWcgb2YgdGhpcyBpdGVtJ319XHJcbiAgICA8L3NwYW4+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbXHJcbiAgICAgICAgYDpob3N0e3dpZHRoOiAxNHB4O2hlaWdodDogMTRweDtwb3NpdGlvbjogYWJzb2x1dGU7Y29sb3I6ICNmZmY7ei1pbmRleDogMjt9YCxcclxuICAgICAgICBgOmhvc3QuaGlkZGVue3RvcDogLTk5OTlweCAhaW1wb3J0YW50O2xlZnQ6LTk5OTlweCAhaW1wb3J0YW50O31gLFxyXG4gICAgICAgIGA6aG9zdCAudGFnZ2VyOmhvdmVye2NvbG9yOiByZWR9YCxcclxuICAgICAgICBgOmhvc3QgLnRhZ2dlcjpmb2N1c3tjb2xvcjogcmVkfWBcclxuICAgIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyB0YWdnZXJDb21wb25lbnQge1xyXG4gICAgc2hvdyA9IGZhbHNlXHJcbiAgICB0YWdnZWQgPSBmYWxzZTtcclxuICAgIHRhZ2dlZENsYXNzOiBzdHJpbmc7XHJcbiAgICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLHB1YmxpYyBlbDpFbGVtZW50UmVmKXt9XHJcbiAgICBrZXl1cChldmVudDphbnkpe2lmKGV2ZW50LndoaWNoID09IDEzKXtldmVudC50YXJnZXQuY2xpY2soKX19XHJcbiAgICBwb3NpdGlvbih0b3A6IHN0cmluZywgbGVmdDogc3RyaW5nLCBzaXplOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwndG9wJywgdG9wKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwnbGVmdCcsIGxlZnQpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdmb250LXNpemUnLCBzaXplKTsgXHJcbiAgICB9XHJcbiAgICBzaG93VGFnZ2VyKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hpZGRlbicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3RhZ2dlcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyB0YWdnZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSB0YWdnZXJCb3g6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSB0YWdnZWRDbGFzcyA9ICdmYSBmYS1taW51cy1zcXVhcmUnO1xyXG4gICAgQElucHV0KCkgdGFnZ2FibGVDbGFzcyA9ICdmYSBmYS10YWcnO1xyXG4gICAgQElucHV0KCkgdGFnZ2VyOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSB0YWdnZXJTaXplID0gMjQ7XHJcbiAgICBASW5wdXQoKSBwb3NpdGlvbiA9ICd0b3A6bGVmdCc7XHJcbiAgICBASW5wdXQoKSB0YWdnZXJUYWc6IGFueTtcclxuICAgIEBJbnB1dCgpIHN0aWNreSA9IGZhbHNlO1xyXG4gXHJcbiAgICBAT3V0cHV0KFwidGFnZ2VyQ2hhbmdlZFwiKVxyXG4gICAgdGFnZ2VyQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycsWyckZXZlbnQnXSlcclxuXHRmb2N1cyhldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcih0cnVlKTtcclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLFsnJGV2ZW50J10pXHJcblx0ZW50ZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA9IHRoaXMudGFnZ2VyU2VydmljZS5oYXNUYWdnZWRJdGVtKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlclRhZyk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkQ2xhc3MgPSB0aGlzLnRhZ2dlckJveC50YWdnZWQgPyB0aGlzLnRhZ2dlZENsYXNzIDogdGhpcy50YWdnYWJsZUNsYXNzO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZW91dCcsWyckZXZlbnQnXSlcclxuXHRob3Zlck91dChldmVudDogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0aWNreSAmJiAhZXZlbnQudGFyZ2V0LnNob3dUYWdnZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnggPCByZWN0LnggfHxcclxuICAgICAgICAgICAgICAgIGV2ZW50LmNsaWVudFggPj0gKHJlY3QueCArIHJlY3Qud2lkdGgpIHx8IFxyXG4gICAgICAgICAgICAgICAgZXZlbnQueSA8IHJlY3QueSB8fCBcclxuICAgICAgICAgICAgICAgIGV2ZW50LmNsaWVudFkgPj0gKHJlY3QueSArIHJlY3QuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBlbDpFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgdmlld1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSB0YWdnZXJTZXJ2aWNlOiBUYWdnZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ2Rpc3BsYXknLCd0YWJsZScpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdwb3NpdGlvbicsJ3JlbGF0aXZlJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnMCcpO1xyXG4gICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0YWdnZXJDb21wb25lbnQpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gPSB0aGlzLnZpZXdSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG4gICAgICAgIGNvbnN0IGRvbUVsZW0gPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZiA8IGFueSA+ICkucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChkb21FbGVtKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveCA9ICg8dGFnZ2VyQ29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LmNoYW5nZS5zdWJzY3JpYmUodGhpcy5vblRhZ1NlbGVjdC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIFxyXG5cdG5nT25Jbml0KCkge1xyXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLnBvc2l0aW9uLnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgY29uc3QgcyA9ICh0aGlzLnRhZ2dlclNpemUgKyAyKSArICdweCc7XHJcbiAgICAgICAgY29uc3QgdG9wID0geFswXSA9PT0gJ3RvcCcgPyAnNXB4JyA6ICh4WzBdID09PSAnYm90dG9tJyA/ICdjYWxjKDEwMCUgLSAnK3MrJyknIDogJ2NhbGMoKDEwMCUgLSAnK3MrJykvMiknKTtcclxuICAgICAgICBjb25zdCBsZWZ0ID0geFsxXSA9PT0gJ2xlZnQnID8gJzVweCcgOiAoeFsxXSA9PT0gJ3JpZ2h0JyA/ICdjYWxjKDEwMCUgLSAnK3MrJyknIDogJ2NhbGMoKDEwMCUgLSAnK3MrJykvMiknKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5wb3NpdGlvbih0b3AsIGxlZnQsIHRoaXMudGFnZ2VyU2l6ZSArICdweCcpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA9IHRoaXMudGFnZ2VyU2VydmljZS5oYXNUYWdnZWRJdGVtKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlclRhZyk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkQ2xhc3MgPSB0aGlzLnRhZ2dlckJveC50YWdnZWQgPyB0aGlzLnRhZ2dlZENsYXNzIDogdGhpcy50YWdnYWJsZUNsYXNzO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIodGhpcy5zdGlja3kpO1xyXG4gICAgfVxyXG4gICAgb25UYWdTZWxlY3QoZXZlbnQ6YW55KSB7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkID0gIXRoaXMudGFnZ2VyQm94LnRhZ2dlZDtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRDbGFzcyA9IHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA/IHRoaXMudGFnZ2VkQ2xhc3MgOiB0aGlzLnRhZ2dhYmxlQ2xhc3M7XHJcbiAgICAgICAgdGhpcy50YWdnZXJTZXJ2aWNlLnVwZGF0ZVRhZyh0aGlzLnRhZ2dlciwgdGhpcy50YWdnZXJCb3gudGFnZ2VkLCB0aGlzLnRhZ2dlclRhZylcclxuICAgICAgICB0aGlzLnRhZ2dlckNoYW5nZWQuZW1pdCh0aGlzLnRhZ2dlcik7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgV2l6YXJkU3RvcmFnZU1vZHVsZSB9IGZyb20gJ0BzZWRlaC93aXphcmQtc3RvcmFnZSc7XHJcblxyXG5pbXBvcnQgeyB0YWdnZXJDb21wb25lbnQsIHRhZ2dlckRpcmVjdGl2ZSB9IGZyb20gJy4vdGFnZ2VyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRhZ2dlclNlcnZpY2UgfSBmcm9tICcuL3RhZ2dlci5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgV2l6YXJkU3RvcmFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcblx0ICB0YWdnZXJDb21wb25lbnQsXHJcbiAgICB0YWdnZXJEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIHRhZ2dlckRpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICB0YWdnZXJDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgVGFnZ2VyU2VydmljZVxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGFnZ2VyTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBO0lBUUksdUJBQW9CLE9BQTZCO1FBQTdCLFlBQU8sR0FBUCxPQUFPLENBQXNCO0tBQUc7Ozs7Ozs7SUFFcEQsaUNBQVM7Ozs7OztJQUFULFVBQVUsRUFBVSxFQUFFLE1BQWUsRUFBRSxJQUFTOztRQUM1QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMxQztpQkFBTTs7Z0JBQ0gsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDMUM7YUFDSjtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO0tBQ0o7Ozs7OztJQUNELHlDQUFpQjs7Ozs7SUFBakIsVUFBa0IsRUFBVSxFQUFDLElBQVM7O1FBQ2xDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7O1FBQ3JDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLElBQUksSUFBSSxFQUFFO1lBQ04sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLE1BQU0sQ0FBQztLQUNqQjs7Ozs7O0lBQ0QscUNBQWE7Ozs7O0lBQWIsVUFBYyxFQUFVLEVBQUMsSUFBUztRQUM5QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hEOzs7OztJQUVELHNDQUFjOzs7O0lBQWQsVUFBZSxFQUFVO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzNDOztnQkF0Q0osVUFBVSxTQUFDO29CQUNYLFVBQVUsRUFBRSxNQUFNO2lCQUNsQjs7OztnQkFKUSxvQkFBb0I7Ozt3QkFIN0I7Ozs7Ozs7QUNBQTtJQTBDSSx5QkFBb0IsUUFBbUIsRUFBUSxFQUFhO1FBQXhDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUSxPQUFFLEdBQUYsRUFBRSxDQUFXO29CQUpyRCxLQUFLO3NCQUNILEtBQUs7c0JBRUssSUFBSSxZQUFZLEVBQUU7S0FDMEI7Ozs7O0lBQy9ELCtCQUFLOzs7O0lBQUwsVUFBTSxLQUFTLElBQUUsSUFBRyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBQztRQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7S0FBQyxFQUFDOzs7Ozs7O0lBQzdELGtDQUFROzs7Ozs7SUFBUixVQUFTLEdBQVcsRUFBRSxJQUFZLEVBQUUsSUFBWTtRQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNuRTs7Ozs7SUFDRCxvQ0FBVTs7OztJQUFWLFVBQVcsSUFBYTtRQUNwQixJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzlEO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMzRDtLQUNKOztnQkF0Q0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsdVhBVVQ7NkJBRUcsNEVBQTRFO3dCQUM1RSxnRUFBZ0U7d0JBQ2hFLGlDQUFpQzt3QkFDakMsaUNBQWlDO2lCQUV4Qzs7OztnQkExQkcsU0FBUztnQkFQVCxVQUFVOzs7eUJBc0NULE1BQU07OzBCQXpDWDs7O0lBa0dJLHlCQUNXLElBQ0MsU0FDQSxVQUNBLGVBQ0E7UUFKRCxPQUFFLEdBQUYsRUFBRTtRQUNELFlBQU8sR0FBUCxPQUFPO1FBQ1AsYUFBUSxHQUFSLFFBQVE7UUFDUixrQkFBYSxHQUFiLGFBQWE7UUFDYixhQUFRLEdBQVIsUUFBUTsyQkF2Q0csb0JBQW9COzZCQUNsQixXQUFXOzBCQUVkLEVBQUU7d0JBQ0osVUFBVTtzQkFFWixLQUFLOzZCQUdQLElBQUksWUFBWSxFQUFFO1FBZ0M5QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7UUFDbkUsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyxDQUFDOztRQUM5RSxJQUFNLFlBQVksR0FBc0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7UUFDdkYsSUFBTSxPQUFPLHFCQUFHLG1CQUFDLFlBQVksQ0FBQyxRQUFtQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQWdCLEVBQUM7UUFDaEcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFTLHNCQUFxQixZQUFZLENBQUMsUUFBUSxFQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDaEU7Ozs7O0lBdkNKLCtCQUFLOzs7O0lBREYsVUFDRyxLQUFVO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkM7Ozs7O0lBRUosK0JBQUs7Ozs7SUFERixVQUNHLEtBQVU7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkM7Ozs7O0lBRUosa0NBQVE7Ozs7SUFETCxVQUNNLEtBQVU7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFOztZQUMxQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzNELElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3RDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ2hCLEtBQUssQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUN0QyxFQUFFO2dCQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BDO1NBQ0o7S0FDSjs7OztJQW9CSixrQ0FBUTs7O0lBQVI7O1FBQ08sSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBQ25DLElBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDOztRQUN2QyxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxHQUFHLGNBQWMsR0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFHLGVBQWUsR0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUM7O1FBQzNHLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLEdBQUcsY0FBYyxHQUFDLENBQUMsR0FBQyxHQUFHLEdBQUcsZUFBZSxHQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzNGLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQzs7Ozs7SUFDRCxxQ0FBVzs7OztJQUFYLFVBQVksS0FBUztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMzRixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNoRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDeEM7O2dCQTFFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFVBQVU7aUJBQ3ZCOzs7O2dCQXpERyxVQUFVO2dCQUNWLGdCQUFnQjtnQkFTaEIsd0JBQXdCO2dCQUVuQixhQUFhO2dCQUxsQixTQUFTOzs7OEJBc0RSLEtBQUs7Z0NBQ0wsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLO3lCQUNMLEtBQUs7Z0NBRUwsTUFBTSxTQUFDLGVBQWU7d0JBR3RCLFlBQVksU0FBQyxPQUFPLEVBQUMsQ0FBQyxRQUFRLENBQUM7d0JBSS9CLFlBQVksU0FBQyxZQUFZLEVBQUMsQ0FBQyxRQUFRLENBQUM7MkJBTXBDLFlBQVksU0FBQyxVQUFVLEVBQUMsQ0FBQyxRQUFRLENBQUM7OzBCQXJGdkM7Ozs7Ozs7QUNBQTs7OztnQkFPQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3FCQUNwQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ2IsZUFBZTt3QkFDZCxlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZUFBZTtxQkFDaEI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLGVBQWU7cUJBQ2hCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxhQUFhO3FCQUNkO29CQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUNsQzs7dUJBMUJEOzs7Ozs7Ozs7Ozs7Ozs7In0=