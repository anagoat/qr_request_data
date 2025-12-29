const {Buffer} = require('buffer');

module.exports = (data) => {

    const TOKEN = data.token;
    const chatId = data.chat_id;

    // base64 → binary
    const buffer = Buffer.from(data.base64Qr, "base64");
    const blob = new Blob([buffer], { type: "image/png" });

    const form = new FormData();
    form.append("chat_id", chatId);
    form.append("photo", blob, "qr.png");
    form.append("caption", "Обери дію");
    // form.append("reply_markup", JSON.stringify(replyMarkup));

    data.photo_request_data = {
        method: "POST",
        url: `https://api.telegram.org/bot${TOKEN}/sendPhoto`,
        body: form
    };

};
