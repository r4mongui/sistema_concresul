// Função para formatar data
function formatarData(data) {
    if (!data) return "-";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

// Função principal para gerar o texto do preview
function gerarTexto() {
    const coligada = document.getElementById("coligada").value;

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const nascimento = document.getElementById("nascimento").value;
    const telefone = document.getElementById("telefone").value;

    const rua = document.getElementById("rua")?.value || "";
    const bairro = document.getElementById("bairro")?.value || "";
    const numero = document.getElementById("numero")?.value || "";
    const cidade = document.getElementById("cidade").value;
    const cep = document.getElementById("cep")?.value || "";
    const estado = document.getElementById("estado")?.value || "";

    const apto = document.getElementById("apartamento").value;
    const pav = document.getElementById("pavimento").value;
    const matricula = document.getElementById("matricula").value;

    const inputValor = document.getElementById("valor");
    const dataPag = document.getElementById("data_pag").value;

    const bancoCC = document.getElementById("bancoCC").value;
    const bancoConta = document.getElementById("bancoConta").value;
    const bancoAgencia = document.getElementById("bancoAgencia").value;

    const nascimentoFormatado = formatarData(nascimento);
    const dataPagFormatada = formatarData(dataPag);

    let textoColigada = "";
    let logo = "";
    let nomeColigada = "";
    let cnpjColigada = "";

    if (coligada === "1") {
        textoColigada = `
<b>URBAN RESIDENCE INCORPORADORA SPE LTDA</b>, pessoa jurídica de direito privado,
devidamente inscrita no CNPJ nº 36.281.611/0001-00, com sede a Rua Domingo
de Lima, 615, Vila Aurora I, Rondonópolis-MT, CEP 78.740-026, sendo neste ato
representada por seu administrado, Srº <b>BRUNO CORRENTE LUZ</b>, brasileiro, casado
empresário, filho de Alberto Luz Filho e Maria Cristina Corrente Luz, portador da Cédula de
910.899.641-53, residente na Avenida Governador Júlio José de Campos, nª 835,
apartamento 401, Edifício Gran Lux, Parque Sagrada Família, Rondonópolis - MT, CEP
78.735-330. <br>
        `;

        logo = `<img src="urban.png" style="width:150px; margin-bottom:20px;">`;
        nomeColigada = "URBAN RESIDENCE INCORPORADORA SPE LTDA";
        cnpjColigada = "36.281.611/0001-00";
    }
    else if (coligada === "2") {
        textoColigada = `
<b>HERITAGE OFFICE CONSTRUTORA E INCORPORADORA SPE LTDA</b>, pessoa jurídica de direito privado,
devidamente inscrita no CNPJ nº 34.194.267/0001-89, com sede a Avenida Rotary
Internacional, 1755, Vila Aurora II, Rondonópolis-MT, CEP 78.740-138, sendo neste ato
representada por seu administrado, Srº <b>BRUNO CORRENTE LUZ</b>, brasileiro, casado
empresário, filho de Alberto Luz Filho e Maria Cristina Corrente Luz, portador da Cédula de
910.899.641-53, residente na Avenida Governador Júlio José de Campos, nª 835,
apartamento 401, Edifício Gran Lux, Parque Sagrada Família, Rondonópolis - MT, CEP
78.735-330.
        `;

        logo = `<img src="heritage.png" style="width:150px; margin-bottom:20px;">`;
        nomeColigada = "HERITAGE OFFICE CONSTRUTORA E INCORPORADORA SPE LTDA";
        cnpjColigada = "34.194.267/0001-89";
    }

    return `
<div style="font-family: Calibri; font-size:16px; line-height:1.5; text-align: justify">

${logo}<br>
${textoColigada}<br>

<b>${nome || "NOME NÃO INFORMADO"}</b>, brasileiro(a), nascido(a) em ${nascimentoFormatado},
inscrito(a) no CPF sob o nº ${cpf || "-"},
endereço eletrônico: ${email || "-"},
telefone: ${telefone || "-"},
residente na ${rua || "-"},
nº ${numero || "-"}, ${bairro || "-"},
CEP: ${cep || "-"}, ${cidade || "-"}/${estado || "-"},
doravante denominado <b>COMPRADOR</b>.

<br>

A vendedora neste ato concede aos Compradores acima identificados
autorização para escriturar o imóvel a seguir qualificado:

<br><br>

Apartamento ${apto || "-"} no ${pav || "-"},
matrícula ${matricula || "-"}.

<br><br>

O valor de ${inputValor.value || "R$ 0,00"} pagamento realizado na data de ${dataPagFormatada}.

Valor recebido por meio de boleto bancário na seguinte conta: ${bancoConta || "-"},
Agência: ${bancoAgencia || "-"}, C/C: ${bancoCC || "-"}, ${cnpjColigada},
<b>${nomeColigada}</b>. Imóvel quitado.

</div>
`;
}

// Preview
document.querySelectorAll("input, select").forEach(input => {
    input.addEventListener("input", () => {
        document.getElementById("preview").innerHTML = gerarTexto();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("preview").innerHTML = gerarTexto();
});

function gerarDoc() {
    if (!window.docx) {
        alert("Erro ao carregar biblioteca DOCX");
        return;
    }

    const { Document, Packer, Paragraph, TextRun, ImageRun } = window.docx;

    const coligada = document.getElementById("coligada").value;

    let imagemPath = "";
    if (coligada === "1") imagemPath = "urban.png";
    if (coligada === "2") imagemPath = "heritage.png";

    if (!imagemPath) {
        alert("Selecione uma coligada");
        return;
    }

    let texto = document.getElementById("preview").innerHTML;
    texto = texto.replace(/<\/?div[^>]*>/g, "");
    texto = texto.replace(/<img[^>]*>/g, "");

    const linhas = texto.split(/<br\s*\/?>/i);

    fetch(imagemPath)
        .then(res => res.arrayBuffer())
        .then(imageBuffer => {

            const image = new ImageRun({
                data: imageBuffer,
                transformation: { width: 220, height: 100 }
            });

            let jaInseriuVendedora = false;

            const children = [
                new Paragraph({ children: [image], alignment: "center" }),

                new Paragraph({
                    children: [
                        new TextRun({
                            text: "TERMO DE AUTORIZAÇÂO DE ESCRITURA PÚBLICA",
                            bold: true,
                            size: 24,
                            font: "Calibri"
                        })
                    ],
                    alignment: "center",
                    spacing: { before: 200, after: 100 }
                }),

                ...linhas.flatMap((linha, index) => {
                    const textoLimpo = linha.trim();
                    if (!textoLimpo) return [new Paragraph({})];

                    const blocos = [];

                    if (!jaInseriuVendedora && (textoLimpo.includes("URBAN") || textoLimpo.includes("HERITAGE"))) {
                        jaInseriuVendedora = true;
                        blocos.push(
                            new Paragraph({
                                children: [new TextRun({ text: "VENDEDORA", bold: true, size: 24, font: "Calibri" })],
                                spacing: { before: 0 }
                            }),
                            new Paragraph({
                                children: [new TextRun({ text: "----------------------------------------------------------------------------------------------------------------", size: 24 })],
                                spacing: { after: 100 }
                            })
                        );
                    }

                    if (textoLimpo.includes("COMPRADOR")) {
                        blocos.push(
                            new Paragraph({
                                children: [new TextRun({ text: "COMPRADORES", bold: true, size: 24, font: "Calibri" })]
                            }),
                            new Paragraph({
                                children: [new TextRun({ text: "----------------------------------------------------------------------------------------------------------------", size: 24 })],
                                spacing: { after: 100 }
                            })
                        );
                    }

                    if (textoLimpo.includes("Apartamento")) {
                        blocos.push(
                            new Paragraph({
                                children: [new TextRun({ text: "1. DO IMÓVEL", bold: true, italics: true, size: 24, font: "Calibri" })],
                                alignment: "center",
                            }),
                            new Paragraph({
                                children: [new TextRun({ text: "----------------------------------------------------------------------------------------------------------------", size: 24 })],
                                spacing: { after: 100 }
                            })
                        );
                    }

                    if (textoLimpo.includes("O valor de")) {
                        blocos.push(
                            new Paragraph({
                                children: [new TextRun({ text: "2. DO VALOR PAGO", bold: true, italics: true, size: 24, font: "Calibri" })],
                                alignment: "center",
                            }),
                            new Paragraph({
                                children: [new TextRun({ text: "----------------------------------------------------------------------------------------------------------------", size: 24 })],
                                spacing: { after: 100 }
                            })
                        );
                    }

                    const runs = [];
                    const partes = textoLimpo.split(/(<b>|<\/b>)/g);
                    let bold = false;

                    partes.forEach(parte => {
                        if (parte === "<b>") bold = true;
                        else if (parte === "</b>") bold = false;
                        else if (parte.trim() !== "") {
                            runs.push(new TextRun({
                                text: parte
                                    .replace(/&nbsp;/g, " ")
                                    .replace(/\s+/g, " "),
                                bold: bold,
                                font: "Calibri",
                                size: 24
                            }));
                        }
                    });

                    blocos.push(new Paragraph({
                        children: runs,
                        spacing: { before: 200, after: 200 }
                    }));

                    return blocos;
                }),

                // ✅ ASSINATURA (única mudança real)
                new Paragraph({}),

                new Paragraph({
                    children: [
                        new TextRun({
                            text: "___________________________________________________",
                            size: 24
                        })
                    ],
                    alignment: "center",
                    spacing: { before: 400 }
                }),

                new Paragraph({
                    children: [
                        new TextRun({
                            text: coligada === "1"
                                ? "URBAN RESIDENCE INCORPORADORA SPE LTDA"
                                : "HERITAGE OFFICE CONSTRUTORA E INCORPORADORA SPE LTDA",
                            bold: true,
                            size: 24,
                            font: "Calibri"
                        })
                    ],
                    alignment: "center"
                }),

                new Paragraph({
                    children: [
                        new TextRun({
                            text: "BRUNO CORRENTE LUZ",
                            size: 24,
                            font: "Calibri"
                        })
                    ],
                    alignment: "center"
                })
            ];

            const doc = new Document({
                sections: [{ children }]
            });

            Packer.toBlob(doc).then(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "escrituracao.docx";
                link.click();
            });
        })
        .catch(() => {
            alert("Não foi possível carregar a imagem da coligada.");
        });
}

// XLSX + resto igual (não alterado)
let clientes = [];

fetch("Clientes.xlsx")
    .then(res => res.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        clientes = XLSX.utils.sheet_to_json(sheet);
    });

function renderizarClientes(filtro = "") {
    const container = document.getElementById("resultadoClientes");
    container.innerHTML = "";

    const filtroLower = filtro.toLowerCase();

    const filtrados = clientes.filter(c =>
        c.NOME && c.NOME.toLowerCase().includes(filtroLower)
    ).slice(0, 50); // limita pra não travar

    filtrados.forEach(cliente => {
        const div = document.createElement("div");
        div.textContent = cliente.NOME;
        div.style.padding = "5px";
        div.style.cursor = "pointer";

        div.addEventListener("click", () => {
            preencherCliente(cliente);
            container.innerHTML = "";
            document.getElementById("buscaCliente").value = cliente.NOME;
        });

        container.appendChild(div);
    });
}

function preencherCliente(cliente) {
    const mapa = { "CPF/CNPJ": "cpf" };

    Object.keys(cliente).forEach(coluna => {
        const id = mapa[coluna] || coluna.toLowerCase();
        const input = document.getElementById(id);
        if (input) input.value = cliente[coluna] || "";
    });

    document.getElementById("preview").innerHTML = gerarTexto();
}

document.getElementById("buscaCliente").addEventListener("input", function () {
    renderizarClientes(this.value);
});

const inputValor = document.getElementById("valor");

inputValor.addEventListener("input", function (e) {
    let valor = e.target.value;
    valor = valor.replace(/\D/g, "");
    valor = (valor / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    e.target.value = valor;
});

inputValor.addEventListener("focus", function () {
    if (this.value === "") {
        this.value = "R$ 0,00";
    }
});