import { storageService } from './async-storage-service'
import { httpService } from './http-service'
import { socketService } from './socket-service'

// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
var gWatchedUser = null;

export const userService = {
  saveUserId,
  getUserId,
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
  likedSong
}

//For chat sender ids
function saveUserId(userId) {
  sessionStorage.setItem('userId', JSON.stringify(userId))
}

function getUserId() {
  const userId = sessionStorage.getItem('userId');
  if (userId) {
    return JSON.parse(userId);
  }
  return null;
}

window.userService = userService

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

async function getById(userId) {
  const user = await storageService.get('user', userId)
  // return httpService.get(`user/${userId}`)
  gWatchedUser = user;
  return user
}
function remove(userId) {
  return storageService.remove('user', userId)
  // return httpService.delete(`user/${userId}`)
}
async function update(user) {
  // await storageService.put('user', user)
  user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
  return user;
}
async function login(userCred) {
  // const users = await storageService.query('user')
  // const user = users.find(user => user.username === userCred.username)
  // return _saveLocalUser(user)

  const user = await httpService.post('auth/login', userCred)
  if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
  // const user = await storageService.post('user', userCred)
  const user = await httpService.post('auth/signup', userCred)
  return _saveLocalUser(user)
}
async function logout() {
  sessionStorage.clear()
  // return await httpService.post('auth/logout')
}
function _saveLocalUser(user) {
  sessionStorage.setItem('loggedinUser', JSON.stringify(user))
  return user
}
function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}
// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
  // var user = getLoggedinUser()
  // Dev Helper: Listens to when localStorage changes in OTHER browser

  // Here we are listening to changes for the watched user (coming from other browsers)
  window.addEventListener('storage', async () => {
    if (!gWatchedUser) return;
    const freshUsers = await storageService.query('user')
    const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
    if (!watchedUser) return;
    // if (gWatchedUser.score !== watchedUser.score) {
    //     console.log('Watched user score changed - localStorage updated from another browser')
    //     socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
    // }
    gWatchedUser = watchedUser
  })
})();

// This is relevant when backend is connected
(async () => {
  var user = getLoggedinUser()
  if (user) socketService.emit('set-user-socket', user._id)
})();

async function likedSong(song) {
  const user = getLoggedinUser()
  try {
    await httpService.put(`/user/song/${user._id}`, song)
  } catch (err) {
    console.log('Error on user service => likedSong')
    throw err
  }
}