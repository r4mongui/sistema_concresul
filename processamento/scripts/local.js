(() => {
    const modal = document.getElementById("modalLocal");
    const btn = document.getElementById("btnLocal");
    const lista = document.getElementById("listaLocal");
    const pesquisa = document.getElementById("pesquisaLocal");
    const inputLocal = document.getElementById("COD_LOC");

    function abrirModal() {
        modal.style.display = "block";
        carregarLocal();
    }

    function fecharModal() {
        modal.style.display = "none";
    }

    btn.addEventListener("click", abrirModal);

    window.addEventListener("click", function(event) {
        if (event.target === modal) fecharModal();
    });

    async function carregarLocal() {
        try {
            const response = await fetch("http://192.168.18.76:3000/local");
            const data = await response.json();
            mostrarLista(data);
        } catch (err) {
            console.error("Erro ao carregar locais de estoque", err);
        }
    }

    function mostrarLista(locais) {
        lista.innerHTML = "";
        locais.forEach(l => {
            const item = document.createElement("div");
            item.textContent = `${l.COD_LOC} - ${l.NOME}`;
            item.classList.add("item-local");

            item.addEventListener("click", () => {
                inputLocal.value = l.COD_LOC;
                document.getElementById("LOC_NOME").value = l.NOME;
                fecharModal();
            });

            lista.appendChild(item);
        });
    }

    pesquisa.addEventListener("input", () => {
        const filtro = pesquisa.value.toLowerCase();
        const items = lista.querySelectorAll(".item-local");
        items.forEach(i => {
            i.style.display = i.textContent.toLowerCase().includes(filtro) ? "block" : "none";
        });
    });
})();