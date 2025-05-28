// 纪念日日期 (年, 月 - 1, 日)
const anniversaryDate = new Date(new Date().getFullYear() + 1, 0, 1); // 假设下一个纪念日是明年的1月1日，您可以修改这里

function updateCountdown() {
    const now = new Date().getTime();
    const distance = anniversaryDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('timer').innerHTML = "纪念日快乐！";
    }
}

// 立即调用一次以避免初始延迟，然后每秒更新
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// 您可以在这里添加更多 JavaScript 功能，例如图片库的动态加载等。
console.log("纪念日网站脚本已加载！");

// 新增：处理图片上传预览
document.addEventListener('DOMContentLoaded', () => {
    const photoUpload = document.getElementById('photoUpload');
    const photoGrid = document.getElementById('photoGrid');

    if (photoUpload && photoGrid) {
        photoUpload.addEventListener('change', function(event) {
            const files = event.target.files;
            if (files && files[0]) {
                const file = files[0];
                const reader = new FileReader();

                reader.onload = function(e) {
                    // 创建新的 photo-item 元素
                    const photoItem = document.createElement('div');
                    photoItem.classList.add('photo-item');

                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = "用户上传的照片";

                    // （可选）可以添加一个输入框让用户为图片添加描述
                    // const description = document.createElement('p');
                    // description.textContent = "新照片"; 
                    // photoItem.appendChild(description);

                    photoItem.appendChild(img);
                    
                    // 将新的 photo-item 添加到 photoGrid 的最前面
                    // 如果 photoGrid 中有提示性的 <p> 标签，可以考虑先移除它
                    const placeholderText = photoGrid.querySelector('p');
                    if (placeholderText && placeholderText.textContent.includes("将您的照片放在项目文件夹中")) {
                        // photoGrid.innerHTML = ''; // 清空现有内容，或者只移除提示
                        placeholderText.remove();
                    }
                    photoGrid.insertBefore(photoItem, photoGrid.firstChild);
                }

                reader.readAsDataURL(file);
            }
        });
    }
});