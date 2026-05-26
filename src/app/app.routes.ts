import { Routes } from '@angular/router';
import { Header } from './components/global/header/header';
import { Footer } from './components/global/footer/footer';
import { Home } from './components/home/home';
import { PeliculasComponent } from './components/peliculas/peliculas';
import { CardMakerComponent } from './components/CardMaker/card-maker/card-maker';
import { ConversorComponent } from './components/Conversor/conversor/conversor';
import { TTSComponent } from './components/TTS/tts/tts';



export const routes: Routes = [
    { path: '', component: Home },
    { path: 'header', component: Header },
    { path: 'home', component: Home },
    { path: 'peliculas', component: PeliculasComponent },
    { path: 'card-maker', component: CardMakerComponent },
    { path: 'conversor', component: ConversorComponent },
    { path: 'tts', component: TTSComponent },
    { path: 'footer', component: Footer },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
