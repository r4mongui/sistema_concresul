(() => {
    const modal = document.getElementById("modalPagamento");
    const btn = document.getElementById("btnPagamento");
    const lista = document.getElementById("listaPagamento");
    const pesquisa = document.getElementById("pesquisaPagamento");
    const inputPagamento = document.getElementById("COD_PAG");

    function abrirModal() {
        modal.style.display = "block";
        carregarPagamento();
    }

    function fecharModal() {
        modal.style.display = "none";
    }

    btn.addEventListener("click", abrirModal);

    window.addEventListener("click", function(event) {
        if (event.target === modal) fecharModal();
    });

    async function carregarPagamento() {
        try {
            const response = await fetch("http://192.168.18.76:3000/pagamento");
            const data = await response.json();
            mostrarPagamento(data);
        } catch (err) {
            console.error("Erro ao carregar formas de pagamento", err);
        }
    }

    function mostrarPagamento(pagamentos) {
        lista.innerHTML = "";
        pagamentos.forEach(f => {
            const item = document.createElement("div");
            item.textContent = `${f.COD_PAG} - ${f.NOME}`;
            item.classList.add("item-pagamento");

            item.addEventListener("click", () => {
                inputPagamento.value = f.COD_PAG;
                document.getElementById("PAG_NOME").value = f.NOME;
                fecharModal();
            });

            lista.appendChild(item);
        });
    }

    pesquisa.addEventListener("input", () => {
        const filtro = pesquisa.value.toLowerCase();
        const items = lista.querySelectorAll(".item-pagamento");
        items.forEach(i => {
            i.style.display = i.textContent.toLowerCase().includes(filtro) ? "block" : "none";
        });
    });
})();