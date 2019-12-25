(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sedeh/wizard-storage'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/tagger', ['exports', '@angular/core', '@sedeh/wizard-storage', '@angular/common'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh.tagger = {}), global.ng.core, global['wizard-storage'], global.ng.common));
}(this, (function (exports, core, wizardStorage, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

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
            { type: wizardStorage.WizardStorageService }
        ]; };
        TaggerService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function TaggerService_Factory() { return new TaggerService(core.ɵɵinject(wizardStorage.WizardStorageService)); }, token: TaggerService, providedIn: "root" });
        TaggerService = __decorate([
            core.Injectable({
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
            this.change = new core.EventEmitter();
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
            { type: core.Renderer2 },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Output()
        ], taggerComponent.prototype, "change", void 0);
        taggerComponent = __decorate([
            core.Component({
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
            this.taggerChanged = new core.EventEmitter();
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
            { type: core.ElementRef },
            { type: core.ViewContainerRef },
            { type: core.ComponentFactoryResolver },
            { type: TaggerService },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], TaggerDirective.prototype, "taggedClass", void 0);
        __decorate([
            core.Input()
        ], TaggerDirective.prototype, "taggableClass", void 0);
        __decorate([
            core.Input()
        ], TaggerDirective.prototype, "tagger", void 0);
        __decorate([
            core.Input()
        ], TaggerDirective.prototype, "taggerSize", void 0);
        __decorate([
            core.Input()
        ], TaggerDirective.prototype, "position", void 0);
        __decorate([
            core.Input()
        ], TaggerDirective.prototype, "taggerTag", void 0);
        __decorate([
            core.Input()
        ], TaggerDirective.prototype, "dateEnabled", void 0);
        __decorate([
            core.Input()
        ], TaggerDirective.prototype, "sticky", void 0);
        __decorate([
            core.Input()
        ], TaggerDirective.prototype, "tagIt", void 0);
        __decorate([
            core.Input()
        ], TaggerDirective.prototype, "taggedIt", void 0);
        __decorate([
            core.Output("taggerChanged")
        ], TaggerDirective.prototype, "taggerChanged", void 0);
        __decorate([
            core.HostListener('focus', ['$event'])
        ], TaggerDirective.prototype, "focus", null);
        __decorate([
            core.HostListener('mouseenter', ['$event'])
        ], TaggerDirective.prototype, "enter", null);
        __decorate([
            core.HostListener('mouseout', ['$event'])
        ], TaggerDirective.prototype, "hoverOut", null);
        TaggerDirective = __decorate([
            core.Directive({
                selector: '[tagger]'
            })
        ], TaggerDirective);
        return TaggerDirective;
    }());

    var TaggerModule = /** @class */ (function () {
        function TaggerModule() {
        }
        TaggerModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    wizardStorage.WizardStorageModule
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
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
            })
        ], TaggerModule);
        return TaggerModule;
    }());

    exports.TaggerDirective = TaggerDirective;
    exports.TaggerModule = TaggerModule;
    exports.TaggerService = TaggerService;
    exports.ɵa = taggerComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-tagger.umd.js.map
