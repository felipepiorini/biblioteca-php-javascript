function saveUser() {
  let data = {
    nome: document.getElementById("nome").value,
    dataNasc: document.getElementById("dataNasc").value,
    cpf: document.getElementById("cpf").value,
  };

  fetch("../models/usuarios.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((data) => {
      if (data.status === 200) {
        var modalElement = document.getElementById("modalUsuarios");
        var modalUsuarios = bootstrap.Modal.getInstance(modalElement);
        modalUsuarios.hide();

        var modalSuccess = new bootstrap.Modal(
          document.getElementById("modalSuccess")
        );
        modalSuccess.show();
        getUsuarios();
      }
    })
    .catch((err) => console.log(err));
}

function getUsuarios() {
  fetch("../models/listarUsuarios.php")
    .then(function (response) {
      response.json().then(function (data) {

        $("#listaUsuarios>tbody").html("");

        data.forEach((element) => {
          $("#listaUsuarios>tbody").append("<tr>");

          $("#listaUsuarios>tbody").append("<td>" + element.id + "</td>");
          $("#listaUsuarios>tbody").append("<td>" + element.nome + "</td>");
          $("#listaUsuarios>tbody").append(
            "<td>" + element.data_nascimento + "</td>"
          );
          $("#listaUsuarios>tbody").append(
            "<td>" + element.cpf + "</td>"
          );
          $("#listaUsuarios>tbody").append(
            "<td><div class='btn-group' role='group'>" +
              "<a type='button' class='btn btn-outline-primary' onclick='consultar(" +
              element.id +
              ")'>Consultar</a>" +
              "<a type='button' class='btn btn-outline-primary'>Editar</a>" +
              "<a type='button' class='btn btn-outline-danger'>Excluir</a>" +
              "</div></td>"
          );
          $("#listaUsuarios>tbody").append("</tr>");
        });
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });

}

function consultar(userId) {
  console.log(userId);
}

window.onload = () => {
  getUsuarios();
};
