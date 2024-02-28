import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { CategoryInterface } from "./category-interface";

export interface SubCategoryInterface {
    id: number;
    category: CategoryInterface;
    name: string;
}

export interface SubCategoryStoreInterface {
    subCategories: FormArray<FormGroup<SubCategoryUpdateInterface>>;
}

export interface SubCategoryUpdateInterface {
    category_id: FormControl<number|null>;
    name: FormControl<string|null>;
}