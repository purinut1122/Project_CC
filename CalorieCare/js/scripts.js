/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

window.onload = () => {
    let button = document.querySelector("#btn");

    // Function for calculating BMI
    button.addEventListener("click", calculateBMI);
};

function calculateBMI() {

    /* Getting input from user into height variable.
    Input is string so typecasting is necessary. */
    let height = parseInt(document
        .querySelector("#height").value);

    /* Getting input from user into weight variable. 
    Input is string so typecasting is necessary.*/
    let weight = parseInt(document
        .querySelector("#weight").value);

    let result = document.querySelector("#result");

    // Checking the user providing a proper
    // value or not
    if (height === "" || isNaN(height))
        result.innerHTML = "Provide a valid Height!";

    else if (weight === "" || isNaN(weight))
        result.innerHTML = "Provide a valid Weight!";

    // If both input is valid, calculate the bmi
    else {

        // Fixing upto 2 decimal places
        let bmi = (weight / ((height * height)
            / 10000)).toFixed(2);

        // Dividing as per the bmi conditions
        if (bmi < 18.6) result.innerHTML =
            `น้ำหนักน้อยกว่ามาตรฐาน : <span>${bmi}</span>`;

        else if (bmi >= 18.6 && bmi < 24.9)
            result.innerHTML =
                `ปกติ (สุขภาพดี) : <span>${bmi}</span>`;

        else result.innerHTML =
            `น้ำหนักมากกว่ามาตรฐาน : <span>${bmi}</span>`;
    }
}