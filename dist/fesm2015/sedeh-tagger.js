import { Injectable, Directive, Component, ElementRef, ViewContainerRef, Input, Output, EventEmitter, HostListener, Renderer2, ComponentFactoryResolver, NgModule, CUSTOM_ELEMENTS_SCHEMA, defineInjectable, inject } from '@angular/core';
import { WizardStorageService, WizardStorageModule } from '@sedeh/wizard-storage';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TaggerService {
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
/** @nocollapse */ TaggerService.ngInjectableDef = defineInjectable({ factory: function TaggerService_Factory() { return new TaggerService(inject(WizardStorageService)); }, token: TaggerService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class taggerComponent {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
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
    keyup(event) { if (event.which == 13) {
        event.target.click();
    } }
    /**
     * @param {?} top
     * @param {?} left
     * @param {?} size
     * @return {?}
     */
    position(top, left, size) {
        this.renderer.setStyle(this.el.nativeElement, 'top', top);
        this.renderer.setStyle(this.el.nativeElement, 'left', left);
        this.renderer.setStyle(this.el.nativeElement, 'font-size', size);
    }
    /**
     * @param {?} flag
     * @return {?}
     */
    showTagger(flag) {
        if (flag) {
            this.renderer.removeClass(this.el.nativeElement, 'hidden');
        }
        else {
            this.renderer.addClass(this.el.nativeElement, 'hidden');
        }
    }
}
taggerComponent.decorators = [
    { type: Component, args: [{
                selector: 'taggerBox',
                template: `
    <span 
        class="tagger {{taggedClass}}" 
        tabindex="0" 
        aria-hidden='true'
        (keyup)="keyup($event)"
        (click)="change.emit($event)"></span>
    <span style="display:block;position:absolute;left:-9999px;top:-9999px;width:1px;height:1px">
    {{tagged ? 'tag this item' : 'remove tag of this item'}}
    </span>
    `,
                styles: [`:host{width: 14px;height: 14px;position: absolute;color: #fff;z-index: 2;}`,
                    `:host.hidden{top: -9999px !important;left:-9999px !important;}`,
                    `:host .tagger:hover{color: red}`,
                    `:host .tagger:focus{color: red}`]
            }] }
];
/** @nocollapse */
taggerComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
taggerComponent.propDecorators = {
    change: [{ type: Output }]
};
class taggerDirective {
    /**
     * @param {?} el
     * @param {?} viewRef
     * @param {?} resolver
     * @param {?} taggerService
     * @param {?} renderer
     */
    constructor(el, viewRef, resolver, taggerService, renderer) {
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
        let componentFactory = this.resolver.resolveComponentFactory(taggerComponent);
        /** @type {?} */
        const componentRef = this.viewRef.createComponent(componentFactory);
        /** @type {?} */
        const domElem = /** @type {?} */ ((/** @type {?} */ (componentRef.hostView)).rootNodes[0]);
        this.el.nativeElement.appendChild(domElem);
        this.taggerBox = (/** @type {?} */ (componentRef.instance));
        this.taggerBox.change.subscribe(this.onTagSelect.bind(this));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    focus(event) {
        this.taggerBox.showTagger(true);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    enter(event) {
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerTag);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.showTagger(true);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    hoverOut(event) {
        if (!this.sticky && !event.target.showTagger) {
            /** @type {?} */
            const rect = this.el.nativeElement.getBoundingClientRect();
            if (event.x < rect.x ||
                event.clientX >= (rect.x + rect.width) ||
                event.y < rect.y ||
                event.clientY >= (rect.y + rect.height)) {
                this.taggerBox.showTagger(false);
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const x = this.position.split(':');
        /** @type {?} */
        const s = (this.taggerSize + 2) + 'px';
        /** @type {?} */
        const top = x[0] === 'top' ? '5px' : (x[0] === 'bottom' ? 'calc(100% - ' + s + ')' : 'calc((100% - ' + s + ')/2)');
        /** @type {?} */
        const left = x[1] === 'left' ? '5px' : (x[1] === 'right' ? 'calc(100% - ' + s + ')' : 'calc((100% - ' + s + ')/2)');
        this.taggerBox.position(top, left, this.taggerSize + 'px');
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerTag);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.showTagger(this.sticky);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTagSelect(event) {
        this.taggerBox.tagged = !this.taggerBox.tagged;
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerService.updateTag(this.tagger, this.taggerBox.tagged, this.taggerTag);
        this.taggerChanged.emit(this.tagger);
    }
}
taggerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tagger]'
            },] }
];
/** @nocollapse */
taggerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: TaggerService },
    { type: Renderer2 }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TaggerModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { taggerDirective, TaggerService, TaggerModule, taggerComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtdGFnZ2VyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Ac2VkZWgvdGFnZ2VyL3NyYy9hcHAvdGFnZ2VyL3RhZ2dlci5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2VkZWgvdGFnZ2VyL3NyYy9hcHAvdGFnZ2VyL3RhZ2dlci5kaXJlY3RpdmUudHMiLCJuZzovL0BzZWRlaC90YWdnZXIvc3JjL2FwcC90YWdnZXIvdGFnZ2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFdpemFyZFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnQHNlZGVoL3dpemFyZC1zdG9yYWdlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuXHRwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhZ2dlclNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmFnZTogV2l6YXJkU3RvcmFnZVNlcnZpY2Upe31cclxuXHJcbiAgICB1cGRhdGVUYWcoaWQ6IHN0cmluZywgdGFnZ2VkOiBib29sZWFuLCBpbmZvOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRUYWdnZWRJdGVtcyhpZCk7XHJcbiAgICAgICAgaWYgKGl0ZW0pIHsgXHJcbiAgICAgICAgICAgIGlmICh0YWdnZWQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIGl0ZW0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaSA9IHRoaXMuaW5kZXhPZlRhZ2dlZEl0ZW0oaWQsIGluZm8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3BsaWNlKGksIGkrMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCB0YWdnZWQgPyBbaW5mb10gOiBbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5kZXhPZlRhZ2dlZEl0ZW0oaWQ6IHN0cmluZyxpbmZvOiBhbnkpe1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFRhZ2dlZEl0ZW1zKGlkKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gLTE7XHJcbiAgICAgICAgaWYgKGl0ZW0pIHsgXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGl0ZW0uaW5kZXhPZihpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGhhc1RhZ2dlZEl0ZW0oaWQ6IHN0cmluZyxpbmZvOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mVGFnZ2VkSXRlbShpZCwgaW5mbykgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWdnZWRJdGVtcyhpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5zZXNzaW9uLmdldEl0ZW0oaWQpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgVmlld0NvbnRhaW5lclJlZixcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgT25Jbml0LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSG9zdExpc3RlbmVyLFxyXG4gICAgUmVuZGVyZXIyLFxyXG4gICAgQ29tcG9uZW50UmVmLFxyXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRhZ2dlclNlcnZpY2UgfSBmcm9tICcuL3RhZ2dlci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0YWdnZXJCb3gnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxzcGFuIFxyXG4gICAgICAgIGNsYXNzPVwidGFnZ2VyIHt7dGFnZ2VkQ2xhc3N9fVwiIFxyXG4gICAgICAgIHRhYmluZGV4PVwiMFwiIFxyXG4gICAgICAgIGFyaWEtaGlkZGVuPSd0cnVlJ1xyXG4gICAgICAgIChrZXl1cCk9XCJrZXl1cCgkZXZlbnQpXCJcclxuICAgICAgICAoY2xpY2spPVwiY2hhbmdlLmVtaXQoJGV2ZW50KVwiPjwvc3Bhbj5cclxuICAgIDxzcGFuIHN0eWxlPVwiZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi05OTk5cHg7dG9wOi05OTk5cHg7d2lkdGg6MXB4O2hlaWdodDoxcHhcIj5cclxuICAgIHt7dGFnZ2VkID8gJ3RhZyB0aGlzIGl0ZW0nIDogJ3JlbW92ZSB0YWcgb2YgdGhpcyBpdGVtJ319XHJcbiAgICA8L3NwYW4+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbXHJcbiAgICAgICAgYDpob3N0e3dpZHRoOiAxNHB4O2hlaWdodDogMTRweDtwb3NpdGlvbjogYWJzb2x1dGU7Y29sb3I6ICNmZmY7ei1pbmRleDogMjt9YCxcclxuICAgICAgICBgOmhvc3QuaGlkZGVue3RvcDogLTk5OTlweCAhaW1wb3J0YW50O2xlZnQ6LTk5OTlweCAhaW1wb3J0YW50O31gLFxyXG4gICAgICAgIGA6aG9zdCAudGFnZ2VyOmhvdmVye2NvbG9yOiByZWR9YCxcclxuICAgICAgICBgOmhvc3QgLnRhZ2dlcjpmb2N1c3tjb2xvcjogcmVkfWBcclxuICAgIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyB0YWdnZXJDb21wb25lbnQge1xyXG4gICAgc2hvdyA9IGZhbHNlXHJcbiAgICB0YWdnZWQgPSBmYWxzZTtcclxuICAgIHRhZ2dlZENsYXNzOiBzdHJpbmc7XHJcbiAgICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLHB1YmxpYyBlbDpFbGVtZW50UmVmKXt9XHJcbiAgICBrZXl1cChldmVudDphbnkpe2lmKGV2ZW50LndoaWNoID09IDEzKXtldmVudC50YXJnZXQuY2xpY2soKX19XHJcbiAgICBwb3NpdGlvbih0b3A6IHN0cmluZywgbGVmdDogc3RyaW5nLCBzaXplOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwndG9wJywgdG9wKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwnbGVmdCcsIGxlZnQpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdmb250LXNpemUnLCBzaXplKTsgXHJcbiAgICB9XHJcbiAgICBzaG93VGFnZ2VyKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hpZGRlbicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3RhZ2dlcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyB0YWdnZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSB0YWdnZXJCb3g6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSB0YWdnZWRDbGFzcyA9ICdmYSBmYS1taW51cy1zcXVhcmUnO1xyXG4gICAgQElucHV0KCkgdGFnZ2FibGVDbGFzcyA9ICdmYSBmYS10YWcnO1xyXG4gICAgQElucHV0KCkgdGFnZ2VyOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSB0YWdnZXJTaXplID0gMjQ7XHJcbiAgICBASW5wdXQoKSBwb3NpdGlvbiA9ICd0b3A6bGVmdCc7XHJcbiAgICBASW5wdXQoKSB0YWdnZXJUYWc6IGFueTtcclxuICAgIEBJbnB1dCgpIHN0aWNreSA9IGZhbHNlO1xyXG4gXHJcbiAgICBAT3V0cHV0KFwidGFnZ2VyQ2hhbmdlZFwiKVxyXG4gICAgdGFnZ2VyQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycsWyckZXZlbnQnXSlcclxuXHRmb2N1cyhldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcih0cnVlKTtcclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLFsnJGV2ZW50J10pXHJcblx0ZW50ZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA9IHRoaXMudGFnZ2VyU2VydmljZS5oYXNUYWdnZWRJdGVtKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlclRhZyk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkQ2xhc3MgPSB0aGlzLnRhZ2dlckJveC50YWdnZWQgPyB0aGlzLnRhZ2dlZENsYXNzIDogdGhpcy50YWdnYWJsZUNsYXNzO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZW91dCcsWyckZXZlbnQnXSlcclxuXHRob3Zlck91dChldmVudDogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0aWNreSAmJiAhZXZlbnQudGFyZ2V0LnNob3dUYWdnZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnggPCByZWN0LnggfHxcclxuICAgICAgICAgICAgICAgIGV2ZW50LmNsaWVudFggPj0gKHJlY3QueCArIHJlY3Qud2lkdGgpIHx8IFxyXG4gICAgICAgICAgICAgICAgZXZlbnQueSA8IHJlY3QueSB8fCBcclxuICAgICAgICAgICAgICAgIGV2ZW50LmNsaWVudFkgPj0gKHJlY3QueSArIHJlY3QuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBlbDpFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgdmlld1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSB0YWdnZXJTZXJ2aWNlOiBUYWdnZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ2Rpc3BsYXknLCd0YWJsZScpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdwb3NpdGlvbicsJ3JlbGF0aXZlJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnMCcpO1xyXG4gICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0YWdnZXJDb21wb25lbnQpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gPSB0aGlzLnZpZXdSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG4gICAgICAgIGNvbnN0IGRvbUVsZW0gPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZiA8IGFueSA+ICkucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChkb21FbGVtKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveCA9ICg8dGFnZ2VyQ29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LmNoYW5nZS5zdWJzY3JpYmUodGhpcy5vblRhZ1NlbGVjdC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIFxyXG5cdG5nT25Jbml0KCkge1xyXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLnBvc2l0aW9uLnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgY29uc3QgcyA9ICh0aGlzLnRhZ2dlclNpemUgKyAyKSArICdweCc7XHJcbiAgICAgICAgY29uc3QgdG9wID0geFswXSA9PT0gJ3RvcCcgPyAnNXB4JyA6ICh4WzBdID09PSAnYm90dG9tJyA/ICdjYWxjKDEwMCUgLSAnK3MrJyknIDogJ2NhbGMoKDEwMCUgLSAnK3MrJykvMiknKTtcclxuICAgICAgICBjb25zdCBsZWZ0ID0geFsxXSA9PT0gJ2xlZnQnID8gJzVweCcgOiAoeFsxXSA9PT0gJ3JpZ2h0JyA/ICdjYWxjKDEwMCUgLSAnK3MrJyknIDogJ2NhbGMoKDEwMCUgLSAnK3MrJykvMiknKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5wb3NpdGlvbih0b3AsIGxlZnQsIHRoaXMudGFnZ2VyU2l6ZSArICdweCcpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA9IHRoaXMudGFnZ2VyU2VydmljZS5oYXNUYWdnZWRJdGVtKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlclRhZyk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkQ2xhc3MgPSB0aGlzLnRhZ2dlckJveC50YWdnZWQgPyB0aGlzLnRhZ2dlZENsYXNzIDogdGhpcy50YWdnYWJsZUNsYXNzO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIodGhpcy5zdGlja3kpO1xyXG4gICAgfVxyXG4gICAgb25UYWdTZWxlY3QoZXZlbnQ6YW55KSB7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkID0gIXRoaXMudGFnZ2VyQm94LnRhZ2dlZDtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRDbGFzcyA9IHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA/IHRoaXMudGFnZ2VkQ2xhc3MgOiB0aGlzLnRhZ2dhYmxlQ2xhc3M7XHJcbiAgICAgICAgdGhpcy50YWdnZXJTZXJ2aWNlLnVwZGF0ZVRhZyh0aGlzLnRhZ2dlciwgdGhpcy50YWdnZXJCb3gudGFnZ2VkLCB0aGlzLnRhZ2dlclRhZylcclxuICAgICAgICB0aGlzLnRhZ2dlckNoYW5nZWQuZW1pdCh0aGlzLnRhZ2dlcik7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgV2l6YXJkU3RvcmFnZU1vZHVsZSB9IGZyb20gJ0BzZWRlaC93aXphcmQtc3RvcmFnZSc7XHJcblxyXG5pbXBvcnQgeyB0YWdnZXJDb21wb25lbnQsIHRhZ2dlckRpcmVjdGl2ZSB9IGZyb20gJy4vdGFnZ2VyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRhZ2dlclNlcnZpY2UgfSBmcm9tICcuL3RhZ2dlci5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgV2l6YXJkU3RvcmFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcblx0ICB0YWdnZXJDb21wb25lbnQsXHJcbiAgICB0YWdnZXJEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIHRhZ2dlckRpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICB0YWdnZXJDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgVGFnZ2VyU2VydmljZVxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGFnZ2VyTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBOzs7O0lBUUksWUFBb0IsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7S0FBRzs7Ozs7OztJQUVwRCxTQUFTLENBQUMsRUFBVSxFQUFFLE1BQWUsRUFBRSxJQUFTOztRQUM1QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FB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