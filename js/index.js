// Para saber si un usuario está logeado
const user = JSON.parse(localStorage.getItem('Ingreso_exitoso')) || false
if(!user){
    window.location.href = 'login.html'
}

const logout = document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    alert('Hasta pronto')
    // vaciar usuarios
    localStorage.removeItem('Ingreso_exitoso')
    window.location.href = 'login.html'
})

