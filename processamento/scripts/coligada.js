(() => {
    const modal = document.getElementById("modalColigada");
    const btn = document.getElementById("btnColigada");
    const lista = document.getElementById("listaColigada");
    const pesquisa = document.getElementById("pesquisaColigada");
    const inputColigada = document.getElementById("CODCOLIGADA");

    function abrirModal() {
        modal.style.display = "block";
        carregarColigada();
    }

    function fecharModal() {
        modal.style.display = "none";
    }

    btn.addEventListener("click", abrirModal);

    window.addEventListener("click", function(event) {
        if (event.target === modal) fecharModal();
    });

    async function carregarColigada() {
        try {
            const response = await fetch("http://192.168.18.76:3000/coligada");
            const data = await response.json();
            mostrarColigada(data);
        } catch (err) {
            console.error("Erro ao carregar as coligadas", err);
        }
    }

    function mostrarColigada(coligadas) {
        lista.innerHTML = "";
        coligadas.forEach(l => {
            const item = document.createElement("div");
            item.textContent = `${l.CODCOLIGADA} - ${l.NOME}`;
            item.classList.add("item-coligada");

            item.addEventListener("click", () => {
                inputColigada.value = l.CODCOLIGADA;
                document.getElementById("CO_NOME").value = l.NOME;
                fecharModal();
            });

            lista.appendChild(item);
        });
    }

    pesquisa.addEventListener("input", () => {
        const filtro = pesquisa.value.toLowerCase();
        const items = lista.querySelectorAll(".item-coligada");
        items.forEach(i => {
            i.style.display = i.textContent.toLowerCase().includes(filtro) ? "block" : "none";
        });
    });
})();