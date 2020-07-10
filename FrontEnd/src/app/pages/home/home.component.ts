import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  private categorie: string = "";

  constructor(private router: Router) {}

  ngOnInit() {
    this.categorie;
  }

  private onClick() {
    if (this.categorie.length > 0) {
      this.router.navigate([`busca/${this.categorie}`]);
    }
  }
}
