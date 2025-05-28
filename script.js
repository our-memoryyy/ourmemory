// 纪念日日期 (年, 月 - 1, 日)
const anniversaryDate = new Date(new Date().getFullYear(), 3, 22); // 更新为4月22日 (月份是从0开始的，所以3代表4月)

function updateCountdown() {
    const now = new Date().getTime();
    // 如果今天已经过了今年的纪念日，则将目标日期设置为明年的纪念日
    let targetDate = new Date(anniversaryDate.getTime());
    if (now > targetDate.getTime()) {
        targetDate.setFullYear(targetDate.getFullYear() + 1);
    }

    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

    if (distance < 0) {
        // 这段逻辑理论上因为上面targetDate的调整不会再被频繁触发，除非页面加载时就已过很久
        clearInterval(countdownInterval);
        document.getElementById('timer').innerHTML = "纪念日快乐！";
        return; 
    }
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

console.log("纪念日网站脚本已加载！");

// 移除了以下处理图片上传预览的代码段
/*
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
                    const photoItem = document.createElement('div');
                    photoItem.classList.add('photo-item');

                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = "用户上传的照片";

                    photoItem.appendChild(img);
                    
                    const placeholderText = photoGrid.querySelector('p');
                    if (placeholderText && placeholderText.textContent.includes("将您的照片放在项目文件夹中")) {
                        placeholderText.remove();
                    }
                    photoGrid.insertBefore(photoItem, photoGrid.firstChild);
                }

                reader.readAsDataURL(file);
            }
        });
    }
});
*/