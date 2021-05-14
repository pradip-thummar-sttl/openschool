import { useSelector } from "react-redux"
import { baseUrl } from "../utils/Constant"
import { User } from "../utils/Model"



export const Service = {

    get: (endPoint, success, error) => {
        fetch(`${baseUrl}${endPoint}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `JWT ${User.user.Token}`
            },
        }).then((res) => res.json()).then((res) => {

            // console.log('response login', res)
            return success(res)
        }).catch((err) => {

            console.log('errr', err)
            return error(err)
        })
    },

    post: (data, endPoint, success, error) => {
        console.log('dta of json', JSON.stringify(data), `${baseUrl}${endPoint}`)
        fetch(`${baseUrl}${endPoint}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `JWT ${User.user.Token}`
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((res) => {
            // console.log('response login', res)

            return success(res)
        }).catch((err) => {
            console.log('errr1', err)

            return error(err)
        })
    },

    postFormData: (data, endPoint, success, error) => {
        console.log('`${baseUrl}${endPoint}`___', `${baseUrl}${endPoint}`, User.user.Token);
        fetch(`${baseUrl}${endPoint}`, {
            method: 'POST',
            headers: {
                "Content-type": "multipart/form-data",
                "Authorization": `JWT ${User.user.Token}`
            },
            body: data,
        }).then((res) => res.json()).then((res) => {
            // console.log('response login', res)

            console.log('res', res);
            return success(res)
        }).catch((err) => {
            console.log('errr1', err)

            return error(err)
        })
    }
}
