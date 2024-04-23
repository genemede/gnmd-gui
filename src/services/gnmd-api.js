import axios from 'axios';
//import store from '../store';

const genemedeAPI = {
    apiURL() {
        //return store.state.apiURL;
        return 'http://127.0.0.1:5342/v0/'
    },
    apiGet(cmd) {
        return new Promise((resolve, reject) => {
            //debug_log('API GET', cmd);
            axios
                .get(this.apiURL() + cmd)
                .then(res => {
                    //console.log('XXAPI RES1');
                    resolve(res);
                })
                .catch(err => {
                    console.log('API GET ERROR', err);
                        reject(err);
                });
        });
    },
    apiPost(cmd, body) {
        return this.apiPostEx(cmd, body, 'post');
    },
    apiPut(cmd, body) {
        return this.apiPostEx(cmd, body, 'put');
    },
    apiDelete(cmd) {
        return new Promise((resolve, reject) => {
            axios.delete(this.apiURL() + cmd)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    console.log('== API ERROR', JSON.stringify(err));
                    reject(err);

                });
        });
    },
    apiPostEx(cmd, body, method, multipart) {
        // general use post
        console.log('postex', cmd, method, body);
        var h = {};
        if (multipart) {
            h = { 'Content-Type': 'multipart/form-data' };
        }
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: this.apiURL() + cmd,
                data: body,
                headers: h
            })
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    console.log('== API ERROR', JSON.stringify(err));
                    reject(err);

                });
        });
    }
}

export default genemedeAPI;
