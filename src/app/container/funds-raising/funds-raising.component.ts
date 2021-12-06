import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-funds-raising",
  templateUrl: "./funds-raising.component.html",
  styleUrls: ["./funds-raising.component.css"],
})
export class FundsRaisingComponent implements OnInit {
  latitude: any = 18.557404;
  longitude: any = 73.928299;
  zoom: number = 15;
  constructor() {}

  ngOnInit(): void {}
}
