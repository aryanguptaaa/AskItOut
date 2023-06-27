const fetchQuestion = (questionId) => {
    return {
        "questionTitle": "Why scrollbar appears when we use viewport unit?",
        "questionBody": "Why scrollbar appears when we use viewport unit? I am asking a sample question. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt voluptas odit, iure laboriosam non cum dolorem optio. Dolores veritatis enim natus consectetur totam nemo, fugit sunt qui quia eligendi?",
        "questionTags": ["Web Development", "React", "CSS", "HTML"],
        "questionID": "12114kjj2hl55626346l5hl25k",
        "noOfAnswers": 3,
        "picturePath": "www.fakepic.com",
        "upVote": 2,
        "userId": "12114kjj2hl55626346l5hl25k",
        "askerFirstName": "Ananya",
        "askerLastName": "Das",
        "askedOn": 1685538433811,
        "answers": [
            {
                "answerBody": "The easy fix is to use width: 190% instead. Percentages don't include the width of the scrollbar, so will automatically fit.",
                "userId": "qws14kjj2hl55626346lwed25k",
                "solverFirstName": "Rohit",
                "solverLastName": "Rathore",
                "upVote": 5,
                "downVote": 1,
                "answeredOn": 1685540407562
            }, {
                "answerBody": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt voluptas odit, iure laboriosam non cum dolorem optio.",
                "userId": "qws14kjj2hl55626346lwed25k",
                "solverFirstName": "Sahil",
                "solverLastName": "Sood",
                "upVote": 7,
                "downVote": 1,
                "answeredOn": 1685540407562
            }
        ]
    }
}

export default fetchQuestion;