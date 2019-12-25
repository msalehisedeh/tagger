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
import { TagInfo, TaggerService } from './tagger.service';

@Component({
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
    styles: [
        `:host{width:14px;height:14px;position:absolute;color:#fff;z-index:2;cursor:pointer}`,
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
        `:host .tagger:focus{color: red}`
    ],
})
export class taggerComponent {
    show = false
    tagged = false;
    taggedClass: string;
    tagIt: string;
    taggedIt: string;
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
export class TaggerDirective implements OnInit {
    private taggerBox: any;

    @Input() taggedClass = 'fa fa-minus-square';
    @Input() taggableClass = 'fa fa-tag';
    @Input() tagger: string;
    @Input() taggerSize = 24;
    @Input() position = 'top:left';
    @Input() taggerTag: any;
    @Input() dateEnabled = false;
    @Input() sticky = false;
    @Input() tagIt = 'tag it';
    @Input() taggedIt = 'tagged it';
 
    @Output("taggerChanged")
    taggerChanged = new EventEmitter();

    @HostListener('focus',['$event'])
	focus(event: any) {
        this.taggerBox.showTagger(true);
    }
    @HostListener('mouseenter',['$event'])
	enter(event: any) {
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerBox.id);
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
        this.taggerBox.id = (typeof this.taggerTag === 'object') ? JSON.stringify(this.taggerTag) : this.taggerTag;
        this.taggerBox.tagged = this.taggerService.hasTaggedItem(this.tagger, this.taggerBox.id);
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        this.taggerBox.tagIt = this.tagIt;
        this.taggerBox.taggedIt = this.taggedIt;
        this.taggerBox.showTagger(this.sticky);
    }
    onTagSelect(event:any) {
        this.taggerBox.tagged = !this.taggerBox.tagged;
        this.taggerBox.taggedClass = this.taggerBox.tagged ? this.taggedClass : this.taggableClass;
        if (this.taggerBox.tagged) {
            if (this.dateEnabled) {
                const info: TagInfo = {taggedItem: this.taggerBox.id, tagDate: new Date()};
                this.taggerService.tagItem(this.tagger, info);
            } else {
                this.taggerService.tagItem(this.tagger, this.taggerBox.id);
            }
        } else {
            this.taggerService.releaseTaggedItem(this.tagger, this.taggerBox.id);
        }
        if (this.dateEnabled) {
            this.taggerChanged.emit({
                tagger: this.tagger,
                taggedItem:this.taggerBox.id,
                tagDate: new Date()
            });
        } else {
            this.taggerChanged.emit(this.tagger);
        }
    }
}
