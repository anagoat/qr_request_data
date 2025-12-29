module.exports = (data) => {

  const TOKEN = data.token;
  const chatId = data.chat_id; // або звідки ти береш chat_id

  const binary = atob(data.base64Qr);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: "image/png" });

  const form = new FormData();
  form.append("chat_id", chatId);
  form.append("photo", blob, "qr.png");
  form.append("caption", "Обери дію");
  form.append("parse_mode", "Markdown");
  form.append("reply_markup", JSON.stringify(replyMarkup));

  data.photo_request_data = {
    method: "POST",
    url: `https://api.telegram.org/bot${TOKEN}/sendPhoto`,
    body: form
  };

  return data;
};
