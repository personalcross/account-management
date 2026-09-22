document.addEventListener("DOMContentLoaded", () => {
    const manageForm = document.getElementById("account-management-form");
    const emailInput = document.getElementById("account-management-email");
    const errorElement = document.querySelector(".error");

    manageForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        errorElement.textContent = "";

        db.collection('users')
            .where('email', '==', email)
            .get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        doc.ref.update({ role: 'admin' });
                    });
                    manageForm.reset();
                    manageForm.querySelector('.error').innerHTML = '';
                    M.Modal.getInstance(document.querySelector('#modal-manage-account')).close();
                    M.toast({ html: 'Administrador adicionado com sucesso!', classes: 'green' });
                } else {
                    manageForm.querySelector('.error').innerHTML = 'Nenhum usuário encontrado com esse email.';
                }
            })
            .catch(err => {
                errorElement.textContent = "Não foi possível atualizar o usuário";
            });
    });
});