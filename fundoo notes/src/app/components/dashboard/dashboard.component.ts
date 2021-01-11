import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from "../../services/dataSharing/data-sharing.service";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnDestroy {
  value:any;
  subscription:any;
  showFirst=false;
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => "Nav Item ${i + 1}");
  fillerContent = Array.from({length: 50}, () => "");
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.subscription = this.dataService.currentValue.subscribe(value => this.value = value)
  }

  constructor(changeDetectorRef: ChangeDetectorRef, 
              media: MediaMatcher, 
              private route: Router,
              private dataService:DataSharingService ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    console.log(this.showFirst)
  }

  showFirstM() {
    this.showFirst=!this.showFirst;
    this.dataService.changeValue(this.showFirst);
    console.log(this.showFirst)
  }

  ngOnDestroy(): void { this.mobileQuery.removeListener(this._mobileQueryListener); }

  notes() { this.route.navigate(['/dashboard/note']); }

  archive() { this.route.navigate(['/dashboard/archive']); }

  trash() { this.route.navigate(['/dashboard/trash']); }

  logout() {
    localStorage.removeItem("token");
    this.route.navigate(['/signIn']);
  }
}