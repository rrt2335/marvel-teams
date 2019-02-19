export default class Hero {
    constructor(data) {
        this.id = data.id || data._id
        this.name = data.name
        this.img = data.img || data.thumbnail.path + "." + data.thumbnail.extension
        this.description = data.description || 'CLASSIFIED'
    }

    getCard() {
        return `
        <div class="col-3">
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${this.img}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">${this.description}</p>
            <button class="btn btn-primary" onclick="app.controllers.marvelController.addToTeam("${this.id}")>Add to team</button>
            </div>
        </div>
    </div>`
    }
}
