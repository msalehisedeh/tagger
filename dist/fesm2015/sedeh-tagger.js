import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable, EventEmitter, Renderer2, ElementRef, Output, Component, ViewContainerRef, ComponentFactoryResolver, Input, HostListener, Directive, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WizardStorageService, WizardStorageModule } from '@sedeh/wizard-storage';
import { CommonModule } from '@angular/common';

let TaggerService = class TaggerService {
    constructor(storage) {
        this.storage = storage;
    }
    tagItem(id, info) {
        const item = this.getTaggedItems(id);
        if (item) {
            item.push(info);
            this.storage.session.setItem(id, item);
        }
        else {
            this.storage.session.setItem(id, [info]);
        }
    }
    releaseTaggedItem(id, info) {
        const item = this.getTaggedItems(id);
        if (item) {
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
    indexOfTaggedItem(id, info) {
        const items = this.getTaggedItems(id);
        let result = -1;
        if (items && items.length) {
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
    hasTaggedItem(id, info) {
        return this.indexOfTaggedItem(id, info) >= 0;
    }
    getTaggedItems(id) {
        return this.storage.session.getItem(id);
    }
    setTaggedItems(id, list) {
        this.storage.session.setItem(id, list);
    }
};
TaggerService.ctorParameters = () => [
    { type: WizardStorageService }
];
TaggerService.ngInjectableDef = ɵɵdefineInjectable({ factory: function TaggerService_Factory() { return new TaggerService(ɵɵinject(WizardStorageService)); }, token: TaggerService, providedIn: "root" });
TaggerService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TaggerService);

let taggerComponent = class taggerComponent {
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this.show = false;
        this.tagged = false;
        this.change = new EventEmitter();
    }
    keyup(event) { if (event.which == 13) {
        event.target.click();
    } }
    position(top, left, size) {
        this.renderer.setStyle(this.el.nativeElement, 'top', top);
        this.renderer.setStyle(this.el.nativeElement, 'left', left);
        this.renderer.setStyle(this.el.nativeElement, 'font-size', size);
    }
    showTagger(flag) {
        if (flag) {
            this.renderer.removeClass(this.el.nativeElement, 'hidden');
        }
        else {
            this.renderer.addClass(this.el.nativeElement, 'hidden');
        }
    }
};
taggerComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
__decorate([
    Output()
], taggerComponent.prototype, "change", void 0);
taggerComponent = __decorate([
    Component({
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
    })
], taggerComponent);
let TaggerDirective = class TaggerDirective {
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
        let componentFactory = this.resolver.resolveComponentFactory(taggerComponent);
        const componentRef = this.viewRef.createComponent(componentFactory);
        const domElem = componentRef.hostView.rootNodes[0];
        this.el.nativeElement.appendChild(domElem);
        this.taggerBox = componentRef.instance;
        this.taggerBox.change.subscribe(this.onTagSelect.bind(this));
    }
    focus(event) {
        this.taggerBox.showTagger(true);
    }
    enter(event) {
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerBox.id);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.showTagger(true);
    }
    hoverOut(event) {
        if (!this.sticky && !event.target.showTagger) {
            const rect = this.el.nativeElement.getBoundingClientRect();
            if (event.x < rect.x ||
                event.clientX >= (rect.x + rect.width) ||
                event.y < rect.y ||
                event.clientY >= (rect.y + rect.height)) {
                this.taggerBox.showTagger(false);
            }
        }
    }
    ngOnInit() {
        const x = this.position.split(':');
        const s = (this.taggerSize + 2) + 'px';
        const top = x[0] === 'top' ? '5px' : (x[0] === 'bottom' ? 'calc(100% - ' + s + ')' : 'calc((100% - ' + s + ')/2)');
        const left = x[1] === 'left' ? '5px' : (x[1] === 'right' ? 'calc(100% - ' + s + ')' : 'calc((100% - ' + s + ')/2)');
        this.taggerBox.position(top, left, this.taggerSize + 'px');
        this.taggerBox.id = (typeof this.taggerTag === 'object') ? JSON.stringify(this.taggerTag) : this.taggerTag;
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerBox.id);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.tagIt = this.tagIt;
        this.taggerBox.taggedIt = this.taggedIt;
        this.taggerBox.showTagger(this.sticky);
    }
    onTagSelect(event) {
        this.taggerBox.tagged = !this.taggerBox.tagged;
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        if (this.taggerBox.tagged) {
            if (this.dateEnabled) {
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
};
TaggerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: TaggerService },
    { type: Renderer2 }
];
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

let TaggerModule = class TaggerModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { TaggerDirective, TaggerModule, TaggerService, taggerComponent as ɵa };
//# sourceMappingURL=sedeh-tagger.js.map
