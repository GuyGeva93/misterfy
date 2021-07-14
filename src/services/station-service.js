// import axios from 'axios'
// import { httpService } from './http.service.js'
import { storageService } from './async-storage-service.js'

const STATION_KEY = 'station'
const gStations = [{
    _id: '5c09',
    name: 'Funky Monks',
    tags: [
        'Funk',
        'Happy'
    ],
    createdAt: 1541652422,
    createdBy: {
        _id: 'u101',
        fullname: 'Puki Ben David',
        imgUrl: '@/assets/user-img.png'
    },
    likedByUsers: ['{minimal-user}', '{minimal-user}'],
    songs: [{
            id: 's1001',
            title: 'The Meters - Cissy Strut',
            url: 'https://www.youtube.com/watch?v=fLexgOxsZu0&ab_channel=BrunoMars',
            imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
            addedBy: '{minimal-user}'
        },
        {
            id: 'mUkfiLjooxs',
            title: 'The JB\'s - Pass The Peas',
            url: 'https://www.youtube.com/watch?v=09R8_2nJtjg&ab_channel=Maroon5VEVO',
            imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
            addedBy: {}
        }
    ]
}, {
    _id: '5c10',
    name: 'Junky Funks',
    tags: [
        'pop',
        'sad',
        'romantic'
    ],
    createdAt: 1541652422,
    createdBy: {
        _id: 'u102',
        fullname: 'Shuki Ben David',
        imgUrl: '@/assets/user-img.png'
    },
    likedByUsers: ['{minimal-user}', '{minimal-user}'],
    songs: [{
            id: 's1002',
            title: 'The Meters - Cissy Strut',
            url: 'https://www.youtube.com/watch?v=tAGnKpE4NCI&ab_channel=Metallica',
            imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
            addedBy: '{minimal-user}'
        },
        {
            id: '123123',
            title: 'The JB\'s - Pass The Peas',
            url: 'https://www.youtube.com/watch?v=xwtdhWltSIg&ab_channel=remhq',
            imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
            addedBy: {}
        }
    ]
}]
export const stationService = {
    query,
    getById,
    remove,
    save,
    getEmptyStation,
}

// const STATION_URL = 'http://127.0.0.1:3030/api/station/'

function query() {
    // console.log(sortBy, filterBy);
    let stations = storageService.query(STATION_KEY)
    if (!stations || !stations.length) {
        stations = gStations
        storageService.post(STATION_KEY, stations)
    }
    return stations

    // return axios.get(STATION_URL, { params: { filterBy, sortBy } }).then(res => res.data)
    // return httpService.get(`station`, { filterBy, sortBy })
}

function getById(stationId) {
    return storageService.get(STATION_KEY, stationId)
        // return axios.get(`${STATION_URL}${stationId}`).then(res => res.data)
        // return httpService.get(`station/${stationId}`)
}

function remove(stationId) {
    // console.log(axios.delete(`${STATION_URL}${stationId}`));
    // return axios.delete(`${STATION_URL}${stationId}`).then(res => {
    //     res.data
    // })
    // return httpService.delete(`station/${stationId}`)
    return storageService.delete(STATION_KEY, stationId)

}

async function save(station) {
    const addedStation = storageService.post(STATION_KEY, station)
    return addedStation
        // station = JSON.parse(JSON.stringify(station))
        //     // return axios[method](STATION_URL, station).then(res => res.data)
        // if (!station._id) {
        //     console.log('post');
        //     return await httpService.post(`station`, station)
        // } else {
        //     return await httpService.put(`station/${station._id}`, station)
        // user = await httpService[method](`station/${station._id}`, station)
        // Handle case in which admin updates other station's details
        // if (getLoggedinUser()._id === station._id) _saveLocalUser(station)
        // }
}

function getEmptyStation() {
    return {
        name: '',
        tags: [],
        createdAt: Date.now(),
        createdBy: {},
        likedByUsers: [],
        songs: []
    }

}