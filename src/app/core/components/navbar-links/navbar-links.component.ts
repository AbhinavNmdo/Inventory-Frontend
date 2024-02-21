import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-links',
  templateUrl: './navbar-links.component.html',
  styleUrl: './navbar-links.component.css'
})
export class NavbarLinksComponent {
  @Input() href:string = '';
  @Input() label:string = '';
  @Input() icon:string = '';
}
