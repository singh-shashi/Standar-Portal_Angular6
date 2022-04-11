import { Component } from '../../../node_modules/@angular/core';

@Component({
    selector: 'read-more',
    template: `
        <div [class.collapsed]="isCollapsed" style="word-break:break-all;">
            <ng-content></ng-content>
            <div class="moreanchor" (click)="isCollapsed =! isCollapsed" [ngClass]="{ 'expanded-note': !isCollapsed }">
                <i class="fa fa-angle-double-down" title="Expand/ Collapse"></i>
            </div>
        </div>
    `,
    styles: [`
        div.collapsed {
            max-height: 100px;
            overflow: hidden;
        }
        div.collapsed > .moreanchor {
            position: absolute;
            top: 0;
            right: 3%;
            cursor: pointer;
            color: blue;
            text-decoration: underline;
            display: none;
        }

        .moreanchor {
            position: absolute;
            top: 0;
            right: 3%;
            cursor: pointer;
            color: blue;
            text-decoration: underline;
            background: #FFEBCD;
            padding: 1px 6px;
            border-radius: 6px;
            border: 1px solid #EFDBBD;
            box-shadow: 3px 3px 4px #dedede;
        }

        .expanded-note {
            background: #F0F8FF;
            border-color: #E0E8EF;
        }
    `]
})

export class ReadMoreComponent {
    isCollapsed = true;
}
