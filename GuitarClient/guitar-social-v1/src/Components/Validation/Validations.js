export function nameValidation(userInput) {
    //name must begin with capital letter.
    const pattern = /^\b[A-Z]+[a-z]*$/;

    let answer = false;

    if (userInput === "") {
        console.log(`nameValidation FAILED. String is empty.`);
    } else {
        if (pattern.test(userInput)) {
            answer = true;
        }
    }
    return answer;

};

export function emailValidation(email) {
    let answer = false;

    const pattern = /^[a-zA-Z0-9.-_]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;

    if (email === "") {
        console.log(`emailValidation FAILED. String is empty.`);
    } else {
        if (pattern.test(email)) {
            answer = true;
        }
    }
    return answer;
}

export function usernameValidation(username) {
    //username must be at least 4 characters
    //username must contain at least 1 letter
    //username may contain a number.
    const pattern = /^(?=.*[a-zA-Z])(?=.*[A-Za-z0-9]).{4,}$/;
    let answer = false;

    if (username === "") {
        console.log(`usernameValidation FAILED. String is empty.`)
    } else {
        if (pattern.test(username)) {
            answer = true;
        }
    }

    return answer;
}

export function passwordValidation(password) {
    // password must contain at least 5 characters
    // password must contain at least one lower case letter
    // password must contain at least one upper case letter
    // password must contain at least one number

    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    let answer = false;

    if (password === "") {
        console.log(`passwordValidation FAILED. String is empty.`)
    } else {
        if (pattern.test(password)) {
            answer = true;
        }
    }
    return answer;
}