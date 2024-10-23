function validateForm() {
    let exerciseFrequency = document.getElementsByName('exerciseFrequency');
    let weightLoss = document.getElementsByName('weightLoss');
    let weightGain = document.getElementsByName('weightGain');
    let formValid = false;
    
    for (let i=0, j=0;(i < exerciseFrequency.length) && (j < weightLoss.length); i++, j++) {
        if (exerciseFrequency[i].checked && weightLoss[j].checked) {
            formValid = true;
            break;
        }
    }

    if (!formValid) {
        alert('กรุณาเลือกคำตอบให้ครบ');
        return false;
    }

    // $("submitTarget").click(function(){
    //     $("#settarget").modal();
    // });
}

var modalToggle = document.getElementById('settarget') // relatedTarget
myModal.show(modalToggle)

var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
})

myModal.toggle()







// function exerciseFrequency() {
// const exerciseFrequency = document.querySelector('input[name="exerciseFrequency"]:checked');
// if (!exerciseFrequency) {
//     isValid = false;
//     alert('กรุณาเลือกความถี่ในการออกกำลังกาย.');   
// }
// else {
    
// }
// }