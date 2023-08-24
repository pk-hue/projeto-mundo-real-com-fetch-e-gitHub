import { getUser } from "./services/user.js"
import { getRepos } from "./services/repositories.js"
import { getEvents } from "./services/events.js"

import { user } from "./objects/obj-user.js"
import { screen } from "./objects/screen.js"

document.getElementById('btn-search').addEventListener('click', ()=> {
    const userName = document.getElementById('input-search').value
    if(validateInput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e)=> {
    const userName = e.target.value
    const key = e.which || e.keyCode 
    const isEnterPressed = key === 13

    if(isEnterPressed){
        if(validateInput(userName)) return
        getUserData(userName)
    } 
})

function validateInput(userName){
    if(userName.length === 0){
        Swal.fire('Preencha o campo corretamente')
        return true
    }
}

async function getUserData(userName){

    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepos(userName)
    const eventsResponse = await getEvents(userName)
    if(userResponse.message === "Not Found"){
        screen.validateNotFound()
        return
    }
    // console.log(eventsResponse)
    user.setInfo(userResponse) 
    user.setrepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    
    screen.renderUser(user)
}
