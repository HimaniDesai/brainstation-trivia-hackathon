const categories = [
  {
    id: 9,
    name: "General Knowledge",
  },
  {
    id: 10,
    name: "Entertainment: Books",
  },
  {
    id: 11,
    name: "Entertainment: Film",
  },
  {
    id: 12,
    name: "Entertainment: Music",
  },
  {
    id: 13,
    name: "Entertainment: Musicals & Theatres",
  },
  {
    id: 14,
    name: "Entertainment: Television",
  },
  {
    id: 15,
    name: "Entertainment: Video Games",
  },
  {
    id: 16,
    name: "Entertainment: Board Games",
  },
  {
    id: 17,
    name: "Science & Nature",
  },
  {
    id: 18,
    name: "Science: Computers",
  },
  {
    id: 19,
    name: "Science: Mathematics",
  },
  {
    id: 20,
    name: "Mythology",
  },
  {
    id: 21,
    name: "Sports",
  },
  {
    id: 22,
    name: "Geography",
  },
  {
    id: 23,
    name: "History",
  },
  {
    id: 24,
    name: "Politics",
  },
  {
    id: 25,
    name: "Art",
  },
  {
    id: 26,
    name: "Celebrities",
  },
  {
    id: 27,
    name: "Animals",
  },
  {
    id: 28,
    name: "Vehicles",
  },
  {
    id: 29,
    name: "Entertainment: Comics",
  },
  {
    id: 30,
    name: "Science: Gadgets",
  },
  {
    id: 31,
    name: "Entertainment: Japanese Anime & Manga",
  },
  {
    id: 32,
    name: "Entertainment: Cartoon & Animations",
  },
];

const dropdown = document.querySelector(".dropdown");
const select = dropdown.querySelector(".select");
const caret = dropdown.querySelector(".caret");
const categoryList = dropdown.querySelector(".category-list");
const selected = dropdown.querySelector(".selected");

categories.forEach((category) => {
  const li = document.createElement("li");
  li.innerText = category.name;
  categoryList.appendChild(li);

  li.addEventListener("click", async () => {
    selected.innerText = category.name;

    await triviaQuizApi.getQuiz(category.id, category.name);

    select.classList.remove("select-clicked");
    caret.classList.remove("caret-rotate");
    categoryList.classList.remove("list-open");

    const options = dropdown.querySelectorAll(".category-list li");
    options.forEach((option) => option.classList.remove("active"));
    li.classList.add("active");
  });
});

select.addEventListener("click", () => {
  select.classList.toggle("select-clicked");
  caret.classList.toggle("caret-rotate");
  categoryList.classList.toggle("list-open");
});

function displayQuestions(arr, categoryName) {
  // Clear previous content
  let commentContainer = document.querySelector(".quiz__default-quiz");
  commentContainer.innerHTML = ""; // Clear previous questions

  let defaultContainer = document.createElement("div");
  defaultContainer.classList.add("quiz__default");

  // Set the category name dynamically
  defaultContainer.innerText = `${categoryName}`;
  commentContainer.appendChild(defaultContainer);
  const answers_array = [];
  const selected_answers = [];
  for (let i = 0; i < arr.length; i++) {
    let correct_answer = arr[i]["correct_answer"];

    answers_array[i] = correct_answer;
    console.log(answers_array);
    let options = arr[i]["incorrect_answers"];
    options.push(correct_answer);
    console.log(options);
    let random = Math.floor(Math.random() * 4);
    console.log(random);

    let question = document.createElement("h2");
    question.classList.add("quiz__question--name");
    question.innerText = i + 1 + "\t" + arr[i]["question"];
    defaultContainer.appendChild(question);
    let choice = "";
    let option1 = document.createElement("button");
    option1.classList.add("quiz__option--one");
    let data1 = options[random];
    option1.innerText = data1;
    random = (random + 1) % 4;
    defaultContainer.appendChild(option1);
    option1.addEventListener(
      "click",
      () => {
        // choice=data1;
        selected_answers[i] = data1;
        console.log(selected_answers);
      },
      true
    );

    let option2 = document.createElement("button");
    option2.classList.add("quiz__option--two");
    let data2 = options[random];
    option2.innerText = data2;
    random = (random + 1) % 4;
    defaultContainer.appendChild(option2);
    option2.addEventListener(
      "click",
      () => {
        selected_answers[i] = data2;
        console.log(selected_answers);
        // choice=data2;
        // ifClicked=true;
      },
      true
    );

    let option3 = document.createElement("button");
    option3.classList.add("quiz__option--three");
    let data3 = options[random];
    option3.innerText = data3;
    random = (random + 1) % 4;
    defaultContainer.appendChild(option3);
    option3.addEventListener(
      "click",
      () => {
        selected_answers[i] = data3;
        console.log(selected_answers);
        // choice=data3;
        // ifClicked=true;
      },
      true
    );

    let option4 = document.createElement("button");
    option4.classList.add("quiz__option--four");
    let data4 = options[random];
    option4.innerText = data4;
    random = (random + 1) % 4;
    defaultContainer.appendChild(option4);
    option4.addEventListener(
      "click",
      () => {
        selected_answers[i] = data4;
        console.log(selected_answers);
        // choice=data4;
        // ifClicked=true;
      },
      true
    );
    console.log(selected_answers);
  }
  let submit = document.createElement("button");
  submit.classList.add("quiz__submit");
  submit.innerText = "SUBMIT QUIZ";
  defaultContainer.appendChild(submit);
  submit.addEventListener(
    "click",
    () => {
      total = 0;
      for (let i = 0; i < answers_array.length; i++) {
        if (answers_array[i] == selected_answers[i]) {
          total += 1;
        }
      }
      let score = document.querySelector(".quiz__score");
      score.innerHTML = "";
      score.innerText = "Your Score is " + total;
      defaultContainer.appendChild(score);
      console.log("Score" + total);
    },
    true
  );
  console.log(selected_answers);
}

class TriviaQuizApi {
  constructor() {
    this.baseUrl = "https://opentdb.com/api.php?amount=10&category=";
  }

  async getQuiz(categoryId, categoryName) {
    try {
      const response = await axios.get(
        `${this.baseUrl}${categoryId}&type=multiple`
      );
      const quiz = response.data;

      displayQuestions(quiz.results, categoryName);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  }
}

const triviaQuizApi = new TriviaQuizApi();
