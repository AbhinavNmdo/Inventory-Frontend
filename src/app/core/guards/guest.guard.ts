import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('ang-inv-user') != null) {
    router.navigateByUrl('admin/dashboard');
    return false;
  } else {
    return true;
  }
};
