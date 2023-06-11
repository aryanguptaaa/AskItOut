import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

const questionIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

export const users = [
    {
        _id: userIds[0],
        firstName: "abc",
        lastName: "def",
        email: "doenfefsd",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf40AIe/X/AK9skyWUy",
        avtarIndex: 0,
        about: "sfbiufblsdf",
        tags: [
            "js",
            "java",
            "cpp",
        ],
        noOfQuestionsAsked: 0,
        noOfAnswersGiven: 1,
        savedQuestions: [
            questionIds[0],
        ],
        myQuestions: [],
        myAnsweredQuestions: [
            questionIds[0],
        ],
        createdAt: 13813260723,
        updatedAt: 13813260723,
        __v: 0,
    },
    {
        _id: userIds[1],
        firstName: "abdgc",
        lastName: "defwefwef",
        email: "doenfefswwqdwdsd",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf40AIe/X/AK9skyWUy",
        avtarIndex: 1,
        about: "sfbiufbsddefefdslsdf",
        tags: [
            "go",
            "cpp",
            "c",
        ],
        noOfQuestionsAsked: 1,
        noOfAnswersGiven: 2,
        savedQuestions: [
            questionIds[0],
            questionIds[1],
            questionIds[2],
        ],
        myQuestions: [
            questionIds[0],
        ],
        myAnsweredQuestions: [
            questionIds[1],
            questionIds[2],
        ],
        createdAt: 13813260723,
        updatedAt: 13813260723,
        __v: 0,
    },
    {
        _id: userIds[2],
        firstName: "abdgefsec",
        lastName: "defwefwfseef",
        email: "doenfefswwqdhdwdsd",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf40AIe/X/AK9skyWUy",
        avtarIndex: 4,
        about: "sfbiudasddawsfbsddefefdslsdf",
        tags: [
            "python",
            "css",
        ],
        noOfQuestionsAsked: 1,
        noOfAnswersGiven: 0,
        savedQuestions: [],
        myQuestions: [
            questionIds[1],
        ],
        myAnsweredQuestions: [],
        createdAt: 13813260723,
        updatedAt: 13813260723,
        __v: 0,
    },
    {
        _id: userIds[3],
        firstName: "abvdvdgc",
        lastName: "defwefwexvddvf",
        email: "doenfefswwdxvdxvdxqdwdsd",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf40AIe/X/AK9skyWUy",
        avtarIndex: 1,
        about: "sfbiufbdxvxddvsddefefdslsdf",
        tags: [
            "go",
            "cpp",
        ],
        noOfQuestionsAsked: 1,
        noOfAnswersGiven: 1,
        savedQuestions: [
            questionIds[2],
        ],
        myQuestions: [
            questionIds[2],
        ],
        myAnsweredQuestions: [
            questionIds[0],
        ],
        createdAt: 13813260723,
        updatedAt: 13813260723,
        __v: 0,
    },
];

export const questions = [
    {
        _id: questionIds[0],
        questionTitle: "Why are we here?",
        questionBody: "No body,just why even are we here ?",
        questionTags: [
            "JS",
            "Java",
        ],
        noOfAnswers: 2,
        picturePath: "",
        upVote: [],
        downVote: [],
        userPosted: userIds[1],
        userId: userIds[1],
        askedOn: 1686492260750,
        answer: [
            {
                answerBody: "Dont really know...",
                userAnswered: userIds[3],
                userId: userIds[3],
                upVote: [],
                downVote: [
                    userIds[1],
                ],
                answeredOn: 1686492260750,
            },
            {
                answerBody: "To play Pubg",
                userAnswered: userIds[0],
                userId: userIds[0],
                upVote: [
                    userIds[1],
                    userIds[2],
                ],
                downVote: [],
                answeredOn: 1686492260750,
            },
        ],
    },
    {
        _id: questionIds[1],
        questionTitle: "What color is the sky?",
        questionBody: "efawefewfd fdaf ",
        questionTags: [
            "Python",
            "Java",
        ],
        noOfAnswers: 1,
        picturePath: "",
        upVote: [
            userIds[1],
        ],
        downVote: [],
        userPosted: userIds[2],
        userId: userIds[2],
        askedOn: 1686492260750,
        answer: [
            {
                answerBody: "Ay mi amor,ay mi amor!!",
                userAnswered: userIds[1],
                userId: userIds[1],
                upVote: [
                    userIds[2],
                    userIds[1],
                ],
                downVote: [],
                answeredOn: 1686492260750,
            },
        ],
    },
    {
        _id: questionIds[3],
        questionTitle: "Why this kolaveri di?",
        questionBody: "Why this kolaveri kolaveri kolaveri di",
        questionTags: [
            "Python",
            "Cpp",
        ],
        noOfAnswers: 1,
        picturePath: "",
        upVote: [
            userIds[1],
            userIds[3],
        ],
        downVote: [
            userIds[0],
        ],
        userPosted: userIds[3],
        userId: userIds[3],
        askedOn: 1686492260750,
        answer: [
            {
                answerBody: "gikguiln iunilumhlhoi unihuih u nulnlulihyytgv yfytfytmbhbv",
                userAnswered: userIds[1],
                userId: userIds[1],
                upVote: [
                    userIds[3],
                    userIds[1],
                ],
                downVote: [],
                answeredOn: 1686492260750,
            },
        ],
    },
];