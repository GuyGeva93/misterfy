// import { storageService } from './async-storage-service.js'
// import { socketService } from './socket-service.js';
import { botService } from './bot-service.js';
import { httpService } from './http-service.js'
import { stationService } from './station-service.js';
// const CHAT_KEY = "chatMsgs";

// let gWatchedStation;

export const chatService = {
    query,
    add,
    botReply,
    getEmptyMsg,
    clearChatMsgs
}

async function query(stationId) {
    // try {
    //     const msgs = await storageService.query(CHAT_KEY)
    //     return msgs.filter(msg => msg.stationId === stationId)
    // } catch (err) {
    //     console.log('Error on chat service =>', err)
    // }

    const station = await stationService.getById(stationId);
    return await station.msgs;
}
async function add(newMsg) {
    newMsg.sentAt = Date.now()
        // try {
        //     storageService.post(CHAT_KEY, newMsg)
        // } catch (err) {
        //     console.log('Error on chat service =>', err)
        // }
    try {
        httpService.post('station/chat/' + newMsg.stationId, newMsg);
    } catch (err) {
        console.log('Error on chat service =>', err)
    }
}

function botReply(newMsg) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const reply = {
                stationId: newMsg.stationId,
                sentAt: Date.now(),
                txt: botService.sendMsg(newMsg),
                from: {
                    username: 'Botify',
                    _id: '',
                }
            };
            add(reply);
            resolve(reply)
        }, 1500);
    })
}

function getEmptyMsg() {
    return {
        from: {
            name: 'guest',
        },
        txt: ""
    }
}

async function clearChatMsgs(stationId) {
    console.log(stationId, 'stationId chat');
    const station = await stationService.getById(stationId);
    station.msgs = [];
    const updatedStation = await stationService.save(station);
    console.log(updatedStation);
    return updatedStation;

}



(async() => {
    // Dev Helper: Listens to when localStorage changes in OTHER browser

    // Here we are listening to changes for the station (comming from other browsers)
    window.addEventListener('storage', async() => {
        // if (!gWatchedStation) return;
        // const freshMsgs = await storageService.query(CHAT_KEY)
        // socketService.emit('chat new msg', freshMsgs)
        // const watchedStation = freshStations.find(station => station._id === gWatchedStation._id)
        // if (!watchedStation) return;
        // if (gWatchedUser.score !== watchedStation.score) {
        //     console.log('Watched user score changed - localStorage updated from another browser')
        //     socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedStation)
        // }
        // gWatchedUser = watchedStation
    })
})()