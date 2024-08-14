

//crud - CREATE, READ, UPDATE, DELETE

//Interações com layout

const showClient = () => {
    const client = {
        nome: document.getElementById('name').value,
        data: document.getElementById('birth-date').value
    }
    console.log(client)
}

//eventos
document.querySelector('.form')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        showClient()
    })