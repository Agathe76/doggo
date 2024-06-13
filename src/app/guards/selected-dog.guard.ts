import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { DogService } from '../services/dog.service';
import { Observable, map, of } from "rxjs";
import { DogModel } from "../models/dog.model";

@Injectable({
    providedIn: 'root'
})
export class SelectedDogGuard implements CanActivate {
 
    public constructor(private dogService: DogService) {}
 
    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        if (!this.dogService.SelectedDogDetails()) {
            return this.dogService.GetDogByName(route.params['id']).pipe(
                    map((dogDetails: DogModel) => {
                        return !!dogDetails;
                    })
                );
        } else {
            return of(true);
        }
    }
}
