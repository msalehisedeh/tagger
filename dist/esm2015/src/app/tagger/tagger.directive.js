import * as tslib_1 from "tslib";
import { Directive, Component, ElementRef, ViewContainerRef, Input, Output, OnInit, EventEmitter, HostListener, Renderer2, ComponentRef, EmbeddedViewRef, ComponentFactoryResolver } from '@angular/core';
import { TagInfo, TaggerService } from './tagger.service';
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
tslib_1.__decorate([
    Output()
], taggerComponent.prototype, "change", void 0);
taggerComponent = tslib_1.__decorate([
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
export { taggerComponent };
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
tslib_1.__decorate([
    Input()
], TaggerDirective.prototype, "taggedClass", void 0);
tslib_1.__decorate([
    Input()
], TaggerDirective.prototype, "taggableClass", void 0);
tslib_1.__decorate([
    Input()
], TaggerDirective.prototype, "tagger", void 0);
tslib_1.__decorate([
    Input()
], TaggerDirective.prototype, "taggerSize", void 0);
tslib_1.__decorate([
    Input()
], TaggerDirective.prototype, "position", void 0);
tslib_1.__decorate([
    Input()
], TaggerDirective.prototype, "taggerTag", void 0);
tslib_1.__decorate([
    Input()
], TaggerDirective.prototype, "dateEnabled", void 0);
tslib_1.__decorate([
    Input()
], TaggerDirective.prototype, "sticky", void 0);
tslib_1.__decorate([
    Input()
], TaggerDirective.prototype, "tagIt", void 0);
tslib_1.__decorate([
    Input()
], TaggerDirective.prototype, "taggedIt", void 0);
tslib_1.__decorate([
    Output("taggerChanged")
], TaggerDirective.prototype, "taggerChanged", void 0);
tslib_1.__decorate([
    HostListener('focus', ['$event'])
], TaggerDirective.prototype, "focus", null);
tslib_1.__decorate([
    HostListener('mouseenter', ['$event'])
], TaggerDirective.prototype, "enter", null);
tslib_1.__decorate([
    HostListener('mouseout', ['$event'])
], TaggerDirective.prototype, "hoverOut", null);
TaggerDirective = tslib_1.__decorate([
    Directive({
        selector: '[tagger]'
    })
], TaggerDirective);
export { TaggerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC90YWdnZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL3RhZ2dlci90YWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2Ysd0JBQXdCLEVBQzNCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUF3QzFELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFPeEIsWUFBb0IsUUFBbUIsRUFBUSxFQUFhO1FBQXhDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUSxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBTjVELFNBQUksR0FBRyxLQUFLLENBQUE7UUFDWixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBSUwsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDd0IsQ0FBQztJQUMvRCxLQUFLLENBQUMsS0FBUyxJQUFFLElBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUM7UUFBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO0tBQUMsQ0FBQSxDQUFDO0lBQzdELFFBQVEsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLElBQVk7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFDLE1BQU0sRUFB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Q0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdkMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlLEdBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNHLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzNHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFD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WUFBWSxDQUFDLFVBQVUsRUFBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDOytDQVluQztBQXZDUSxlQUFlO0lBSDNCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO0tBQ3ZCLENBQUM7R0FDVyxlQUFlLENBK0YzQjtTQS9GWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBPbkluaXQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBIb3N0TGlzdGVuZXIsXHJcbiAgICBSZW5kZXJlcjIsXHJcbiAgICBDb21wb25lbnRSZWYsXHJcbiAgICBFbWJlZGRlZFZpZXdSZWYsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGFnSW5mbywgVGFnZ2VyU2VydmljZSB9IGZyb20gJy4vdGFnZ2VyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RhZ2dlckJveCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPHNwYW4gXHJcbiAgICAgICAgY2xhc3M9XCJ0YWdnZXJcIiBcclxuICAgICAgICB0YWJpbmRleD1cIjBcIiBcclxuICAgICAgICAobW91c2VsZWF2ZSk9XCIkZXZlbnQudGFyZ2V0LmJsdXIoKVwiXHJcbiAgICAgICAgKGtleXVwKT1cImtleXVwKCRldmVudClcIlxyXG4gICAgICAgIChjbGljayk9XCJjaGFuZ2UuZW1pdCgkZXZlbnQpXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ7e3RhZ2dlZENsYXNzfX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XHJcbiAgICA8c3BhbiBjbGFzcz1cInRvb3QtdGlwXCIgW3RleHRDb250ZW50XT1cInRhZ2dlZCA/IHRhZ2dlZEl0IDogdGFnSXRcIj48L3NwYW4+XHJcbiAgICA8L3NwYW4+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbXHJcbiAgICAgICAgYDpob3N0e3dpZHRoOjE0cHg7aGVpZ2h0OjE0cHg7cG9zaXRpb246YWJzb2x1dGU7Y29sb3I6I2ZmZjt6LWluZGV4OjI7Y3Vyc29yOnBvaW50ZXJ9YCxcclxuICAgICAgICBgOmhvc3QuaGlkZGVue1xyXG4gICAgICAgICAgICB0b3A6IC05OTk5cHggIWltcG9ydGFudDtcclxuICAgICAgICAgICAgbGVmdDotOTk5OXB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgfWAsXHJcbiAgICAgICAgYDpob3N0IC50b290LXRpcHtcclxuICAgICAgICAgICAgZGlzcGxheTp0YWJsZTtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgICAgICBib3gtc2hhZG93OjBweCAwcHggNnB4ICNmZmY7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTowLjhyZW07XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwMDtcclxuICAgICAgICAgICAgY29sb3I6I2ZmZjtcclxuICAgICAgICAgICAgcGFkZGluZzogMnB4IDdweDtcclxuICAgICAgICAgICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHotaW5kZXg6MjtcclxuICAgICAgICAgICAgdG9wOiAzMHB4O1xyXG4gICAgICAgICAgICBsZWZ0OiAtOTk5OTlweDt9YCxcclxuICAgICAgICBgOmhvc3QgLnRhZ2dlcjpob3ZlciAudG9vdC10aXB7bGVmdDogMH1gLFxyXG4gICAgICAgIGA6aG9zdCAudGFnZ2VyOmZvY3VzIC50b290LXRpcHtsZWZ0OiAwfWAsXHJcbiAgICAgICAgYDpob3N0IC50YWdnZXI6aG92ZXJ7Y29sb3I6IHJlZH1gLFxyXG4gICAgICAgIGA6aG9zdCAudGFnZ2VyOmZvY3Vze2NvbG9yOiByZWR9YFxyXG4gICAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIHRhZ2dlckNvbXBvbmVudCB7XHJcbiAgICBzaG93ID0gZmFsc2VcclxuICAgIHRhZ2dlZCA9IGZhbHNlO1xyXG4gICAgdGFnZ2VkQ2xhc3M6IHN0cmluZztcclxuICAgIHRhZ0l0OiBzdHJpbmc7XHJcbiAgICB0YWdnZWRJdDogc3RyaW5nO1xyXG4gICAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixwdWJsaWMgZWw6RWxlbWVudFJlZil7fVxyXG4gICAga2V5dXAoZXZlbnQ6YW55KXtpZihldmVudC53aGljaCA9PSAxMyl7ZXZlbnQudGFyZ2V0LmNsaWNrKCl9fVxyXG4gICAgcG9zaXRpb24odG9wOiBzdHJpbmcsIGxlZnQ6IHN0cmluZywgc2l6ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ3RvcCcsIHRvcCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ2xlZnQnLCBsZWZ0KTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwnZm9udC1zaXplJywgc2l6ZSk7IFxyXG4gICAgfVxyXG4gICAgc2hvd1RhZ2dlcihmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoaWRkZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1t0YWdnZXJdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnZ2VyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgdGFnZ2VyQm94OiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgdGFnZ2VkQ2xhc3MgPSAnZmEgZmEtbWludXMtc3F1YXJlJztcclxuICAgIEBJbnB1dCgpIHRhZ2dhYmxlQ2xhc3MgPSAnZmEgZmEtdGFnJztcclxuICAgIEBJbnB1dCgpIHRhZ2dlcjogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgdGFnZ2VyU2l6ZSA9IDI0O1xyXG4gICAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wOmxlZnQnO1xyXG4gICAgQElucHV0KCkgdGFnZ2VyVGFnOiBhbnk7XHJcbiAgICBASW5wdXQoKSBkYXRlRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgc3RpY2t5ID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSB0YWdJdCA9ICd0YWcgaXQnO1xyXG4gICAgQElucHV0KCkgdGFnZ2VkSXQgPSAndGFnZ2VkIGl0JztcclxuIFxyXG4gICAgQE91dHB1dChcInRhZ2dlckNoYW5nZWRcIilcclxuICAgIHRhZ2dlckNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLFsnJGV2ZW50J10pXHJcblx0Zm9jdXMoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJyxbJyRldmVudCddKVxyXG5cdGVudGVyKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWQgPSB0aGlzLnRhZ2dlclNlcnZpY2UuaGFzVGFnZ2VkSXRlbSh0aGlzLnRhZ2dlciwgdGhpcy50YWdnZXJCb3guaWQpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZENsYXNzID0gdGhpcy50YWdnZXJCb3gudGFnZ2VkID8gdGhpcy50YWdnZWRDbGFzcyA6IHRoaXMudGFnZ2FibGVDbGFzcztcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKHRydWUpO1xyXG4gICAgfVxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VvdXQnLFsnJGV2ZW50J10pXHJcblx0aG92ZXJPdXQoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGlja3kgJiYgIWV2ZW50LnRhcmdldC5zaG93VGFnZ2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGlmIChldmVudC54IDwgcmVjdC54IHx8XHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGllbnRYID49IChyZWN0LnggKyByZWN0LndpZHRoKSB8fCBcclxuICAgICAgICAgICAgICAgIGV2ZW50LnkgPCByZWN0LnkgfHwgXHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGllbnRZID49IChyZWN0LnkgKyByZWN0LmhlaWdodClcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWw6RWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgICAgIHByaXZhdGUgdGFnZ2VyU2VydmljZTogVGFnZ2VyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdkaXNwbGF5JywndGFibGUnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwncG9zaXRpb24nLCdyZWxhdGl2ZScpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4JywgJzAnKTtcclxuICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGFnZ2VyQ29tcG9uZW50KTtcclxuICAgICAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy52aWV3UmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuICAgICAgICBjb25zdCBkb21FbGVtID0gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWYgPCBhbnkgPiApLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3ggPSAoPHRhZ2dlckNvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5jaGFuZ2Uuc3Vic2NyaWJlKHRoaXMub25UYWdTZWxlY3QuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHRuZ09uSW5pdCgpIHtcclxuICAgICAgICBjb25zdCB4ID0gdGhpcy5wb3NpdGlvbi5zcGxpdCgnOicpO1xyXG4gICAgICAgIGNvbnN0IHMgPSAodGhpcy50YWdnZXJTaXplICsgMikgKyAncHgnO1xyXG4gICAgICAgIGNvbnN0IHRvcCA9IHhbMF0gPT09ICd0b3AnID8gJzVweCcgOiAoeFswXSA9PT0gJ2JvdHRvbScgPyAnY2FsYygxMDAlIC0gJytzKycpJyA6ICdjYWxjKCgxMDAlIC0gJytzKycpLzIpJyk7XHJcbiAgICAgICAgY29uc3QgbGVmdCA9IHhbMV0gPT09ICdsZWZ0JyA/ICc1cHgnIDogKHhbMV0gPT09ICdyaWdodCcgPyAnY2FsYygxMDAlIC0gJytzKycpJyA6ICdjYWxjKCgxMDAlIC0gJytzKycpLzIpJyk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gucG9zaXRpb24odG9wLCBsZWZ0LCB0aGlzLnRhZ2dlclNpemUgKyAncHgnKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5pZCA9ICh0eXBlb2YgdGhpcy50YWdnZXJUYWcgPT09ICdvYmplY3QnKSA/IEpTT04uc3RyaW5naWZ5KHRoaXMudGFnZ2VyVGFnKSA6IHRoaXMudGFnZ2VyVGFnO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA9IHRoaXMudGFnZ2VyU2VydmljZS5oYXNUYWdnZWRJdGVtKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlckJveC5pZCk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkQ2xhc3MgPSB0aGlzLnRhZ2dlckJveC50YWdnZWQgPyB0aGlzLnRhZ2dlZENsYXNzIDogdGhpcy50YWdnYWJsZUNsYXNzO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ0l0ID0gdGhpcy50YWdJdDtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRJdCA9IHRoaXMudGFnZ2VkSXQ7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcih0aGlzLnN0aWNreSk7XHJcbiAgICB9XHJcbiAgICBvblRhZ1NlbGVjdChldmVudDphbnkpIHtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWQgPSAhdGhpcy50YWdnZXJCb3gudGFnZ2VkO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZENsYXNzID0gdGhpcy50YWdnZXJCb3gudGFnZ2VkID8gdGhpcy50YWdnZWRDbGFzcyA6IHRoaXMudGFnZ2FibGVDbGFzcztcclxuICAgICAgICBpZiAodGhpcy50YWdnZXJCb3gudGFnZ2VkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmZvOiBUYWdJbmZvID0ge3RhZ2dlZEl0ZW06IHRoaXMudGFnZ2VyQm94LmlkLCB0YWdEYXRlOiBuZXcgRGF0ZSgpfTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnZ2VyU2VydmljZS50YWdJdGVtKHRoaXMudGFnZ2VyLCBpbmZvKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnZ2VyU2VydmljZS50YWdJdGVtKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlckJveC5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ2dlclNlcnZpY2UucmVsZWFzZVRhZ2dlZEl0ZW0odGhpcy50YWdnZXIsIHRoaXMudGFnZ2VyQm94LmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0ZUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50YWdnZXJDaGFuZ2VkLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgdGFnZ2VyOiB0aGlzLnRhZ2dlcixcclxuICAgICAgICAgICAgICAgIHRhZ2dlZEl0ZW06dGhpcy50YWdnZXJCb3guaWQsXHJcbiAgICAgICAgICAgICAgICB0YWdEYXRlOiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnZ2VyQ2hhbmdlZC5lbWl0KHRoaXMudGFnZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19