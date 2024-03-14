import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input('item') item : Item | null = null;
  @Output('remove') remove = new EventEmitter<Item>();
  @Output('add') add = new EventEmitter<Item>();

  removeItem(){
    if(!this.item){
      throw new Error("cannot add null value to cart");
    }
    this.remove.emit(this.item);
  }
  addItem(){
    if(!this.item){
      throw new Error("cannot add null value to cart");
    }
    this.add.emit(this.item);
  }

}
