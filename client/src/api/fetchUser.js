const fetchUser = (userId) => {

    // Write algo for calculating userLevel according to questions asked and answers solved.
    const userLevel = "Master";

    // Write algo to calculate this from questions list
    const graphData = {
        "asked": [
            {
                "name": "Week 1",
                "previous": "3",
                "current": "1"
            }, {
                "name": "Week 2",
                "previous": "2",
                "current": "0"
            }, {
                "name": "Week 3",
                "previous": "3",
                "current": "2"
            }, {
                "name": "Week 4",
                "previous": "4",
                "current": "1"
            }
        ],

        "answered": [
            {
                "name": "Week 1",
                "previous": "1",
                "current": "1"
            }, {
                "name": "Week 2",
                "previous": "3",
                "current": "2"
            }, {
                "name": "Week 3",
                "previous": "2",
                "current": "0"
            }, {
                "name": "Week 4",
                "previous": "4",
                "current": "3"
            }
        ]
    }

    const savedQuestions = [
        {
            questionTitle: "Why scrollbar appears when we use viewport unit?",
            questionBody:
              "Why scrollbar appears when we use viewport unit? I am asking a sample question. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt voluptas odit, iure laboriosam non cum dolorem optio. Dolores veritatis enim natus consectetur totam nemo, fugit sunt qui quia eligendi?",
            questionTags: ["Web Development", "React", "CSS", "HTML"],
            questionID: "12114kjj2hl55626346l5hl25k",
            noOfAnswers: 3,
            picturePath: "www.fakepic.com",
            upVote: 2,
            userId: "12114kjj2hl55626346l5hl25k",
            askerFirstName: "Ananya",
            askerLastName: "Das",
            askedOn: 1685538433811,
            answers: [
              {
                answerBody:
                  "The easy fix is to use width: 190% instead. Percentages don't include the width of the scrollbar, so will automatically fit.",
                userId: "qws14kjj2hl55626346lwed25k",
                solverFirstName: "Rohit",
                solverLastName: "Rathore",
                upVote: 5,
                downVote: 1,
                answeredOn: 1685540407562,
              },
              {
                answerBody:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt voluptas odit, iure laboriosam non cum dolorem optio.",
                userId: "qws14kjj2hl55626346lwed25k",
                solverFirstName: "Sahil",
                solverLastName: "Sood",
                upVote: 7,
                downVote: 1,
                answeredOn: 1685540407562,
              },
            ],
          }, {
            questionTitle: "Why scrollbar appears when we use viewport unit?",
            questionBody:
              "Why scrollbar appears when we use viewport unit? I am asking a sample question. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt voluptas odit, iure laboriosam non cum dolorem optio. Dolores veritatis enim natus consectetur totam nemo, fugit sunt qui quia eligendi?",
            questionTags: ["Web Development", "React", "CSS", "HTML"],
            questionID: "12114kjj2hl55626346l5hl25k",
            noOfAnswers: 3,
            picturePath: "www.fakepic.com",
            upVote: 2,
            userId: "12114kjj2hl55626346l5hl25k",
            askerFirstName: "Ananya",
            askerLastName: "Das",
            askedOn: 1685538433811,
            answers: [
              {
                answerBody:
                  "The easy fix is to use width: 190% instead. Percentages don't include the width of the scrollbar, so will automatically fit.",
                userId: "qws14kjj2hl55626346lwed25k",
                solverFirstName: "Rohit",
                solverLastName: "Rathore",
                upVote: 5,
                downVote: 1,
                answeredOn: 1685540407562,
              },
              {
                answerBody:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt voluptas odit, iure laboriosam non cum dolorem optio.",
                userId: "qws14kjj2hl55626346lwed25k",
                solverFirstName: "Sahil",
                solverLastName: "Sood",
                upVote: 7,
                downVote: 1,
                answeredOn: 1685540407562,
              },
            ],
          }
    ]

    const myQuestions = [
        {
            questionTitle: "Why scrollbar appears when we use viewport unit?",
            questionBody:
              "Why scrollbar appears when we use viewport unit? I am asking a sample question. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt voluptas odit, iure laboriosam non cum dolorem optio. Dolores veritatis enim natus consectetur totam nemo, fugit sunt qui quia eligendi?",
            questionTags: ["Web Development", "React", "CSS", "HTML"],
            questionID: "12114kjj2hl55626346l5hl25k",
            noOfAnswers: 3,
            picturePath: "www.fakepic.com",
            upVote: 2,
            userId: "12114kjj2hl55626346l5hl25k",
            askerFirstName: "Ananya",
            askerLastName: "Das",
            askedOn: 1685538433811,
            answers: [
              {
                answerBody:
                  "The easy fix is to use width: 190% instead. Percentages don't include the width of the scrollbar, so will automatically fit.",
                userId: "qws14kjj2hl55626346lwed25k",
                solverFirstName: "Rohit",
                solverLastName: "Rathore",
                upVote: 5,
                downVote: 1,
                answeredOn: 1685540407562,
              },
              {
                answerBody:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt voluptas odit, iure laboriosam non cum dolorem optio.",
                userId: "qws14kjj2hl55626346lwed25k",
                solverFirstName: "Sahil",
                solverLastName: "Sood",
                upVote: 7,
                downVote: 1,
                answeredOn: 1685540407562,
              },
            ],
          }, {
            questionTitle: "Why scrollbar appears when we use viewport unit?",
            questionBody:
              "Why scrollbar appears when we use viewport unit? I am asking a sample question. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt voluptas odit, iure laboriosam non cum dolorem optio. Dolores veritatis enim natus consectetur totam nemo, fugit sunt qui quia eligendi?",
            questionTags: ["Web Development", "React", "CSS", "HTML"],
            questionID: "12114kjj2hl55626346l5hl25k",
            noOfAnswers: 3,
            picturePath: "www.fakepic.com",
            upVote: 2,
            userId: "12114kjj2hl55626346l5hl25k",
            askerFirstName: "Ananya",
            askerLastName: "Das",
            askedOn: 1685538433811,
            answers: [
              {
                answerBody:
                  "The easy fix is to use width: 190% instead. Percentages don't include the width of the scrollbar, so will automatically fit.",
                userId: "qws14kjj2hl55626346lwed25k",
                solverFirstName: "Rohit",
                solverLastName: "Rathore",
                upVote: 5,
                downVote: 1,
                answeredOn: 1685540407562,
              },
              {
                answerBody:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt voluptas odit, iure laboriosam non cum dolorem optio.",
                userId: "qws14kjj2hl55626346lwed25k",
                solverFirstName: "Sahil",
                solverLastName: "Sood",
                upVote: 7,
                downVote: 1,
                answeredOn: 1685540407562,
              },
            ],
          }
    ]

    const notifications = [
      {
        "message" : "This is a dummy notification.",
        "date": 1685540407562
      }, {
        "message" : "This is a dummy notification.",
        "date": 1685540407562
      }, {
        "message" : "This is a dummy notification.",
        "date": 1685540407562
      }
    ]

    return {
        "firstName": "Rajendra",
        "lastName": "Verma",
        "avtarIndex": 2,
        "email": "rajendra.v@xyz.com",
        "password": "rajven",
        "about": "I am an Electronics Engineering Student and an web developer searching for solutions to web development bugs.",
        "tags": ["Rust", "JavScript", "Python", "React", "HTML/CSS", "C++"],
        "noOfQuestionsAsked": 20,
        "noOfAnswersGiven": 15,
        userLevel,
        graphData,
        savedQuestions,
        myQuestions,
        notifications
    }
}

export default fetchUser;