// const socket = io();
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'th-TH';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// const outputYou = document.querySelector('.output-you');
// const outputBot = document.querySelector('.output-bot');


const chat = document.querySelector('form')
const text = document.querySelector('input')
const send = document.querySelector('#send')
const talk = document.querySelector('#talk')

send.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(text.value)

    add_chat_to_database('user', text.value)//เพิ่มลง database

    var div = document.createElement("div");
    div.className = "chatbubble"
    div.innerHTML = text.value;
    document.getElementById("main").appendChild(div);
    document.getElementById("main").scrollTop = document.getElementById("main").scrollHeight

    fetch('http://localhost:3000/chat?message=' + text.value).then((response) => {
        response.json().then((data) => {
            console.log(data)

            add_chat_to_database('bot', data.chat)//เพิ่มลง database

            var div = document.createElement("div");
            div.className = "chatbubble darker"
            div.innerHTML = data.chat
            document.getElementById("main").appendChild(div);
            document.getElementById("main").scrollTop = document.getElementById("main").scrollHeight
        })
    })

    text.value = ""
})

talk.addEventListener('click', (e) => {
    e.preventDefault()

    recognition.start();
    
})

recognition.addEventListener('speechstart', () => {
    console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
    console.log('Result has been detected.'); 
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;
    console.log(text)
    add_chat_to_database('user', text)//เพิ่มลง database

    var div = document.createElement("div");
    div.className = "chatbubble"
    div.innerHTML = text;
    document.getElementById("main").appendChild(div);
    document.getElementById("main").scrollTop = document.getElementById("main").scrollHeight
  
    // outputYou.textContent = text;
    console.log('Confidence: ' + e.results[0][0].confidence);

    fetch('http://localhost:3000/chat?message=' + text).then((response) => {
        response.json().then((data) => {
            console.log(data)
            add_chat_to_database('bot', data.chat)//เพิ่มลง database
            var div = document.createElement("div");
            div.className = "chatbubble darker"
            div.innerHTML = data.chat
            document.getElementById("main").appendChild(div);
            document.getElementById("main").scrollTop = document.getElementById("main").scrollHeight
        })
    })
//   socket.emit('chat message', text);
});

recognition.addEventListener('speechend', () => {
    recognition.stop();
});

recognition.addEventListener('error', (e) => {
    // outputBot.textContent = 'Error: ' + e.error;
    console.log('Error: ' + e.error)
});

// function สำหรับแปลง text เป็น voice เช่นอยากให้คอมพิวเตอร์อ่านออกเสียงข้อความ
function synthVoice(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
}

// socket.on('bot reply', function(replyText) {
//     // synthVoice(replyText);
  
//     if(replyText == '') replyText = '(No answer...)';
//     console.log(replyText)

//     add_chat_to_database('bot', replyText)

//     var div = document.createElement("div");
//     div.className = "chatbubble darker"
//     div.innerHTML = replyText;
//     // div.style.margin = "5px"
//     // div.style.border = "groove"
//     // div.style.backgroundColor = "green"
//     document.getElementById("main").appendChild(div);
//     document.getElementById("main").scrollTop = document.getElementById("main").scrollHeight
//     // outputBot.textContent = replyText;
// });

function fetch_chat_history(){
    fetch('http://localhost:3000/chat_history?action=getAll').then((response) => {
        response.json().then((data) => {
            console.log(data.chat)
            data.chat.forEach(appendText)
        })
    })
}

function add_chat_to_database(user, message){
    fetch('http://localhost:3000/chat_history?action=add&user='+user+'&message='+message).then((response) => {
        response.json().then((data) => {
            console.log(data.chat)
        })
    })
}

function appendText(item, index) {
    var div = document.createElement("div");
    if(item.user == "user"){
        div.className = "chatbubble"
    }else{
        div.className = "chatbubble darker"
    }
    div.innerHTML = item.message;
    document.getElementById("main").appendChild(div);
    document.getElementById("main").scrollTop = document.getElementById("main").scrollHeight
}

fetch_chat_history()
