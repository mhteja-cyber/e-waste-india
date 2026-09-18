/* =========================
   MOBILE NAVIGATION
========================= */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* Close menu after clicking a link */

document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });


/* =========================
   STATISTICS COUNTERS
========================= */

const counters =
    document.querySelectorAll(".counter");


const counterObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const counter =
                    entry.target;

                const target =
                    parseFloat(
                        counter.dataset.target
                    );

                let current = 0;

                const duration = 1200;

                const startTime =
                    performance.now();


                function animate(time) {

                    const progress =
                        Math.min(
                            (time - startTime) /
                            duration,
                            1
                        );

                    current =
                        target * progress;


                    if (target % 1 !== 0) {

                        counter.textContent =
                            current.toFixed(1);

                    } else {

                        counter.textContent =
                            Math.floor(current);

                    }


                    if (progress < 1) {

                        requestAnimationFrame(
                            animate
                        );

                    } else {

                        counter.textContent =
                            target % 1 !== 0
                                ? target.toFixed(1)
                                : target;

                    }

                }


                requestAnimationFrame(
                    animate
                );


                counterObserver.unobserve(
                    counter
                );

            });

        },

        {
            threshold: 0.5
        }

    );


counters.forEach((counter) => {

    counterObserver.observe(counter);

});


/* =========================
   E-WASTE JOURNEY
========================= */

const journeySteps =
    document.querySelectorAll(
        ".journey-step"
    );


const journeyInfoIcon =
    document.getElementById(
        "journeyInfoIcon"
    );


const journeyInfoTitle =
    document.getElementById(
        "journeyInfoTitle"
    );


const journeyInfoText =
    document.getElementById(
        "journeyInfoText"
    );


const progressFill =
    document.getElementById(
        "progressFill"
    );


const journeyData = {

    1: {

        icon: "📱",

        title: "Consumer",

        text:
            "The journey begins when a consumer decides that an electronic device is no longer needed or useful."

    },


    2: {

        icon: "📦",

        title: "Collection",

        text:
            "The discarded device enters an appropriate e-waste collection system for further management."

    },


    3: {

        icon: "🔍",

        title: "Sorting",

        text:
            "Different equipment and components are separated according to their type, condition and materials."

    },


    4: {

        icon: "🔧",

        title: "Dismantling",

        text:
            "Equipment is carefully dismantled so that components and recoverable materials can be separated."

    },


    5: {

        icon: "♻️",

        title: "Material Recovery",

        text:
            "Recoverable materials are processed so that they can potentially return to productive use."

    }

};


journeySteps.forEach((step) => {

    step.addEventListener(
        "click",
        () => {

            const stepNumber =
                step.dataset.step;

            const data =
                journeyData[stepNumber];


            journeySteps.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            step.classList.add(
                "active"
            );


            journeyInfoIcon.textContent =
                data.icon;

            journeyInfoTitle.textContent =
                data.title;

            journeyInfoText.textContent =
                data.text;


            const progress =
                Number(stepNumber) * 20;


            progressFill.style.width =
                `${progress}%`;

        }
    );

});


/* =========================
   QUIZ
========================= */

const quizQuestions = [

    {

        question:
            "What does e-waste refer to?",

        options: [

            "Discarded electrical and electronic equipment",

            "Only plastic waste",

            "Food waste",

            "Construction waste"

        ],

        answer: 0

    },


    {

        question:
            "Which action can extend the useful life of electronics?",

        options: [

            "Repair",

            "Immediate disposal",

            "Burning",

            "Throwing away"

        ],

        answer: 0

    },


    {

        question:
            "Which of these is an example of e-waste?",

        options: [

            "Old mobile phone",

            "Fresh vegetables",

            "Paper notebook",

            "Cotton shirt"

        ],

        answer: 0

    },


    {

        question:
            "What is one benefit of recycling e-waste?",

        options: [

            "Recovering useful materials",

            "Increasing waste",

            "Reducing product life",

            "Creating unnecessary disposal"

        ],

        answer: 0

    },


    {

        question:
            "Which three actions form the main 3R approach used on this website?",

        options: [

            "Reduce, Reuse, Recycle",

            "Remove, Run, Replace",

            "Read, Record, Report",

            "Repair, Remove, Reject"

        ],

        answer: 0

    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


const quizCount =
    document.getElementById(
        "quizCount"
    );


const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );


const quizOptions =
    document.getElementById(
        "quizOptions"
    );


const quizResult =
    document.getElementById(
        "quizResult"
    );


const quizNext =
    document.getElementById(
        "quizNext"
    );


function loadQuestion() {

    answered = false;

    quizNext.style.display =
        "none";

    quizResult.textContent =
        "";


    const question =
        quizQuestions[
            currentQuestion
        ];


    quizCount.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;


    quizQuestion.textContent =
        question.question;


    quizOptions.innerHTML =
        "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-option";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );


            quizOptions.appendChild(
                button
            );

        }
    );

}


function checkAnswer(
    selected,
    selectedButton
) {

    if (answered) {
        return;
    }


    answered = true;


    const question =
        quizQuestions[
            currentQuestion
        ];


    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );


    buttons.forEach(
        (button, index) => {

            if (
                index ===
                question.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selected ===
        question.answer
    ) {

        score++;

        selectedButton.classList.add(
            "correct"
        );

        quizResult.textContent =
            "✓ Correct!";

    } else {

        selectedButton.classList.add(
            "wrong"
        );

        quizResult.textContent =
            "✗ Not quite. The highlighted answer is correct.";

    }


    quizNext.style.display =
        "inline-flex";

}


quizNext.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion >=
            quizQuestions.length
        ) {

            showQuizResult();

            return;

        }


        loadQuestion();

    }
);


function showQuizResult() {

    quizCount.textContent =
        "Quiz Complete";


    quizQuestion.textContent =
        `You scored ${score} out of ${quizQuestions.length}!`;


    quizOptions.innerHTML =
        "";


    quizResult.textContent =
        score === quizQuestions.length
            ? "Excellent! You know your e-waste basics. 🌱"
            : "Good work! Explore the website once more to learn more about e-waste.";


    quizNext.textContent =
        "Take Quiz Again ↻";


    quizNext.style.display =
        "inline-flex";


    quizNext.onclick = () => {

        currentQuestion = 0;

        score = 0;

        quizNext.textContent =
            "Next Question →";

        loadQuestion();

    };

}


loadQuestion();