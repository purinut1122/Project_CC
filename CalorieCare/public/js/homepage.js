document.getElementById("submit-calories").addEventListener("click", () => {
    // รับค่าจาก input
    const tdee = document.getElementById("tdee").value;
    const bmr = document.getElementById("bmr").value;

    // ตรวจสอบค่าที่กรอก
    if (isNaN(tdee) || tdee <= 0) {
        alert("กรุณาใส่ค่า TDEE ที่ถูกต้อง!");
        return;
    }
    if (isNaN(bmr) || bmr <= 0) {
        alert("กรุณาใส่ค่า BMR ที่ถูกต้อง!");
        return;
    }

    // แสดงผลใน HTML
    document.getElementById("display-tdee").innerHTML = tdee + " kcal";
    document.getElementById("display-bmr").innerHTML = bmr + " kcal";

    // ปิด modal editcal
    const editCalModal = bootstrap.Modal.getInstance(document.getElementById('editcal'));
    editCalModal.hide();

    // เปิด modal editsuccess
    const editSuccessModal = new bootstrap.Modal(document.getElementById('editsuccess'));
    editSuccessModal.show();

    // ปิด modal editsuccess หลังจาก 5 วินาที
    setTimeout(() => {
        editSuccessModal.hide();
    }, 5000); // 5000 มิลลิวินาที = 5 วินาที
});


// ฟังก์ชันเพื่อแสดงวันที่ปัจจุบันในรูปแบบเต็ม
function displayCurrentDate() {
    const weekdays = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
    const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
                    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    
    const today = new Date();
    const day = weekdays[today.getDay()]; // วันในสัปดาห์
    const date = today.getDate(); // วันที่
    const month = months[today.getMonth()]; // เดือน
    const year = today.getFullYear(); // ปี

    // สร้างข้อความวันที่
    const dateString = `วัน${day}ที่ ${date} ${month} ${year}`;
    document.getElementById('current-date').innerText = dateString;
}

// เรียกฟังก์ชันเมื่อหน้าโหลด
document.addEventListener('DOMContentLoaded', displayCurrentDate);