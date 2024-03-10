import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ConsultaCepService } from "../service/consulta-cep.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  constructor(
    private router: Router,
    private consultaCepService: ConsultaCepService
  ) {}

  ngOnInit(): void {}

  consultaCep(ev: any, f: NgForm) {
    const cep = ev.target.value;
    if (cep !== "") {
      this.consultaCepService
        .getConsultaCep(cep)
        .subscribe((resultado) => this.populandoEndereço(resultado, f));
    }
  }

  populandoEndereço(dados: any, f: NgForm) {
    f.form.patchValue({
      endereco: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    });
  }

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(["./sucesso"]);
    } else {
      alert("Formulário inválido");
    }
  }
}
