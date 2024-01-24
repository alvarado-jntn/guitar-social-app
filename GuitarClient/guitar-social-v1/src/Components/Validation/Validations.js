export function nameValidation(userInput) {
    const pattern = /\b[A-Z]+[a-z]*/;

    let answer = false;

    if (userInput === "") {
        console.log(`nameValidation FAILED. String is empty.`);
    } else {
        const firstIsCapital = pattern.test(userInput);
        if(firstIsCapital){
            answer = true;
        }else{
            console.log(`nameValidation FAILED.`);
        }
    }
    return answer;

};

export function emailValidation(email){
    const pattern = /[a-z]+[@][.com]/;

    let answer = false;

    if (email === "") {
        console.log(`emailValidation FAILED. String is empty.`);
    } else {
        const firstIsCapital = pattern.test(email);
        if(firstIsCapital){
            answer = true;
        }else{
            console.log(`emailValidation FAILED.`);
        }
    }
    return answer;
}