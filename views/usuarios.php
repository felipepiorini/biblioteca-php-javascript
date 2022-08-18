<?php

include("header.php");
include("menu.php");
include("footer.php");

?>

<script type="text/javascript" src="../assets/usuarios.js"> </script>

<div class="container">

    <br>

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalUsuarios">Adicionar</button>

    <div class="space"> </div>

    <div class="card">
        <div class="card-body">

            <table class="table table-striped table-hover" id="listaUsuarios">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Data Nasc</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>

            <div class="modal fade" id="modalUsuarios" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitle">Adicionar Usuário</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form>
                            <div class="modal-body">

                                <input type="hidden" id="userId" name="userId">

                                <div class="mb-3">
                                    <label for="nome" class="form-label">Nome</label>
                                    <input type="text" class="form-control" id="nome" name="nome" required>
                                </div>

                                <div class="mb-3">
                                    <label for="dataNasc" class="form-label">Data de Nascimento</label>
                                    <input type="text" class="form-control" id="dataNasc" name="dataNasc" required>
                                </div>

                                <div class="mb-3">
                                    <label for="cpf" class="form-label">CPF</label>
                                    <input type="text" class="form-control" id="cpf" name="cpf" required>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" class="btn btn-primary" id="btnSave" onclick="saveUser()">Salvar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="modalExcluirUsuario" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Excluir Usuário</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <input type="hidden" id="deleteUserId" name="deleteUserId">

                            <p>Tem certeza que deseja excluir este usuario ?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-danger" onclick="realDeleteUser()">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>

<style type="text/css">
    .space {
        padding: 15px;
    }

    .table>tbody {
        vertical-align: baseline;
    }
</style>