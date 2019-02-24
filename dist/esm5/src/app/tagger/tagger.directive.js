/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Component, ElementRef, ViewContainerRef, Input, Output, EventEmitter, HostListener, Renderer2, ComponentFactoryResolver } from '@angular/core';
import { TaggerService } from './tagger.service';
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
export { taggerComponent };
if (false) {
    /** @type {?} */
    taggerComponent.prototype.show;
    /** @type {?} */
    taggerComponent.prototype.tagged;
    /** @type {?} */
    taggerComponent.prototype.taggedClass;
    /** @type {?} */
    taggerComponent.prototype.change;
    /** @type {?} */
    taggerComponent.prototype.renderer;
    /** @type {?} */
    taggerComponent.prototype.el;
}
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
export { taggerDirective };
if (false) {
    /** @type {?} */
    taggerDirective.prototype.taggerBox;
    /** @type {?} */
    taggerDirective.prototype.taggedClass;
    /** @type {?} */
    taggerDirective.prototype.taggableClass;
    /** @type {?} */
    taggerDirective.prototype.tagger;
    /** @type {?} */
    taggerDirective.prototype.taggerSize;
    /** @type {?} */
    taggerDirective.prototype.position;
    /** @type {?} */
    taggerDirective.prototype.taggerTag;
    /** @type {?} */
    taggerDirective.prototype.sticky;
    /** @type {?} */
    taggerDirective.prototype.taggerChanged;
    /** @type {?} */
    taggerDirective.prototype.el;
    /** @type {?} */
    taggerDirective.prototype.viewRef;
    /** @type {?} */
    taggerDirective.prototype.resolver;
    /** @type {?} */
    taggerDirective.prototype.taggerService;
    /** @type {?} */
    taggerDirective.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC90YWdnZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL3RhZ2dlci90YWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLFlBQVksRUFDWixTQUFTLEVBR1Qsd0JBQXdCLEVBQzNCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7SUEyQjdDLHlCQUFvQixRQUFtQixFQUFRLEVBQWE7UUFBeEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFRLE9BQUUsR0FBRixFQUFFLENBQVc7b0JBSnJELEtBQUs7c0JBQ0gsS0FBSztzQkFFSyxJQUFJLFlBQVksRUFBRTtLQUMwQjs7Ozs7SUFDL0QsK0JBQUs7Ozs7SUFBTCxVQUFNLEtBQVMsSUFBRSxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUM7UUFBQSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO0tBQUMsRUFBQzs7Ozs7OztJQUM3RCxrQ0FBUTs7Ozs7O0lBQVIsVUFBUyxHQUFXLEVBQUUsSUFBWSxFQUFFLElBQVk7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxD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LENBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUM7O1FBQzNHLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDOzs7OztJQUNELHFDQUFXOzs7O0lBQVgsVUFBWSxLQUFTO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDaEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3hDOztnQkExRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxVQUFVO2lCQUN2Qjs7OztnQkF6REcsVUFBVTtnQkFDVixnQkFBZ0I7Z0JBU2hCLHdCQUF3QjtnQkFFbkIsYUFBYTtnQkFMbEIsU0FBUzs7OzhCQXNEUixLQUFLO2dDQUNMLEtBQUs7eUJBQ0wsS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxLQUFLO2dDQUVMLE1BQU0sU0FBQyxlQUFlO3dCQUd0QixZQUFZLFNBQUMsT0FBTyxFQUFDLENBQUMsUUFBUSxDQUFDO3dCQUkvQixZQUFZLFNBQUMsWUFBWSxFQUFDLENBQUMsUUFBUSxDQUFDOzJCQU1wQyxZQUFZLFNBQUMsVUFBVSxFQUFDLENBQUMsUUFBUSxDQUFDOzswQkFyRnZDOztTQTZEYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBPbkluaXQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBIb3N0TGlzdGVuZXIsXHJcbiAgICBSZW5kZXJlcjIsXHJcbiAgICBDb21wb25lbnRSZWYsXHJcbiAgICBFbWJlZGRlZFZpZXdSZWYsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGFnZ2VyU2VydmljZSB9IGZyb20gJy4vdGFnZ2VyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RhZ2dlckJveCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPHNwYW4gXHJcbiAgICAgICAgY2xhc3M9XCJ0YWdnZXIge3t0YWdnZWRDbGFzc319XCIgXHJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCIgXHJcbiAgICAgICAgYXJpYS1oaWRkZW49J3RydWUnXHJcbiAgICAgICAgKGtleXVwKT1cImtleXVwKCRldmVudClcIlxyXG4gICAgICAgIChjbGljayk9XCJjaGFuZ2UuZW1pdCgkZXZlbnQpXCI+PC9zcGFuPlxyXG4gICAgPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTk5OTlweDt0b3A6LTk5OTlweDt3aWR0aDoxcHg7aGVpZ2h0OjFweFwiPlxyXG4gICAge3t0YWdnZWQgPyAndGFnIHRoaXMgaXRlbScgOiAncmVtb3ZlIHRhZyBvZiB0aGlzIGl0ZW0nfX1cclxuICAgIDwvc3Bhbj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtcclxuICAgICAgICBgOmhvc3R7d2lkdGg6IDE0cHg7aGVpZ2h0OiAxNHB4O3Bvc2l0aW9uOiBhYnNvbHV0ZTtjb2xvcjogI2ZmZjt6LWluZGV4OiAyO31gLFxyXG4gICAgICAgIGA6aG9zdC5oaWRkZW57dG9wOiAtOTk5OXB4ICFpbXBvcnRhbnQ7bGVmdDotOTk5OXB4ICFpbXBvcnRhbnQ7fWAsXHJcbiAgICAgICAgYDpob3N0IC50YWdnZXI6aG92ZXJ7Y29sb3I6IHJlZH1gLFxyXG4gICAgICAgIGA6aG9zdCAudGFnZ2VyOmZvY3Vze2NvbG9yOiByZWR9YFxyXG4gICAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIHRhZ2dlckNvbXBvbmVudCB7XHJcbiAgICBzaG93ID0gZmFsc2VcclxuICAgIHRhZ2dlZCA9IGZhbHNlO1xyXG4gICAgdGFnZ2VkQ2xhc3M6IHN0cmluZztcclxuICAgIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIscHVibGljIGVsOkVsZW1lbnRSZWYpe31cclxuICAgIGtleXVwKGV2ZW50OmFueSl7aWYoZXZlbnQud2hpY2ggPT0gMTMpe2V2ZW50LnRhcmdldC5jbGljaygpfX1cclxuICAgIHBvc2l0aW9uKHRvcDogc3RyaW5nLCBsZWZ0OiBzdHJpbmcsIHNpemU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCd0b3AnLCB0b3ApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdsZWZ0JywgbGVmdCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ2ZvbnQtc2l6ZScsIHNpemUpOyBcclxuICAgIH1cclxuICAgIHNob3dUYWdnZXIoZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGlkZGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdGFnZ2VyXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIHRhZ2dlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIHRhZ2dlckJveDogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHRhZ2dlZENsYXNzID0gJ2ZhIGZhLW1pbnVzLXNxdWFyZSc7XHJcbiAgICBASW5wdXQoKSB0YWdnYWJsZUNsYXNzID0gJ2ZhIGZhLXRhZyc7XHJcbiAgICBASW5wdXQoKSB0YWdnZXI6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHRhZ2dlclNpemUgPSAyNDtcclxuICAgIEBJbnB1dCgpIHBvc2l0aW9uID0gJ3RvcDpsZWZ0JztcclxuICAgIEBJbnB1dCgpIHRhZ2dlclRhZzogYW55O1xyXG4gICAgQElucHV0KCkgc3RpY2t5ID0gZmFsc2U7XHJcbiBcclxuICAgIEBPdXRwdXQoXCJ0YWdnZXJDaGFuZ2VkXCIpXHJcbiAgICB0YWdnZXJDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJyxbJyRldmVudCddKVxyXG5cdGZvY3VzKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKHRydWUpO1xyXG4gICAgfVxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsWyckZXZlbnQnXSlcclxuXHRlbnRlcihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkID0gdGhpcy50YWdnZXJTZXJ2aWNlLmhhc1RhZ2dlZEl0ZW0odGhpcy50YWdnZXIsIHRoaXMudGFnZ2VyVGFnKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRDbGFzcyA9IHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA/IHRoaXMudGFnZ2VkQ2xhc3MgOiB0aGlzLnRhZ2dhYmxlQ2xhc3M7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcih0cnVlKTtcclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3V0JyxbJyRldmVudCddKVxyXG5cdGhvdmVyT3V0KGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RpY2t5ICYmICFldmVudC50YXJnZXQuc2hvd1RhZ2dlcikge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQueCA8IHJlY3QueCB8fFxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WCA+PSAocmVjdC54ICsgcmVjdC53aWR0aCkgfHwgXHJcbiAgICAgICAgICAgICAgICBldmVudC55IDwgcmVjdC55IHx8IFxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WSA+PSAocmVjdC55ICsgcmVjdC5oZWlnaHQpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGVsOkVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgICAgICBwcml2YXRlIHRhZ2dlclNlcnZpY2U6IFRhZ2dlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwnZGlzcGxheScsJ3RhYmxlJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ3Bvc2l0aW9uJywncmVsYXRpdmUnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRhZ2dlckNvbXBvbmVudCk7XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMudmlld1JlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XHJcbiAgICAgICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmIDwgYW55ID4gKS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94ID0gKDx0YWdnZXJDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guY2hhbmdlLnN1YnNjcmliZSh0aGlzLm9uVGFnU2VsZWN0LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgXHJcblx0bmdPbkluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHRoaXMucG9zaXRpb24uc3BsaXQoJzonKTtcclxuICAgICAgICBjb25zdCBzID0gKHRoaXMudGFnZ2VyU2l6ZSArIDIpICsgJ3B4JztcclxuICAgICAgICBjb25zdCB0b3AgPSB4WzBdID09PSAndG9wJyA/ICc1cHgnIDogKHhbMF0gPT09ICdib3R0b20nID8gJ2NhbGMoMTAwJSAtICcrcysnKScgOiAnY2FsYygoMTAwJSAtICcrcysnKS8yKScpO1xyXG4gICAgICAgIGNvbnN0IGxlZnQgPSB4WzFdID09PSAnbGVmdCcgPyAnNXB4JyA6ICh4WzFdID09PSAncmlnaHQnID8gJ2NhbGMoMTAwJSAtICcrcysnKScgOiAnY2FsYygoMTAwJSAtICcrcysnKS8yKScpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnBvc2l0aW9uKHRvcCwgbGVmdCwgdGhpcy50YWdnZXJTaXplICsgJ3B4Jyk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkID0gdGhpcy50YWdnZXJTZXJ2aWNlLmhhc1RhZ2dlZEl0ZW0odGhpcy50YWdnZXIsIHRoaXMudGFnZ2VyVGFnKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRDbGFzcyA9IHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA/IHRoaXMudGFnZ2VkQ2xhc3MgOiB0aGlzLnRhZ2dhYmxlQ2xhc3M7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcih0aGlzLnN0aWNreSk7XHJcbiAgICB9XHJcbiAgICBvblRhZ1NlbGVjdChldmVudDphbnkpIHtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWQgPSAhdGhpcy50YWdnZXJCb3gudGFnZ2VkO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZENsYXNzID0gdGhpcy50YWdnZXJCb3gudGFnZ2VkID8gdGhpcy50YWdnZWRDbGFzcyA6IHRoaXMudGFnZ2FibGVDbGFzcztcclxuICAgICAgICB0aGlzLnRhZ2dlclNlcnZpY2UudXBkYXRlVGFnKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlckJveC50YWdnZWQsIHRoaXMudGFnZ2VyVGFnKVxyXG4gICAgICAgIHRoaXMudGFnZ2VyQ2hhbmdlZC5lbWl0KHRoaXMudGFnZ2VyKTtcclxuICAgIH1cclxufVxyXG4iXX0=