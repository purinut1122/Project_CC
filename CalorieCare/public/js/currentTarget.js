document.addEventListener('DOMContentLoaded', function () {
    const successMessage = '<%= flash.success %>'; // แทนที่ด้วยวิธีที่คุณใช้ในการเข้าถึง flash messages

    if (successMessage) {
        const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
        updateModal.show();
    }
});