const axios = require('axios').default;

const sendGetRequest = async () => {
    try {
        const resp = await axios.get('http://localhost:8888/api-gw/v1/user/verify', {
            headers: {
                'authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2dW5ndXllbkBnbWFpbGMub20iLCJpYXQiOjE2MjIxODc1NDMsImV4cCI6MTYyMjI3Mzk0M30.GJfq7xC6-KjCQ7RcWVUk4_zJmUH-gNaUj1hkfNBiJpXn2Dd3Hd7ylb13De_QYjezRONESUCL3AEkeD6M6EOXtg'
            }
        });

        // console.log(resp.data);
        return resp.data;
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

const func = async () =>{
    const res = await sendGetRequest();

     console.log(res.message);
     console.log("222");

 }

func();

console.log("333222");


