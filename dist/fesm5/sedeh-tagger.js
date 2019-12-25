import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable, EventEmitter, Renderer2, ElementRef, Output, Component, ViewContainerRef, ComponentFactoryResolver, Input, HostListener, Directive, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WizardStorageService, WizardStorageModule } from '@sedeh/wizard-storage';
import { CommonModule } from '@angular/common';

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
    TaggerService.ngInjectableDef = ɵɵdefineInjectable({ factory: function TaggerService_Factory() { return new TaggerService(ɵɵinject(WizardStorageService)); }, token: TaggerService, providedIn: "root" });
    TaggerService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], TaggerService);
    return TaggerService;
}());

var taggerComponent = /** @class */ (function () {
    function taggerComponent(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this.show = false;
        this.tagged = false;
        this.change = new EventEmitter();
    }
    taggerComponent.prototype.keyup = function (event) { if (event.which == 13) {
        event.target.click();
    } };
    taggerComponent.prototype.position = function (top, left, size) {
        this.renderer.setStyle(this.el.nativeElement, 'top', top);
        this.renderer.setStyle(this.el.nativeElement, 'left', left);
        this.renderer.setStyle(this.el.nativeElement, 'font-size', size);
    };
    taggerComponent.prototype.showTagger = function (flag) {
        if (flag) {
            this.renderer.removeClass(this.el.nativeElement, 'hidden');
        }
        else {
            this.renderer.addClass(this.el.nativeElement, 'hidden');
        }
    };
    taggerComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        Output()
    ], taggerComponent.prototype, "change", void 0);
    taggerComponent = __decorate([
        Component({
            selector: 'taggerBox',
            template: "\n    <span \n        class=\"tagger\" \n        tabindex=\"0\" \n        (mouseleave)=\"$event.target.blur()\"\n        (keyup)=\"keyup($event)\"\n        (click)=\"change.emit($event)\">\n        <span class=\"{{taggedClass}}\" aria-hidden=\"true\"></span>\n    <span class=\"toot-tip\" [textContent]=\"tagged ? taggedIt : tagIt\"></span>\n    </span>\n    ",
            styles: [":host{width:14px;height:14px;position:absolute;color:#fff;z-index:2;cursor:pointer}",
                ":host.hidden{\n            top: -9999px !important;\n            left:-9999px !important;\n        }",
                ":host .toot-tip{\n            display:table;\n            border-radius: 5px;\n            box-shadow:0px 0px 6px #fff;\n            white-space: nowrap;\n            font-size:0.8rem;\n            background-color:#000;\n            color:#fff;\n            padding: 2px 7px;\n            position:absolute;\n            z-index:2;\n            top: 30px;\n            left: -99999px;}",
                ":host .tagger:hover .toot-tip{left: 0}",
                ":host .tagger:focus .toot-tip{left: 0}",
                ":host .tagger:hover{color: red}",
                ":host .tagger:focus{color: red}"]
        })
    ], taggerComponent);
    return taggerComponent;
}());
var TaggerDirective = /** @class */ (function () {
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
        this.taggerChanged = new EventEmitter();
        this.renderer.setStyle(this.el.nativeElement, 'display', 'table');
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
        var componentFactory = this.resolver.resolveComponentFactory(taggerComponent);
        var componentRef = this.viewRef.createComponent(componentFactory);
        var domElem = componentRef.hostView.rootNodes[0];
        this.el.nativeElement.appendChild(domElem);
        this.taggerBox = componentRef.instance;
        this.taggerBox.change.subscribe(this.onTagSelect.bind(this));
    }
    TaggerDirective.prototype.focus = function (event) {
        this.taggerBox.showTagger(true);
    };
    TaggerDirective.prototype.enter = function (event) {
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerBox.id);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.showTagger(true);
    };
    TaggerDirective.prototype.hoverOut = function (event) {
        if (!this.sticky && !event.target.showTagger) {
            var rect = this.el.nativeElement.getBoundingClientRect();
            if (event.x < rect.x ||
                event.clientX >= (rect.x + rect.width) ||
                event.y < rect.y ||
                event.clientY >= (rect.y + rect.height)) {
                this.taggerBox.showTagger(false);
            }
        }
    };
    TaggerDirective.prototype.ngOnInit = function () {
        var x = this.position.split(':');
        var s = (this.taggerSize + 2) + 'px';
        var top = x[0] === 'top' ? '5px' : (x[0] === 'bottom' ? 'calc(100% - ' + s + ')' : 'calc((100% - ' + s + ')/2)');
        var left = x[1] === 'left' ? '5px' : (x[1] === 'right' ? 'calc(100% - ' + s + ')' : 'calc((100% - ' + s + ')/2)');
        this.taggerBox.position(top, left, this.taggerSize + 'px');
        this.taggerBox.id = (typeof this.taggerTag === 'object') ? JSON.stringify(this.taggerTag) : this.taggerTag;
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerBox.id);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.tagIt = this.tagIt;
        this.taggerBox.taggedIt = this.taggedIt;
        this.taggerBox.showTagger(this.sticky);
    };
    TaggerDirective.prototype.onTagSelect = function (event) {
        this.taggerBox.tagged = !this.taggerBox.tagged;
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        if (this.taggerBox.tagged) {
            if (this.dateEnabled) {
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
    TaggerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: TaggerService },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input()
    ], TaggerDirective.prototype, "taggedClass", void 0);
    __decorate([
        Input()
    ], TaggerDirective.prototype, "taggableClass", void 0);
    __decorate([
        Input()
    ], TaggerDirective.prototype, "tagger", void 0);
    __decorate([
        Input()
    ], TaggerDirective.prototype, "taggerSize", void 0);
    __decorate([
        Input()
    ], TaggerDirective.prototype, "position", void 0);
    __decorate([
        Input()
    ], TaggerDirective.prototype, "taggerTag", void 0);
    __decorate([
        Input()
    ], TaggerDirective.prototype, "dateEnabled", void 0);
    __decorate([
        Input()
    ], TaggerDirective.prototype, "sticky", void 0);
    __decorate([
        Input()
    ], TaggerDirective.prototype, "tagIt", void 0);
    __decorate([
        Input()
    ], TaggerDirective.prototype, "taggedIt", void 0);
    __decorate([
        Output("taggerChanged")
    ], TaggerDirective.prototype, "taggerChanged", void 0);
    __decorate([
        HostListener('focus', ['$event'])
    ], TaggerDirective.prototype, "focus", null);
    __decorate([
        HostListener('mouseenter', ['$event'])
    ], TaggerDirective.prototype, "enter", null);
    __decorate([
        HostListener('mouseout', ['$event'])
    ], TaggerDirective.prototype, "hoverOut", null);
    TaggerDirective = __decorate([
        Directive({
            selector: '[tagger]'
        })
    ], TaggerDirective);
    return TaggerDirective;
}());

var TaggerModule = /** @class */ (function () {
    function TaggerModule() {
    }
    TaggerModule = __decorate([
        NgModule({
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
        })
    ], TaggerModule);
    return TaggerModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { TaggerDirective, TaggerModule, TaggerService, taggerComponent as ɵa };
//# sourceMappingURL=sedeh-tagger.js.map
