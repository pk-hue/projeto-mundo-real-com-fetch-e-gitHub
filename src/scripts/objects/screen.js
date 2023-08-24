const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info"> 
                             <img src="${user.avatarUrl} alt="user image"/>
                             <div>
                             <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                             <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                             <p>Seguidores: ${user.followers} </p>
                             <p>Seguido: ${user.following} </p>
                             </div>
                         </div>`

        let repositoriesItens = ''                
        user.repositories.forEach(repo => repositoriesItens += 
        `<li><a href="${repo.html_url} target="_blank"">${repo.name}</a> <span>🍴${repo.forks} ⭐${repo.stargazers_count} 👀${repo.watchers} 👨‍💻${repo.language  ??  'sem linguangem'}</span></li>`)
        
        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul> 
                                           </div>`
        }

        let eventsItens = ''
        user.events.forEach(event => {
            // debugger
            if(event.type === "PushEvent"){ 
                eventsItens += `<li><p>${event.repo.name}<span class="commit-message"> -${event.payload.commits[0].message}</span></p></li>`
            }else if(event.type === "CreateEvent"){
                eventsItens += `<li><p>${event.repo.name}<span class="commit-message"> -${event.payload.ref_type}</span></p></li>`
            }
        })
        // debugger
        if(user.events.length > 0){ 
            
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                           </div>`                                
        }else {
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <h3>Este usuário não possui eventos😥</h3>
                                           </div>`;      
        }
    }, 
    validateNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }