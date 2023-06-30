const botaoIniciaCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";


botaoIniciaCamera.addEventListener("click", async function() {
    try{
        const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
        botaoIniciaCamera.style.display = "none";
        campoCamera.style.display = "block";
    
        video.srcObject = iniciarVideo;
    } catch(e){
        console.log(e);
        console.log('camera não encontrada');
    }

});

botaoTirarFoto.addEventListener("click", function(){
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)

    imagemURL = canvas.toDataURL("image/jpeg");

    campoCamera.syle.display = "none";
    mensagem.style.display = "block";
})

botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converterRetorno = JSON.parse(receberDadosExistentes);

    converterRetorno.imagem = imagemURL;

    localStorage.setItem("cadastro", JSON.stringify(converterRetorno));

    window.location.href = "./abrir-conta-form-3.html";
})