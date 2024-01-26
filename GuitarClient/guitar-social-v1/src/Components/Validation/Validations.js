// import api from '../../API/axiosConfig';

export function nameValidation(userInput) {
    const pattern = /^\b[A-Z]+[a-z]*$/;

    let answer = false;

    if (userInput === "") {
        console.log(`nameValidation FAILED. String is empty.`);
    } else {
        const firstIsCapital = pattern.test(userInput);
        if (firstIsCapital) {
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
        const emailPassed = pattern.test(email);
        if (emailPassed) {
            answer = true;
        }
    }
    console.log(`emailValidation answer: ${answer}`);
    return answer;
}