import MarvelService from "./marvelService.js";

// Private

let _marvelService = new MarvelService() 

function drawApiHeroes() {
    let template = ''
    let heroes = _marvelService.ApiHeroes
    heroes.forEach(h => {
        let button = ''
        template += h.getCard()
    })
    document.querySelector('.marvel-characters').innerHTML = template
}

function drawMyTeam() {
    let template = ''
    let heroes = _marvelService.MyTeam
    heroes.forEach(h => {
        let button = ''
        template += h.getCard()
    })
    document.querySelector('.marvel-characters').innerHTML = template
}

// Public
export default class MarvelController {
    constructor() {
        _marvelService.addSubscriber('apiHeroes', drawApiHeroes)
        _marvelService.getMarvelData()
    }
    addToTeam(id) {
        _marvelService.addToTeam(id)
    }
}