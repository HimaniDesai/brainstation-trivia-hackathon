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
        commentContainer.appendChild(question);
  
    }
}