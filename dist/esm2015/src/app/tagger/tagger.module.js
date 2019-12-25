import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStorageModule } from '@sedeh/wizard-storage';
import { taggerComponent, TaggerDirective } from './tagger.directive';
import { TaggerService } from './tagger.service';
let TaggerModule = class TaggerModule {
};
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
export { TaggerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC90YWdnZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL3RhZ2dlci90YWdnZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXVCakQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtDQUFHLENBQUE7QUFBZixZQUFZO0lBckJ4QixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1NBQ3BCO1FBQ0QsWUFBWSxFQUFFO1lBQ2IsZUFBZTtZQUNkLGVBQWU7U0FDaEI7UUFDRCxPQUFPLEVBQUU7WUFDUCxlQUFlO1NBQ2hCO1FBQ0QsZUFBZSxFQUFFO1lBQ2YsZUFBZTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNULGFBQWE7U0FDZDtRQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO0tBQ2xDLENBQUM7R0FFVyxZQUFZLENBQUc7U0FBZixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgV2l6YXJkU3RvcmFnZU1vZHVsZSB9IGZyb20gJ0BzZWRlaC93aXphcmQtc3RvcmFnZSc7XHJcblxyXG5pbXBvcnQgeyB0YWdnZXJDb21wb25lbnQsIFRhZ2dlckRpcmVjdGl2ZSB9IGZyb20gJy4vdGFnZ2VyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRhZ2dlclNlcnZpY2UgfSBmcm9tICcuL3RhZ2dlci5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgV2l6YXJkU3RvcmFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcblx0ICB0YWdnZXJDb21wb25lbnQsXHJcbiAgICBUYWdnZXJEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFRhZ2dlckRpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICB0YWdnZXJDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgVGFnZ2VyU2VydmljZVxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGFnZ2VyTW9kdWxlIHt9XHJcbiJdfQ==