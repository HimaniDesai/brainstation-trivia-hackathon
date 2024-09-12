categories = ["General Knowledge", "Entertainment:Books",];

let defaultContainer = document.querySelector(".category-container");

for (let i=0; i< categories.length; i++) {
    let categoryElement = document.createElement("h2");
    categoryElement.classList.add("category_name");

    categoryElement.innerText = categories[i]["category"];

    defaultContainer.appendChild(categoryElement);
}

function displayQuestions(arr) {
    let commentContainer = document.querySelector(".quiz__default-quiz");

    let defaultContainer = document.createElement("div");
    defaultContainer.classList.add("quiz__default");
    defaultContainer.innerText="Science:Mathematcis"
    commentContainer.appendChild(defaultContainer);

    for (let i = 0; i < arr.length; i++) {
        

        let question = document.createElement("h2");
        question.classList.add("quiz__question--name");
        question.innerText = arr[i]["question"];
        defaultContainer.appendChild(question);  
    }
}

class TriviaQuizApi {
    constructor() {
        this.baseUrl = "https://opentdb.com/api.php?amount=10&category=19&type=multiple";
    }
    async getQuiz() {
        try {
            const response = await axios.get(`${this.baseUrl}`);
            const quiz = response.data;
            // Sort comments from newest to oldest
            return quiz;
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }
}
const triviaQuizApi = new TriviaQuizApi();
(async () => {
    // Get questions
    const quiz_arr =  await triviaQuizApi.getQuiz();
    displayQuestions(quiz_arr.results);
    console.log(quiz_arr.results);
  })();