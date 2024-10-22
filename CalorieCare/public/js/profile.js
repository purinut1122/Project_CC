document.querySelector(".btn-outline-green").addEventListener("click", () => {
    // รับค่าจาก input
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const age = document.getElementById("age").value;
    
    // รับค่าเพศ
    const gender = document.querySelector('input[name="gender-bmr"]:checked').value === "male" ? "เพศชาย" : "เพศหญิง";

    // รับค่าจาก dropdown
    const activityLevel = document.querySelector('select[name="activity-level"]').value;

    // ปิด modal editprofile
    const editProfileModal = bootstrap.Modal.getInstance(document.getElementById('editprofile'));
    editProfileModal.hide();

    // เปิด modal editsuccess (ตามที่ต้องการ)
    const editSuccessModal = new bootstrap.Modal(document.getElementById('editsuccess'));
    editSuccessModal.show();
});
