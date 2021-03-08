export const Service = {

    get=(endPoint, success, error) => {
        fetch(`${baseUrl}${endPoint}`, {
            method: 'GET',
            headers: {
                
            },
        }).then((res) => res.json()).then((res) => {

            // console.log('response login', res)
            return success(res)
        }).catch((err) => {

            console.log('errr', err)
            return error(err)
        })
    },

    post=(data, endPoint, success, error) => {
        fetch(`${baseUrl}${endPoint}`, {
            method: 'POST',
            headers: {
                
            },
            body: data,
        }).then((res) => res.json()).then((res) => {
            // console.log('response login', res)

            return success(res)
        }).catch((err) => {
            console.log('errr1', err)

            return error(err)
        })
    }
}
