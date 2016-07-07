/*
 * Angular Imports
 */
import {Component} from '@angular/core';

import {CategoryListComponent} from '../shared/category/index';

/*
 * Components
 */

@Component({
  selector: 'db-products',
  templateUrl: 'app/product/product-list.component.html',
  directives: [CategoryListComponent]
})
export class ProductListComponent {
}
