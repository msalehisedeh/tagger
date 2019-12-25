import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStorageModule } from '@sedeh/wizard-storage';
import { taggerComponent, TaggerDirective } from './tagger.directive';
import { TaggerService } from './tagger.service';
var TaggerModule = /** @class */ (function () {
    function TaggerModule() {
    }
    TaggerModule = tslib_1.__decorate([
        NgModule({
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
        })
    ], TaggerModule);
    return TaggerModule;
}());
export { TaggerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC90YWdnZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL3RhZ2dlci90YWdnZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXVCakQ7SUFBQTtJQUEyQixDQUFDO0lBQWYsWUFBWTtRQXJCeEIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osbUJBQW1CO2FBQ3BCO1lBQ0QsWUFBWSxFQUFFO2dCQUNiLGVBQWU7Z0JBQ2QsZUFBZTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxlQUFlO2FBQ2hCO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLGVBQWU7YUFDaEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsYUFBYTthQUNkO1lBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDbEMsQ0FBQztPQUVXLFlBQVksQ0FBRztJQUFELG1CQUFDO0NBQUEsQUFBNUIsSUFBNEI7U0FBZixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgV2l6YXJkU3RvcmFnZU1vZHVsZSB9IGZyb20gJ0BzZWRlaC93aXphcmQtc3RvcmFnZSc7XHJcblxyXG5pbXBvcnQgeyB0YWdnZXJDb21wb25lbnQsIFRhZ2dlckRpcmVjdGl2ZSB9IGZyb20gJy4vdGFnZ2VyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRhZ2dlclNlcnZpY2UgfSBmcm9tICcuL3RhZ2dlci5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgV2l6YXJkU3RvcmFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcblx0ICB0YWdnZXJDb21wb25lbnQsXHJcbiAgICBUYWdnZXJEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFRhZ2dlckRpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICB0YWdnZXJDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgVGFnZ2VyU2VydmljZVxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGFnZ2VyTW9kdWxlIHt9XHJcbiJdfQ==