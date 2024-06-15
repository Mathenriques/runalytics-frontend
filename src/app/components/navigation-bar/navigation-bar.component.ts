import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

type NavLink = {
  link: string;
  name: string;
}

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnChanges {
  @Input() userType: string = 'athlete';
  @Input() userId: string | null = '';

  adminNavbar: NavLink[] = [];
  userNavbar: NavLink[] = [];
  navBar: NavLink[] = []

  ngOnChanges() {
    this.adminNavbar = [
      // {link: '', name: 'Home'},
      {link: `/user/profile/${this.userId}`, name: 'Perfil'},
      {link: '', name: 'Atletas'},
      {link: '', name: 'Cadastrar Novo Administrador'},
    ];

    this.userNavbar = [
      // {link: '/home', name: 'Home'},
      {link: `/user/profile/${this.userId}`, name: 'Perfil'},
      {link: '/treinos', name: 'Treinos'},
    ]
    if (this.userType === 'admin') {
      this.navBar = this.adminNavbar;
    } else {
      this.navBar = this.userNavbar;
    }
  }
}
