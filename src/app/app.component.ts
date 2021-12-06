import { Component } from "@angular/core";
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { AuthService } from "./container/home/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "unexo-website";
  loading = false;
  subscription: Subscription;
  browserRefresh: Subscription;
  constructor(private router: Router, public authservice: AuthService) {
    this.subscription = this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;

          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    this.browserRefresh = this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.ngOnInit();
        }
      });
  }
  ngOnInit() {
    if (this.authservice.loggedIn()) {
      this.authservice.logoutUser();
    }
    this.router.navigate([""]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.browserRefresh.unsubscribe();
  }
}
