import * as tslib_1 from "tslib";
import { Directive, Component, ElementRef, ViewContainerRef, Input, Output, OnInit, EventEmitter, HostListener, Renderer2, ComponentRef, EmbeddedViewRef, ComponentFactoryResolver } from '@angular/core';
import { TagInfo, TaggerService } from './tagger.service';
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
    tslib_1.__decorate([
        Output()
    ], taggerComponent.prototype, "change", void 0);
    taggerComponent = tslib_1.__decorate([
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
export { taggerComponent };
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
    return TaggerDirective;
}());
export { TaggerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC90YWdnZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL3RhZ2dlci90YWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2Ysd0JBQXdCLEVBQzNCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUF3QzFEO0lBT0kseUJBQW9CLFFBQW1CLEVBQVEsRUFBYTtRQUF4QyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVEsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQU41RCxTQUFJLEdBQUcsS0FBSyxDQUFBO1FBQ1osV0FBTSxHQUFHLEtBQUssQ0FBQztRQUlMLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3dCLENBQUM7SUFDL0QsK0JBQUssR0FBTCxVQUFNLEtBQVMsSUFBRSxJQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFDO1FBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtLQUFDLENBQUEsQ0FBQztJQUM3RCxrQ0FBUSxHQUFSLFVBQVMsR0FBVyxFQUFFLElBQVksRUFBRSxJQUFZO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENB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LEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsSUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN2QyxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBYyxHQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0csSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlLEdBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDM0csSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FB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LENBQUMsVUFBVSxFQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7bURBWW5DO0lBdkNRLGVBQWU7UUFIM0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7U0FDdkIsQ0FBQztPQUNXLGVBQWUsQ0ErRjNCO0lBQUQsc0JBQUM7Q0FBQSxBQS9GRCxJQStGQztTQS9GWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBPbkluaXQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBIb3N0TGlzdGVuZXIsXHJcbiAgICBSZW5kZXJlcjIsXHJcbiAgICBDb21wb25lbnRSZWYsXHJcbiAgICBFbWJlZGRlZFZpZXdSZWYsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGFnSW5mbywgVGFnZ2VyU2VydmljZSB9IGZyb20gJy4vdGFnZ2VyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RhZ2dlckJveCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPHNwYW4gXHJcbiAgICAgICAgY2xhc3M9XCJ0YWdnZXJcIiBcclxuICAgICAgICB0YWJpbmRleD1cIjBcIiBcclxuICAgICAgICAobW91c2VsZWF2ZSk9XCIkZXZlbnQudGFyZ2V0LmJsdXIoKVwiXHJcbiAgICAgICAgKGtleXVwKT1cImtleXVwKCRldmVudClcIlxyXG4gICAgICAgIChjbGljayk9XCJjaGFuZ2UuZW1pdCgkZXZlbnQpXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ7e3RhZ2dlZENsYXNzfX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XHJcbiAgICA8c3BhbiBjbGFzcz1cInRvb3QtdGlwXCIgW3RleHRDb250ZW50XT1cInRhZ2dlZCA/IHRhZ2dlZEl0IDogdGFnSXRcIj48L3NwYW4+XHJcbiAgICA8L3NwYW4+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbXHJcbiAgICAgICAgYDpob3N0e3dpZHRoOjE0cHg7aGVpZ2h0OjE0cHg7cG9zaXRpb246YWJzb2x1dGU7Y29sb3I6I2ZmZjt6LWluZGV4OjI7Y3Vyc29yOnBvaW50ZXJ9YCxcclxuICAgICAgICBgOmhvc3QuaGlkZGVue1xyXG4gICAgICAgICAgICB0b3A6IC05OTk5cHggIWltcG9ydGFudDtcclxuICAgICAgICAgICAgbGVmdDotOTk5OXB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgfWAsXHJcbiAgICAgICAgYDpob3N0IC50b290LXRpcHtcclxuICAgICAgICAgICAgZGlzcGxheTp0YWJsZTtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgICAgICBib3gtc2hhZG93OjBweCAwcHggNnB4ICNmZmY7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTowLjhyZW07XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwMDtcclxuICAgICAgICAgICAgY29sb3I6I2ZmZjtcclxuICAgICAgICAgICAgcGFkZGluZzogMnB4IDdweDtcclxuICAgICAgICAgICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHotaW5kZXg6MjtcclxuICAgICAgICAgICAgdG9wOiAzMHB4O1xyXG4gICAgICAgICAgICBsZWZ0OiAtOTk5OTlweDt9YCxcclxuICAgICAgICBgOmhvc3QgLnRhZ2dlcjpob3ZlciAudG9vdC10aXB7bGVmdDogMH1gLFxyXG4gICAgICAgIGA6aG9zdCAudGFnZ2VyOmZvY3VzIC50b290LXRpcHtsZWZ0OiAwfWAsXHJcbiAgICAgICAgYDpob3N0IC50YWdnZXI6aG92ZXJ7Y29sb3I6IHJlZH1gLFxyXG4gICAgICAgIGA6aG9zdCAudGFnZ2VyOmZvY3Vze2NvbG9yOiByZWR9YFxyXG4gICAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIHRhZ2dlckNvbXBvbmVudCB7XHJcbiAgICBzaG93ID0gZmFsc2VcclxuICAgIHRhZ2dlZCA9IGZhbHNlO1xyXG4gICAgdGFnZ2VkQ2xhc3M6IHN0cmluZztcclxuICAgIHRhZ0l0OiBzdHJpbmc7XHJcbiAgICB0YWdnZWRJdDogc3RyaW5nO1xyXG4gICAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixwdWJsaWMgZWw6RWxlbWVudFJlZil7fVxyXG4gICAga2V5dXAoZXZlbnQ6YW55KXtpZihldmVudC53aGljaCA9PSAxMyl7ZXZlbnQudGFyZ2V0LmNsaWNrKCl9fVxyXG4gICAgcG9zaXRpb24odG9wOiBzdHJpbmcsIGxlZnQ6IHN0cmluZywgc2l6ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ3RvcCcsIHRvcCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ2xlZnQnLCBsZWZ0KTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwnZm9udC1zaXplJywgc2l6ZSk7IFxyXG4gICAgfVxyXG4gICAgc2hvd1RhZ2dlcihmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoaWRkZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1t0YWdnZXJdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnZ2VyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgdGFnZ2VyQm94OiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgdGFnZ2VkQ2xhc3MgPSAnZmEgZmEtbWludXMtc3F1YXJlJztcclxuICAgIEBJbnB1dCgpIHRhZ2dhYmxlQ2xhc3MgPSAnZmEgZmEtdGFnJztcclxuICAgIEBJbnB1dCgpIHRhZ2dlcjogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgdGFnZ2VyU2l6ZSA9IDI0O1xyXG4gICAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wOmxlZnQnO1xyXG4gICAgQElucHV0KCkgdGFnZ2VyVGFnOiBhbnk7XHJcbiAgICBASW5wdXQoKSBkYXRlRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgc3RpY2t5ID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSB0YWdJdCA9ICd0YWcgaXQnO1xyXG4gICAgQElucHV0KCkgdGFnZ2VkSXQgPSAndGFnZ2VkIGl0JztcclxuIFxyXG4gICAgQE91dHB1dChcInRhZ2dlckNoYW5nZWRcIilcclxuICAgIHRhZ2dlckNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLFsnJGV2ZW50J10pXHJcblx0Zm9jdXMoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJyxbJyRldmVudCddKVxyXG5cdGVudGVyKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWQgPSB0aGlzLnRhZ2dlclNlcnZpY2UuaGFzVGFnZ2VkSXRlbSh0aGlzLnRhZ2dlciwgdGhpcy50YWdnZXJCb3guaWQpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZENsYXNzID0gdGhpcy50YWdnZXJCb3gudGFnZ2VkID8gdGhpcy50YWdnZWRDbGFzcyA6IHRoaXMudGFnZ2FibGVDbGFzcztcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKHRydWUpO1xyXG4gICAgfVxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VvdXQnLFsnJGV2ZW50J10pXHJcblx0aG92ZXJPdXQoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGlja3kgJiYgIWV2ZW50LnRhcmdldC5zaG93VGFnZ2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGlmIChldmVudC54IDwgcmVjdC54IHx8XHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGllbnRYID49IChyZWN0LnggKyByZWN0LndpZHRoKSB8fCBcclxuICAgICAgICAgICAgICAgIGV2ZW50LnkgPCByZWN0LnkgfHwgXHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGllbnRZID49IChyZWN0LnkgKyByZWN0LmhlaWdodClcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWw6RWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgICAgIHByaXZhdGUgdGFnZ2VyU2VydmljZTogVGFnZ2VyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdkaXNwbGF5JywndGFibGUnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwncG9zaXRpb24nLCdyZWxhdGl2ZScpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4JywgJzAnKTtcclxuICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGFnZ2VyQ29tcG9uZW50KTtcclxuICAgICAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy52aWV3UmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuICAgICAgICBjb25zdCBkb21FbGVtID0gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWYgPCBhbnkgPiApLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3ggPSAoPHRhZ2dlckNvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5jaGFuZ2Uuc3Vic2NyaWJlKHRoaXMub25UYWdTZWxlY3QuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHRuZ09uSW5pdCgpIHtcclxuICAgICAgICBjb25zdCB4ID0gdGhpcy5wb3NpdGlvbi5zcGxpdCgnOicpO1xyXG4gICAgICAgIGNvbnN0IHMgPSAodGhpcy50YWdnZXJTaXplICsgMikgKyAncHgnO1xyXG4gICAgICAgIGNvbnN0IHRvcCA9IHhbMF0gPT09ICd0b3AnID8gJzVweCcgOiAoeFswXSA9PT0gJ2JvdHRvbScgPyAnY2FsYygxMDAlIC0gJytzKycpJyA6ICdjYWxjKCgxMDAlIC0gJytzKycpLzIpJyk7XHJcbiAgICAgICAgY29uc3QgbGVmdCA9IHhbMV0gPT09ICdsZWZ0JyA/ICc1cHgnIDogKHhbMV0gPT09ICdyaWdodCcgPyAnY2FsYygxMDAlIC0gJytzKycpJyA6ICdjYWxjKCgxMDAlIC0gJytzKycpLzIpJyk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gucG9zaXRpb24odG9wLCBsZWZ0LCB0aGlzLnRhZ2dlclNpemUgKyAncHgnKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5pZCA9ICh0eXBlb2YgdGhpcy50YWdnZXJUYWcgPT09ICdvYmplY3QnKSA/IEpTT04uc3RyaW5naWZ5KHRoaXMudGFnZ2VyVGFnKSA6IHRoaXMudGFnZ2VyVGFnO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA9IHRoaXMudGFnZ2VyU2VydmljZS5oYXNUYWdnZWRJdGVtKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlckJveC5pZCk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkQ2xhc3MgPSB0aGlzLnRhZ2dlckJveC50YWdnZWQgPyB0aGlzLnRhZ2dlZENsYXNzIDogdGhpcy50YWdnYWJsZUNsYXNzO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ0l0ID0gdGhpcy50YWdJdDtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRJdCA9IHRoaXMudGFnZ2VkSXQ7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcih0aGlzLnN0aWNreSk7XHJcbiAgICB9XHJcbiAgICBvblRhZ1NlbGVjdChldmVudDphbnkpIHtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWQgPSAhdGhpcy50YWdnZXJCb3gudGFnZ2VkO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZENsYXNzID0gdGhpcy50YWdnZXJCb3gudGFnZ2VkID8gdGhpcy50YWdnZWRDbGFzcyA6IHRoaXMudGFnZ2FibGVDbGFzcztcclxuICAgICAgICBpZiAodGhpcy50YWdnZXJCb3gudGFnZ2VkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmZvOiBUYWdJbmZvID0ge3RhZ2dlZEl0ZW06IHRoaXMudGFnZ2VyQm94LmlkLCB0YWdEYXRlOiBuZXcgRGF0ZSgpfTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnZ2VyU2VydmljZS50YWdJdGVtKHRoaXMudGFnZ2VyLCBpbmZvKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnZ2VyU2VydmljZS50YWdJdGVtKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlckJveC5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ2dlclNlcnZpY2UucmVsZWFzZVRhZ2dlZEl0ZW0odGhpcy50YWdnZXIsIHRoaXMudGFnZ2VyQm94LmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0ZUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50YWdnZXJDaGFuZ2VkLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgdGFnZ2VyOiB0aGlzLnRhZ2dlcixcclxuICAgICAgICAgICAgICAgIHRhZ2dlZEl0ZW06dGhpcy50YWdnZXJCb3guaWQsXHJcbiAgICAgICAgICAgICAgICB0YWdEYXRlOiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnZ2VyQ2hhbmdlZC5lbWl0KHRoaXMudGFnZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19