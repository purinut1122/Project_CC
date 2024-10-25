function validateLossForm() {
    document.getElementById('form').addEventListener('submit', function(event) {
        // Prevent form submission until validation
        event.preventDefault();
    
         // List of radio group names
        const lossFormGroups = ['exerciseFrequency', 'weightLoss'];
        let allValid = true;
        let errorRadio = '';
        let errorMessage = '';
    
        // Loop through each group to check if one radio button is checked
        for (let i = 0; i < lossFormGroups.length; i++) {
            let lossFormRadios = document.getElementsByName(lossFormGroups[i]);
            let isChecked = false;
    
        // Check if any of the radios in the group are checked
            for (let j = 0; j < lossFormRadios.length; j++) {
                if (lossFormRadios[j].checked) {
                    isChecked = true;
                    break;
                }
            }
    
         // If no radio button is selected for the group, show an error message
            if (!isChecked) {
                allValid = false;
                errorRadio += 'กรุณาติ๊กช่องความถี่และความเร็วในการลดน้ำหนักให้ครบ';
                break;
            }else {
                document.getElementById('error-radio').innerText = '';
            }
        }

        // Validate weight input field
        const weightField = document.getElementById('inputWeight');
        const weightValue = weightField.value.trim();

        // Convert weightValue to a number for further validation
        const weightNumber = parseFloat(weightValue);
        
        // Check if weight is a number and if it has the correct length (e.g., between 2 and 3 digits)
        if (isNaN(weightValue) || weightValue.length < 2 || weightValue.length > 3 || weightNumber < 40 || weightNumber > 90) {
          allValid = false;
          weightField.style.border = "2px solid #e74c3c";
          errorMessage += 'กรุณาใส่น้ำหนักที่ต้องการระหว่าง 40 ถึง 90 กิโลกรัม';
        } else {
            document.getElementById('error-message').innerText = '';
        }

         // Display error message if any validation fails
        if(!allValid) {
            event.stopImmediatePropagation();
            event.preventDefault();

            document.getElementById('error-message').innerText = errorMessage;
            document.getElementById('error-radio').innerText = errorRadio;
        } else {
            $('#loseweight').modal('hide');
            $('#settarget').modal('show');
        }
    });
}

function validateBalanceForm() {
    document.getElementById('form').addEventListener('submit', function(event) {
        // Prevent form submission until validation
        event.preventDefault();
    
         // List of radio group names
        const balanceFormGroups = ['exerciseFrequency'];
        // let gainFormGroups = ['exerciseFrequency', 'weightGain'];
        let allValid = true;
        let errorRadio = '';
        let errorMessage = '';
    
        // Loop through each group to check if one radio button is checked
        for (let i = 0; i < balanceFormGroups.length; i++) {
            let balanceFormRadios = document.getElementsByName(balanceFormGroups[i]);
            let isChecked = false;
    
        // Check if any of the radios in the group are checked
            for (let j = 0; j < balanceFormRadios.length; j++) {
                if (lossFormRadios[j].checked) {
                    isChecked = true;
                    break;
                }
            }
    
         // If no radio button is selected for the group, show an error message
            if (!isChecked) {
                allValid = false;
                errorRadio += 'กรุณาติ๊กช่องความถี่และความเร็วในการลดน้ำหนักให้ครบ';
                break;
            }else {
                document.getElementById('error-radio').innerText = '';
            }
        }

        // Validate weight input field
        const weightField = document.getElementById('inputWeight');
        const weightValue = weightField.value.trim();

        // Convert weightValue to a number for further validation
        const weightNumber = parseFloat(weightValue);
        
        // Check if weight is a number and if it has the correct length (e.g., between 2 and 3 digits)
        if (isNaN(weightValue) || weightValue.length < 2 || weightValue.length > 3 || weightNumber < 40 || weightNumber > 90) {
          allValid = false;
          weightField.style.border = "2px solid #e74c3c";
          errorMessage += 'กรุณาใส่น้ำหนักที่ต้องการระหว่าง 40 ถึง 90 กิโลกรัม';
        } else {
            document.getElementById('error-message').innerText = '';
        }

         // Display error message if any validation fails
        if(!allValid) {
            event.stopImmediatePropagation();
            event.preventDefault();

            document.getElementById('error-message').innerText = errorMessage;
            document.getElementById('error-radio').innerText = errorRadio;
        } else {
            $('#loseweight').modal('hide');
            $('#settarget').modal('show');
        }
    });
}

