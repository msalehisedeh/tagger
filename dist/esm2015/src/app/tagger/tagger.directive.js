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
if (false) {
    /** @type {?} */
    taggerComponent.prototype.show;
    /** @type {?} */
    taggerComponent.prototype.tagged;
    /** @type {?} */
    taggerComponent.prototype.taggedClass;
    /** @type {?} */
    taggerComponent.prototype.tagIt;
    /** @type {?} */
    taggerComponent.prototype.taggedIt;
    /** @type {?} */
    taggerComponent.prototype.change;
    /** @type {?} */
    taggerComponent.prototype.renderer;
    /** @type {?} */
    taggerComponent.prototype.el;
}
export class TaggerDirective {
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
if (false) {
    /** @type {?} */
    TaggerDirective.prototype.taggerBox;
    /** @type {?} */
    TaggerDirective.prototype.taggedClass;
    /** @type {?} */
    TaggerDirective.prototype.taggableClass;
    /** @type {?} */
    TaggerDirective.prototype.tagger;
    /** @type {?} */
    TaggerDirective.prototype.taggerSize;
    /** @type {?} */
    TaggerDirective.prototype.position;
    /** @type {?} */
    TaggerDirective.prototype.taggerTag;
    /** @type {?} */
    TaggerDirective.prototype.dateEnabled;
    /** @type {?} */
    TaggerDirective.prototype.sticky;
    /** @type {?} */
    TaggerDirective.prototype.tagIt;
    /** @type {?} */
    TaggerDirective.prototype.taggedIt;
    /** @type {?} */
    TaggerDirective.prototype.taggerChanged;
    /** @type {?} */
    TaggerDirective.prototype.el;
    /** @type {?} */
    TaggerDirective.prototype.viewRef;
    /** @type {?} */
    TaggerDirective.prototype.resolver;
    /** @type {?} */
    TaggerDirective.prototype.taggerService;
    /** @type {?} */
    TaggerDirective.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC90YWdnZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL3RhZ2dlci90YWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLFlBQVksRUFDWixTQUFTLEVBR1Qsd0JBQXdCLEVBQzNCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBVyxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXdDMUQsTUFBTTs7Ozs7SUFPRixZQUFvQixRQUFtQixFQUFRLEVBQWE7UUFBeEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFRLE9BQUUsR0FBRixFQUFFLENBQVc7b0JBTnJELEtBQUs7c0JBQ0gsS0FBSztzQkFJSyxJQUFJLFlBQVksRUFBRTtLQUMwQjs7Ozs7SUFDL0QsS0FBSyxDQUFDLEtBQVMsSUFBRSxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUM7UUFBQSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO0tBQUMsRUFBQzs7Ozs7OztJQUM3RCxRQUFRLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxJQUFZO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFh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QUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBYyxHQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUM7O1FBQzNHLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzNHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMzRixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDOzs7OztJQUNELFdBQVcsQ0FBQyxLQUFTO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztnQkFDbkIsTUFBTSxJQUFJLEdBQVksRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUMsQ0FBQztnQkFDM0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNqRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM5RDtTQUNKO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN4RTtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2dCQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLFVBQVUsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sRUFBRSxJQUFJLElBQUksRUFBRTthQUN0QixDQUFDLENBQUM7U0FDTjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO0tBQ0o7OztZQWpHSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7YUFDdkI7Ozs7WUE3RUcsVUFBVTtZQUNWLGdCQUFnQjtZQVNoQix3QkFBd0I7WUFFVixhQUFhO1lBTDNCLFNBQVM7OzswQkEwRVIsS0FBSzs0QkFDTCxLQUFLO3FCQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSztxQkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzs0QkFFTCxNQUFNLFNBQUMsZUFBZTtvQkFHdEIsWUFBWSxTQUFDLE9BQU8sRUFBQyxDQUFDLFFBQVEsQ0FBQztvQkFJL0IsWUFBWSxTQUFDLFlBQVksRUFBQyxDQUFDLFFBQVEsQ0FBQzt1QkFNcEMsWUFBWSxTQUFDLFVBQVUsRUFBQyxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgVmlld0NvbnRhaW5lclJlZixcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgT25Jbml0LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSG9zdExpc3RlbmVyLFxyXG4gICAgUmVuZGVyZXIyLFxyXG4gICAgQ29tcG9uZW50UmVmLFxyXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRhZ0luZm8sIFRhZ2dlclNlcnZpY2UgfSBmcm9tICcuL3RhZ2dlci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0YWdnZXJCb3gnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxzcGFuIFxyXG4gICAgICAgIGNsYXNzPVwidGFnZ2VyXCIgXHJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCIgXHJcbiAgICAgICAgKG1vdXNlbGVhdmUpPVwiJGV2ZW50LnRhcmdldC5ibHVyKClcIlxyXG4gICAgICAgIChrZXl1cCk9XCJrZXl1cCgkZXZlbnQpXCJcclxuICAgICAgICAoY2xpY2spPVwiY2hhbmdlLmVtaXQoJGV2ZW50KVwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwie3t0YWdnZWRDbGFzc319XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJ0b290LXRpcFwiIFt0ZXh0Q29udGVudF09XCJ0YWdnZWQgPyB0YWdnZWRJdCA6IHRhZ0l0XCI+PC9zcGFuPlxyXG4gICAgPC9zcGFuPlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW1xyXG4gICAgICAgIGA6aG9zdHt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O3Bvc2l0aW9uOmFic29sdXRlO2NvbG9yOiNmZmY7ei1pbmRleDoyO2N1cnNvcjpwb2ludGVyfWAsXHJcbiAgICAgICAgYDpob3N0LmhpZGRlbntcclxuICAgICAgICAgICAgdG9wOiAtOTk5OXB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIGxlZnQ6LTk5OTlweCAhaW1wb3J0YW50O1xyXG4gICAgICAgIH1gLFxyXG4gICAgICAgIGA6aG9zdCAudG9vdC10aXB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6dGFibGU7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICAgICAgYm94LXNoYWRvdzowcHggMHB4IDZweCAjZmZmO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBmb250LXNpemU6MC44cmVtO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7XHJcbiAgICAgICAgICAgIGNvbG9yOiNmZmY7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDJweCA3cHg7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgICAgICAgICB6LWluZGV4OjI7XHJcbiAgICAgICAgICAgIHRvcDogMzBweDtcclxuICAgICAgICAgICAgbGVmdDogLTk5OTk5cHg7fWAsXHJcbiAgICAgICAgYDpob3N0IC50YWdnZXI6aG92ZXIgLnRvb3QtdGlwe2xlZnQ6IDB9YCxcclxuICAgICAgICBgOmhvc3QgLnRhZ2dlcjpmb2N1cyAudG9vdC10aXB7bGVmdDogMH1gLFxyXG4gICAgICAgIGA6aG9zdCAudGFnZ2VyOmhvdmVye2NvbG9yOiByZWR9YCxcclxuICAgICAgICBgOmhvc3QgLnRhZ2dlcjpmb2N1c3tjb2xvcjogcmVkfWBcclxuICAgIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyB0YWdnZXJDb21wb25lbnQge1xyXG4gICAgc2hvdyA9IGZhbHNlXHJcbiAgICB0YWdnZWQgPSBmYWxzZTtcclxuICAgIHRhZ2dlZENsYXNzOiBzdHJpbmc7XHJcbiAgICB0YWdJdDogc3RyaW5nO1xyXG4gICAgdGFnZ2VkSXQ6IHN0cmluZztcclxuICAgIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIscHVibGljIGVsOkVsZW1lbnRSZWYpe31cclxuICAgIGtleXVwKGV2ZW50OmFueSl7aWYoZXZlbnQud2hpY2ggPT0gMTMpe2V2ZW50LnRhcmdldC5jbGljaygpfX1cclxuICAgIHBvc2l0aW9uKHRvcDogc3RyaW5nLCBsZWZ0OiBzdHJpbmcsIHNpemU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCd0b3AnLCB0b3ApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCdsZWZ0JywgbGVmdCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ2ZvbnQtc2l6ZScsIHNpemUpOyBcclxuICAgIH1cclxuICAgIHNob3dUYWdnZXIoZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGlkZGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdGFnZ2VyXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhZ2dlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIHRhZ2dlckJveDogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHRhZ2dlZENsYXNzID0gJ2ZhIGZhLW1pbnVzLXNxdWFyZSc7XHJcbiAgICBASW5wdXQoKSB0YWdnYWJsZUNsYXNzID0gJ2ZhIGZhLXRhZyc7XHJcbiAgICBASW5wdXQoKSB0YWdnZXI6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHRhZ2dlclNpemUgPSAyNDtcclxuICAgIEBJbnB1dCgpIHBvc2l0aW9uID0gJ3RvcDpsZWZ0JztcclxuICAgIEBJbnB1dCgpIHRhZ2dlclRhZzogYW55O1xyXG4gICAgQElucHV0KCkgZGF0ZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHN0aWNreSA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgdGFnSXQgPSAndGFnIGl0JztcclxuICAgIEBJbnB1dCgpIHRhZ2dlZEl0ID0gJ3RhZ2dlZCBpdCc7XHJcbiBcclxuICAgIEBPdXRwdXQoXCJ0YWdnZXJDaGFuZ2VkXCIpXHJcbiAgICB0YWdnZXJDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJyxbJyRldmVudCddKVxyXG5cdGZvY3VzKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC5zaG93VGFnZ2VyKHRydWUpO1xyXG4gICAgfVxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsWyckZXZlbnQnXSlcclxuXHRlbnRlcihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkID0gdGhpcy50YWdnZXJTZXJ2aWNlLmhhc1RhZ2dlZEl0ZW0odGhpcy50YWdnZXIsIHRoaXMudGFnZ2VyQm94LmlkKTtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRDbGFzcyA9IHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA/IHRoaXMudGFnZ2VkQ2xhc3MgOiB0aGlzLnRhZ2dhYmxlQ2xhc3M7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guc2hvd1RhZ2dlcih0cnVlKTtcclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3V0JyxbJyRldmVudCddKVxyXG5cdGhvdmVyT3V0KGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RpY2t5ICYmICFldmVudC50YXJnZXQuc2hvd1RhZ2dlcikge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQueCA8IHJlY3QueCB8fFxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WCA+PSAocmVjdC54ICsgcmVjdC53aWR0aCkgfHwgXHJcbiAgICAgICAgICAgICAgICBldmVudC55IDwgcmVjdC55IHx8IFxyXG4gICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WSA+PSAocmVjdC55ICsgcmVjdC5oZWlnaHQpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGVsOkVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgICAgICBwcml2YXRlIHRhZ2dlclNlcnZpY2U6IFRhZ2dlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwnZGlzcGxheScsJ3RhYmxlJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsJ3Bvc2l0aW9uJywncmVsYXRpdmUnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRhZ2dlckNvbXBvbmVudCk7XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMudmlld1JlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XHJcbiAgICAgICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmIDwgYW55ID4gKS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94ID0gKDx0YWdnZXJDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guY2hhbmdlLnN1YnNjcmliZSh0aGlzLm9uVGFnU2VsZWN0LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgXHJcblx0bmdPbkluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHRoaXMucG9zaXRpb24uc3BsaXQoJzonKTtcclxuICAgICAgICBjb25zdCBzID0gKHRoaXMudGFnZ2VyU2l6ZSArIDIpICsgJ3B4JztcclxuICAgICAgICBjb25zdCB0b3AgPSB4WzBdID09PSAndG9wJyA/ICc1cHgnIDogKHhbMF0gPT09ICdib3R0b20nID8gJ2NhbGMoMTAwJSAtICcrcysnKScgOiAnY2FsYygoMTAwJSAtICcrcysnKS8yKScpO1xyXG4gICAgICAgIGNvbnN0IGxlZnQgPSB4WzFdID09PSAnbGVmdCcgPyAnNXB4JyA6ICh4WzFdID09PSAncmlnaHQnID8gJ2NhbGMoMTAwJSAtICcrcysnKScgOiAnY2FsYygoMTAwJSAtICcrcysnKS8yKScpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnBvc2l0aW9uKHRvcCwgbGVmdCwgdGhpcy50YWdnZXJTaXplICsgJ3B4Jyk7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3guaWQgPSAodHlwZW9mIHRoaXMudGFnZ2VyVGFnID09PSAnb2JqZWN0JykgPyBKU09OLnN0cmluZ2lmeSh0aGlzLnRhZ2dlclRhZykgOiB0aGlzLnRhZ2dlclRhZztcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWQgPSB0aGlzLnRhZ2dlclNlcnZpY2UuaGFzVGFnZ2VkSXRlbSh0aGlzLnRhZ2dlciwgdGhpcy50YWdnZXJCb3guaWQpO1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnRhZ2dlZENsYXNzID0gdGhpcy50YWdnZXJCb3gudGFnZ2VkID8gdGhpcy50YWdnZWRDbGFzcyA6IHRoaXMudGFnZ2FibGVDbGFzcztcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdJdCA9IHRoaXMudGFnSXQ7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkSXQgPSB0aGlzLnRhZ2dlZEl0O1xyXG4gICAgICAgIHRoaXMudGFnZ2VyQm94LnNob3dUYWdnZXIodGhpcy5zdGlja3kpO1xyXG4gICAgfVxyXG4gICAgb25UYWdTZWxlY3QoZXZlbnQ6YW55KSB7XHJcbiAgICAgICAgdGhpcy50YWdnZXJCb3gudGFnZ2VkID0gIXRoaXMudGFnZ2VyQm94LnRhZ2dlZDtcclxuICAgICAgICB0aGlzLnRhZ2dlckJveC50YWdnZWRDbGFzcyA9IHRoaXMudGFnZ2VyQm94LnRhZ2dlZCA/IHRoaXMudGFnZ2VkQ2xhc3MgOiB0aGlzLnRhZ2dhYmxlQ2xhc3M7XHJcbiAgICAgICAgaWYgKHRoaXMudGFnZ2VyQm94LnRhZ2dlZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5mbzogVGFnSW5mbyA9IHt0YWdnZWRJdGVtOiB0aGlzLnRhZ2dlckJveC5pZCwgdGFnRGF0ZTogbmV3IERhdGUoKX07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ2dlclNlcnZpY2UudGFnSXRlbSh0aGlzLnRhZ2dlciwgaW5mbyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ2dlclNlcnZpY2UudGFnSXRlbSh0aGlzLnRhZ2dlciwgdGhpcy50YWdnZXJCb3guaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YWdnZXJTZXJ2aWNlLnJlbGVhc2VUYWdnZWRJdGVtKHRoaXMudGFnZ2VyLCB0aGlzLnRhZ2dlckJveC5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGVFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnZ2VyQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgICAgICAgICAgIHRhZ2dlcjogdGhpcy50YWdnZXIsXHJcbiAgICAgICAgICAgICAgICB0YWdnZWRJdGVtOnRoaXMudGFnZ2VyQm94LmlkLFxyXG4gICAgICAgICAgICAgICAgdGFnRGF0ZTogbmV3IERhdGUoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ2dlckNoYW5nZWQuZW1pdCh0aGlzLnRhZ2dlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==