//0cultamos la imagen
let img = $('img')
img.hide();

//listar amigos
const lista = $('#lista')
const boton = $('#boton')
const URL = 'http://localhost:5000/amigos'

const listFriends = (info) => {
    for(const amigo of info){
        lista.append(`<li>${amigo.id}-${amigo.name}</li>`)
    }
    img.hide()
}

const getFriends = () => {
    img.show()
    lista.empty()
    $.get(URL, listFriends)
}

boton.click(getFriends)

//buscar amigo
const search = $('#search')
const input = $('#input')
const friend = $('#amigo')

//limpiar inputs
const cleanInputs = () => {
    input.val('')
    inputDelete.val('')
}

const nameFriend = (info) =>{
    friend.text(info.name)
    cleanInputs();
}


const errorFriend = () => {
    alert(`el amigo con el id ${input.val()} no existe `)

}

const showFriendById = () => {
    const id = input.val() //getElementById('input').value
    $.get(`${URL}/${id}`, nameFriend).fail(errorFriend)
}

search.click(showFriendById);

//Borrar amigo
const inputDelete = $('#inputDelete')
const btnDelete = $('#delete')
const success = $('#success')

btnDelete.click(function(){
    const idDelete = inputDelete.val()

    if(!idDelete) return success.text('Debe llenar el campo para eliminar el amigo')
    if(isNaN(idDelete)) return success.text('Debes ingresar un ID numerico valido')

    $.ajax({
        url: `http://localhost:5000/amigos/${idDelete}`,
        type: 'DELETE',
        success: () => {
            success.text(`el amigo numero ${idDelete} ha sido borrado con exito `)
            getFriends()
            cleanInputs()
        }
    })
})