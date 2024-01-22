import { decryptString,decryptNumber } from "./crypto"
import Cookies from "js-cookie"
let enc_userId = Cookies.get('user_id')
let enc_userName = Cookies.get('username')
let userId = decryptNumber(enc_userId)
let userName = decryptString(enc_userName)
let accesstoken = Cookies.get('accessToken')
export const userData = {
    id:userId,
    username:userName,
    accessToken:accesstoken
}