const http = require("http")

function reply(msg) {
    http.get(`https://console.dialogflow.com/api-client/demo/embedded/e0249676-22cf-4cd0-ab44-75c0b9d7ecff/demoQuery?q=${encodeURI(msg)}&sessionId=7990e532-3e33-6c24-a9b5-042fb5a9c1d7`, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const data = JSON.parse(rawData);
                return data.result.fulfillment.speech;
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
    
}

module.exports.reply = reply;