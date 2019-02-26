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
                        template: "\n    <span \n        class=\"tagger\" \n        tabindex=\"0\" \n        (mouseleave)=\"$event.target.blur()\"\n        (keyup)=\"keyup($event)\"\n        (click)=\"change.emit($event)\">\n        <span class=\"{{taggedClass}}\" aria-hidden=\"true\"></span>\n    <span class=\"toot-tip\" [textContent]=\"tagged ? taggedIt : tagIt\"></span>\n    </span>\n    ",
                        styles: [":host{width:14px;height:14px;position:absolute;color:#fff;z-index:2;cursor:pointer}",
                            ":host.hidden{\n            top: -9999px !important;\n            left:-9999px !important;\n        }",
                            ":host .toot-tip{\n            display:table;\n            border-radius: 5px;\n            box-shadow:0px 0px 6px #fff;\n            white-space: nowrap;\n            font-size:0.8rem;\n            background-color:#000;\n            color:#fff;\n            padding: 2px 7px;\n            position:absolute;\n            z-index:2;\n            top: 30px;\n            left: -99999px;}",
                            ":host .tagger:hover .toot-tip{left: 0}",
                            ":host .tagger:focus .toot-tip{left: 0}",
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
    var TaggerDirective = (function () {
        function TaggerDirective(el, viewRef, resolver, taggerService, renderer) {
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
        TaggerDirective.prototype.focus = /**
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
        TaggerDirective.prototype.enter = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerBox.id);
                this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
                this.taggerBox.showTagger(true);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        TaggerDirective.prototype.hoverOut = /**
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
        TaggerDirective.prototype.ngOnInit = /**
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
                this.taggerBox.id = (typeof this.taggerTag === 'object') ? JSON.stringify(this.taggerTag) : this.taggerTag;
                this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerBox.id);
                this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
                this.taggerBox.tagIt = this.tagIt;
                this.taggerBox.taggedIt = this.taggedIt;
                this.taggerBox.showTagger(this.sticky);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        TaggerDirective.prototype.onTagSelect = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.taggerBox.tagged = !this.taggerBox.tagged;
                this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
                if (this.taggerBox.tagged) {
                    if (this.dateEnabled) {
                        /** @type {?} */
                        var info = { taggedItem: this.taggerBox.id, tagDate: new Date() };
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
            };
        TaggerDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[tagger]'
                    },] }
        ];
        /** @nocollapse */
        TaggerDirective.ctorParameters = function () {
            return [
                { type: i0.ElementRef },
                { type: i0.ViewContainerRef },
                { type: i0.ComponentFactoryResolver },
                { type: TaggerService },
                { type: i0.Renderer2 }
            ];
        };
        TaggerDirective.propDecorators = {
            taggedClass: [{ type: i0.Input }],
            taggableClass: [{ type: i0.Input }],
            tagger: [{ type: i0.Input }],
            taggerSize: [{ type: i0.Input }],
            position: [{ type: i0.Input }],
            taggerTag: [{ type: i0.Input }],
            dateEnabled: [{ type: i0.Input }],
            sticky: [{ type: i0.Input }],
            tagIt: [{ type: i0.Input }],
            taggedIt: [{ type: i0.Input }],
            taggerChanged: [{ type: i0.Output, args: ["taggerChanged",] }],
            focus: [{ type: i0.HostListener, args: ['focus', ['$event'],] }],
            enter: [{ type: i0.HostListener, args: ['mouseenter', ['$event'],] }],
            hoverOut: [{ type: i0.HostListener, args: ['mouseout', ['$event'],] }]
        };
        return TaggerDirective;
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

    exports.TaggerDirective = TaggerDirective;
    exports.TaggerService = TaggerService;
    exports.TaggerModule = TaggerModule;
    exports.ɵa = taggerComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtdGFnZ2VyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHNlZGVoL3RhZ2dlci9zcmMvYXBwL3RhZ2dlci90YWdnZXIuc2VydmljZS50cyIsIm5nOi8vQHNlZGVoL3RhZ2dlci9zcmMvYXBwL3RhZ2dlci90YWdnZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac2VkZWgvdGFnZ2VyL3NyYy9hcHAvdGFnZ2VyL3RhZ2dlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuKi9cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBXaXphcmRTdG9yYWdlU2VydmljZSB9IGZyb20gJ0BzZWRlaC93aXphcmQtc3RvcmFnZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhZ0luZm8ge1xyXG4gICAgdGFnRGF0ZTogRGF0ZSxcclxuICAgIHRhZ2dlZEl0ZW06IGFueVxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcblx0cHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdnZXJTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JhZ2U6IFdpemFyZFN0b3JhZ2VTZXJ2aWNlKXt9XHJcblxyXG4gICAgdGFnSXRlbShpZDogc3RyaW5nLCBpbmZvOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRUYWdnZWRJdGVtcyhpZCk7XHJcbiAgICAgICAgaWYgKGl0ZW0pIHsgXHJcbiAgICAgICAgICAgIGl0ZW0ucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgaXRlbSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgW2luZm9dKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZWxlYXNlVGFnZ2VkSXRlbShpZDogc3RyaW5nLCBpbmZvOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRUYWdnZWRJdGVtcyhpZCk7XHJcbiAgICAgICAgaWYgKGl0ZW0pIHsgXHJcbiAgICAgICAgICAgIGNvbnN0IGkgPSB0aGlzLmluZGV4T2ZUYWdnZWRJdGVtKGlkLCBpbmZvKTtcclxuICAgICAgICAgICAgaWYgKGkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zcGxpY2UoaSwgaSsxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXNzaW9uLnNldEl0ZW0oaWQsIGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNlc3Npb24uc2V0SXRlbShpZCwgW10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluZGV4T2ZUYWdnZWRJdGVtKGlkOiBzdHJpbmcsIGluZm86IGFueSl7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLmdldFRhZ2dlZEl0ZW1zKGlkKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gLTE7XHJcbiAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCkgeyBcclxuICAgICAgICAgICAgY29uc3QgeCA9IGl0ZW1zWzBdO1xyXG4gICAgICAgICAgICBpZiAoeC50YWdnZWRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5tYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgKGl0ZW06IFRhZ0luZm8sIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50YWdnZWRJdGVtID09IGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaXRlbXMuaW5kZXhPZihpbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgaGFzVGFnZ2VkSXRlbShpZDogc3RyaW5nLGluZm86IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4T2ZUYWdnZWRJdGVtKGlkLCBpbmZvKSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRhZ2dlZEl0ZW1zKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnNlc3Npb24uZ2V0SXRlbShpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGFnZ2VkSXRlbXMoaWQ6IHN0cmluZywgbGlzdDogYW55W10pIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2Vzc2lvbi5zZXRJdGVtKGlkLCBsaXN0KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIE9uSW5pdCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEhvc3RMaXN0ZW5lcixcclxuICAgIFJlbmRlcmVyMixcclxuICAgIENvbXBvbmVudFJlZixcclxuICAgIEVtYmVkZGVkVmlld1JlZixcclxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUYWdJbmZvLCBUYWdnZXJTZXJ2aWNlIH0gZnJvbSAnLi90YWdnZXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGFnZ2VyQm94JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8c3BhbiBcclxuICAgICAgICBjbGFzcz1cInRhZ2dlclwiIFxyXG4gICAgICAgIHRhYmluZGV4PVwiMFwiIFxyXG4gICAgICAgIChtb3VzZWxlYXZlKT1cIiRldmVudC50YXJnZXQuYmx1cigpXCJcclxuICAgICAgICAoa2V5dXApPVwia2V5dXAoJGV2ZW50KVwiXHJcbiAgICAgICAgKGNsaWNrKT1cImNoYW5nZS5lbWl0KCRldmVudClcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInt7dGFnZ2VkQ2xhc3N9fVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgIDxzcGFuIGNsYXNzPVwidG9vdC10aXBcIiBbdGV4dENvbnRlbnRdPVwidGFnZ2VkID8gdGFnZ2VkSXQgOiB0YWdJdFwiPjwvc3Bhbj5cclxuICAgIDwvc3Bhbj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtcclxuICAgICAgICBgOmhvc3R7d2lkdGg6MTRweDtoZWlnaHQ6MTRweDtwb3NpdGlvbjphYnNvbHV0ZTtjb2xvcjojZmZmO3otaW5kZXg6MjtjdXJzb3I6cG9pbnRlcn1gLFxyXG4gICAgICAgIGA6aG9zdC5oaWRkZW57XHJcbiAgICAgICAgICAgIHRvcDogLTk5OTlweCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICBsZWZ0Oi05OTk5cHggIWltcG9ydGFudDtcclxuICAgICAgICB9YCxcclxuICAgICAgICBgOmhvc3QgLnRvb3QtdGlwe1xyXG4gICAgICAgICAgICBkaXNwbGF5OnRhYmxlO1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAgICAgICAgIGJveC1zaGFkb3c6MHB4IDBweCA2cHggI2ZmZjtcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgZm9udC1zaXplOjAuOHJlbTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojMDAwO1xyXG4gICAgICAgICAgICBjb2xvcjojZmZmO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAycHggN3B4O1xyXG4gICAgICAgICAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgICAgICAgICAgei1pbmRleDoyO1xyXG4gICAgICAgICAgICB0b3A6IDMwcHg7XHJcbiAgICAgICAgICAgIGxlZnQ6IC05OTk5OXB4O31gLFxyXG4gICAgICAgIGA6aG9zdCAudGFnZ2VyOmhvdmVyIC50b290LXRpcHtsZWZ0OiAwfWAsXHJcbiAgICAgICAgYDpob3N0IC50YWdnZXI6Zm9jdXMgLnRvb3QtdGlwe2xlZnQ6IDB9YCxcclxuICAgICAgICBgOmhvc3QgLnRhZ2dlcjpob3Zlcntjb2xvcjogcmVkfWAsXHJcbiAgICAgICAgYDpob3N0IC50YWdnZXI6Zm9jdXN7Y29sb3I6IHJlZH1gXHJcbiAgICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgdGFnZ2VyQ29tcG9uZW50IHtcclxuICAgIHNob3cgPSBmYWxzZVxyXG4gICAgdGFnZ2VkID0gZmFsc2U7XHJcbiAgICB0YWdnZWRDbGFzczogc3RyaW5nO1xyXG4gICAgdGFnSXQ6IHN0cmluZztcclxuICAgIHRhZ2dlZEl0OiBzdHJpbmc7XHJcbiAgICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLHB1YmxpYyBlbDpFbGVtZW50UmVmKXt9XHJcbiAgICBrZXl1cChldmVudDphbnkpe2lmKGV2ZW50LndoaWNoID09IDEzKXtldmVudC50YXJnZXQuY2xpY2soKX19XHJcbiAgICBwb3NpdGlvbih0b3A6IHN0cmluZywgbGVmdDogc3RyaW5nLCBzaXplOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwndG9wJywgdG9wKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwnbGVmdCcsIGxlZnQpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdmb250LXNpemUnLCBzaXplKTsgXHJcbiAgICB9XHJcbiAgICBzaG93VGFnZ2VyKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hpZGRlbicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3RhZ2dlcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdnZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSB0YWdnZXJCb3g6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSB0YWdnZWRDbGFzcyA9ICdmYSBmYS1taW51cy1zcXVhcmUnO1xyXG4gICAgQElucHV0KCkgdGFnZ2FibGVDbGFzcyA9ICdmYSBmYS10YWcnO1xyXG4gICAgQElucHV0KCkgdGFnZ2VyOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSB0YWdnZXJTaXplID0gMjQ7XHJcbiAgICBASW5wdXQoKSBwb3NpdGlvbiA9ICd0b3A6bGVmdCc7XHJcbiAgICBASW5wdXQoKSB0YWdnZXJUYWc6IGFueTtcclxuICAgIEBJbnB1dCgpIGRhdGVFbmFibGVkID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBzdGlja3kgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHRhZ0l0ID0gJ3RhZyBpdCc7XHJcbiAgICBASW5wdXQoKSB0YWdnZWRJdCA9ICd0YWdnZWQgaXQnO1xyXG4gXHJcbiAgICBAT3V0cHV0KFwidGFnZ2VyQ2hhbmdlZFwiKVxyXG4gICAgdGFnZ2VyQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycsWyckZXZlbnQnXSlcclxuXHRmb2N1cyhldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcih0cnVlKTtcclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLFsnJGV2ZW50J10pXHJcblx0ZW50ZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA9IHRoaXMudGFnZ2VyU2VydmljZS5oYXNUYWdnZWRJdGVtKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlckJveC5pZCk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkQ2xhc3MgPSB0aGlzLnRhZ2dlckJveC50YWdnZWQgPyB0aGlzLnRhZ2dlZENsYXNzIDogdGhpcy50YWdnYWJsZUNsYXNzO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZW91dCcsWyckZXZlbnQnXSlcclxuXHRob3Zlck91dChldmVudDogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0aWNreSAmJiAhZXZlbnQudGFyZ2V0LnNob3dUYWdnZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnggPCByZWN0LnggfHxcclxuICAgICAgICAgICAgICAgIGV2ZW50LmNsaWVudFggPj0gKHJlY3QueCArIHJlY3Qud2lkdGgpIHx8IFxyXG4gICAgICAgICAgICAgICAgZXZlbnQueSA8IHJlY3QueSB8fCBcclxuICAgICAgICAgICAgICAgIGV2ZW50LmNsaWVudFkgPj0gKHJlY3QueSArIHJlY3QuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBlbDpFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgdmlld1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSB0YWdnZXJTZXJ2aWNlOiBUYWdnZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ2Rpc3BsYXknLCd0YWJsZScpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdwb3NpdGlvbicsJ3JlbGF0aXZlJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnMCcpO1xyXG4gICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0YWdnZXJDb21wb25lbnQpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gPSB0aGlzLnZpZXdSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG4gICAgICAgIGNvbnN0IGRvbUVsZW0gPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZiA8IGFueSA+ICkucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChkb21FbGVtKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveCA9ICg8dGFnZ2VyQ29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LmNoYW5nZS5zdWJzY3JpYmUodGhpcy5vblRhZ1NlbGVjdC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIFxyXG5cdG5nT25Jbml0KCkge1xyXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLnBvc2l0aW9uLnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgY29uc3QgcyA9ICh0aGlzLnRhZ2dlclNpemUgKyAyKSArICdweCc7XHJcbiAgICAgICAgY29uc3QgdG9wID0geFswXSA9PT0gJ3RvcCcgPyAnNXB4JyA6ICh4WzBdID09PSAnYm90dG9tJyA/ICdjYWxjKDEwMCUgLSAnK3MrJyknIDogJ2NhbGMoKDEwMCUgLSAnK3MrJykvMiknKTtcclxuICAgICAgICBjb25zdCBsZWZ0ID0geFsxXSA9PT0gJ2xlZnQnID8gJzVweCcgOiAoeFsxXSA9PT0gJ3JpZ2h0JyA/ICdjYWxjKDEwMCUgLSAnK3MrJyknIDogJ2NhbGMoKDEwMCUgLSAnK3MrJykvMiknKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5wb3NpdGlvbih0b3AsIGxlZnQsIHRoaXMudGFnZ2VyU2l6ZSArICdweCcpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LmlkID0gKHR5cGVvZiB0aGlzLnRhZ2dlclRhZyA9PT0gJ29iamVjdCcpID8gSlNPTi5zdHJpbmdpZnkodGhpcy50YWdnZXJUYWcpIDogdGhpcy50YWdnZXJUYWc7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkID0gdGhpcy50YWdnZXJTZXJ2aWNlLmhhc1RhZ2dlZEl0ZW0odGhpcy50YWdnZXIsIHRoaXMudGFnZ2VyQm94LmlkKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRDbGFzcyA9IHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA/IHRoaXMudGFnZ2VkQ2xhc3MgOiB0aGlzLnRhZ2dhYmxlQ2xhc3M7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnSXQgPSB0aGlzLnRhZ0l0O1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZEl0ID0gdGhpcy50YWdnZWRJdDtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKHRoaXMuc3RpY2t5KTtcclxuICAgIH1cclxuICAgIG9uVGFnU2VsZWN0KGV2ZW50OmFueSkge1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA9ICF0aGlzLnRhZ2dlckJveC50YWdnZWQ7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkQ2xhc3MgPSB0aGlzLnRhZ2dlckJveC50YWdnZWQgPyB0aGlzLnRhZ2dlZENsYXNzIDogdGhpcy50YWdnYWJsZUNsYXNzO1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ2dlckJveC50YWdnZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZm86IFRhZ0luZm8gPSB7dGFnZ2VkSXRlbTogdGhpcy50YWdnZXJCb3guaWQsIHRhZ0RhdGU6IG5ldyBEYXRlKCl9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdnZXJTZXJ2aWNlLnRhZ0l0ZW0odGhpcy50YWdnZXIsIGluZm8pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdnZXJTZXJ2aWNlLnRhZ0l0ZW0odGhpcy50YWdnZXIsIHRoaXMudGFnZ2VyQm94LmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnZ2VyU2VydmljZS5yZWxlYXNlVGFnZ2VkSXRlbSh0aGlzLnRhZ2dlciwgdGhpcy50YWdnZXJCb3guaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5kYXRlRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ2dlckNoYW5nZWQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICB0YWdnZXI6IHRoaXMudGFnZ2VyLFxyXG4gICAgICAgICAgICAgICAgdGFnZ2VkSXRlbTp0aGlzLnRhZ2dlckJveC5pZCxcclxuICAgICAgICAgICAgICAgIHRhZ0RhdGU6IG5ldyBEYXRlKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YWdnZXJDaGFuZ2VkLmVtaXQodGhpcy50YWdnZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBXaXphcmRTdG9yYWdlTW9kdWxlIH0gZnJvbSAnQHNlZGVoL3dpemFyZC1zdG9yYWdlJztcclxuXHJcbmltcG9ydCB7IHRhZ2dlckNvbXBvbmVudCwgVGFnZ2VyRGlyZWN0aXZlIH0gZnJvbSAnLi90YWdnZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVGFnZ2VyU2VydmljZSB9IGZyb20gJy4vdGFnZ2VyLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBXaXphcmRTdG9yYWdlTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuXHQgIHRhZ2dlckNvbXBvbmVudCxcclxuICAgIFRhZ2dlckRpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgVGFnZ2VyRGlyZWN0aXZlXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIHRhZ2dlckNvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBUYWdnZXJTZXJ2aWNlXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWdnZXJNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJXaXphcmRTdG9yYWdlU2VydmljZSIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIlJlbmRlcmVyMiIsIkVsZW1lbnRSZWYiLCJPdXRwdXQiLCJEaXJlY3RpdmUiLCJWaWV3Q29udGFpbmVyUmVmIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiSW5wdXQiLCJIb3N0TGlzdGVuZXIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIldpemFyZFN0b3JhZ2VNb2R1bGUiLCJDVVNUT01fRUxFTUVOVFNfU0NIRU1BIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUE7UUFhSSx1QkFBb0IsT0FBNkI7WUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7U0FBRzs7Ozs7O1FBRXBELCtCQUFPOzs7OztZQUFQLFVBQVEsRUFBVSxFQUFFLElBQVM7O2dCQUN6QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUMxQztxQkFBTTtvQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDNUM7YUFDSjs7Ozs7O1FBQ0QseUNBQWlCOzs7OztZQUFqQixVQUFrQixFQUFVLEVBQUUsSUFBUzs7Z0JBQ25DLElBQU0sSUFBSSxHQUFH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