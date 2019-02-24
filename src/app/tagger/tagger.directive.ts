import {
    Directive,
    Component,
    ElementRef,
    ViewContainerRef,
    Input,
    Output,
    OnInit,
    EventEmitter,
    HostListener,
    Renderer2,
    ComponentRef,
    EmbeddedViewRef,
    ComponentFactoryResolver
} from '@angular/core';
import { TaggerService } from './tagger.service';

@Component({
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
    styles: [
        `:host{width: 14px;height: 14px;position: absolute;color: #fff;z-index: 2;}`,
        `:host.hidden{top: -9999px !important;left:-9999px !important;}`,
        `:host .tagger:hover{color: red}`,
        `:host .tagger:focus{color: red}`
    ],
})
export class taggerComponent {
    show = false
    tagged = false;
    taggedClass: string;
    @Output() change = new EventEmitter();
    constructor(private renderer: Renderer2,public el:ElementRef){}
    keyup(event:any){if(event.which == 13){event.target.click()}}
    position(top: string, left: string, size: string) {
        this.renderer.setStyle(this.el.nativeElement,'top', top);
        this.renderer.setStyle(this.el.nativeElement,'left', left);
        this.renderer.setStyle(this.el.nativeElement,'font-size', size); 
    }
    showTagger(flag: boolean) {
        if (flag) {
            this.renderer.removeClass(this.el.nativeElement, 'hidden');
        } else {
            this.renderer.addClass(this.el.nativeElement, 'hidden');
        }
    }
}

@Directive({
    selector: '[tagger]'
})
export class taggerDirective implements OnInit {
    private taggerBox: any;

    @Input() taggedClass = 'fa fa-minus-square';
    @Input() taggableClass = 'fa fa-tag';
    @Input() tagger: string;
    @Input() taggerSize = 24;
    @Input() position = 'top:left';
    @Input() taggerTag: any;
    @Input() sticky = false;
 
    @Output("taggerChanged")
    taggerChanged = new EventEmitter();

    @HostListener('focus',['$event'])
	focus(event: any) {
        this.taggerBox.showTagger(true);
    }
    @HostListener('mouseenter',['$event'])
	enter(event: any) {
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerTag);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.showTagger(true);
    }
    @HostListener('mouseout',['$event'])
	hoverOut(event: any) {
        if (!this.sticky && !event.target.showTagger) {
            const rect = this.el.nativeElement.getBoundingClientRect();
            if (event.x < rect.x ||
                event.clientX >= (rect.x + rect.width) || 
                event.y < rect.y || 
                event.clientY >= (rect.y + rect.height)
                ) {
                this.taggerBox.showTagger(false);
            }
        }
    }
    constructor(
        public el:ElementRef,
        private viewRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private taggerService: TaggerService,
        private renderer: Renderer2
    ) {
        this.renderer.setStyle(this.el.nativeElement,'display','table');
        this.renderer.setStyle(this.el.nativeElement,'position','relative');
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
        let componentFactory = this.resolver.resolveComponentFactory(taggerComponent);
        const componentRef: ComponentRef<any> = this.viewRef.createComponent(componentFactory);
        const domElem = (componentRef.hostView as EmbeddedViewRef < any > ).rootNodes[0] as HTMLElement;
        this.el.nativeElement.appendChild(domElem);
        this.taggerBox = (<taggerComponent>componentRef.instance);

        this.taggerBox.change.subscribe(this.onTagSelect.bind(this));
    }
    
	ngOnInit() {
        const x = this.position.split(':');
        const s = (this.taggerSize + 2) + 'px';
        const top = x[0] === 'top' ? '5px' : (x[0] === 'bottom' ? 'calc(100% - '+s+')' : 'calc((100% - '+s+')/2)');
        const left = x[1] === 'left' ? '5px' : (x[1] === 'right' ? 'calc(100% - '+s+')' : 'calc((100% - '+s+')/2)');
        this.taggerBox.position(top, left, this.taggerSize + 'px');
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerTag);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.showTagger(this.sticky);
    }
    onTagSelect(event:any) {
        this.taggerBox.tagged = !this.taggerBox.tagged;
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerService.updateTag(this.tagger, this.taggerBox.tagged, this.taggerTag)
        this.taggerChanged.emit(this.tagger);
    }
}
