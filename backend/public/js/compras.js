const formularioCompras = document.querySelector("#formulariocompras")

formularioCompras.addEventListener("submit",comprardisco)



async function comprardisco(event) {
    event.preventDefault()

    const dataForm = Object.fromEntries(new FormData(event.target))
    console.log(dataForm);
    

    const request = await fetch("http://localhost:3001/api/compras",{
        method: "POST",
        body: JSON.stringify(dataForm),
        headers: {
            "Content-type": "application/json"
        }
    })
    console.log(request);
    

    if(request.status === 200){
        const data = await request.json()

        location.href="/discopagado"
    }
}