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

const dropdown = document.querySelector('.dropdown');
const select = dropdown.querySelector('.select');
const caret = dropdown.querySelector('.caret');
const categoryList = dropdown.querySelector('.category-list');
const selected = dropdown.querySelector('.selected');

categories.forEach(category => {
    const li = document.createElement('li');
    li.innerText = category.name;
    categoryList.appendChild(li);

    li.addEventListener('click', async () => {
        selected.innerText = category.name;

        await triviaQuizApi.getQuiz(category.id, category.name);

        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        categoryList.classList.remove('list-open');

        const options = dropdown.querySelectorAll('.category-list li');
        options.forEach(option => option.classList.remove('active'));
        li.classList.add('active');
    });
});

select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    categoryList.classList.toggle('list-open');
});

function displayQuestions(arr, categoryName) {
    let commentContainer = document.querySelector(".quiz__default-quiz");
    commentContainer.innerHTML = "";

    let defaultContainer = document.createElement("div");
    defaultContainer.classList.add("quiz__default");

    defaultContainer.innerText = `${categoryName}`;
    commentContainer.appendChild(defaultContainer);

    for (let i = 0; i < arr.length; i++) {

        let correct_answer=arr[i]["correct_answer"];
        let options = arr[i]["incorrect_answers"];
        options.push(correct_answer);
        console.log(options);
        let random = Math.floor(Math.random() * 4);
        console.log(random);

        let question = document.createElement("h2");
        question.classList.add("quiz__question--name");
        question.innerText = (i+1)+ "\t" + arr[i]["question"];
        defaultContainer.appendChild(question);

        let option1 = document.createElement("h2");
        option1.classList.add("quiz__option--one");
        option1.innerText = options[random];
        random = (random+1)%4;
        defaultContainer.appendChild(option1); 

        let option2 = document.createElement("h2");
        option2.classList.add("quiz__option--two");
        option2.innerText = options[random];
        random = (random+1)%4;
        defaultContainer.appendChild(option2); 

        let option3 = document.createElement("h2");
        option3.classList.add("quiz__option--three");
        option3.innerText = options[random];
        random = (random+1)%4;
        defaultContainer.appendChild(option3); 

        let option4 = document.createElement("h2");
        option4.classList.add("quiz__option--four");
        option4.innerText = options[random];
        random = (random+1)%4;
        defaultContainer.appendChild(option4); 
    }
}

class TriviaQuizApi {
    constructor() {
        this.baseUrl = "https://opentdb.com/api.php?amount=10&category=";
    }

    async getQuiz(categoryId, categoryName) {
        try {
            const response = await axios.get(`${this.baseUrl}${categoryId}&type=multiple`);
            const quiz = response.data;

            displayQuestions(quiz.results, categoryName);
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    }
}

const triviaQuizApi = new TriviaQuizApi();