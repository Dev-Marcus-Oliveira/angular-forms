import { Directive } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from "@angular/forms";
import { Observable } from "rxjs";
import { ConsultaCepService } from "../service/consulta-cep.service";
import { map as lodashMap } from "lodash";
import { map as rxjsMap } from "rxjs/operators";

@Directive({
  selector: "[appValidandoCep]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidandoCepDirective,
      multi: true,
    },
  ],
})
export class ValidandoCepDirective implements AsyncValidator {
  constructor(private consultaCepService: ConsultaCepService) {}

  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;

    return this.consultaCepService
      .getConsultaCep(cep)
      .pipe(
        rxjsMap((resultado: any): ValidationErrors | null =>
          resultado.erro ? { appValidandoCep: true } : null
        )
      );
  }
}
