import Hero from "../models/hero.js";

let _marvelAPI = axios.create({
    baseURL: 'https://gateway.marvel.com:443/v1/public'
})

let _sandbox = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/Ryan/heroes'
})



let _characters = 'characters?limit=50'
let _offset = 300;
let _apiKey = '53496df3cd682930aa9108759e347171'

    // Private
let _state = {
    apiHeroes: [],
    myTeam: []
    }

let _subscribers = {
    apiHeroes: [],
    myTeam: []
}

function setState(prop, data) {
    _state[prop] = data
    _subscribers[prop].forEach(fn => fn())
}

// Public
export default class MarvelService {

    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    get ApiHeroes() {
        return _state.apiHeroes.map(h => new Hero(h))
    }

    get MyTeam() {
        return _state.myTeam.map(h => new Hero(h))
    }
    
    addToTeam(id) {
        // Send data to server
        let hero = _state.apiHeroes.find(hero => hero.id == id)
        _sandbox.post('', hero)
            .then(res => {
                console.log(res.data)
            })
    }

    getMyTeamData() {
        _sandbox.get()
            .then(res => {
                let data = res.data.data.map(d => new Hero(d))
                setState('myTeam', data)
            })
            .catch(err => {
                console.error(err)
            })
    }


    getMarvelData() {
        _marvelAPI.get(`${_characters}&offset=${_offset}&apikey=${_apiKey}`)
            .then(res => {
                let data = res.data.data.results.map(d => new Hero(d))
                setState('apiHeroes', data)
            })
            .catch(err => {
                console.error(err)
            })

    }

    remvoveFromTeam(id) {
        _sandbox.delete(id)
            .then(res => {
                this.getMyTeamData()
            })
    }

}