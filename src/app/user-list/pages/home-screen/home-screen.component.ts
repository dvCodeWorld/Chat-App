import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/core/services/users.service";

//types of msg status that is nothing but Tick Sign
type msg_status = 'doubel-tick-green.svg' | 'doubel-tick-grey.svg' | 'single-tick.svg';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class HomeScreenComponent implements OnInit {
  msgStatus:msg_status = 'doubel-tick-green.svg';
  public menuClicked:boolean = false;
  public menuClose!:boolean;
  constructor(
    private _usersService: UsersService
  ) { }
  ngOnInit(): void {
  
  }
  popUpMenu(): void{
    this.menuClicked = !this.menuClicked
    if(!this.menuClicked){
      this.menuClose = true;
    }
  }


}
