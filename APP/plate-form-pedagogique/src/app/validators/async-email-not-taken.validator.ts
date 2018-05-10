import { AbstractControl } from '@angular/forms';
import { UtilisateurService } from '../service/utilisateur.service';
import 'rxjs/add/operator/map';

export class ValidateEmailNotTaken {
    static createValidator(utilisateurService: UtilisateurService, utilisateurId: string) {
        // return (control: AbstractControl) => {
        //     return utilisateurService.checkEmailNotTaken(control.value, utilisateurId).map(res => {
        //         return res.emailNotTaken ? null : {emailTaken: true};
        //     });
        // }
    }
}
