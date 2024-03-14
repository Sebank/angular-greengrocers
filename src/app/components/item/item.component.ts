import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input('item') item : Item | null = null;
  @Output('update') update = new EventEmitter<Item>();

  addItem(){
    if(!this.item){
      throw new Error("cannot add null value to cart");
    }
    this.update.emit(this.item);
  }
}
