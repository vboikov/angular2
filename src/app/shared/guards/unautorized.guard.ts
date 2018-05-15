import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import 'rxjs/add/operator/first';

@Injectable()
export class UnauthorizedGuard implements CanActivate {

	constructor(private authService: AuthService,
	            private router: Router) {
	}

	canActivate(next: ActivatedRouteSnapshot,
	            state: RouterStateSnapshot): boolean {
		if (this.authService.auth2UserToken) {
			this.router.navigate(['/musicshelf/playlists']);
			return false;
		} else {
			return true;
		}
	}
}
