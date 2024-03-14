import { Component, Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Item } from './models/item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  http = inject(HttpClient);


  cart : Item[] = [];
  total : number = 0.0;
  filter : string = "all"
  sort : string = "name";

  title = 'angular-green-grocers';

  // @ts-ignore
  grocers : Item[]  = this.filterItems();

  async getGrocers() : Promise<any>{
    console.log(this.filter);
    if ( this.filter == "all"){
      return await firstValueFrom(this.http.get('https://boolean-api-server.fly.dev/groceries'));
    }else{
      return await firstValueFrom(
        this.http.get(
          'https://boolean-api-server.fly.dev/groceries?type=' + this.filter));
    }
  }

  async filterItems(){
    this.grocers = await this.getGrocers();
    this.sortItems();
  }

  sortItems(){
    console.log(this.sort);
    if ( this.sort == "name"){
      this.grocers.sort(function(a, b){return a.name.localeCompare(b.name)});
    }if(this.sort == "price"){
      // @ts-ignore
      this.grocers.sort(function(a, b){return a.price - b.price});
    }
  }

  updateStatus(item : Item){
    const index = this.cart.findIndex(elm => elm.id == item.id);
    if ( index === -1){
      item.quantity = 1;
      this.cart.push(item);
    }else{
      // @ts-ignore
      this.cart.at(index).quantity++;
    }
    this.total += item.price;
  }

  removeItem(item : Item){
    const index = this.cart.findIndex(elm => elm.id == item.id);
    const elm = this.cart.at(index);
    // @ts-ignore
    this.total -= elm.price;
    if(elm?.quantity == 1){
      this.cart.splice(index, 1);
    }else{
      // @ts-ignore
      this.cart.at(index).quantity--;
    }
  }

  
}
