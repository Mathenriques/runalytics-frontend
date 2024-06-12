import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnInit {
  @Input() userType: string = 'athlete';
  @Input() userId: string = '';

  navBar: any[] = []

  adminNavbar: any[] = [
    // {link: '', name: 'Home'},
    {link: '', name: 'Perfil'},
    {link: '', name: 'Atletas'},
    {link: '', name: 'Cadastrar Novo Administrador'},
  ];

  userNavbar: any[] = [
    // {link: '/home', name: 'Home'},
    {link: `/user/profile/${this.userId}`, name: 'Perfil'},
    // {link: '/treinos', name: 'Histórico de Treinos'},
  ]

  ngOnInit() {
    if (this.userType === 'admin') {
      this.navBar = this.adminNavbar;
    } else {
      this.navBar = this.userNavbar;
    }
  }
}
