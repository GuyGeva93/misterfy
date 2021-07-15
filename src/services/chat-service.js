import { storageService } from './async-storage-service.js'
// import { stationService } from './station-service.js';
const CHAT_KEY = "chatMsgs";

let gWatchedStation;

export const chatService = {
    query
}

async function query() {
    return storageService.query(CHAT_KEY);
}
async function add() {

}

(async() => {
    var user = getLoggedinUser()
        // Dev Helper: Listens to when localStorage changes in OTHER browser

    // Here we are listening to changes for the station changes(comming from other browsers)
    window.addEventListener('storage', async() => {
        if (!gWatchedUser) return;
        const freshUsers = await storageService.query('station')
        const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
        if (!watchedUser) return;
        if (gWatchedUser.score !== watchedUser.score) {
            console.log('Watched user score changed - localStorage updated from another browser')
            socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
        }
        gWatchedUser = watchedUser
    })
})();