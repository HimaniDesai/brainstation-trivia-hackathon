const categories = [
    {
        "id": 9,
        "name": "General Knowledge"
    },
    {
        "id": 10,
        "name": "Entertainment: Books"
    },
    {
        "id": 11,
        "name": "Entertainment: Film"
    },
    {
        "id": 12,
        "name": "Entertainment: Music"
    },
    {
        "id": 13,
        "name": "Entertainment: Musicals & Theatres"
    },
    {
        "id": 14,
        "name": "Entertainment: Television"
    },
    {
        "id": 15,
        "name": "Entertainment: Video Games"
    },
    {
        "id": 16,
        "name": "Entertainment: Board Games"
    },
    {
        "id": 17,
        "name": "Science & Nature"
    },
    {
        "id": 18,
        "name": "Science: Computers"
    },
    {
        "id": 19,
        "name": "Science: Mathematics"
    },
    {
        "id": 20,
        "name": "Mythology"
    },
    {
        "id": 21,
        "name": "Sports"
    },
    {
        "id": 22,
        "name": "Geography"
    },
    {
        "id": 23,
        "name": "History"
    },
    {
        "id": 24,
        "name": "Politics"
    },
    {
        "id": 25,
        "name": "Art"
    },
    {
        "id": 26,
        "name": "Celebrities"
    },
    {
        "id": 27,
        "name": "Animals"
    },
    {
        "id": 28,
        "name": "Vehicles"
    },
    {
        "id": 29,
        "name": "Entertainment: Comics"
    },
    {
        "id": 30,
        "name": "Science: Gadgets"
    },
    {
        "id": 31,
        "name": "Entertainment: Japanese Anime & Manga"
    },
    {
        "id": 32,
        "name": "Entertainment: Cartoon & Animations"
    }
];

for (let i = 0; i < categories.length; i++) {
    let categoryContainer = document.querySelector(".category-container");
    let categoryElement = document.createElement("button");
    categoryElement.classList.add("category_name");

    categoryElement.innerText = categories[i].name;

    // Pass category name and ID to the getQuiz function
    categoryElement.addEventListener('click', () => {
        triviaQuizApi.getQuiz(categories[i].id, categories[i].name);
    });

    categoryContainer.appendChild(categoryElement);
}

function displayQuestions(arr, categoryName) {
    // Clear previous content
    let commentContainer = document.querySelector(".quiz__default-quiz");
    commentContainer.innerHTML = "";  // Clear previous questions

    let defaultContainer = document.createElement("div");
    defaultContainer.classList.add("quiz__default");

    // Set the category name dynamically
    defaultContainer.innerText = `${categoryName}`;
    commentContainer.appendChild(defaultContainer);

    for (let i = 0; i < arr.length; i++) {
        let question = document.createElement("button");
        question.classList.add("quiz__question--name");
        question.innerText = arr[i]["question"];
        defaultContainer.appendChild(question);
    }
}

class TriviaQuizApi {
    constructor() {
        this.baseUrl = "https://opentdb.com/api.php?amount=10&category=";
    }

    // Accept both categoryId and categoryName
    async getQuiz(categoryId, categoryName) {
        try {
            const response = await axios.get(`${this.baseUrl}${categoryId}&type=multiple`);
            const quiz = response.data;
            // Pass the category name to displayQuestions
            displayQuestions(quiz.results, categoryName);
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    }
}

const triviaQuizApi = new TriviaQuizApi();
