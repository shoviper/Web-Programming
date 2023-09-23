// รับอ้างอิงของ element ที่มี id เป็น "result"
var resultElement = document.getElementById("result");
var currentInput = "";

// เพิ่ม event listener สำหรับ keydown event บน document
document.addEventListener("keydown", function(event) {
    // ตรวจสอบว่าปุ่มที่ถูกกดเป็นตัวเลข 0-9 หรือไม่
    if (event.key >= "0" && event.key <= "9") {
        currentInput += event.key;
        updateResult();
    } else if (event.key === "+") {
        currentInput += "+";
        updateResult();
    } else if (event.key === "-") {
        currentInput += "-";
        updateResult();
    } else if (event.key === "*") {
        currentInput += "*";
        updateResult();
    } else if (event.key === "/") {
        currentInput += "/";
        updateResult();
    } else if (event.key === "=" || event.key === "Enter") {
        try {
            // คำนวณผลลัพธ์
            var result = eval(currentInput);
            currentInput = result.toString();
            updateResult();
        } catch (error) {
            // กรณีเกิดข้อผิดพลาดในการคำนวณ
            currentInput = "Error";
            updateResult();
        }
    } else if (event.key === "c" || event.key === "C") {
        // ล้างค่าทั้งหมด
        currentInput = "";
        updateResult();
    } else if (event.key === "<") {
        // ลบตัวอักษรสุดท้าย
        currentInput = currentInput.slice(0, -1);
        updateResult();
    }
});

// ฟังก์ชันอัปเดตผลลัพธ์ในหน้าเว็บ
function updateResult() {
    resultElement.textContent = currentInput;
}
