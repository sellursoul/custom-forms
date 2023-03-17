import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "./store";
import {getLoading} from "./store/shared/shared.selector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'form-builder';
  showLoading: Observable<boolean>;

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.showLoading = this.store.select(getLoading)
  }
}
