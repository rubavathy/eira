import { Component, Input, OnInit } from '@angular/core';
import { SidenavService } from '../service/sidenav.service';
import { onSideNavChange, animateText } from '../animations/animations';
import { NavItem } from '../shared/nav-item';
import { Router } from '@angular/router';
import th from 'date-fns/esm/locale/th/index.js';

interface Page {
  link: string;
  name: string;
  icon: string;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [onSideNavChange, animateText],
})
export class SidenavComponent implements OnInit {

  public sideNavState: boolean = true;
  public linkText: boolean = false;
  eiraImageSrc = '../../assets/eira32x32.png';

  expanded: boolean = false;
  navItems: NavItem[] = [
    { displayName: 'Home', route: 'dashboard', iconName: 'home' },
    { displayName: 'Visualization', iconName: 'insights' },
    {
      displayName: 'Operation & Maintenance',
      iconName: 'build_circle',
      children: [{ displayName: 'New Ticket', route: 'ticket', iconName: '' }],
    },
    { displayName: 'Analytics', iconName: 'analytics' },
    { displayName: 'Documentation', iconName: 'folder' },
    { displayName: 'Reports', iconName: 'article' },
    {
      displayName: 'Configuration',
      iconName: 'miscellaneous_services',
      children: [
        { displayName: 'Company', route: 'company', iconName: '' },
        { displayName: 'Customer', route: 'customer', iconName: '' },
        { displayName: 'Site', route: 'site', iconName: '' },
        { displayName: 'Equipment', route: 'equipment', iconName: '' },
        { displayName: 'Equipment Type', route: 'equipmenttype', iconName: '' },
        {
          displayName: 'Equipment Category',
          route: 'equipment-category',
          iconName: '',
        },
        { displayName: 'DataLogger', route: 'datalogger', iconName: '' },
        {
          displayName: 'Standardized Error Code',
          route: 'standardised-error-code',
          iconName: '',
        },
        {
          displayName: 'User Permission',
          route: 'user-permission',
          iconName: '',
        },
        {
          displayName: 'User Permission Mapping',
          route: 'user-permission-mapping',
          iconName: '',
        },
        {
          displayName: 'Scheduler',
          route: 'scheduler',
          iconName: '',
        },
        {
          displayName: 'User Site Mapping',
          route: 'user-site-mapping',
          iconName: '',
        },
      ],
    },

    { displayName: 'Logout', route: 'logout', iconName: 'logout' },
  ];

  constructor(private _sidenavService: SidenavService, public router: Router) {
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }

  ngOnInit() {}

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }
}