function validateGainForm() {
    document.getElementById('form').addEventListener('submit', function(event) {
        // Prevent form submission until validation
        event.preventDefault();
    
         // List of radio group names
        const gainFormGroups = ['exerciseFrequency', 'weightGain'];
        let allValid = true;
        let errorRadio = '';
        let errorMessage = '';
    
        // Loop through each group to check if one radio button is checked
        for (let i = 0; i < gainFormGroups.length; i++) {
            let gainFormRadios = document.getElementsByName(gainFormGroups[i]);
            let isChecked = false;
    
        // Check if any of the radios in the group are checked
            for (let j = 0; j < gainFormRadios.length; j++) {
                if (gainFormRadios[j].checked) {
                    isChecked = true;
                    break;
                }
            }
    
         // If no radio button is selected for the group, show an error message
            if (!isChecked) {
                allValid = false;
                errorRadio += 'กรุณาติ๊กช่องความถี่และความเร็วในการลดน้ำหนักให้ครบ';
                break;
            }else {
                document.getElementById('error-radio').innerText = '';
            }
        }

        // Validate weight input field
        const weightField = document.getElementById('inputWeight');
        const weightValue = weightField.value.trim();

        // Convert weightValue to a number for further validation
        const weightNumber = parseFloat(weightValue);
        
        // Check if weight is a number and if it has the correct length (e.g., between 2 and 3 digits)
        if (isNaN(weightValue) || weightValue.length < 2 || weightValue.length > 3 || weightNumber < 40 || weightNumber > 90) {
          allValid = false;
          weightField.style.border = "2px solid #e74c3c";
          errorMessage += 'กรุณาใส่น้ำหนักที่ต้องการระหว่าง 40 ถึง 90 กิโลกรัม';
        } else {
            document.getElementById('error-message').innerText = '';
        }

         // Display error message if any validation fails
        if(!allValid) {
            event.stopImmediatePropagation();
            event.preventDefault();

            document.getElementById('error-message').innerText = errorMessage;
            document.getElementById('error-radio').innerText = errorRadio;
        } else {
            $('#loseweight').modal('hide');
            $('#settarget').modal('show');
        }
    });
}

function resetData() {
    $("#form").trigger("reset");
    const weightField = document.getElementById('inputWeight');
    weightField.style.border = "2px solid #f0f0f0";
    document.getElementById('error-message').innerText = '';
    document.getElementById('error-radio').innerText = '';
}

function clearInput(e) {
    document.querySelector(`#${e.id}`).style.border = "2px solid #f0f0f0";
    document.getElementById('error-message').innerText = '';
}


// const form = document.querySelector('#form');
// const inputweight = document.querySelector('#inputWeight');

// // Show input error messages
// function showError(input, message) {
//     const formControl = input.parentElement;
//     formControl.className = 'form-control error';
//     const small = formControl.querySelector('small');
//     small.innerText = message;
// }

// // Show input success messages
// function showSuccess(input) {
//     const formControl = input.parentElement;
//     formControl.className = 'form-control success';
// }

// // checkRequired fields
// function checkRequired(inputwei) {
//     inputwei(function(input) {
//         if (input.value.trim() === '') {
//             showError(input, `${getFieldName(input)} is required`); 
//         } else {
//             showSuccess(input);
//         }
//     });
// }

// // check input length
// function checkLength(input, min, max) {
//     if(input.value.length < min) {
//         showError(input, `${getFieldName(input)} must be at least ${min} characters`);
//     } else if (input.value.length > max) {
//         showError(input, `${getFieldName(input)} must be less than ${max} characters`);
//     } else {
//         showSuccess(input);
//     }
// } 

// // get Fieldname
// function getFieldName(input) {
//     return input.id.charAt(0).toUpperCase() + input.id.slice(1);
// }

//     checkRequired([inputweight]);
//     checkLength(inputweight,40,100);
