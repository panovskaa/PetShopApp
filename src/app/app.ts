import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { CoffeeButtonComponent } from "./components/coffee-button/coffee-button";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CoffeeButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pets-shop-app');
}
