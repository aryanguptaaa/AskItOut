const getUserLevel = (noOfQuestionsAsked, noOfAnswersGiven) => {
    let userLevel = 'Beginner';
    if (noOfQuestionsAsked > 10 && noOfAnswersGiven > 8) {
        userLevel = 'Master';
    } else if (noOfQuestionsAsked > 6 && noOfAnswersGiven > 4) {
        userLevel = 'Intermediate';
    } else {
        userLevel = 'Beginner';
    }
    return userLevel;
}

export default getUserLevel;