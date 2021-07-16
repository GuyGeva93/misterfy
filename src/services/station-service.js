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
        'Funk',
        'Pop',
        'Sad',
        'Romantic'
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
    saveSong
}

// const STATION_URL = 'http://127.0.0.1:3030/api/station/'

async function query() {
    // console.log(sortBy, filterBy);
    let stations = await storageService.query(STATION_KEY)
    if (!stations || !stations.length) {
        stations = gStations
        storageService.postMany(STATION_KEY, stations)
    }
    return stations

    // return axios.get(STATION_URL, { params: { filterBy, sortBy } }).then(res => res.data)
    // return httpService.get(`station`, { filterBy, sortBy })
}

async function getById(stationId) {
    const station = await storageService.get(STATION_KEY, stationId)
    console.log('station', station)
    return station
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
    if (station._id) {
        const updatedStation = await storageService.put(STATION_KEY, station)
        return updatedStation
    }
    const addedStation = await storageService.post(STATION_KEY, station)
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
    const station = {
        _id: '',
        name: '',
        description: '',
        tags: [],
        createdAt: Date.now(),
        // createdBy: {},
        // likedByUsers: [],
        songs: []
    }
    return station
}

async function saveSong(song, stationId) {
    const station = await getById(stationId)
    station.songs.push({
        id: song.id.videoId,
        title: song.snippet.title,
        imgUrl: song.snippet.thumbnails.default.url,
        addedBy: ''
            // url: ,

    })
    const updatedStation = await save(station)
    return updatedStation
}
// async function removeSong(song, stationId) {
//     const station = await getById(stationId)
//     station.songs.push({
//         id: song.id.videoId,
//         title: song.snippet.title,
//         imgUrl: song.snippet.thumbnail.default,
//         addedBy: ''
//             // url: ,

//     })
// }