import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() sidebarVisible: boolean = false;
  @Output() sidebarVisibleChange = new EventEmitter<boolean>();
}
