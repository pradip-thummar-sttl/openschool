import { useSelector } from "react-redux"
import { baseUrl } from "../utils/Constant"
import { User } from "../utils/Model"

export const Service = {

    get: (endPoint, success, error) => {
        console.log('token', User.user.Token, 'url of', endPoint)
        console.log('url of', baseUrl + endPoint)
        fetch(`${baseUrl}${endPoint}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `JWT ${User.user.Token}`
                // "Authorization": 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcmVzaC5sYWt1bUBzaWx2ZXJ0b3VjaC5jb20iLCJmdWxsTmFtZSI6IlNpbHZlciIsIl9pZCI6IjYwM2Y3YWY0ZjVkYzVkNGJiNDg5MmRmMCIsImlhdCI6MTYxNTg5NTgyN30.gCsd2gRA3qtHX7EQbi-b4Xm6nETAg0MjjojD_q8fO6Q'
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
        // console.log('dta of json', JSON.stringify(data), `${baseUrl}${endPoint}`)
        fetch(`${baseUrl}${endPoint}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `JWT ${User.user.Token}`
                // "Authorization": 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcmVzaC5sYWt1bUBzaWx2ZXJ0b3VjaC5jb20iLCJmdWxsTmFtZSI6IlNpbHZlciIsIl9pZCI6IjYwM2Y3YWY0ZjVkYzVkNGJiNDg5MmRmMCIsImlhdCI6MTYxNTg5NTgyN30.gCsd2gRA3qtHX7EQbi-b4Xm6nETAg0MjjojD_q8fO6Q'
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
        
        fetch(`${baseUrl}${endPoint}`, {
            method: 'POST',
            headers: {
                "Content-type": "multipart/form-data",
                "Authorization": `JWT ${User.user.Token}`
                // "Authorization": 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcmVzaC5sYWt1bUBzaWx2ZXJ0b3VjaC5jb20iLCJmdWxsTmFtZSI6IlNpbHZlciIsIl9pZCI6IjYwM2Y3YWY0ZjVkYzVkNGJiNDg5MmRmMCIsImlhdCI6MTYxNTg5NTgyN30.gCsd2gRA3qtHX7EQbi-b4Xm6nETAg0MjjojD_q8fO6Q'
            },
            body: data,
        }).then((res) => res.json()).then((res) => {
            console.log('response', res)

            return success(res)
        }).catch((err) => {
            console.log('errr1', err)

            return error(err)
        })
    }
}
