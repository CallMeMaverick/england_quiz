const questions = [
    {
        "statement": "Вільгельм Завойовник завоював Англію у 1166 році",
        "answer": false,
        "explanation": "Вільгельм Завойовник завоював Англію у 1066 році під час битви при Гастингсі, що стала вирішальною в Нормандському завоюванні Англії."
    },

    {
        "statement": "Елізабет І була останнім монархом династії Тюдорів",
        "answer": true,
        "explanation": "Елізабет І, яка панувала з 1558 по 1603 рік, була дочкою Генріха VIII і була останнім монархом з династії Тюдорів."
    },

    {
        "statement": "Англійська громадянська війна відбулася у 19 столітті.",
        "answer": false,
        "explanation": "Англійська громадянська війна відбулася у середині 17 століття (1642-1651), коли збройний конфлікт між королівськими силами та парламентаріями призвів до виконавчої влади парламенту та страти короля Карла I."
    },

    {
        "statement": "Король Генріх VIII заснував Англіканську церкву у 16 столітті через незгоду з католицькою церквою щодо розлучення.",
        "answer": true,
        "explanation": "Генріх VIII заснував Церкву Англії після того, як Папа Римський відмовив йому у розірванні шлюбу з Катериною Арагонською. Це призвело до розколу з Римсько-католицькою церквою та започаткування Реформації в Англії."
    },

    {
        "statement": "Велика хартія вольностей (Magna Carta) була підписана у 1215 році як документ, що обмежує владу короля над аристократією.",
        "answer": true,
        "explanation": "Велика хартія вольностей, підписана королем Іоанном Безземельним, була одним з перших документів, що обмежували владу короля, забезпечуючи певні права аристократії та закладаючи основи для конституційного урядування."
    }
]

const score = document.getElementById("score");
const statement = document.getElementById("statement");
const optionButtons = document.getElementById("option-buttons").children;
const explanation = document.getElementById("explanation");


const nextQuestionButton = document.getElementById("next-question");
nextQuestionButton.addEventListener("click", nextQuestion);

let correctAnswers = 0;
let incorrectAnswers = 0;

let question;

function enable (button) {
    button.removeAttribute("disabled")
}

function disable (button) {
    button.setAttribute("disabled", "");
}

function isCorrect(answer, actualAnswer) {
    return answer === actualAnswer;
}

function updateScore(newCorrectAnswers, newIncorrectAnswers) {
    score.textContent = `${newCorrectAnswers} \\ ${newIncorrectAnswers}`;
}

function nextQuestion() {
    document.getElementById("wrapper").style.boxShadow = "12px 12px 2px 1px lightblue";
    question = questions.shift();

    statement.textContent = question.statement;

    updateScore(correctAnswers, incorrectAnswers);

    for (let button of optionButtons) {
        button.classList.remove("correct");
        button.classList.remove("incorrect");
        enable(button);
    }

    disable(nextQuestionButton);
    explanation.textContent = "";
}

for (let buttonClicked of optionButtons) {
    buttonClicked.addEventListener("click", (event) => {

        for (let innerButtonClicked of optionButtons) {
            disable(innerButtonClicked);
        }

        if (questions.length > 0) {
            enable(nextQuestionButton);
        }
        else {
            nextQuestionButton.textContent = "Кінець";
        }

        let answer = event.target.value;
        if (isCorrect(answer, question.answer.toString())) {
            document.getElementById("wrapper").style.boxShadow = "12px 12px 2px 1px lightgreen";
            buttonClicked.classList.add("correct");
            correctAnswers++;
        }
        else {
            document.getElementById("wrapper").style.boxShadow = "12px 12px 2px 1px lightpink";
            buttonClicked.classList.add("incorrect");
            incorrectAnswers++;
        }

        updateScore(correctAnswers, incorrectAnswers);

        explanation.textContent = question.explanation;
    })
}

nextQuestion();
