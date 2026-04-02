(() => {
    const modal = document.getElementById("modalSerie");
    const btn = document.getElementById("btnSerie");
    const lista = document.getElementById("listaSerie");
    const pesquisa = document.getElementById("pesquisaSerie");
    const inputSerie = document.getElementById("COD_SERIE");

    function abrirModal() {
        modal.style.display = "block";
        carregarSerie();
    }

    function fecharModal() {
        modal.style.display = "none";
    }

    btn.addEventListener("click", abrirModal);

    window.addEventListener("click", function(event) {
        if (event.target === modal) fecharModal();
    });

    async function carregarSerie() {
        try {
            const response = await fetch("http://192.168.18.76:3000/serie");
            const data = await response.json();
            mostrarSerie(data);
        } catch (err) {
            console.error("Erro ao carregar as Séries", err);
        }
    }

    function mostrarSerie(locais) {
        lista.innerHTML = "";
        locais.forEach(l => {
            const item = document.createElement("div");
            item.textContent = `${l.COD_SERIE} - ${l.NOME}`;
            item.classList.add("item-serie");

            item.addEventListener("click", () => {
                inputSerie.value = l.COD_SERIE;
                document.getElementById("SERIE_NOME").value = l.NOME;
                fecharModal();
            });

            lista.appendChild(item);
        });
    }

    pesquisa.addEventListener("input", () => {
        const filtro = pesquisa.value.toLowerCase();
        const items = lista.querySelectorAll(".item-serie");
        items.forEach(i => {
            i.style.display = i.textContent.toLowerCase().includes(filtro) ? "block" : "none";
        });
    });
})();