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
        class="tagger" 
        tabindex="0" 
        (mouseleave)="$event.target.blur()"
        (keyup)="keyup($event)"
        (click)="change.emit($event)">
        <span class="{{taggedClass}}" aria-hidden="true"></span>
    <span class="toot-tip" [textContent]="tagged ? taggedIt : tagIt"></span>
    </span>
    `,
                styles: [`:host{width:14px;height:14px;position:absolute;color:#fff;z-index:2;cursor:pointer}`,
                    `:host.hidden{
            top: -9999px !important;
            left:-9999px !important;
        }`,
                    `:host .toot-tip{
            display:table;
            border-radius: 5px;
            box-shadow:0px 0px 6px #fff;
            white-space: nowrap;
            font-size:0.8rem;
            background-color:#000;
            color:#fff;
            padding: 2px 7px;
            position:absolute;
            z-index:2;
            top: 30px;
            left: -99999px;}`,
                    `:host .tagger:hover .toot-tip{left: 0}`,
                    `:host .tagger:focus .toot-tip{left: 0}`,
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
class TaggerDirective {
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
        this.dateEnabled = false;
        this.sticky = false;
        this.tagIt = 'tag it';
        this.taggedIt = 'tagged it';
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
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerBox.id);
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
        this.taggerBox.id = (typeof this.taggerTag === 'object') ? JSON.stringify(this.taggerTag) : this.taggerTag;
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerBox.id);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.tagIt = this.tagIt;
        this.taggerBox.taggedIt = this.taggedIt;
        this.taggerBox.showTagger(this.sticky);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTagSelect(event) {
        this.taggerBox.tagged = !this.taggerBox.tagged;
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        if (this.taggerBox.tagged) {
            if (this.dateEnabled) {
                /** @type {?} */
                const info = { taggedItem: this.taggerBox.id, tagDate: new Date() };
                this.taggerService.tagItem(this.tagger, info);
            }
            else {
                this.taggerService.tagItem(this.tagger, this.taggerBox.id);
            }
        }
        else {
            this.taggerService.releaseTaggedItem(this.tagger, this.taggerBox.id);
        }
        if (this.dateEnabled) {
            this.taggerChanged.emit({
                tagger: this.tagger,
                taggedItem: this.taggerBox.id,
                tagDate: new Date()
            });
        }
        else {
            this.taggerChanged.emit(this.tagger);
        }
    }
}
TaggerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tagger]'
            },] }
];
/** @nocollapse */
TaggerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: TaggerService },
    { type: Renderer2 }
];
TaggerDirective.propDecorators = {
    taggedClass: [{ type: Input }],
    taggableClass: [{ type: Input }],
    tagger: [{ type: Input }],
    taggerSize: [{ type: Input }],
    position: [{ type: Input }],
    taggerTag: [{ type: Input }],
    dateEnabled: [{ type: Input }],
    sticky: [{ type: Input }],
    tagIt: [{ type: Input }],
    taggedIt: [{ type: Input }],
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
                    TaggerDirective
                ],
                exports: [
                    TaggerDirective
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

export { TaggerDirective, TaggerService, TaggerModule, taggerComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtdGFnZ2VyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Ac2VkZWgvdGFnZ2VyL3NyYy9hcHAvdGFnZ2VyL3RhZ2dlci5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2VkZWgvdGFnZ2VyL3NyYy9hcHAvdGFnZ2VyL3RhZ2dlci5kaXJlY3RpdmUudHMiLCJuZzovL0BzZWRlaC90YWdnZXIvc3JjL2FwcC90YWdnZXIvdGFnZ2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFdpemFyZFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnQHNlZGVoL3dpemFyZC1zdG9yYWdlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFnSW5mbyB7XHJcbiAgICB0YWdEYXRlOiBEYXRlLFxyXG4gICAgdGFnZ2VkSXRlbTogYW55XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuXHRwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhZ2dlclNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmFnZTogV2l6YXJkU3RvcmFnZVNlcnZpY2Upe31cclxuXHJcbiAgICB0YWdJdGVtKGlkOiBzdHJpbmcsIGluZm86IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFRhZ2dlZEl0ZW1zKGlkKTtcclxuICAgICAgICBpZiAoaXRlbSkgeyBcclxuICAgICAgICAgICAgaXRlbS5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBpdGVtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBbaW5mb10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbGVhc2VUYWdnZWRJdGVtKGlkOiBzdHJpbmcsIGluZm86IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFRhZ2dlZEl0ZW1zKGlkKTtcclxuICAgICAgICBpZiAoaXRlbSkgeyBcclxuICAgICAgICAgICAgY29uc3QgaSA9IHRoaXMuaW5kZXhPZlRhZ2dlZEl0ZW0oaWQsIGluZm8pO1xyXG4gICAgICAgICAgICBpZiAoaSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNwbGljZShpLCBpKzEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5kZXhPZlRhZ2dlZEl0ZW0oaWQ6IHN0cmluZywgaW5mbzogYW55KXtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuZ2V0VGFnZ2VkSXRlbXMoaWQpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAtMTtcclxuICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoKSB7IFxyXG4gICAgICAgICAgICBjb25zdCB4ID0gaXRlbXNbMF07XHJcbiAgICAgICAgICAgIGlmICh4LnRhZ2dlZEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLm1hcChcclxuICAgICAgICAgICAgICAgICAgICAoaXRlbTogVGFnSW5mbywgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnRhZ2dlZEl0ZW0gPT0gaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpdGVtcy5pbmRleE9mKGluZm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBoYXNUYWdnZWRJdGVtKGlkOiBzdHJpbmcsaW5mbzogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXhPZlRhZ2dlZEl0ZW0oaWQsIGluZm8pID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFnZ2VkSXRlbXMoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5nZXRJdGVtKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUYWdnZWRJdGVtcyhpZDogc3RyaW5nLCBsaXN0OiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIGxpc3QpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgVmlld0NvbnRhaW5lclJlZixcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgT25Jbml0LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSG9zdExpc3RlbmVyLFxyXG4gICAgUmVuZGVyZXIyLFxyXG4gICAgQ29tcG9uZW50UmVmLFxyXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRhZ0luZm8sIFRhZ2dlclNlcnZpY2UgfSBmcm9tICcuL3RhZ2dlci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0YWdnZXJCb3gnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxzcGFuIFxyXG4gICAgICAgIGNsYXNzPVwidGFnZ2VyXCIgXHJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCIgXHJcbiAgICAgICAgKG1vdXNlbGVhdmUpPVwiJGV2ZW50LnRhcmdldC5ibHVyKClcIlxyXG4gICAgICAgIChrZXl1cCk9XCJrZXl1cCgkZXZlbnQpXCJcclxuICAgICAgICAoY2xpY2spPVwiY2hhbmdlLmVtaXQoJGV2ZW50KVwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwie3t0YWdnZWRDbGFzc319XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJ0b290LXRpcFwiIFt0ZXh0Q29udGVudF09XCJ0YWdnZWQgPyB0YWdnZWRJdCA6IHRhZ0l0XCI+PC9zcGFuPlxyXG4gICAgPC9zcGFuPlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW1xyXG4gICAgICAgIGA6aG9zdHt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O3Bvc2l0aW9uOmFic29sdXRlO2NvbG9yOiNmZmY7ei1pbmRleDoyO2N1cnNvcjpwb2ludGVyfWAsXHJcbiAgICAgICAgYDpob3N0LmhpZGRlbntcclxuICAgICAgICAgICAgdG9wOiAtOTk5OXB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIGxlZnQ6LTk5OTlweCAhaW1wb3J0YW50O1xyXG4gICAgICAgIH1gLFxyXG4gICAgICAgIGA6aG9zdCAudG9vdC10aXB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6dGFibGU7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICAgICAgYm94LXNoYWRvdzowcHggMHB4IDZweCAjZmZmO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBmb250LXNpemU6MC44cmVtO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7XHJcbiAgICAgICAgICAgIGNvbG9yOiNmZmY7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDJweCA3cHg7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgICAgICAgICB6LWluZGV4OjI7XHJcbiAgICAgICAgICAgIHRvcDogMzBweDtcclxuICAgICAgICAgICAgbGVmdDogLTk5OTk5cHg7fWAsXHJcbiAgICAgICAgYDpob3N0IC50YWdnZXI6aG92ZXIgLnRvb3QtdGlwe2xlZnQ6IDB9YCxcclxuICAgICAgICBgOmhvc3QgLnRhZ2dlcjpmb2N1cyAudG9vdC10aXB7bGVmdDogMH1gLFxyXG4gICAgICAgIGA6aG9zdCAudGFnZ2VyOmhvdmVye2NvbG9yOiByZWR9YCxcclxuICAgICAgICBgOmhvc3QgLnRhZ2dlcjpmb2N1c3tjb2xvcjogcmVkfWBcclxuICAgIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyB0YWdnZXJDb21wb25lbnQge1xyXG4gICAgc2hvdyA9IGZhbHNlXHJcbiAgICB0YWdnZWQgPSBmYWxzZTtcclxuICAgIHRhZ2dlZENsYXNzOiBzdHJpbmc7XHJcbiAgICB0YWdJdDogc3RyaW5nO1xyXG4gICAgdGFnZ2VkSXQ6IHN0cmluZztcclxuICAgIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIscHVibGljIGVsOkVsZW1lbnRSZWYpe31cclxuICAgIGtleXVwKGV2ZW50OmFueSl7aWYoZXZlbnQud2hpY2ggPT0gMTMpe2V2ZW50LnRhcmdldC5jbGljaygpfX1cclxuICAgIHBvc2l0aW9uKHRvcDogc3RyaW5nLCBsZWZ0OiBzdHJpbmcsIHNpemU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCd0b3AnLCB0b3ApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdsZWZ0JywgbGVmdCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ2ZvbnQtc2l6ZScsIHNpemUpOyBcclxuICAgIH1cclxuICAgIHNob3dUYWdnZXIoZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGlkZGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdGFnZ2VyXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhZ2dlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIHRhZ2dlckJveDogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHRhZ2dlZENsYXNzID0gJ2ZhIGZhLW1pbnVzLXNxdWFyZSc7XHJcbiAgICBASW5wdXQoKSB0YWdnYWJsZUNsYXNzID0gJ2ZhIGZhLXRhZyc7XHJcbiAgICBASW5wdXQoKSB0YWdnZXI6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHRhZ2dlclNpemUgPSAyNDtcclxuICAgIEBJbnB1dCgpIHBvc2l0aW9uID0gJ3RvcDpsZWZ0JztcclxuICAgIEBJbnB1dCgpIHRhZ2dlclRhZzogYW55O1xyXG4gICAgQElucHV0KCkgZGF0ZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHN0aWNreSA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgdGFnSXQgPSAndGFnIGl0JztcclxuICAgIEBJbnB1dCgpIHRhZ2dlZEl0ID0gJ3RhZ2dlZCBpdCc7XHJcbiBcclxuICAgIEBPdXRwdXQoXCJ0YWdnZXJDaGFuZ2VkXCIpXHJcbiAgICB0YWdnZXJDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJyxbJyRldmVudCddKVxyXG5cdGZvY3VzKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKHRydWUpO1xyXG4gICAgfVxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsWyckZXZlbnQnXSlcclxuXHRlbnRlcihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkID0gdGhpcy50YWdnZXJTZXJ2aWNlLmhhc1RhZ2dlZEl0ZW0odGhpcy50YWdnZXIsIHRoaXMudGFnZ2VyQm94LmlkKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRDbGFzcyA9IHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA/IHRoaXMudGFnZ2VkQ2xhc3MgOiB0aGlzLnRhZ2dhYmxlQ2xhc3M7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcih0cnVlKTtcclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3V0JyxbJyRldmVudCddKVxyXG5cdGhvdmVyT3V0KGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RpY2t5ICYmICFldmVudC50YXJnZXQuc2hvd1RhZ2dlcikge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQueCA8IHJlY3QueCB8fFxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WCA+PSAocmVjdC54ICsgcmVjdC53aWR0aCkgfHwgXHJcbiAgICAgICAgICAgICAgICBldmVudC55IDwgcmVjdC55IHx8IFxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WSA+PSAocmVjdC55ICsgcmVjdC5oZWlnaHQpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGVsOkVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgICAgICBwcml2YXRlIHRhZ2dlclNlcnZpY2U6IFRhZ2dlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwnZGlzcGxheScsJ3RhYmxlJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ3Bvc2l0aW9uJywncmVsYXRpdmUnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRhZ2dlckNvbXBvbmVudCk7XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMudmlld1JlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XHJcbiAgICAgICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmIDwgYW55ID4gKS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94ID0gKDx0YWdnZXJDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guY2hhbmdlLnN1YnNjcmliZSh0aGlzLm9uVGFnU2VsZWN0LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgXHJcblx0bmdPbkluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHRoaXMucG9zaXRpb24uc3BsaXQoJzonKTtcclxuICAgICAgICBjb25zdCBzID0gKHRoaXMudGFnZ2VyU2l6ZSArIDIpICsgJ3B4JztcclxuICAgICAgICBjb25zdCB0b3AgPSB4WzBdID09PSAndG9wJyA/ICc1cHgnIDogKHhbMF0gPT09ICdib3R0b20nID8gJ2NhbGMoMTAwJSAtICcrcysnKScgOiAnY2FsYygoMTAwJSAtICcrcysnKS8yKScpO1xyXG4gICAgICAgIGNvbnN0IGxlZnQgPSB4WzFdID09PSAnbGVmdCcgPyAnNXB4JyA6ICh4WzFdID09PSAncmlnaHQnID8gJ2NhbGMoMTAwJSAtICcrcysnKScgOiAnY2FsYygoMTAwJSAtICcrcysnKS8yKScpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnBvc2l0aW9uKHRvcCwgbGVmdCwgdGhpcy50YWdnZXJTaXplICsgJ3B4Jyk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guaWQgPSAodHlwZW9mIHRoaXMudGFnZ2VyVGFnID09PSAnb2JqZWN0JykgPyBKU09OLnN0cmluZ2lmeSh0aGlzLnRhZ2dlclRhZykgOiB0aGlzLnRhZ2dlclRhZztcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWQgPSB0aGlzLnRhZ2dlclNlcnZpY2UuaGFzVGFnZ2VkSXRlbSh0aGlzLnRhZ2dlciwgdGhpcy50YWdnZXJCb3guaWQpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZENsYXNzID0gdGhpcy50YWdnZXJCb3gudGFnZ2VkID8gdGhpcy50YWdnZWRDbGFzcyA6IHRoaXMudGFnZ2FibGVDbGFzcztcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdJdCA9IHRoaXMudGFnSXQ7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkSXQgPSB0aGlzLnRhZ2dlZEl0O1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIodGhpcy5zdGlja3kpO1xyXG4gICAgfVxyXG4gICAgb25UYWdTZWxlY3QoZXZlbnQ6YW55KSB7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkID0gIXRoaXMudGFnZ2VyQm94LnRhZ2dlZDtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRDbGFzcyA9IHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA/IHRoaXMudGFnZ2VkQ2xhc3MgOiB0aGlzLnRhZ2dhYmxlQ2xhc3M7XHJcbiAgICAgICAgaWYgKHRoaXMudGFnZ2VyQm94LnRhZ2dlZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5mbzogVGFnSW5mbyA9IHt0YWdnZWRJdGVtOiB0aGlzLnRhZ2dlckJveC5pZCwgdGFnRGF0ZTogbmV3IERhdGUoKX07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ2dlclNlcnZpY2UudGFnSXRlbSh0aGlzLnRhZ2dlciwgaW5mbyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ2dlclNlcnZpY2UudGFnSXRlbSh0aGlzLnRhZ2dlciwgdGhpcy50YWdnZXJCb3guaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YWdnZXJTZXJ2aWNlLnJlbGVhc2VUYWdnZWRJdGVtKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlckJveC5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGVFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnZ2VyQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgICAgICAgICAgIHRhZ2dlcjogdGhpcy50YWdnZXIsXHJcbiAgICAgICAgICAgICAgICB0YWdnZWRJdGVtOnRoaXMudGFnZ2VyQm94LmlkLFxyXG4gICAgICAgICAgICAgICAgdGFnRGF0ZTogbmV3IERhdGUoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ2dlckNoYW5nZWQuZW1pdCh0aGlzLnRhZ2dlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFdpemFyZFN0b3JhZ2VNb2R1bGUgfSBmcm9tICdAc2VkZWgvd2l6YXJkLXN0b3JhZ2UnO1xyXG5cclxuaW1wb3J0IHsgdGFnZ2VyQ29tcG9uZW50LCBUYWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL3RhZ2dlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUYWdnZXJTZXJ2aWNlIH0gZnJvbSAnLi90YWdnZXIuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFdpemFyZFN0b3JhZ2VNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG5cdCAgdGFnZ2VyQ29tcG9uZW50LFxyXG4gICAgVGFnZ2VyRGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBUYWdnZXJEaXJlY3RpdmVcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgdGFnZ2VyQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFRhZ2dlclNlcnZpY2VcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhZ2dlck1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQTs7OztJQWFJLFlBQW9CLE9BQTZCO1FBQTdCLFlBQU8sR0FBUCxPQUFPLENBQXNCO0tBQUc7Ozs7OztJQUVwRCxPQUFPLENBQUMsRUFBVSxFQUFFLElBQVM7O1FBQ3pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDMUM7YUFBTTtZQUNILElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzVDO0tBQ0o7Ozs7OztJQUNELGlCQUFpQixDQUFDLEVBQVUsRUFBRSxJQUFTOztRQUNuQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxFQUFFOztZQUNOLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMs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