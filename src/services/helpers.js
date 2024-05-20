// logger functions to be used instead of console.log
window.debug_log = function() {
    if (import.meta.env.VITE_APP_ENV != 'production')
        console.log.apply(null, arguments);
};

window.debug_group = function(name) {
    if (import.meta.env.VITE_APP_ENV != 'production') console.group(name);
};

window.debug_group_end = function(name) {
    if (import.meta.env.VITE_APP_ENV != 'production') console.groupEnd();
};

//import('@src/w3color.js').then(mod => {})

const GlobalHelpers = {
    html_button(action, text, btnclass = '') {
        return `<button action="${action}" data-action="${action}" type="button" class="button ${btnclass}"><span class="btn-text">${text}</span></button>`;
    },
    shadeColor(color, percent) {

        var R = parseInt(color.substring(1,3),16);
        var G = parseInt(color.substring(3,5),16);
        var B = parseInt(color.substring(5,7),16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R<255)?R:255;
        G = (G<255)?G:255;
        B = (B<255)?B:255;

        R = Math.round(R)
        G = Math.round(G)
        B = Math.round(B)

        var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

        return "#"+RR+GG+BB;
    },
    sortobject(o) {
        return Object.keys(o).sort().reduce( (obj, key) => { obj[key] = o[key]; return obj; }, {});
    },
    async sha256(message) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(message);

        // hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
}

export default GlobalHelpers;