let selectedGender = ""; // ตัวแปรสำหรับเก็บเพศที่เลือก

function setGender(gender) {
    const buttons = document.querySelectorAll(".genderButton");
    buttons.forEach((button) => {
        button.classList.remove("selected");
        if (button.dataset.gender === gender) {
            button.classList.add("selected");
            selectedGender = gender; // เก็บค่าของเพศที่เลือก

            // เปลี่ยนสีพื้นหลังตามเพศที่เลือก
            if (gender === 'male') {
                button.style.backgroundColor = 'rgb(76, 141, 233, 0.2)'; // สีน้ำเงินสำหรับเพศชาย
            } else {
                button.style.backgroundColor = 'rgb(224, 132, 147, 0.2)'; // สีชมพูสำหรับเพศหญิง
            }
        } else {
            // รีเซ็ตสีพื้นหลังสำหรับปุ่มที่ไม่เลือก
            button.style.backgroundColor = '#ffffff'; // สีพื้นฐาน
        }
    });
}

// ฟังก์ชันส่งฟอร์ม
function handleSubmit(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า
    console.log("เพศที่เลือก:", selectedGender);
    // ส่งข้อมูลฟอร์มตามต้องการ
}
