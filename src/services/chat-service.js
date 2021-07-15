import { storageService } from './async-storage-service.js'
// import { stationService } from './station-service.js';
import { socketService } from './socket-service.js';
const CHAT_KEY = "chatMsgs";

// let gWatchedStation;

export const chatService = {
    query,
    add,
    getEmptyMsg
}

async function query() {
    const msgs = await storageService.query(CHAT_KEY);
    return msgs;
}
async function add(msg) {
    storageService.post(CHAT_KEY, msg);
}

function getEmptyMsg() {
    return { from: "me", txt: "" }
}

(async() => {

    // Dev Helper: Listens to when localStorage changes in OTHER browser

    // Here we are listening to changes for the station (comming from other browsers)
    window.addEventListener('storage', async() => {
        // if (!gWatchedStation) return;
        const freshMsgs = await storageService.query(CHAT_KEY);
        socketService.emit('new msg', freshMsgs);
        // const watchedStation = freshStations.find(station => station._id === gWatchedStation._id)
        // if (!watchedStation) return;
        // if (gWatchedUser.score !== watchedStation.score) {
        //     console.log('Watched user score changed - localStorage updated from another browser')
        //     socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedStation)
        // }
        // gWatchedUser = watchedStation
    })
})();