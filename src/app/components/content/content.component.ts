import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faDeezer} from "@fortawesome/free-brands-svg-icons";

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    public faDeezer = faDeezer;

    @Input() public isSidebarDisplay: boolean = false;

    @Output() public showSidebar = new EventEmitter<string>();

    public isStickyNavbar: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    onContainerScroll($event: any) {
        if ($event.target.scrollTop > 30) {
            this.isStickyNavbar = true;
        } else if ($event.target.scrollTop == 0) {
            this.isStickyNavbar = false;
        } else if ($event.target.scrollTop == 1200) {
            this.isStickyNavbar = true;
        }
    }

    toggleSidebar() {
        this.showSidebar.emit();
    }
}
