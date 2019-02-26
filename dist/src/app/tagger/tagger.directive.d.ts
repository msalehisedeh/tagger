import { ElementRef, ViewContainerRef, OnInit, EventEmitter, Renderer2, ComponentFactoryResolver } from '@angular/core';
import { TaggerService } from './tagger.service';
export declare class taggerComponent {
    private renderer;
    el: ElementRef;
    show: boolean;
    tagged: boolean;
    taggedClass: string;
    tagIt: string;
    taggedIt: string;
    change: EventEmitter<{}>;
    constructor(renderer: Renderer2, el: ElementRef);
    keyup(event: any): void;
    position(top: string, left: string, size: string): void;
    showTagger(flag: boolean): void;
}
export declare class TaggerDirective implements OnInit {
    el: ElementRef;
    private viewRef;
    private resolver;
    private taggerService;
    private renderer;
    private taggerBox;
    taggedClass: string;
    taggableClass: string;
    tagger: string;
    taggerSize: number;
    position: string;
    taggerTag: any;
    dateEnabled: boolean;
    sticky: boolean;
    tagIt: string;
    taggedIt: string;
    taggerChanged: EventEmitter<{}>;
    focus(event: any): void;
    enter(event: any): void;
    hoverOut(event: any): void;
    constructor(el: ElementRef, viewRef: ViewContainerRef, resolver: ComponentFactoryResolver, taggerService: TaggerService, renderer: Renderer2);
    ngOnInit(): void;
    onTagSelect(event: any): void;
}
