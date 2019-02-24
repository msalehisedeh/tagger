/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Component, ElementRef, ViewContainerRef, Input, Output, EventEmitter, HostListener, Renderer2, ComponentFactoryResolver } from '@angular/core';
import { TaggerService } from './tagger.service';
export class taggerComponent {
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
export class taggerDirective {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC90YWdnZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL3RhZ2dlci90YWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLFlBQVksRUFDWixTQUFTLEVBR1Qsd0JBQXdCLEVBQzNCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXNCakQsTUFBTTs7Ozs7SUFLRixZQUFvQixRQUFtQixFQUFRLEVBQWE7UUFBeEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFRLE9BQUUsR0FBRixFQUFFLENBQVc7b0JBSnJELEtBQUs7c0JBQ0gsS0FBSztzQkFFSyxJQUFJLFlBQVksRUFBRTtLQUMwQjs7Ozs7SUFDL0QsS0FBSyxDQUFDLEtBQVMsSUFBRSxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUM7UUFBQSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO0tBQUMsRUFBQzs7Ozs7OztJQUM3RCxRQUFRLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxJQUFZO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFh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O1FBQzNHLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDOzs7OztJQUNELFdBQVcsQ0FBQyxLQUFTO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDaEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3hDOzs7WUExRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxVQUFVO2FBQ3ZCOzs7O1lBekRHLFVBQVU7WUFDVixnQkFBZ0I7WUFTaEIsd0JBQXdCO1lBRW5CLGFBQWE7WUFMbEIsU0FBUzs7OzBCQXNEUixLQUFLOzRCQUNMLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSztxQkFDTCxLQUFLOzRCQUVMLE1BQU0sU0FBQyxlQUFlO29CQUd0QixZQUFZLFNBQUMsT0FBTyxFQUFDLENBQUMsUUFBUSxDQUFDO29CQUkvQixZQUFZLFNBQUMsWUFBWSxFQUFDLENBQUMsUUFBUSxDQUFDO3VCQU1wQyxZQUFZLFNBQUMsVUFBVSxFQUFDLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBPbkluaXQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBIb3N0TGlzdGVuZXIsXHJcbiAgICBSZW5kZXJlcjIsXHJcbiAgICBDb21wb25lbnRSZWYsXHJcbiAgICBFbWJlZGRlZFZpZXdSZWYsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGFnZ2VyU2VydmljZSB9IGZyb20gJy4vdGFnZ2VyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RhZ2dlckJveCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPHNwYW4gXHJcbiAgICAgICAgY2xhc3M9XCJ0YWdnZXIge3t0YWdnZWRDbGFzc319XCIgXHJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCIgXHJcbiAgICAgICAgYXJpYS1oaWRkZW49J3RydWUnXHJcbiAgICAgICAgKGtleXVwKT1cImtleXVwKCRldmVudClcIlxyXG4gICAgICAgIChjbGljayk9XCJjaGFuZ2UuZW1pdCgkZXZlbnQpXCI+PC9zcGFuPlxyXG4gICAgPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTk5OTlweDt0b3A6LTk5OTlweDt3aWR0aDoxcHg7aGVpZ2h0OjFweFwiPlxyXG4gICAge3t0YWdnZWQgPyAndGFnIHRoaXMgaXRlbScgOiAncmVtb3ZlIHRhZyBvZiB0aGlzIGl0ZW0nfX1cclxuICAgIDwvc3Bhbj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtcclxuICAgICAgICBgOmhvc3R7d2lkdGg6IDE0cHg7aGVpZ2h0OiAxNHB4O3Bvc2l0aW9uOiBhYnNvbHV0ZTtjb2xvcjogI2ZmZjt6LWluZGV4OiAyO31gLFxyXG4gICAgICAgIGA6aG9zdC5oaWRkZW57dG9wOiAtOTk5OXB4ICFpbXBvcnRhbnQ7bGVmdDotOTk5OXB4ICFpbXBvcnRhbnQ7fWAsXHJcbiAgICAgICAgYDpob3N0IC50YWdnZXI6aG92ZXJ7Y29sb3I6IHJlZH1gLFxyXG4gICAgICAgIGA6aG9zdCAudGFnZ2VyOmZvY3Vze2NvbG9yOiByZWR9YFxyXG4gICAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIHRhZ2dlckNvbXBvbmVudCB7XHJcbiAgICBzaG93ID0gZmFsc2VcclxuICAgIHRhZ2dlZCA9IGZhbHNlO1xyXG4gICAgdGFnZ2VkQ2xhc3M6IHN0cmluZztcclxuICAgIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIscHVibGljIGVsOkVsZW1lbnRSZWYpe31cclxuICAgIGtleXVwKGV2ZW50OmFueSl7aWYoZXZlbnQud2hpY2ggPT0gMTMpe2V2ZW50LnRhcmdldC5jbGljaygpfX1cclxuICAgIHBvc2l0aW9uKHRvcDogc3RyaW5nLCBsZWZ0OiBzdHJpbmcsIHNpemU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCd0b3AnLCB0b3ApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdsZWZ0JywgbGVmdCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ2ZvbnQtc2l6ZScsIHNpemUpOyBcclxuICAgIH1cclxuICAgIHNob3dUYWdnZXIoZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGlkZGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdGFnZ2VyXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIHRhZ2dlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIHRhZ2dlckJveDogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHRhZ2dlZENsYXNzID0gJ2ZhIGZhLW1pbnVzLXNxdWFyZSc7XHJcbiAgICBASW5wdXQoKSB0YWdnYWJsZUNsYXNzID0gJ2ZhIGZhLXRhZyc7XHJcbiAgICBASW5wdXQoKSB0YWdnZXI6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHRhZ2dlclNpemUgPSAyNDtcclxuICAgIEBJbnB1dCgpIHBvc2l0aW9uID0gJ3RvcDpsZWZ0JztcclxuICAgIEBJbnB1dCgpIHRhZ2dlclRhZzogYW55O1xyXG4gICAgQElucHV0KCkgc3RpY2t5ID0gZmFsc2U7XHJcbiBcclxuICAgIEBPdXRwdXQoXCJ0YWdnZXJDaGFuZ2VkXCIpXHJcbiAgICB0YWdnZXJDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJyxbJyRldmVudCddKVxyXG5cdGZvY3VzKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKHRydWUpO1xyXG4gICAgfVxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsWyckZXZlbnQnXSlcclxuXHRlbnRlcihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkID0gdGhpcy50YWdnZXJTZXJ2aWNlLmhhc1RhZ2dlZEl0ZW0odGhpcy50YWdnZXIsIHRoaXMudGFnZ2VyVGFnKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRDbGFzcyA9IHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA/IHRoaXMudGFnZ2VkQ2xhc3MgOiB0aGlzLnRhZ2dhYmxlQ2xhc3M7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcih0cnVlKTtcclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3V0JyxbJyRldmVudCddKVxyXG5cdGhvdmVyT3V0KGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RpY2t5ICYmICFldmVudC50YXJnZXQuc2hvd1RhZ2dlcikge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQueCA8IHJlY3QueCB8fFxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WCA+PSAocmVjdC54ICsgcmVjdC53aWR0aCkgfHwgXHJcbiAgICAgICAgICAgICAgICBldmVudC55IDwgcmVjdC55IHx8IFxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WSA+PSAocmVjdC55ICsgcmVjdC5oZWlnaHQpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGVsOkVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgICAgICBwcml2YXRlIHRhZ2dlclNlcnZpY2U6IFRhZ2dlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwnZGlzcGxheScsJ3RhYmxlJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ3Bvc2l0aW9uJywncmVsYXRpdmUnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRhZ2dlckNvbXBvbmVudCk7XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMudmlld1JlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XHJcbiAgICAgICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmIDwgYW55ID4gKS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94ID0gKDx0YWdnZXJDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guY2hhbmdlLnN1YnNjcmliZSh0aGlzLm9uVGFnU2VsZWN0LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgXHJcblx0bmdPbkluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHRoaXMucG9zaXRpb24uc3BsaXQoJzonKTtcclxuICAgICAgICBjb25zdCBzID0gKHRoaXMudGFnZ2VyU2l6ZSArIDIpICsgJ3B4JztcclxuICAgICAgICBjb25zdCB0b3AgPSB4WzBdID09PSAndG9wJyA/ICc1cHgnIDogKHhbMF0gPT09ICdib3R0b20nID8gJ2NhbGMoMTAwJSAtICcrcysnKScgOiAnY2FsYygoMTAwJSAtICcrcysnKS8yKScpO1xyXG4gICAgICAgIGNvbnN0IGxlZnQgPSB4WzFdID09PSAnbGVmdCcgPyAnNXB4JyA6ICh4WzFdID09PSAncmlnaHQnID8gJ2NhbGMoMTAwJSAtICcrcysnKScgOiAnY2FsYygoMTAwJSAtICcrcysnKS8yKScpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnBvc2l0aW9uKHRvcCwgbGVmdCwgdGhpcy50YWdnZXJTaXplICsgJ3B4Jyk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkID0gdGhpcy50YWdnZXJTZXJ2aWNlLmhhc1RhZ2dlZEl0ZW0odGhpcy50YWdnZXIsIHRoaXMudGFnZ2VyVGFnKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRDbGFzcyA9IHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA/IHRoaXMudGFnZ2VkQ2xhc3MgOiB0aGlzLnRhZ2dhYmxlQ2xhc3M7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcih0aGlzLnN0aWNreSk7XHJcbiAgICB9XHJcbiAgICBvblRhZ1NlbGVjdChldmVudDphbnkpIHtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWQgPSAhdGhpcy50YWdnZXJCb3gudGFnZ2VkO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZENsYXNzID0gdGhpcy50YWdnZXJCb3gudGFnZ2VkID8gdGhpcy50YWdnZWRDbGFzcyA6IHRoaXMudGFnZ2FibGVDbGFzcztcclxuICAgICAgICB0aGlzLnRhZ2dlclNlcnZpY2UudXBkYXRlVGFnKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlckJveC50YWdnZWQsIHRoaXMudGFnZ2VyVGFnKVxyXG4gICAgICAgIHRoaXMudGFnZ2VyQ2hhbmdlZC5lbWl0KHRoaXMudGFnZ2VyKTtcclxuICAgIH1cclxufVxyXG4iXX0=