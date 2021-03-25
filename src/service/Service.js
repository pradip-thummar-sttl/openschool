import { baseUrl } from "../utils/Constant"

export const Service = {

    get: (endPoint, success, error) => {
        fetch(`${baseUrl}${endPoint}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWRpcC50aHVtbWFyQHNpbHZlcnRvdWNoLmNvbSIsImZ1bGxOYW1lIjoiUHJhZGlwIiwiX2lkIjoiNjA0YjEzYmViNGViY2MxN2QxNjljZmM0IiwiaWF0IjoxNjE1NTQwMjUwfQ.SBz5MoEZYZPhzd851CgOyzXy-nzzrYTD2tv7kg1VjlA"
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
                "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWRpcC50aHVtbWFyQHNpbHZlcnRvdWNoLmNvbSIsImZ1bGxOYW1lIjoiUHJhZGlwIiwiX2lkIjoiNjA0YjEzYmViNGViY2MxN2QxNjljZmM0IiwiaWF0IjoxNjE1NTQwMjUwfQ.SBz5MoEZYZPhzd851CgOyzXy-nzzrYTD2tv7kg1VjlA"
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((res) => {
            // console.log('response login', res)

            return success(res)
        }).catch((err) => {
            console.log('errr1', err)

            return error(err)
        })
    }
}
