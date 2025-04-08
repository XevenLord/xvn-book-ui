import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {MenuComponent} from "../../components/menu/menu.component";

@Component({
  selector: 'app-main',
  imports: [RouterModule, MenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
