const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.lang = 'th-TH'
recognition.interimResults = false
recognition.maxAlternatives = 1

const chat = document.querySelector('form')
const text = document.querySelector('input')
const send = document.querySelector('#send')
const talk = document.querySelector('#talk')

// function สำหรับการทำงานหลังจาก user ส่ง text
send.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(text.value)

    addChatToDB('user', text.value)//เพิ่มลง database
    appendTextFromChat(text.value, "user")//เพิ่ม text ลงหน้าต่าง chat

    fetch('http://localhost:3000/chat?message=' + text.value).then((response) => {
        response.json().then((data) => {
            console.log(data)
            addChatToDB('bot', data.chat)//เพิ่มลง database
            appendTextFromChat(data.chat, "bot")//เพิ่ม text ลงหน้าต่าง chat
        })
    })
    text.value = ""
})

// function สำหรับการทำงานหลังจาก user กดบันทึกเสียง
talk.addEventListener('click', (e) => {
    e.preventDefault()
    recognition.start()
})

recognition.addEventListener('speechstart', () => {
    console.log('Speech has been detected.')
});

recognition.addEventListener('result', (e) => {
    console.log('Result has been detected.'); 
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;
    console.log(text)
    addChatToDB('user', text)//เพิ่มลง database
    appendTextFromChat(text, "user")//เพิ่ม text ลงหน้าต่าง chat
  
    console.log('Confidence: ' + e.results[0][0].confidence);

    fetch('http://localhost:3000/chat?message=' + text).then((response) => {
        response.json().then((data) => {
            console.log(data)
            addChatToDB('bot', data.chat)//เพิ่มลง database
            appendTextFromChat(data.chat, "bot")//เพิ่ม text ลงหน้าต่าง chat
        })
    })
});

recognition.addEventListener('speechend', () => {
    recognition.stop();
});

recognition.addEventListener('error', (e) => {
    console.log('Error: ' + e.error)
});

// function สำหรับแปลง text เป็น voice เช่นอยากให้คอมพิวเตอร์อ่านออกเสียงข้อความ
function synthVoice(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
}

function fetchChatHistory(){
    fetch('http://localhost:3000/chat_history?action=getAll').then((response) => {
        response.json().then((data) => {
            console.log(data.chat)
            data.chat.forEach(appendTextFromDB)
        })
    })
}

function addChatToDB(user, message){
    fetch('http://localhost:3000/chat_history?action=add&user='+user+'&message='+message).then((response) => {
        response.json().then((data) => {
            console.log(data.chat)
        })
    })
}

function appendTextFromDB(item, index) {
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

function appendTextFromChat(text, user) {
    var div = document.createElement("div")
    if(user == "user"){
        div.className = "chatbubble"
    }else{
        div.className = "chatbubble darker"
    }
    div.innerHTML = text
    document.getElementById("main").appendChild(div);
    document.getElementById("main").scrollTop = document.getElementById("main").scrollHeight
}

fetchChatHistory()

