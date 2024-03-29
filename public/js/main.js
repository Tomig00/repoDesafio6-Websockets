const socket = io.connect()

socket.on('mensajes', mensajes => {
    console.log(mensajes)
    render(mensajes)
})

socket.on('productos', prod => {
    crearTabla(prod).then(tabla => {document.getElementById('tablaProducto').innerHTML = tabla})
})


socket.on('prod', function (data) {
    crearTabla(data).then(tabla => {document.getElementById('tablaProducto').innerHTML = tabla})
})

function crearTabla (prod){
    return fetch("views/datos.hbs").then(respuesta => {return respuesta.text()}).then(plantilla => {
        
        const template = Handlebars.compile(plantilla)
        const html = template({prod})
        return html
    })

}

function render(data) {
    
    const html = data
        .map((elem, index) => {
            return `<div align = "left">
            <p><strong style='color: blue'>${elem.mail}</strong> <span style='color: brown'>${elem.tiempo}</span>: <span>${elem.texto}</span></p></div>`
        })
        .join(' ')
        document.getElementById('mensajes').innerHTML = html
    }
socket.on('messages', function (data) {
    render(data)
})



function addMessage(e) {
    
    const tiempo = new Date();
    const mensaje = {
        mail: document.getElementById('mail').value,
        texto: document.getElementById('texto').value,
        tiempo: tiempo.toLocaleString(),
    };
    if (!mail.value){
        alert("Tienes que agregar un mail.")
        return false;
    }
    socket.emit('new-message', mensaje);
    return false;
}

function addProd(e) {
    
    const newProd = {
        title: document.getElementById('title').value,
        price: document.getElementById('precio').value,
        thumbnail: document.getElementById('thumbnail').value,
    };
    
    socket.emit('new-prod', newProd);
    return false;
}