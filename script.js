document.getElementById("studlink").addEventListener("click", (e) => {
  e.preventDefault();
  showPdfWindow('', 'STUDBI', true);
});

// ===== Firebase =====
const firebaseConfig = {
  apiKey: "AIzaSyBxNTmQR9HKfi1iz_piobs_MgnLIetmSnc",
  authDomain: "fjfi1488.firebaseapp.com",
  databaseURL: "https://fjfi1488-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fjfi1488",
  storageBucket: "fjfi1488.firebasestorage.app",
  messagingSenderId: "1045435283804",
  appId: "1:1045435283804:web:1786c4cf0cae749aef2999",
  measurementId: "G-08TCLPT7FL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Ссылки на элементы
const goidaBtn = document.getElementById('goida-btn');
const goidaSound = document.getElementById('goida-sound');
const goidaCounter = document.getElementById('goida-counter');

// Ссылка на счетчик в Firebase
const goidaRef = db.ref('goida-counter');

// Подписка на изменения счетчика
goidaRef.on('value', (snapshot) => {
  const val = snapshot.val();
  goidaCounter.textContent = `ГОЙДА: ${val || 0}`;
});

// Обработчик клика
goidaBtn.addEventListener('click', async () => {
  // Проверяем, играет ли уже звук
  if (!goidaSound.paused) return; // если играет — ничего не делаем

  // Воспроизведение звука
  goidaSound.currentTime = 0;
  goidaSound.play();

  // Увеличение счетчика
  goidaRef.transaction(current => (current || 0) + 1);

  // Блокируем кнопку на время воспроизведения
  goidaBtn.disabled = true;

  // Включаем кнопку обратно после окончания аудио
  goidaSound.onended = () => {
    goidaBtn.disabled = false;
  };
});



// ===== Чат =====
const chatBox = document.getElementById('chat-box');
const nicknameInput = document.getElementById('nickname');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');

// Отправка сообщения
sendBtn.onclick = () => {
  const nick = nicknameInput.value.trim();
  const msg = messageInput.value.trim();
  if (!nick || !msg) return;

  db.ref('chat').push({
    nickname: nick,
    message: msg,
    timestamp: Date.now()
  });

  messageInput.value = '';
  messageInput.focus();
};

// Слушаем новые сообщения
db.ref('chat').on('child_added', (snapshot) => {
  const data = snapshot.val();

  // Форматирование времени
  const time = new Date(data.timestamp);
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  const div = document.createElement('div');
  div.textContent = `[${hours}:${minutes}] ${data.nickname}: ${data.message}`;
  chatBox.appendChild(div);

  // Прокрутка вниз
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Отправка сообщения по Enter
messageInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') sendBtn.click();
});
nicknameInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') messageInput.focus();
});

