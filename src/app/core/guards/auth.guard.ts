import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('ang-inv-user') != null) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
