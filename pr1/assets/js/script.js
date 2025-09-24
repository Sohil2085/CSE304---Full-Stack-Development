let voteStore = localStorage.getItem("votes");
let votes = voteStore ? JSON.parse(voteStore) : {
    Javascript : 0,
    Python : 0,
    Java : 0
}

const resultDiv = document.querySelector('.result');

function renderResult(params) {
    resultDiv.innerHTML = `
    <ul class="pt-5">
        <li class="text-center">Javascript : ${votes.Javascript}</li>
        <li class="text-center">Python : ${votes.Python}</li>
        <li class="text-center">Java : ${votes.Java}</li>
    </ul>
    `;
}

let buttons = document.querySelectorAll('.custom_button button');

buttons.forEach(btn => {
    btn.onclick = function () {
        let lang = btn.innerText;
        votes[lang]++;
        localStorage.setItem("votes",JSON.stringify(votes));
        console.log(votes);
        renderResult();   
    }
})


setInterval(() => {
    const languages = ["Javascript", "Python", "Java"];
    const randomLang = languages[Math.floor(Math.random() * languages.length)];
    votes[randomLang]++;
    renderResult()
}, 2000);

function reset() {
    votes = {
        Javascript : 0,
        Python : 0,
        Java : 0
    }
    console.log(votes)
    localStorage.setItem("votes",JSON.stringify(votes))
    renderResult()
}


renderResult();