import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DogService } from '../services/dog.service';
import { DogModel } from "../models/dog.model";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SelectedDogGuard implements CanActivate {
 
    public constructor(private dogService: DogService, private router: Router) {}
 
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('route', route);

        if (!this.dogService.SelectedDogDetails()) {
            /*
            this.dogService.SelectedDogDetails.set(
                this.dogService.AllDogs$.pipe(
                    map((dogs: Array<DogModel>) => {
                        return dogs.find((dog: DogModel) => dog.name = route.params['id']);
                    })
                )
            );
            */
           this.router.navigate(['']);

            return false;
        } else {
            return true;
        }
    }
}
