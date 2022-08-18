function saveUser() {
  var data = {
    nome: document.getElementById("nome").value,
    dataNasc: document.getElementById("dataNasc").value,
    cpf: document.getElementById("cpf").value,
  };

  var userId = document.getElementById("userId").value;

  if (userId) {
    data.userId = userId;

    fetch("../models/usuarios/editarUsuario.php", {
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
          document.getElementById("userId").value = "";
          getUsuarios();
        }
      })
      .catch((err) => console.log(err));
  } else {
    fetch("../models/usuarios/cadastrarUsuario.php", {
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
}

function getUsuarios() {
  fetch("../models/usuarios/listarUsuarios.php")
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
          $("#listaUsuarios>tbody").append("<td>" + element.cpf + "</td>");
          $("#listaUsuarios>tbody").append(
            "<td><div class='btn-group' role='group'>" +
              "<a type='button' class='btn btn-outline-primary' onclick='consultar(" +
              element.id +
              ")'>Consultar</a>" +
              "<a type='button' class='btn btn-outline-primary' onclick='editar(" +
              element.id +
              ")'>Editar</a>" +
              "<a type='button' class='btn btn-outline-danger' onclick='excluir(" +
              element.id +
              ")'>Excluir</a>" +
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
  fetch(`../models/usuarios/consultarUsuario.php?userId=${userId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalUsuarios");
        var modalUsuarios = bootstrap.Modal.getInstance(modalElement);
        modalUsuarios.show();

        document.getElementById("userId").value = data[0];
        document.getElementById("nome").value = data[1];
        document.getElementById("dataNasc").value = data[2];
        document.getElementById("cpf").value = data[3];

        document.getElementById("nome").setAttribute("disabled", true);
        document.getElementById("dataNasc").setAttribute("disabled", true);
        document.getElementById("cpf").setAttribute("disabled", true);
        document.getElementById("btnSave").setAttribute("disabled", true);

        document.getElementById("modalTitle").textContent = "Consultar Usuário";
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function editar(userId) {
  fetch(`../models/usuarios/consultarUsuario.php?userId=${userId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalUsuarios");
        var modalUsuarios = bootstrap.Modal.getInstance(modalElement);
        modalUsuarios.show();

        document.getElementById("userId").value = data[0];
        document.getElementById("nome").value = data[1];
        document.getElementById("dataNasc").value = data[2];
        document.getElementById("cpf").value = data[3];

        document.getElementById("nome").disabled = false;
        document.getElementById("dataNasc").disabled = false;
        document.getElementById("cpf").disabled = false;
        document.getElementById("btnSave").disabled = false;

        document.getElementById("modalTitle").textContent = "Editar Usuário";
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function excluir(userId) {
  var modalElementDelete = document.getElementById("modalExcluirUsuario");
  var modalExcluirUsuario = bootstrap.Modal.getInstance(modalElementDelete);
  modalExcluirUsuario.show();

  document.getElementById("deleteUserId").value = userId;
}

function realDeleteUser() {
  var deleteUserId = document.getElementById("deleteUserId").value;

  fetch(`../models/usuarios/excluirUsuario.php?userId=${deleteUserId}`, {
    method: "DELETE",
  })
    .then(function (response) {
      $("#modalExcluirUsuario").modal("hide");

      var modalSuccess = new bootstrap.Modal(
        document.getElementById("modalSuccess")
      );
      modalSuccess.show();

      getUsuarios();
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

window.onload = () => {
  // inicializa o modal escondido na tela
  $("#modalUsuarios").modal("hide");
  $("#modalExcluirUsuario").modal("hide");
  getUsuarios();
};