// ===== Твой код для протоколов =====
const centralBlock = document.getElementById('central-block');
// Группы и протоколы
const groups = {
  "PRA1": [
    "1-Vzduchova draha",
    "2-Dynamika rotacniho pohybu",
    "3-Mereni modulu pruznosti",
    "4-Cavendishuv experiment",
    "5-Mereni Poissonovy konstanty",
    "6-Kalorimetrie",
    "7-Mereni povrchoveho napeti",
    "8-Kondenzator",
    "9-Rozsiseni rozsahu miliampermetru",
    "10-Harmonicke oscilace",
    "11-Rezonancni obvody",
    "12-Coulombuv zakon",
    "13-Sonar"
  ],
  "PRA2": [
    "1-Akustika",
    "2-Hysterezni smycka",
    "3-Mirny naboj elektronu",
    "4-Balmerova serie",
    "5-Mereni teploty wolframoveho vlakna",
    "6-Geometricka optika",
    "7-Mereni spektra gama zareni",
    "8-Mikrovlny",
    "9-Polarizace svetla",
    "10-Interference a difrakce svetla",
    "11-Mereni kvantovych vlastnosti atomu",
    "12-Urceni Planckovy konstanty",
    "13-Vysokoteplotni plazma na tokamaku",
    "14-Objevovani castic na detektoru ATLAS"
  ],
  "ZFM": ["Neprime mereni", "ХЗЧТО", "ZFM_1", "ZFM_2", "ZFM_12"],
  "SPRA": [
    "1-Zeeman",
    "2-Kvantove smazani",
    "3-LIDAR",
    "4-Heizenberg",
    "5-Generování náhodných čísel"
  ],
  "Общие": ["Navod", "Файл2"]
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////м
const subjectLinks = {
  "ELMA": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1V0vkj_pFHwjANR4kMmzpzAeKHLjBC8Ki" },
    { label: "ССЫЛКА 2", url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AIjUS0ms_33IVWVmvG5L8KA/2.%20ročník/letní/ELMA?dl=0&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1" },
    { label: "ССЫЛКА 3", url: "https://drive.google.com/drive/folders/16nmZb0aKqvB_bL1ZV7Wi-awhz_Q6ywvz" },
    { label: "ССЫЛКА 4", url: "https://zapisky.adamator.eu/elma/vycuc.html" },
    { label: "ССЫЛКА 5", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/1.%20rocnik/ELMA" },
    { label: "ССЫЛКА 6", url: "https://drive.google.com/drive/folders/13QOHczZTUNUV9Ol5e-rxi8q9ixnHFGbr" }
  ],
  "Языки": [
    { label: "CES(Kovářová)", url: "https://kmlinux.fjfi.cvut.cz/~verneja1/index.php?idcla=35" },
    { label: "AM(Kovářová)", url: "https://kmlinux.fjfi.cvut.cz/~verneja1/index.php?idcla=33" },
    { label: "AP", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/AP3" },
    { label: "FJ", url: "https://drive.google.com/drive/folders/1bRaNqNiKW2CBPniIATuC0yOC42p_8xin" },
    { label: "NM", url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AB2c13YcSLk9UkZCwt1rL1g/NM123?dl=0&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1" },
    { label: "NP12", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/NP12" },
    { label: "NP3", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/NP3" }
  ],
  "MECH": [
    { label: "Stoll", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/1.%20rocnik/Stoll-I.-Mechanika.pdf" },
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1-MhqcEpcMXONjboWoEGnQFin_zLsb2vK" },
    { label: "ССЫЛКА 2", url: "https://drive.google.com/drive/folders/1kTUrv3vkYvKrXney2cxiulcC0F6-kXcX" },
    { label: "ССЫЛКА 3", url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AKK2se-roTH31UjN1cIQe58/1.%20ročník/MECH?dl=0&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1" }
  ],
  "KTPA": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/10sAbMhn9P3UbmiIwROVnWXoAL0-UZc-h" },
    { label: "ССЫЛКА 2", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Ing/4.%20ročník/KTPA" },
    { label: "ССЫЛКА 3", url: "https://drive.google.com/drive/folders/1eqasoVz3orQu97Q8Ju_8mDbPZzlTRHNY" },
    { label: "ССЫЛКА 4", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Ing/4.%20ročník/KTPA2" }
  ],
  "MAN": [
    { label: "Пелантова", url: "https://people.fjfi.cvut.cz/pelanedi" },
    { label: "MAN 1", url: "https://drive.google.com/drive/folders/1-Ek8aM99GCTRnUmwNiuamERQsXMq5ZS_" },
    { label: "MAN 2", url: "https://drive.google.com/drive/folders/1BK_xIzLpkDp8n9qb1EhADp3E4cK1xBLr" },
    { label: "MAN 2", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/1.%20rocnik/MAA2" },
    { label: "MAN 12", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/1.%20rocnik/Analyza" },
    { label: "MAN 12", url: "https://drive.google.com/drive/folders/1LQJu92qIJM34qzyxnGhOQpKj4elrpByu" },
    { label: "MAN 12", url: "https://drive.google.com/drive/folders/1rOf1vIh8dEQioK12dZ1P0CbbCrfHFnPP" },
    { label: "MAN 12", url: "https://drive.google.com/drive/folders/1O-GaFdt9bFBP1_zym2BMVh5mWLJFKmlH" }
  ],
  "VOAF": [
    { label: "ССЫЛКА 0", url: "https://drive.google.com/drive/folders/1wFsm5wSTQw2Snw4s0tr8dNml0p7ZU5VF" },
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1Qmky0a_ji4hVip2rUyudCqDyAXYFbFwl" },
    { label: "ССЫЛКА 2", url: "https://zapisky.adamator.eu/voafcv" },
    { label: "ССЫЛКА 3", url: "https://drive.google.com/drive/folders/11Zh3Ejl8v_vg9xwR7twnPa0ETcpziFp_" },
    { label: "ССЫЛКА 4", url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/ALvGvHiWZOEISVDMTh9eTx4/2.%20ročník/zimní/VOAF?dl=0&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1" },
    { label: "ССЫЛКА 5", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/VOAF" }
  ],
  "TSFA": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1JodAUKfqnSry8PR-jAUZcNDRJG5H_JV8" },
    { label: "ССЫЛКА 2", url: "https://drive.google.com/drive/folders/1mkbzUkEE7v9J0DkAC-tY7YdESE73AitI" },
    { label: "ССЫЛКА 3", url: "https://drive.google.com/file/d/1-0jDj0uSFlpi0ekqfiJcrZymBOQ6165A/view?usp=drive_link" },
    { label: "ССЫЛКА 4", url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AK1DXAGdihJx9IWk0dtS63k/2.%20ročník/letní/TSFA?dl=0&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1" },
    { label: "ССЫЛКА 5", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/TSFA" }
  ],
  "TEF": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1mCq8bMPWzsEmHjnuRwelkKc7Qf9hwO-x" },
    { label: "ССЫЛКА 2", url: "https://drive.google.com/drive/folders/1EtM4ZkcAuZOu8ccysjgxMYb-DP0CPFkh" },
    { label: "ССЫЛКА 3", url: "https://drive.google.com/drive/folders/1oPDq3DSO7DZ_mdTfk7XKOUMcUn26LVnq" },
    { label: "ССЫЛКА 4", url: "https://drive.google.com/drive/folders/1h6pSrOQWGlYgGar7wVAJBDVySk2P8JCB" },
    { label: "TEF_2", url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AC67ZHK-GW2FcvfVHkwt1qA/2.%20ročník/letní/TEF2?dl=0&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1" },
    { label: "TEF_12", url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AJzZbq47pjww5rWpMNB4xmo/2.%20ročník/zimní/TEF?rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1&dl=0" },
    { label: "TEF_2", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/TEF2" },
    { label: "TEF_1", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/TEF1" }
  ],
  "TER": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1A4cRkf20gyWGVKZKkbPlIHtAVX6PhXvq" },
    { label: "ССЫЛКА 2", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/1.%20rocnik/TER" },
    { label: "ССЫЛКА 3", url: "https://zapisky.adamator.eu/tercv" },
    { label: "ССЫЛКА 4", url: "https://drive.google.com/drive/folders/1IFEuhUnLFOXoCd8NCa4dSDy2TmPGYB9j" }
  ],
  "LAL": [
    { label: "LAL 1", url: "https://drive.google.com/drive/folders/1-NT0sA-ZYiCS4gYLAA977D5iz9vyaOkk" },
    { label: "LAL 2", url: "https://drive.google.com/drive/folders/1nZEfQ_kat_lyM3Q9oMdZm-XfwOsimwKz" },
    { label: "LAL 12", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/1.%20rocnik/Lin.%20Algebra" },
    { label: "LAL 12", url: "https://drive.google.com/drive/folders/1BK4qjkJ-ZQYGbN_-f-h31kdk6YyxP8ab" },
    { label: "LAL 12", url: "https://drive.google.com/drive/folders/1ypxuAgzWYc1-ZFm6Fgsvhdi-JaqZuf43" }
  ],
  "UING": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1eADiNE8OOSxF8pX_mNR2kfa4M4fzfOkv" },
    { label: "ССЫЛКА 2", url: "https://drive.google.com/drive/folders/1ye4qrYBTVRL8wpPYeChEV1KIJOcRVBfQ" }
  ],
  "CHEMIE": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1-XnBYQwZX4Yj60IBuRl-qiQGAN6ekbsV" },
    { label: "ССЫЛКА 2", url: "https://drive.google.com/drive/folders/1HMxNPfrL4LRUosYZcNHtW-W1kWZBCrKj" }
  ],
  "ANB34\ANA34": [
    { label: "ANB_3", url: "https://drive.google.com/drive/folders/1zaQOmv0lgg8NUO9UtBWGAxF0ATgk5n88" },
    { label: "ANB_4", url: "https://drive.google.com/drive/folders/10NVFMs_zUax91UV83gbu400SQrXp7SMb" },
    { label: "ANA_34", url: "https://drive.google.com/drive/folders/1QXb7frVOFHMwMJMQRPw2dw1SrEBtB0Qw" },
    { label: "ANB_3", url: "https://drive.google.com/drive/folders/13uFXNxPdCBfI_eRz29Y4jPy_1ifoSNv-" },
    { label: "ANB_4", url: "https://drive.google.com/drive/folders/136Lpb46GPekstQ5HsFseWqoO8bxC-xrN" },
    { label: "ANB_4", url: "https://drive.google.com/drive/folders/1rA41RO3ByHo97k9_ztWT1cf3Ockj1SC5" },
    { label: "ANA_4", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/MAA4" },
    { label: "ANA_3", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/MAA3" }
  ],
  "DIFR": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1U499EC8lKr80bn7VJnkKrUgXBipopQ5p" },
    { label: "ССЫЛКА 2", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/DIFR" }
  ],
  "DIM": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1cvhEm38XvtSeIufbfOyRUIaZhsC7h6b2" }
  ],
  "NMA": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1eQY76H-anFRWjLTurWeAlPgOfS4xZUdy" }
  ],
  "FKO": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1qGcrmBnnGLMJF0DqyCmzek0g99DM3X-D" },
    { label: "ССЫЛКА 2", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/FKO" }
  ],
  "FAN": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1OJwJzGtcTCcRyT0e7Kjm0NTPu6w2f4FI" },
    { label: "FA 2", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/FA2" },
    { label: "FAN 1", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/FAN1" }
  ],
  "UJRF": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1bQAHxWEtRp0EIBJiILGZZkkzr7R0RMrE" }
  ],
  "SF": [
    { label: "ССЫЛКА 1", url: "https://drive.google.com/drive/folders/1SOJC_grsDUXPQ9knTNK8sz87HdSYW9yR" }
  ],
  "NME": [
    { label: "ССЫЛКА 1", url: "https://www.dropbox.com/scl/fo/ubw0fgf1bdoyi2uwyv5sh/ABMWQHTO-9mHo4DnmXusjZ4/NME?e=1&fbclid=IwAR2BBhgwOoLF8BVKbcbCXqB6TmJI-0hMMboDqUfEWB59Uh6ma_O2D1dXmk0&rlkey=u3gntyx8rlo5z7wwbj7ayf9g1&subfolder_nav_tracking=1&dl=0" },
    { label: "NME_1", url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/APpWDz00LJKAFYaKDw10pnA/2.%20ročník/letní/NME1?dl=0&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1" },
    { label: "NME_2", url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AHI6ICnuIgHMUr8hyOWBrG0/3.%20ročník/letní/NME2?dl=0&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1" }
  ],
  "RMF": [
    { label: "RMF", url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/APtBPa-UyKF44ySYKu_io1w/3.%20ročník/zimní/RMF?dl=0&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1" },
    { label: "RMF", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/RMF" }
  ],
  "PRST": [
    { label: "PRST", url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/ACs78-dRu4hwZVQmTAcYrhw/3.%20ročník/zimní/PRST?dl=0&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1" },
    { label: "PRST", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/PRST" }
  ],
  "UKP": [
    { label: "UKP", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/UKP" }
  ],
  "STR": [
    { label: "MatFyz", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/STR%20Matfyz.pdf" },
    { label: "STR", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/STR" }
  ],
  "SSM": [
    { label: "SSM", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/SSM" }
  ],
  "Реторика": [
    { label: "Реторика", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/RET" }
  ],
  "LCF": [
    { label: "LCF", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/2.%20rocnik/LCF1" }
  ],
  "ALGE": [
    { label: "ALGE", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/ALGE" }
  ],
  "DEM": [
    { label: "DEM", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/DEM" }
  ],
  "GMF": [
    { label: "GMF1", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/GMF1" }
  ],
  "KVAN": [
    { label: "KVAN_1", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/KVAN1" },
    { label: "KVAN_2", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/KVAN2" }
  ],
  "GTO": [
    { label: "GTO", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/OR" }
  ],
  "ZJF": [
    { label: "ZJF", url: "https://edu.fjfi.cvut.cz/studijni-materialy/Bc/3.%20rocnik/ZJF" }
  ],
  "ZRIZ": [
    { label: "ZRIZ", url: "https://drive.google.com/drive/folders/1u7iPUWvIwSi6agIuzBrxiS7k6mxv_0Vo" }
  ],
  "ZPP": [
    { label: "ZPP", url: "https://drive.google.com/drive/folders/1Ym3MEN2PTQut69zJ21WH6km1NXPWTjhs" }
  ],
  "ZOMED": [
    { label: "ZOME", url: "https://drive.google.com/drive/folders/1t0GK_qeRqGlCDxwLefyhTyhBlUxdRHcs" }
  ],
  "ZJT": [
    { label: "ZJT", url: "https://drive.google.com/drive/folders/1p3ulLskm86YZfF6IYwFSTGYk9GW-zhCe" }
  ],
  "ZFP": [
    { label: "ZFP", url: "https://drive.google.com/drive/folders/1CMzOrhwD_xtjZ8_0NkUJLESK7l3imL2i" }
  ],
  "ZELW": [
    { label: "ZELW", url: "https://drive.google.com/drive/folders/11HoMiL9rfGaDz3WInJxDsF3VQdu583NQ" }
  ],
  "ZEL": [
    { label: "ZEL_2", url: "https://drive.google.com/drive/folders/1bW5W3H8F_fxyztPO0uipUPNCHnAQFFH1" },
    { label: "ZEL_1", url: "https://drive.google.com/drive/folders/196aEyD5I79KqwHUuT1EFO4RCy83HKke3" }
  ],
  "ZDOZ": [
    { label: "ZDOZ_2", url: "https://drive.google.com/drive/folders/1QcuCx69rKgpaaW16X1ICYq6pJSUSga4L" },
    { label: "ZDOZ_1", url: "https://drive.google.com/drive/folders/1SS8JEYfQQO_hwhKsotxDnG4muS0qEl0j" }
  ],
  "ZBAF": [
    { label: "ZBAF_2", url: "https://drive.google.com/drive/folders/1E_8l8TZtaFZmgvPZrCwoLc7iG00RwFRo" },
    { label: "ZBAF_1", url: "https://drive.google.com/drive/folders/1OrmyVUVBzLWG90E_OAYY2zlXytbvOm46" }
  ],
  "VPJRS": [
    { label: "VPJRS", url: "https://drive.google.com/drive/folders/13mr0m9mD-8HBfPc63fvhloavvHdxziim" }
  ],
};



// Пути к PDF
const pdfPaths = {
  "1-Vzduchova draha": [
    { url: "https://joseftrojan.cz/praktika/pra1/01.pdf", label: "ССЫЛКА 1" }
  ],
  "2-Dynamika rotacniho pohybu": [
    { url: "Protokoly/PRA1/2/2-Dynamika-rotacniho-pohybu.pdf", label: "ССЫЛКА 1" },
    { url: "https://joseftrojan.cz/praktika/pra1/02.pdf", label: "ССЫЛКА 2" }
  ],
  "3-Mereni modulu pruznosti": [
    { url: "Protokoly/PRA1/3/3-Mereni-modulu-pruznosti.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AJV_sQSC0nHgpRqvk13hMs4/2.%20ročník/zimní/PRA1?dl=0&preview=03+Pružnost.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "4-Cavendishuv experiment": [
    { url: "Protokoly/PRA1/4/4-Cavendishuv-experiment.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AJV_sQSC0nHgpRqvk13hMs4/2.%20ročník/zimní/PRA1?dl=0&preview=04+Cavendish.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "5-Mereni Poissonovy konstanty": [
    { url: "Protokoly/PRA1/5/5-Mereni-Poissonovy-konstanty.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AJV_sQSC0nHgpRqvk13hMs4/2.%20ročník/zimní/PRA1?dl=0&preview=05+Poisson.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "6-Kalorimetrie": [
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AJV_sQSC0nHgpRqvk13hMs4/2.%20ročník/zimní/PRA1?dl=0&preview=06+Kalorimetrie.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 1" },
    { url: "https://joseftrojan.cz/praktika/pra1/06.pdf", label: "ССЫЛКА 2" }
  ],
  "7-Mereni povrchoveho napeti": [
    { url: "Protokoly/PRA1/7/7-Mereni-povrchoveho-napeti.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AJV_sQSC0nHgpRqvk13hMs4/2.%20ročník/zimní/PRA1?dl=0&preview=07+Povrchové+napětí.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" },
    { url: "https://joseftrojan.cz/praktika/pra1/07.pdf", label: "ССЫЛКА 3" }
  ],
  "8-Kondenzator": [
    { url: "Protokoly/PRA1/8/8-Kondenzator.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AJV_sQSC0nHgpRqvk13hMs4/2.%20ročník/zimní/PRA1?dl=0&preview=08+Kondenzátor.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" },
    { url: "https://joseftrojan.cz/praktika/pra1/08.pdf", label: "ССЫЛКА 3" }
  ],
  "9-Rozsiseni rozsahu miliampermetru": [
    { url: "Protokoly/PRA1/9/9-Rozsiseni-rozsahu-miliampermetru.pdf", label: "ССЫЛКА 1" },
    { url: "https://joseftrojan.cz/praktika/pra1/09.pdf", label: "ССЫЛКА 2" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AJV_sQSC0nHgpRqvk13hMs4/2.%20ročník/zimní/PRA1?dl=0&preview=09+Kompenzátor.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 3" }
  ],
  "10-Harmonicke oscilace": [
    { url: "Protokoly/PRA1/10/10-Harmonicke-oscilace.pdf", label: "ССЫЛКА 1" },
    { url: "https://joseftrojan.cz/praktika/pra1/10.pdf", label: "ССЫЛКА 2" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AJV_sQSC0nHgpRqvk13hMs4/2.%20ročník/zimní/PRA1?dl=0&preview=10+Harmonické+oscilace.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 3" }
  ],
  "11-Rezonancni obvody": [
    { url: "Protokoly/PRA1/11/11-Rezonancni-obvody.pdf", label: "ССЫЛКА 1" },
    { url: "https://joseftrojan.cz/praktika/pra1/11.pdf", label: "ССЫЛКА 2" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AJV_sQSC0nHgpRqvk13hMs4/2.%20ročník/zimní/PRA1?dl=0&preview=11+Rezonanční+obvody.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 3" }
  ],
  "12-Coulombuv zakon": [
    { url: "https://joseftrojan.cz/praktika/pra1/12.pdf", label: "ССЫЛКА 1" }
  ],
  "13-Sonar": [
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AJV_sQSC0nHgpRqvk13hMs4/2.%20ročník/zimní/PRA1?dl=0&preview=12+Sonar.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 1" }
  ],
  "1-Akustika": [
    { url: "https://joseftrojan.cz/praktika/pra2/01.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/ALHKINg13Ka2WhDfGoSdGek/2.%20ročník/letní/PRA2?dl=0&preview=01+Akustika.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "2-Hysterezni smycka": [
    { url: "https://joseftrojan.cz/praktika/pra2/02.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/ALHKINg13Ka2WhDfGoSdGek/2.%20ročník/letní/PRA2?dl=0&preview=02+Hysterezni+smycka.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "3-Mirny naboj elektronu": [
    { url: "https://joseftrojan.cz/praktika/pra2/03.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/ALHKINg13Ka2WhDfGoSdGek/2.%20ročník/letní/PRA2?dl=0&preview=03+Elektron.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "4-Balmerova serie": [
    { url: "Protokoly/PRA2/4/4-Balmerova-serie.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/ALHKINg13Ka2WhDfGoSdGek/2.%20ročník/letní/PRA2?dl=0&preview=04+Balmer.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "5-Mereni teploty wolframoveho vlakna": [
    { url: "Protokoly/PRA2/5/5-Mereni-teploty-wolframoveho-vlakna.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/ALHKINg13Ka2WhDfGoSdGek/2.%20ročník/letní/PRA2?dl=0&preview=05+Wolfram.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "6-Geometricka optika": [
    { url: "Protokoly/PRA2/6/6-Geometricka-optika.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/ALHKINg13Ka2WhDfGoSdGek/2.%20ročník/letní/PRA2?dl=0&preview=06+Optika.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "7-Mereni spektra gama zareni": [
    { url: "Protokoly/PRA2/7/7-Mereni-spektra-gama-zareni.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/ALHKINg13Ka2WhDfGoSdGek/2.%20ročník/letní/PRA2?dl=0&preview=07+Gama.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "8-Mikrovlny": [
    { url: "Protokoly/PRA2/8/8-Mikrovlny.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/ALHKINg13Ka2WhDfGoSdGek/2.%20ročník/letní/PRA2?dl=0&preview=08+Mikrovlny.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "9-Polarizace svetla": [
    { url: "Protokoly/PRA2/9/9-Polarizace-svetla.pdf", label: "ССЫЛКА 1" },
    { url: "https://joseftrojan.cz/praktika/pra2/09.pdf", label: "ССЫЛКА 2" }
  ],
  "10-Interference a difrakce svetla": [
    { url: "Protokoly/PRA2/10/10-Interference-a-difrakce-svetla.pdf", label: "ССЫЛКА 1" },
    { url: "https://joseftrojan.cz/praktika/pra2/10.pdf", label: "ССЫЛКА 2" }
  ],
  "11-Mereni kvantovych vlastnosti atomu": [
    { url: "Protokoly/PRA2/11/11-Mereni-kvantovych-vlastnosti-atomu.pdf", label: "ССЫЛКА 1" },
    { url: "https://joseftrojan.cz/praktika/pra2/11.pdf", label: "ССЫЛКА 2" }
  ],
  "12-Urceni Planckovy konstanty": [
    { url: "Protokoly/PRA2/12/12-Urceni-Planckovy-konstanty.pdf", label: "ССЫЛКА 1" },
    { url: "https://joseftrojan.cz/praktika/pra2/12.pdf", label: "ССЫЛКА 2" }
  ],
  "13-Vysokoteplotni plazma na tokamaku": [
    { url: "Protokoly/PRA2/13/13-Vysokoteplotni-plazma-na-tokamaku.pdf", label: "ССЫЛКА 1" },
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/ALHKINg13Ka2WhDfGoSdGek/2.%20ročník/letní/PRA2?dl=0&preview=tokamak.pdf&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ССЫЛКА 2" }
  ],
  "14-Objevovani castic na detektoru ATLAS": [
    { url: "https://joseftrojan.cz/praktika/pra2/14.pdf", label: "ССЫЛКА 1" }
  ],
  "1-Zeeman": "Protokoly/SPRA/1/Zeeman.pdf",
  "2-Kvantove smazani": "Protokoly/SPRA/2/Kvantove_smazani.pdf",
  "3-LIDAR": "Protokoly/SPRA/3/LIDAR.pdf",
  "4-Heizenberg": "Protokoly/SPRA/4/Heizenberg.pdf",
  "5-Generování náhodných čísel": "Protokoly/SPRA/5/Generovani-nahodnych-cisel.pdf",
  "Navod": "Protokoly/Common/Navod(TabulkyObrazky).pdf",
  "Файл2": "img/fw.jpg",
  "ХЗЧТО": [
    { url: "https://drive.google.com/drive/folders/1JN_lBpwnRZTvDQgr3Uf9hXmDf-r6E-q8", label: "ССЫЛКА 1" }
  ],
  "ZFM_1": [
    { url: "https://drive.google.com/drive/folders/1le9gEs5g1xVjujM7PVf5FBdQ6vZEW9um", label: "ZFM_1" }
  ],
  "ZFM_2": [
    { url: "https://drive.google.com/drive/folders/1qh8kYXFhgSpB86IBj-K-xSJbbBg2urwC", label: "ZFM_2" }
  ],
  "ZFM_12": [
    { url: "https://www.dropbox.com/scl/fo/kvg50umqp5u9szrbnah7z/AF-x1k6-ZppdD2lIb6S19Zg/1.%20ročník/ZFM12?dl=0&rlkey=odthds363lfajo81rxb3sug9f&subfolder_nav_tracking=1", label: "ZFM_12" }
  ],
  "STUDBI": "img/STUDBI.jpg",
  "Neprime mereni": "Protokoly/ZFM1/Neprime-mereni.pdf",
  "Первакам": "img/fw.jpg",
};


const windowA = `<h2>Добро пожаловать!</h2>
<button class="btn" id="schedule-btn">Расписания пар</button>
<button class="btn" id="schedulejaz-btn">Расписания языков</button>
<button class="btn" id="praktiki-btn">Практики</button>
<button class="btn" id="predmety-btn">Предметы</button>`;
// Функция для показа картинки ветеранов
function showVeterans() {
  centralBlock.innerHTML = `<h2>Ветераны</h2>`;
  const img = document.createElement('img');
  img.src = 'img/90.png'; // путь к картинке
  img.style.maxWidth = '90%';
  img.style.height = 'auto';
  img.style.border = '3px solid #333';
  img.style.borderRadius = '10px';
  centralBlock.appendChild(img);

  const backBtn = document.createElement('button');
  backBtn.className = 'btn';
  backBtn.textContent = 'Назад';
  backBtn.style.marginTop = '15px';
  backBtn.onclick = () => centralBlock.innerHTML = windowA;
  centralBlock.appendChild(document.createElement('br'));
  centralBlock.appendChild(backBtn);
}


document.getElementById('veterans-link').addEventListener('click', (e) => {
  e.preventDefault();
  showVeterans();
});

function showWindowB() {
  centralBlock.innerHTML = `<h2>Практики</h2>`;
  Object.keys(groups).forEach(group=>{
    const btn=document.createElement('button');
    btn.className='btn';
    btn.textContent=group;
    btn.onclick=()=>showGroupProtocols(group);
    centralBlock.appendChild(btn);
  });
  const backBtn=document.createElement('button');
  backBtn.className='btn';
  backBtn.textContent='Назад';
  backBtn.onclick=()=>centralBlock.innerHTML=windowA;
  centralBlock.appendChild(document.createElement('br'));
  centralBlock.appendChild(backBtn);
}


function showWindowC() {
  centralBlock.innerHTML = `<h2>Предметы</h2>`;

  const years = [
    { text: "1 год", subjects: ["ELMA","MECH","MAN","LAL","TER","UING","CHEMIE","DIM","UJRF","ZPP"] },
    { text: "2 год", subjects: ["TEF","TSFA","VOAF","ANB34\ANA34","DIFR","NMA","NME","UKP","STR","LCF","ZRIZ","ZOMED","ZJT","ZEL","ZDOZ","ZBAF"] },
    { text: "3 год", subjects: ["FKO","FAN","SF","RMF","PRST","GMF","KVAN","ZJF","DEM","ALGE","ZFP"] },
    { text: "Магистр", subjects: ["KTPA","GTO","ZELW","VPJRS"]},
    { text: "Гуманитарная хуета", subjects: ["Языки","Право","Этика","Реторика"]}
  ];

  years.forEach(y => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = y.text;
    btn.onclick = () => showSubjects(y.subjects);
    centralBlock.appendChild(btn);
  });

  const backBtn = document.createElement('button');
  backBtn.className = 'btn';
  backBtn.textContent = 'Назад';
  backBtn.style.marginTop = '15px';
  backBtn.onclick = () => centralBlock.innerHTML = windowA;
  centralBlock.appendChild(document.createElement('br'));
  centralBlock.appendChild(backBtn);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showSubjects(subjects) {
  centralBlock.innerHTML = `<h2>Предметы</h2>`;

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(6, 1fr)';
  grid.style.gap = '10px';

  subjects.forEach(sub => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = sub;

    btn.onclick = () => showSubjectLinks(sub, subjects);

    grid.appendChild(btn);
  });

  centralBlock.appendChild(grid);

  // Кнопка назад к предыдущему окну
  const backBtn = document.createElement('button');
  backBtn.className = 'btn';
  backBtn.textContent = 'Назад';
  backBtn.style.marginTop = '15px';
  backBtn.onclick = () => showWindowC(); 
  centralBlock.appendChild(document.createElement('br'));
  centralBlock.appendChild(backBtn);
}

// 3. Функция показа ссылок по выбранному предмету
function showSubjectLinks(subject, subjects) {
  centralBlock.innerHTML = `<h2>${subject}</h2>`; // Заголовок

  const links = subjectLinks[subject];
  if (links) {
    links.forEach(item => {
      const linkBtn = document.createElement('button');
      linkBtn.className = 'btn';
      linkBtn.textContent = item.label;
      linkBtn.onclick = () => window.open(item.url, '_blank');
      centralBlock.appendChild(linkBtn);
    });
  } else {
    // Если ссылок нет — просто уведомление
    const msg = document.createElement('p');
    msg.textContent = "Ссылки для этого предмета отсутствуют";
    centralBlock.appendChild(msg);
  }

  // Кнопка назад к списку предметов
  const backBtn = document.createElement('button');
  backBtn.className = 'btn';
  backBtn.style.marginTop = '15px';
  backBtn.textContent = 'Назад';
  backBtn.onclick = () => showSubjects(subjects);
  centralBlock.appendChild(document.createElement('br'));
  centralBlock.appendChild(backBtn);
}


function showGroupProtocols(group){
  centralBlock.innerHTML=`<h2>${group}</h2><p>Выберите протокол:</p>`;
  groups[group].forEach(file=>{
    const btn=document.createElement('button');
    btn.className='btn';
    btn.textContent=file;
    btn.onclick=()=>showPdfWindow(group,file);
    centralBlock.appendChild(btn);
  });
  const backBtn=document.createElement('button');
  backBtn.className='btn';
  backBtn.textContent='Назад';
  backBtn.style.marginTop='15px';
  backBtn.onclick=()=>showWindowB();
  centralBlock.appendChild(document.createElement('br'));
  centralBlock.appendChild(backBtn);
}

function showPdfWindow(group, file, returnToMain = false) {
  centralBlock.innerHTML = `<h2>${file}</h2>`;

  let paths = pdfPaths[file];
  if (!paths) return;

  // если в pdfPaths лежит строка → превращаем в массив
  if (!Array.isArray(paths)) {
    paths = [paths];
  }

  paths.forEach(item => {
  let url, label;

  if (typeof item === 'string') {
    url = item;
    label = item.split('/').pop() || item; // старое поведение для строк
  } else {
    url = item.url;
    label = item.label || (item.url.split('/').pop() || item.url);
  }

  // Проверка — картинка или PDF/ссылка
  if (/\.(jpg|jpeg|png|gif)$/i.test(url)) {
    const img = document.createElement('img');
    img.src = url;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '70vh';
    img.style.border = '3px solid #333';
    img.style.borderRadius = '10px';
    img.style.display = 'block';
    img.style.marginBottom = '15px';
    centralBlock.appendChild(img);
  } else {
    const fileDiv = document.createElement('div');
    fileDiv.style.display = 'flex';
    fileDiv.style.justifyContent = 'space-between';
    fileDiv.style.alignItems = 'center';
    fileDiv.style.margin = '10px 0';
    fileDiv.style.backgroundColor = '#cce0ff';
    fileDiv.style.padding = '8px';
    fileDiv.style.borderRadius = '5px';
    fileDiv.style.color = '#003366';
    fileDiv.style.fontWeight = 'bold';

    const link = document.createElement('a');
    link.href = url;
    link.textContent = label;   // <<< теперь берёт красивый текст
    link.style.color = '#003366';
    link.style.textDecoration = 'none';
    link.target = '_blank';
    fileDiv.appendChild(link);

    if (url.endsWith('.pdf') && !url.startsWith('http')) {
      const downloadBtn = document.createElement('a');
      downloadBtn.href = url;
      downloadBtn.download = url.split('/').pop();
      downloadBtn.textContent = '⬇';
      downloadBtn.style.marginLeft = '10px';
      downloadBtn.style.color = '#003366';
      downloadBtn.style.textDecoration = 'none';
      downloadBtn.style.fontSize = '20px';
      fileDiv.appendChild(downloadBtn);
    }

    centralBlock.appendChild(fileDiv);
  }
});

  // ----- кнопка Назад -----
  const backBtn = document.createElement('button');
  backBtn.className = 'btn';
  backBtn.textContent = 'Назад';
  backBtn.style.marginTop = '15px';
  backBtn.onclick = () => {
    if (returnToMain) {
      centralBlock.innerHTML = windowA;
    } else {
      showGroupProtocols(group);
    }
  };
  centralBlock.appendChild(document.createElement('br'));
  centralBlock.appendChild(backBtn);
}



function showScheduleWindow2() {
  centralBlock.innerHTML = `<h2>Расписания языков</h2>`;

  const schedules = [
    {text: 'Бакалавр 1 год', link: 'https://rozvrh.fjfi.cvut.cz/pdf/B251_JAZ_BS1.pdf'},
    {text: 'Бакалавр 2 год', link: 'https://rozvrh.fjfi.cvut.cz/pdf/B251_JAZ_BS2.pdf'},
    {text: 'Бакалавр 3 год', link: 'https://rozvrh.fjfi.cvut.cz/pdf/B251_JAZ_BS3.pdf'},
    {text: 'Магистр', link: 'https://rozvrh.fjfi.cvut.cz/pdf/B251_APIN.pdf'}
  ];

  schedules.forEach(s=>{
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = s.text;
    btn.onclick = () => window.open(s.link, '_blank'); // открытие в новой вкладке
    centralBlock.appendChild(btn);
  });

  const backBtn=document.createElement('button');
  backBtn.className='btn';
  backBtn.textContent='Назад';
  backBtn.style.marginTop='15px';
  backBtn.onclick = () => centralBlock.innerHTML = windowA;
  centralBlock.appendChild(document.createElement('br'));
  centralBlock.appendChild(backBtn);
}


function showScheduleWindow() {
  centralBlock.innerHTML = `<h2>Расписания пар</h2>`;

  const schedules = [
    {text: 'Бакалавр 1', link: 'https://rozvrh.fjfi.cvut.cz/tt_parts/BS1'},
    {text: 'Бакалавр 2', link: 'https://rozvrh.fjfi.cvut.cz/tt_parts/BS2'},
    {text: 'Бакалавр 3', link: 'https://rozvrh.fjfi.cvut.cz/tt_parts/BS3'},
    {text: 'Магистр 1', link: 'https://rozvrh.fjfi.cvut.cz/tt_parts/NMS1'},
    {text: 'Магистр 2', link: 'https://rozvrh.fjfi.cvut.cz/tt_parts/NMS2'}
  ];

  schedules.forEach(s=>{
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = s.text;
    btn.onclick = () => window.open(s.link, '_blank'); // открытие в новой вкладке
    centralBlock.appendChild(btn);
  });

  const backBtn=document.createElement('button');
  backBtn.className='btn';
  backBtn.textContent='Назад';
  backBtn.style.marginTop='15px';
  backBtn.onclick = () => centralBlock.innerHTML = windowA;
  centralBlock.appendChild(document.createElement('br'));
  centralBlock.appendChild(backBtn);
}

// Обработчик кликов в центральном блоке
centralBlock.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'praktiki-btn') {
    showWindowB();
  } else if (e.target && e.target.id === 'predmety-btn') {
    showWindowC();
  } else if (e.target && e.target.id === 'schedule-btn') {
    showScheduleWindow();
  } else if (e.target && e.target.id === 'schedulejaz-btn') {
  showScheduleWindow2();
  }
});