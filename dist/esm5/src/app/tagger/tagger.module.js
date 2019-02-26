/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStorageModule } from '@sedeh/wizard-storage';
import { taggerComponent, TaggerDirective } from './tagger.directive';
import { TaggerService } from './tagger.service';
var TaggerModule = /** @class */ (function () {
    function TaggerModule() {
    }
    TaggerModule.decorators = [
        { type: NgModule, args: [{
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
                },] }
    ];
    return TaggerModule;
}());
export { TaggerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC90YWdnZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL3RhZ2dlci90YWdnZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Z0JBRWhELFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7cUJBQ3BCO29CQUNELFlBQVksRUFBRTt3QkFDYixlQUFlO3dCQUNkLGVBQWU7cUJBQ2hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3FCQUNoQjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2YsZUFBZTtxQkFDaEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULGFBQWE7cUJBQ2Q7b0JBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ2xDOzt1QkExQkQ7O1NBNEJhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBXaXphcmRTdG9yYWdlTW9kdWxlIH0gZnJvbSAnQHNlZGVoL3dpemFyZC1zdG9yYWdlJztcclxuXHJcbmltcG9ydCB7IHRhZ2dlckNvbXBvbmVudCwgVGFnZ2VyRGlyZWN0aXZlIH0gZnJvbSAnLi90YWdnZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVGFnZ2VyU2VydmljZSB9IGZyb20gJy4vdGFnZ2VyLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBXaXphcmRTdG9yYWdlTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuXHQgIHRhZ2dlckNvbXBvbmVudCxcclxuICAgIFRhZ2dlckRpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgVGFnZ2VyRGlyZWN0aXZlXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIHRhZ2dlckNvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBUYWdnZXJTZXJ2aWNlXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWdnZXJNb2R1bGUge31cclxuIl19