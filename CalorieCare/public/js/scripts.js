document.addEventListener("DOMContentLoaded", () => {
    // Event listener for BMI calculation
    const bmiButton = document.querySelector("#btn-bmi");
    if (bmiButton) {
        bmiButton.addEventListener("click", calculateBMI);
    } else {
        console.error("BMI button not found!");
    }

    // Event listener for BMR calculation
    const bmrButton = document.querySelector("#btn-bmr");
    if (bmrButton) {
        bmrButton.addEventListener("click", calculateBMR);
    } else {
        console.error("BMR button not found!");
    }

    // Event listener for TDEE calculation
    const tdeeButton = document.querySelector("#btn-tdee");
    if (tdeeButton) {
        tdeeButton.addEventListener("click", calculateTDEE);
    } else {
        console.error("TDEE button not found!");
    }
});

// Function for calculating BMI
function calculateBMI() {
    let height = parseFloat(document.querySelector("#height-bmi").value);
    let weight = parseFloat(document.querySelector("#weight-bmi").value);
    let age = parseInt(document.querySelector("#age-bmi").value);
    let result = document.querySelector("#result-bmi");

    if (isNaN(height) || height <= 0) {
        result.innerHTML = "กรุณาใส่ส่วนสูง!";
    } else if (isNaN(weight) || weight <= 0) {
        result.innerHTML = "กรุณาใส่น้ำหนัก!";
    } else if (isNaN(age) || age <= 0) {
        result.innerHTML = "กรุณาใส่อายุ!";
    } else {
        let bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        if (bmi < 18.5) {
            result.innerHTML = `น้ำหนักน้อยกว่ามาตรฐาน : <span>${bmi}</span>`;
        } else if (bmi >= 18.5 && bmi < 24.9) {
            result.innerHTML = `ปกติ (สุขภาพดี) : <span>${bmi}</span>`;
        } else {
            result.innerHTML = `น้ำหนักมากกว่ามาตรฐาน : <span>${bmi}</span>`;
        }
    }
}

// Function for calculating BMR
function calculateBMR() {
    let height = parseFloat(document.querySelector("#height-bmr").value);
    let weight = parseFloat(document.querySelector("#weight-bmr").value);
    let age = parseInt(document.querySelector("#age-bmr").value);
    let gender = document.querySelector('input[name="gender-bmr"]:checked')?.value; // ใช้ optional chaining
    let result = document.querySelector("#result-bmr");

    if (isNaN(height) || height <= 0) {
        result.innerHTML = "กรุณาใส่ส่วนสูง!";
    } else if (isNaN(weight) || weight <= 0) {
        result.innerHTML = "กรุณาใส่น้ำหนัก!";
    } else if (isNaN(age) || age <= 0) {
        result.innerHTML = "กรุณาใส่อายุ!";
    } else if (!gender) {
        result.innerHTML = "กรุณาเลือกเพศ!";
    } else {
        let bmr;
        if (gender === "male") {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        result.innerHTML = `ค่า BMR ของคุณคือ : <span>${bmr.toFixed(2)}</span> กิโลแคลอรี่/ต่อวัน`;
    }
}

// Function for calculating TDEE
function calculateTDEE() {
    let height = parseFloat(document.querySelector("#height-tdee").value);
    let weight = parseFloat(document.querySelector("#weight-tdee").value);
    let age = parseInt(document.querySelector("#age-tdee").value);
    let gender = document.querySelector('input[name="gender-tdee"]:checked')?.value; // ใช้ optional chaining
    let result = document.querySelector("#result-tdee");

    // Activity levels multiplier
    const activityLevels = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };

    let activityLevel = document.querySelector('select[name="activity-level"]').value;

    if (isNaN(height) || height <= 0) {
        result.innerHTML = "กรุณาใส่ส่วนสูง!";
    } else if (isNaN(weight) || weight <= 0) {
        result.innerHTML = "กรุณาใส่น้ำหนัก!";
    } else if (isNaN(age) || age <= 0) {
        result.innerHTML = "กรุณาใส่อายุ!";
    } else if (!gender) {
        result.innerHTML = "กรุณาเลือกเพศ!";
    } else {
        let bmr;
        if (gender === "male") {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        let tdee = bmr * activityLevels[activityLevel];
        result.innerHTML = `ค่า TDEE ของคุณคือ : <span>${tdee.toFixed(2)}</span> กิโลแคลอรี่/ต่อวัน`;
    }
}
