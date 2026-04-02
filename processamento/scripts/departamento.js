(() => {
    const modal = document.getElementById("modalDepartamento");
    const btn = document.getElementById("btnDepartamento");
    const lista = document.getElementById("listaDepartamento");
    const pesquisa = document.getElementById("pesquisaDepartamento");
    const inputDepartamento = document.getElementById("COD_DEPTO");

    function abrirModal() {
        modal.style.display = "block";
        carregarDepartamento();
    }

    function fecharModal() {
        modal.style.display = "none";
    }

    btn.addEventListener("click", abrirModal);

    window.addEventListener("click", function(event) {
        if (event.target === modal) fecharModal();
    });

    async function carregarDepartamento() {
        try {
            const response = await fetch("http://192.168.18.76:3000/departamento");
            const data = await response.json();
            mostrarDepartamento(data);
        } catch (err) {
            console.error("Erro ao carregar departamentos", err);
        }
    }

    function mostrarDepartamento(departamentos) {
        lista.innerHTML = "";
        departamentos.forEach(f => {
            const item = document.createElement("div");
            item.textContent = `${f.COD_DEPTO} - ${f.NOME}`;
            item.classList.add("item-departamento");

            item.addEventListener("click", () => {
                inputDepartamento.value = f.COD_DEPTO;
                document.getElementById("DEPTO_NOME").value = f.NOME;
                fecharModal();
            });

            lista.appendChild(item);
        });
    }

    pesquisa.addEventListener("input", () => {
        const filtro = pesquisa.value.toLowerCase();
        const items = lista.querySelectorAll(".item-departamento");
        items.forEach(i => {
            i.style.display = i.textContent.toLowerCase().includes(filtro) ? "block" : "none";
        });
    });
})();