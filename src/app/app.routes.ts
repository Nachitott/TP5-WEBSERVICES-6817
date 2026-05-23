import { Routes } from '@angular/router';
import { Header } from './components/global/header/header';
import { Footer } from './components/global/footer/footer';
import { Home } from './components/home/home';
import { PeliculasComponent } from './components/peliculas/peliculas';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'header', component: Header },
    { path: 'home', component: Home },
    { path: 'peliculas', component: PeliculasComponent },
    { path: 'footer', component: Footer },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
