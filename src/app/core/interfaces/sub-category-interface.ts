import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CategoryInterface } from './category-interface';

export interface SubCategoryInterface {
  id: number;
  category_id: number;
  category?: CategoryInterface;
  name: string;
}

export interface SubCategoryStoreInterface {
  categoryId: FormControl<number | null>;
  subCategories: FormArray<
    FormGroup<{
      name: FormControl<string | null>;
    }>
  >;
}

export interface SubCategoryUpdateInterface {
  categoryId: FormControl<number | null>;
  name: FormControl<string | null>;
}
