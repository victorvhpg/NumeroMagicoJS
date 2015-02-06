/*
    @victorvhpg
    https://github.com/victorvhpg/NumeroMagicoJS
*/
(function(NumeroMagicoJS) {
    "use strict";
    //retorna uma Promise que faz  download de urlArquivo com responseType  ArrayBuffer
    //resolve a Promise com o ArrayBuffer do arquivo
    var downloadArquivo = function(urlArquivo) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", urlArquivo, true);
            //setar o responseType para arraybuffer
            xhr.responseType = "arraybuffer";
            //quando a requisicao completar com sucesso
            xhr.addEventListener("load", function() {
                //se nao for 200 entao deu algum erro
                if (this.status !== 200) {
                    reject("Erro ajax: " + this.statusText);
                    return;
                }
                //devido ao responseType ser "arraybuffer"
                //o this.response ja esta "parseado" e eh um
                //ArrayBuffer
                console.log(this.response instanceof ArrayBuffer); // true
                var arrayBuffer = this.response;
                if (arrayBuffer) {
                    resolve(arrayBuffer);
                } else {
                    reject("arrayBuffer vazio");
                }
            }, false);
            //quando ocorrer algum erro  na requisicao
            xhr.addEventListener("error", function() {
                console.log("error", arguments);
                console.log(this);
                reject("Erro no ajax");
            }, false);

            xhr.send(null);
        });
    };


    //faz  download do arquivo 'teste.zip' como ArrayBuffer
    //le o ArrayBuffer atraves do DataView buscando o numero magico
    //do arquivo
    downloadArquivo("./teste.zip").then(function(arrayBuffer) {
        //transforma em DataView para oder manipular os bytes
        var dataView = new DataView(arrayBuffer);
        var numeroMagicoArquivo = (new NumeroMagicoJS()).getArqNumeroMagicoArquivo(dataView);
        if (numeroMagicoArquivo) {
            console.log("numeroMagicoArquivo", numeroMagicoArquivo);
            console.log("Tipo: " + numeroMagicoArquivo.tipo);
            console.log("Numero Magico: " + numeroMagicoArquivo.numeroMagico.map(function(n) {
                return n.toString(16);
            }));
        } else {
            throw new Error("Não foi possivel identificar o numero magico do arquivo");
        }

    }).catch(function(erro) {
        console.log(erro);
    });
})(NumeroMagicoJS);