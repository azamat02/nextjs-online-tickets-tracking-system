import {Router} from 'express'
import {createAction, getAllActions, getOneAction} from "./controllers/actions.js";
import {
    deleteUserById,
    getAllUsers,
    isAdmin,
    isUserAuth,
    loginUser,
    logoutUser,
    registerUser
} from "./controllers/auth.js";
import {
    createNotification,
    getAllNotifications,
    getNotificationsByUserId,
    getOneNotificationById
} from "./controllers/notification.js";

const router = Router()

// Action routes
router.get('/api/actions', getAllActions)
router.get('/api/actions/:id', getOneAction)
router.post('/api/actions', createAction)

// Notification routes
router.get('/api/notifications', getAllNotifications)
router.get('/api/notifications/by/user/:id', getNotificationsByUserId)
router.get('/api/notifications/:id', getOneNotificationById)
router.post('/api/notifications', createNotification)

// User routes
router.post('/api/login', loginUser)
router.post('/api/register', registerUser)
router.get('/api/auth', isUserAuth)
router.get('/api/users', getAllUsers)
router.get('/api/users/delete/:id', deleteUserById)
router.get('/api/logout', logoutUser)
router.get('/api/admin', isAdmin)

export default router