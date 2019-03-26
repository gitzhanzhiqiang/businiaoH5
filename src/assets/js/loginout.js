import store from '@/store';
import Router from 'vue-router'
import baseURL from '@/assets/js/ajax/baseURL';
export default loginout => {
    window.location.href = "https://www.bsnzz.com/h5/page/#/my/login";
    // window.location.href = "http://192.168.0.134:8089/#/my/login";
    store.dispatch('SETTOKEN', { token: '' });
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("fromPath");
    window.localStorage.removeItem("saleDebt");
    // store.dispatch('SETISCOLLAPSE', { isCollapse: true });
    // window.location.href = "http://www.bsnzz.com/h5/page/#/my/login";

    // window.location.href = "http://192.168.0.121:8081/H5debt/#/my/login";
    // window.location.href = "http://192.168.0.134:8089/#/my/login";
}