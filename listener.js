document.addEventListener("DOMContentLoaded", () => {
    const manageForm = document.getElementById("account-management-form");
    const emailInput = document.getElementById("account-management-email");
    const errorElement = document.querySelector(".error");

    function showMessage(message, type = "error") {

        errorElement.textContent = message;

        errorElement.classList.remove(
            "red-text",
            "green-text"
        );

        errorElement.classList.add(
            type === "success"
                ? "green-text"
                : "red-text"
        );

    }

    manageForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        showMessage("");

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
                    showMessage(
                        "usuário atualizado com sucesso.",
                        "success"
                    );
                   
                } else {
                    showMessage(
                        "Nenhum usuário encontrado com esse email."
                    );
                }
            })
            .catch(err => {
                showMessage(
                    "Não foi possível atualizar o usuário."
                );
                errorElement.textContent = "Não foi possível atualizar o usuário";
            });
    });
});