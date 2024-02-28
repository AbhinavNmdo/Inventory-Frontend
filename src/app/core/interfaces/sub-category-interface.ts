import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CategoryInterface } from './category-interface';

export interface SubCategoryInterface {
  id: number;
  category: CategoryInterface;
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
  category_id: FormControl<number | null>;
  name: FormControl<string | null>;
}
