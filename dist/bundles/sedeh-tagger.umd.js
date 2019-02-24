(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sedeh/wizard-storage'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/tagger', ['exports', '@angular/core', '@sedeh/wizard-storage', '@angular/common'], factory) :
    (factory((global.sedeh = global.sedeh || {}, global.sedeh.tagger = {}),global.ng.core,global['wizard-storage'],global.ng.common));
}(this, (function (exports,i0,i1,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TaggerService = (function () {
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        TaggerService.ctorParameters = function () {
            return [
                { type: i1.WizardStorageService }
            ];
        };
        /** @nocollapse */ TaggerService.ngInjectableDef = i0.defineInjectable({ factory: function TaggerService_Factory() { return new TaggerService(i0.inject(i1.WizardStorageService)); }, token: TaggerService, providedIn: "root" });
        return TaggerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var taggerComponent = (function () {
        function taggerComponent(renderer, el) {
            this.renderer = renderer;
            this.el = el;
            this.show = false;
            this.tagged = false;
            this.change = new i0.EventEmitter();
        }
        /**
         * @param {?} event
         * @return {?}
         */
        taggerComponent.prototype.keyup = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (event.which == 13) {
                    event.target.click();
                }
            };
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
            { type: i0.Component, args: [{
                        selector: 'taggerBox',
                        template: "\n    <span \n        class=\"tagger {{taggedClass}}\" \n        tabindex=\"0\" \n        aria-hidden='true'\n        (keyup)=\"keyup($event)\"\n        (click)=\"change.emit($event)\"></span>\n    <span style=\"display:block;position:absolute;left:-9999px;top:-9999px;width:1px;height:1px\">\n    {{tagged ? 'tag this item' : 'remove tag of this item'}}\n    </span>\n    ",
                        styles: [":host{width: 14px;height: 14px;position: absolute;color: #fff;z-index: 2;}",
                            ":host.hidden{top: -9999px !important;left:-9999px !important;}",
                            ":host .tagger:hover{color: red}",
                            ":host .tagger:focus{color: red}"]
                    }] }
        ];
        /** @nocollapse */
        taggerComponent.ctorParameters = function () {
            return [
                { type: i0.Renderer2 },
                { type: i0.ElementRef }
            ];
        };
        taggerComponent.propDecorators = {
            change: [{ type: i0.Output }]
        };
        return taggerComponent;
    }());
    var taggerDirective = (function () {
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
            this.taggerChanged = new i0.EventEmitter();
            this.renderer.setStyle(this.el.nativeElement, 'display', 'table');
            this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
            this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
            /** @type {?} */
            var componentFactory = this.resolver.resolveComponentFactory(taggerComponent);
            /** @type {?} */
            var componentRef = this.viewRef.createComponent(componentFactory);
            /** @type {?} */
            var domElem = (((componentRef.hostView)).rootNodes[0]);
            this.el.nativeElement.appendChild(domElem);
            this.taggerBox = ((componentRef.instance));
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
            { type: i0.Directive, args: [{
                        selector: '[tagger]'
                    },] }
        ];
        /** @nocollapse */
        taggerDirective.ctorParameters = function () {
            return [
                { type: i0.ElementRef },
                { type: i0.ViewContainerRef },
                { type: i0.ComponentFactoryResolver },
                { type: TaggerService },
                { type: i0.Renderer2 }
            ];
        };
        taggerDirective.propDecorators = {
            taggedClass: [{ type: i0.Input }],
            taggableClass: [{ type: i0.Input }],
            tagger: [{ type: i0.Input }],
            taggerSize: [{ type: i0.Input }],
            position: [{ type: i0.Input }],
            taggerTag: [{ type: i0.Input }],
            sticky: [{ type: i0.Input }],
            taggerChanged: [{ type: i0.Output, args: ["taggerChanged",] }],
            focus: [{ type: i0.HostListener, args: ['focus', ['$event'],] }],
            enter: [{ type: i0.HostListener, args: ['mouseenter', ['$event'],] }],
            hoverOut: [{ type: i0.HostListener, args: ['mouseout', ['$event'],] }]
        };
        return taggerDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TaggerModule = (function () {
        function TaggerModule() {
        }
        TaggerModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i1.WizardStorageModule
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
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
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

    exports.taggerDirective = taggerDirective;
    exports.TaggerService = TaggerService;
    exports.TaggerModule = TaggerModule;
    exports.ɵa = taggerComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtdGFnZ2VyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHNlZGVoL3RhZ2dlci9zcmMvYXBwL3RhZ2dlci90YWdnZXIuc2VydmljZS50cyIsIm5nOi8vQHNlZGVoL3RhZ2dlci9zcmMvYXBwL3RhZ2dlci90YWdnZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac2VkZWgvdGFnZ2VyL3NyYy9hcHAvdGFnZ2VyL3RhZ2dlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuKi9cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBXaXphcmRTdG9yYWdlU2VydmljZSB9IGZyb20gJ0BzZWRlaC93aXphcmQtc3RvcmFnZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcblx0cHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdnZXJTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JhZ2U6IFdpemFyZFN0b3JhZ2VTZXJ2aWNlKXt9XHJcblxyXG4gICAgdXBkYXRlVGFnKGlkOiBzdHJpbmcsIHRhZ2dlZDogYm9vbGVhbiwgaW5mbzogYW55KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VGFnZ2VkSXRlbXMoaWQpO1xyXG4gICAgICAgIGlmIChpdGVtKSB7IFxyXG4gICAgICAgICAgICBpZiAodGFnZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnB1c2goaW5mbyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBpdGVtKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGkgPSB0aGlzLmluZGV4T2ZUYWdnZWRJdGVtKGlkLCBpbmZvKTtcclxuICAgICAgICAgICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNwbGljZShpLCBpKzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgdGFnZ2VkID8gW2luZm9dIDogW10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluZGV4T2ZUYWdnZWRJdGVtKGlkOiBzdHJpbmcsaW5mbzogYW55KXtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRUYWdnZWRJdGVtcyhpZCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGlmIChpdGVtKSB7IFxyXG4gICAgICAgICAgICByZXN1bHQgPSBpdGVtLmluZGV4T2YoaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBoYXNUYWdnZWRJdGVtKGlkOiBzdHJpbmcsaW5mbzogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXhPZlRhZ2dlZEl0ZW0oaWQsIGluZm8pID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFnZ2VkSXRlbXMoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5nZXRJdGVtKGlkKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIE9uSW5pdCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEhvc3RMaXN0ZW5lcixcclxuICAgIFJlbmRlcmVyMixcclxuICAgIENvbXBvbmVudFJlZixcclxuICAgIEVtYmVkZGVkVmlld1JlZixcclxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUYWdnZXJTZXJ2aWNlIH0gZnJvbSAnLi90YWdnZXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGFnZ2VyQm94JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8c3BhbiBcclxuICAgICAgICBjbGFzcz1cInRhZ2dlciB7e3RhZ2dlZENsYXNzfX1cIiBcclxuICAgICAgICB0YWJpbmRleD1cIjBcIiBcclxuICAgICAgICBhcmlhLWhpZGRlbj0ndHJ1ZSdcclxuICAgICAgICAoa2V5dXApPVwia2V5dXAoJGV2ZW50KVwiXHJcbiAgICAgICAgKGNsaWNrKT1cImNoYW5nZS5lbWl0KCRldmVudClcIj48L3NwYW4+XHJcbiAgICA8c3BhbiBzdHlsZT1cImRpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotOTk5OXB4O3RvcDotOTk5OXB4O3dpZHRoOjFweDtoZWlnaHQ6MXB4XCI+XHJcbiAgICB7e3RhZ2dlZCA/ICd0YWcgdGhpcyBpdGVtJyA6ICdyZW1vdmUgdGFnIG9mIHRoaXMgaXRlbSd9fVxyXG4gICAgPC9zcGFuPlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW1xyXG4gICAgICAgIGA6aG9zdHt3aWR0aDogMTRweDtoZWlnaHQ6IDE0cHg7cG9zaXRpb246IGFic29sdXRlO2NvbG9yOiAjZmZmO3otaW5kZXg6IDI7fWAsXHJcbiAgICAgICAgYDpob3N0LmhpZGRlbnt0b3A6IC05OTk5cHggIWltcG9ydGFudDtsZWZ0Oi05OTk5cHggIWltcG9ydGFudDt9YCxcclxuICAgICAgICBgOmhvc3QgLnRhZ2dlcjpob3Zlcntjb2xvcjogcmVkfWAsXHJcbiAgICAgICAgYDpob3N0IC50YWdnZXI6Zm9jdXN7Y29sb3I6IHJlZH1gXHJcbiAgICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgdGFnZ2VyQ29tcG9uZW50IHtcclxuICAgIHNob3cgPSBmYWxzZVxyXG4gICAgdGFnZ2VkID0gZmFsc2U7XHJcbiAgICB0YWdnZWRDbGFzczogc3RyaW5nO1xyXG4gICAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixwdWJsaWMgZWw6RWxlbWVudFJlZil7fVxyXG4gICAga2V5dXAoZXZlbnQ6YW55KXtpZihldmVudC53aGljaCA9PSAxMyl7ZXZlbnQudGFyZ2V0LmNsaWNrKCl9fVxyXG4gICAgcG9zaXRpb24odG9wOiBzdHJpbmcsIGxlZnQ6IHN0cmluZywgc2l6ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ3RvcCcsIHRvcCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ2xlZnQnLCBsZWZ0KTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwnZm9udC1zaXplJywgc2l6ZSk7IFxyXG4gICAgfVxyXG4gICAgc2hvd1RhZ2dlcihmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoaWRkZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1t0YWdnZXJdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgdGFnZ2VyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgdGFnZ2VyQm94OiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgdGFnZ2VkQ2xhc3MgPSAnZmEgZmEtbWludXMtc3F1YXJlJztcclxuICAgIEBJbnB1dCgpIHRhZ2dhYmxlQ2xhc3MgPSAnZmEgZmEtdGFnJztcclxuICAgIEBJbnB1dCgpIHRhZ2dlcjogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgdGFnZ2VyU2l6ZSA9IDI0O1xyXG4gICAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wOmxlZnQnO1xyXG4gICAgQElucHV0KCkgdGFnZ2VyVGFnOiBhbnk7XHJcbiAgICBASW5wdXQoKSBzdGlja3kgPSBmYWxzZTtcclxuIFxyXG4gICAgQE91dHB1dChcInRhZ2dlckNoYW5nZWRcIilcclxuICAgIHRhZ2dlckNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLFsnJGV2ZW50J10pXHJcblx0Zm9jdXMoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJyxbJyRldmVudCddKVxyXG5cdGVudGVyKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWQgPSB0aGlzLnRhZ2dlclNlcnZpY2UuaGFzVGFnZ2VkSXRlbSh0aGlzLnRhZ2dlciwgdGhpcy50YWdnZXJUYWcpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZENsYXNzID0gdGhpcy50YWdnZXJCb3gudGFnZ2VkID8gdGhpcy50YWdnZWRDbGFzcyA6IHRoaXMudGFnZ2FibGVDbGFzcztcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKHRydWUpO1xyXG4gICAgfVxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VvdXQnLFsnJGV2ZW50J10pXHJcblx0aG92ZXJPdXQoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGlja3kgJiYgIWV2ZW50LnRhcmdldC5zaG93VGFnZ2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGlmIChldmVudC54IDwgcmVjdC54IHx8XHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGllbnRYID49IChyZWN0LnggKyByZWN0LndpZHRoKSB8fCBcclxuICAgICAgICAgICAgICAgIGV2ZW50LnkgPCByZWN0LnkgfHwgXHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGllbnRZID49IChyZWN0LnkgKyByZWN0LmhlaWdodClcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWw6RWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgICAgIHByaXZhdGUgdGFnZ2VyU2VydmljZTogVGFnZ2VyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdkaXNwbGF5JywndGFibGUnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwncG9zaXRpb24nLCdyZWxhdGl2ZScpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4JywgJzAnKTtcclxuICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGFnZ2VyQ29tcG9uZW50KTtcclxuICAgICAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy52aWV3UmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuICAgICAgICBjb25zdCBkb21FbGVtID0gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWYgPCBhbnkgPiApLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3ggPSAoPHRhZ2dlckNvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5jaGFuZ2Uuc3Vic2NyaWJlKHRoaXMub25UYWdTZWxlY3QuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHRuZ09uSW5pdCgpIHtcclxuICAgICAgICBjb25zdCB4ID0gdGhpcy5wb3NpdGlvbi5zcGxpdCgnOicpO1xyXG4gICAgICAgIGNvbnN0IHMgPSAodGhpcy50YWdnZXJTaXplICsgMikgKyAncHgnO1xyXG4gICAgICAgIGNvbnN0IHRvcCA9IHhbMF0gPT09ICd0b3AnID8gJzVweCcgOiAoeFswXSA9PT0gJ2JvdHRvbScgPyAnY2FsYygxMDAlIC0gJytzKycpJyA6ICdjYWxjKCgxMDAlIC0gJytzKycpLzIpJyk7XHJcbiAgICAgICAgY29uc3QgbGVmdCA9IHhbMV0gPT09ICdsZWZ0JyA/ICc1cHgnIDogKHhbMV0gPT09ICdyaWdodCcgPyAnY2FsYygxMDAlIC0gJytzKycpJyA6ICdjYWxjKCgxMDAlIC0gJytzKycpLzIpJyk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gucG9zaXRpb24odG9wLCBsZWZ0LCB0aGlzLnRhZ2dlclNpemUgKyAncHgnKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWQgPSB0aGlzLnRhZ2dlclNlcnZpY2UuaGFzVGFnZ2VkSXRlbSh0aGlzLnRhZ2dlciwgdGhpcy50YWdnZXJUYWcpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZENsYXNzID0gdGhpcy50YWdnZXJCb3gudGFnZ2VkID8gdGhpcy50YWdnZWRDbGFzcyA6IHRoaXMudGFnZ2FibGVDbGFzcztcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKHRoaXMuc3RpY2t5KTtcclxuICAgIH1cclxuICAgIG9uVGFnU2VsZWN0KGV2ZW50OmFueSkge1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA9ICF0aGlzLnRhZ2dlckJveC50YWdnZWQ7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkQ2xhc3MgPSB0aGlzLnRhZ2dlckJveC50YWdnZWQgPyB0aGlzLnRhZ2dlZENsYXNzIDogdGhpcy50YWdnYWJsZUNsYXNzO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyU2VydmljZS51cGRhdGVUYWcodGhpcy50YWdnZXIsIHRoaXMudGFnZ2VyQm94LnRhZ2dlZCwgdGhpcy50YWdnZXJUYWcpXHJcbiAgICAgICAgdGhpcy50YWdnZXJDaGFuZ2VkLmVtaXQodGhpcy50YWdnZXIpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFdpemFyZFN0b3JhZ2VNb2R1bGUgfSBmcm9tICdAc2VkZWgvd2l6YXJkLXN0b3JhZ2UnO1xyXG5cclxuaW1wb3J0IHsgdGFnZ2VyQ29tcG9uZW50LCB0YWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL3RhZ2dlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUYWdnZXJTZXJ2aWNlIH0gZnJvbSAnLi90YWdnZXIuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFdpemFyZFN0b3JhZ2VNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG5cdCAgdGFnZ2VyQ29tcG9uZW50LFxyXG4gICAgdGFnZ2VyRGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICB0YWdnZXJEaXJlY3RpdmVcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgdGFnZ2VyQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFRhZ2dlclNlcnZpY2VcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhZ2dlck1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIldpemFyZFN0b3JhZ2VTZXJ2aWNlIiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiUmVuZGVyZXIyIiwiRWxlbWVudFJlZiIsIk91dHB1dCIsIkRpcmVjdGl2ZSIsIlZpZXdDb250YWluZXJSZWYiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJJbnB1dCIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiV2l6YXJkU3RvcmFnZU1vZHVsZSIsIkNVU1RPTV9FTEVNRU5UU19TQ0hFTUEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQTtRQVFJLHVCQUFvQixPQUE2QjtZQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtTQUFHOzs7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