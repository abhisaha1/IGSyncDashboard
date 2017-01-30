import { insertConnection } from './connections'

export function handleIgAuth(req) {
    
    return new Promise((resolve) => {
        let access_token = req.body.access_token;
        let user_id = req.body.user_id;
        fetch(`https://api.instagram.com/v1/users/${user_id}/?access_token=${access_token}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let data = {};
            data.network = 'instagram';
            data.access_token = access_token;
            data.user = response.data;
            insertConnection(data,()=>{});
        })
    });
}