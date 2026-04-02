(() => {
    const modal = document.getElementById("modalFornecedor");
    const btn = document.getElementById("btnFornecedor");
    const lista = document.getElementById("listaFornecedor");
    const pesquisa = document.getElementById("pesquisaFornecedor");
    const inputFornecedor = document.getElementById("CODCFO");

    function abrirModal() {
        modal.style.display = "block";
        carregarFornecedores();
    }

    function fecharModal() {
        modal.style.display = "none";
    }

    btn.addEventListener("click", abrirModal);

    window.addEventListener("click", function(event) {
        if (event.target === modal) fecharModal();
    });

    async function carregarFornecedores() {
        try {
            const response = await fetch("http://192.168.18.76:3000/fornecedores");
            const data = await response.json();
            mostrarLista(data);
        } catch (err) {
            console.error("Erro ao carregar fornecedores", err);
        }
    }

    function mostrarLista(fornecedores) {
        lista.innerHTML = "";
        fornecedores.forEach(f => {
            const item = document.createElement("div");
            item.textContent = `${f.CODCFO} - ${f.NOMEFANTASIA} - ${f.CGCFO}`;
            item.classList.add("item-fornecedor");

            item.addEventListener("click", () => {
                inputFornecedor.value = f.CODCFO;
                document.getElementById("FO_NOME").value = f.NOMEFANTASIA;
                fecharModal();
            });

            lista.appendChild(item);
        });
    }

    pesquisa.addEventListener("input", () => {
        const filtro = pesquisa.value.toLowerCase();
        const items = lista.querySelectorAll(".item-fornecedor");
        items.forEach(i => {
            i.style.display = i.textContent.toLowerCase().includes(filtro) ? "block" : "none";
        });
    });
})();