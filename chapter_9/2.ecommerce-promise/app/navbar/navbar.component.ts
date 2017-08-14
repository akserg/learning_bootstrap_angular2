/*
 * Angular Imports
 */
import { Component } from '@angular/core';

export interface NavItem {
  // Navigation link
  href: string;
  // Navigation Label
  label: string;
  // Status of Navigation Item
  active: boolean;
}

@Component({
  moduleId: module.id,
  selector: 'db-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent { 
  // App name
  appName: string = 'Dream Bean';
  // Navgation items
  navItems: NavItem[] = [
    {href: 'welcome', label: 'Home', active: true},
    {href: 'products', label: 'Products', active: false},
    {href: 'checkout', label: 'Checkout', active: false},
    {href: '#', label: 'Sign out', active: false}
  ];
}

