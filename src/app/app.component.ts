import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoadingService} from './interceptors/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'users';

  constructor(public loadingService: LoadingService, private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
