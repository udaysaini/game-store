import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const modulesList = [
  MatTabsModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
]

@NgModule({
  imports: [ modulesList ],
  exports: [ modulesList ],
})
export class MaterialModule { }
