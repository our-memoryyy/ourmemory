// 设定你们的纪念日日期 (年, 月 - 1, 日, 时, 分, 秒)
// 例如: 2025年1月1日午夜
// const anniversaryDate = new Date(2025, 0, 1, 0, 0, 0).getTime(); 
// 请将这里的日期修改为你们实际的下一个纪念日日期！

// 根据用户提供的日期更新纪念日
const today = new Date();
let anniversaryYear = today.getFullYear();
const anniversaryMonth = 3; // 4月 (月份是从0开始的，所以3代表4月)
const anniversaryDay = 22;

let anniversaryDate = new Date(anniversaryYear, anniversaryMonth, anniversaryDay, 0, 0, 0).getTime();

// 如果今年的纪念日已经过去，则设置为明年的纪念日
if (anniversaryDate < today.getTime()) {
    anniversaryYear++;
    anniversaryDate = new Date(anniversaryYear, anniversaryMonth, anniversaryDay, 0, 0, 0).getTime();
}

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// 生日1 (6月8日) 的元素
const b1DaysEl = document.getElementById('b1-days');
const b1HoursEl = document.getElementById('b1-hours');
const b1MinutesEl = document.getElementById('b1-minutes');
const b1SecondsEl = document.getElementById('b1-seconds');

// 生日2 (4月7日) 的元素
const b2DaysEl = document.getElementById('b2-days');
const b2HoursEl = document.getElementById('b2-hours');
const b2MinutesEl = document.getElementById('b2-minutes');
const b2SecondsEl = document.getElementById('b2-seconds');

const galleryEl = document.querySelector('.gallery');
const chineseNewYearMessageEl = document.getElementById('chinese-new-year-message'); // 新增：获取新年祝福元素
const fireworksContainer = document.getElementById('fireworks-container'); // 新增：获取烟花容器

// 图片数组 - 请将 'path/to/your/imageX.jpg' 替换为您的图片路径
// const images = [
//     { src: '/ourmemory/img/img1.png', alt: '回忆1'},
//     { src: '/ourmemory/img/img2.png', alt: '回忆2'},
// ];

// 计算下一个指定日期的函数
function getNextDate(month, day) {
    const today = new Date();
    let year = today.getFullYear();
    let nextDate = new Date(year, month, day, 0, 0, 0);
    if (nextDate.getTime() < today.getTime()) {
        year++;
        nextDate = new Date(year, month, day, 0, 0, 0);
    }
    return nextDate.getTime();
}

// 新增：计算农历新年日期的函数 (使用 date-chinese 库)
function getChineseNewYearDate(year) {
    // 确保 date-chinese 库已加载
    if (typeof CalendarChinese === 'undefined') {
        console.error('date-chinese library not loaded.');
        return null;
    }
    try {
        const cal = new CalendarChinese();
        // 获取指定年份的农历新年 Julian Day number
        const newYearJDE = cal.newYear(year);
        // 将 Julian Day number 转换为 Gregorian 日期
        cal.fromJDE(newYearJDE);
        // 将 Gregorian 日期转换为 JavaScript Date 对象
        const newYearDate = cal.toDate();
        return newYearDate;
    } catch (error) {
        console.error(`Error calculating Chinese New Year for year ${year}:`, error);
        return null;
    }
}


// 纪念日日期 (4月22日)
// 由于anniversaryDate已在前面声明,这里直接使用getNextDate更新它的值
anniversaryDate = getNextDate(3, 22); // 月份3代表4月

// 生日日期
const birthday1Date = getNextDate(5, 8);  // 月份5代表6月
const birthday2Date = getNextDate(3, 7);  // 月份3代表4月

function updateCountdown() {
    const now = new Date().getTime();
    const todayForCNY = new Date(); // 用于农历新年判断的当天日期对象

    // 更新纪念日倒计时
    const distanceAnniversary = anniversaryDate - now;
    if (distanceAnniversary < 0) {
        document.getElementById('countdown-section').innerHTML = "<h2>纪念日快乐！🎉</h2>";
    } else {
        daysEl.textContent = formatTime(Math.floor(distanceAnniversary / (1000 * 60 * 60 * 24)));
        hoursEl.textContent = formatTime(Math.floor((distanceAnniversary % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        minutesEl.textContent = formatTime(Math.floor((distanceAnniversary % (1000 * 60 * 60)) / (1000 * 60)));
        secondsEl.textContent = formatTime(Math.floor((distanceAnniversary % (1000 * 60)) / 1000));
    }

    // 更新生日1倒计时
    const distanceB1 = birthday1Date - now;
    if (distanceB1 < 0) {
        document.getElementById('birthday1-countdown').innerHTML = "<h3>生日快乐！🎂</h3>";
    } else {
        b1DaysEl.textContent = formatTime(Math.floor(distanceB1 / (1000 * 60 * 60 * 24)));
        b1HoursEl.textContent = formatTime(Math.floor((distanceB1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        b1MinutesEl.textContent = formatTime(Math.floor((distanceB1 % (1000 * 60 * 60)) / (1000 * 60)));
        b1SecondsEl.textContent = formatTime(Math.floor((distanceB1 % (1000 * 60)) / 1000));
    }

    // 更新生日2倒计时
    const distanceB2 = birthday2Date - now;
    if (distanceB2 < 0) {
        document.getElementById('birthday2-countdown').innerHTML = "<h3>生日快乐！🥳</h3>";
    } else {
        b2DaysEl.textContent = formatTime(Math.floor(distanceB2 / (1000 * 60 * 60 * 24)));
        b2HoursEl.textContent = formatTime(Math.floor((distanceB2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        b2MinutesEl.textContent = formatTime(Math.floor((distanceB2 % (1000 * 60 * 60)) / (1000 * 60)));
        b2SecondsEl.textContent = formatTime(Math.floor((distanceB2 % (1000 * 60)) / 1000));
    }

    // 新增：农历新年祝福和烟花
    const currentYear = todayForCNY.getFullYear();
    let chineseNewYearDate = getChineseNewYearDate(currentYear);

    // 如果今年的春节已经过去，或者获取失败，尝试获取明年的
    // 注意：这里判断是否“过去”需要考虑春节持续15天的情况
    // 我们判断当前日期是否在今年的春节期间（包括初一到十五）
    // 如果不在，则计算明年的春节日期
    
    let isDuringCNY = false;
    if (chineseNewYearDate) {
        const cnyStart = chineseNewYearDate.getTime();
        const cnyEnd = cnyStart + 15 * 24 * 60 * 60 * 1000; // 持续15天
        if (now >= cnyStart && now <= cnyEnd) {
            isDuringCNY = true;
        }
    }

    // 如果当前不在今年的春节期间，计算明年的春节日期
    if (!isDuringCNY) {
         chineseNewYearDate = getChineseNewYearDate(currentYear + 1);
         if (chineseNewYearDate) {
            const cnyStart = chineseNewYearDate.getTime();
            const cnyEnd = cnyStart + 15 * 24 * 60 * 60 * 1000; // 持续15天
            if (now >= cnyStart && now <= cnyEnd) {
                isDuringCNY = true;
            }
         }
    }

    if (isDuringCNY) {
        if (chineseNewYearMessageEl) chineseNewYearMessageEl.style.display = 'block';
        if (fireworksContainer) fireworksContainer.style.display = 'block'; // 显示烟花
        startFireworks(); // 启动烟花
    } else {
        if (chineseNewYearMessageEl) chineseNewYearMessageEl.style.display = 'none';
        if (fireworksContainer) fireworksContainer.style.display = 'none'; // 隐藏烟花
        stopFireworks(); // 停止烟花
    }
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// 初始化
updateCountdown(); // 立即执行一次以避免延迟
const countdownInterval = setInterval(updateCountdown, 1000);
// displayImages();

// 新增：简单的烟花效果 (占位符，后续可以替换为更复杂的实现)
function createFirework() {
    if (!fireworksContainer) return;
    const firework = document.createElement('div');
    firework.className = 'firework';
    const x = Math.random() * fireworksContainer.offsetWidth;
    const y = Math.random() * fireworksContainer.offsetHeight;
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';

    // 随机颜色
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // 创建粒子
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.background = color;
        const angle = Math.random() * 360;
        const speed = Math.random() * 3 + 1;
        particle.style.transform = `rotate(${angle}deg) translateX(${speed * 10}px)`; 
        particle.style.opacity = 1;
        firework.appendChild(particle);

        // 粒子动画
        setTimeout(() => {
            particle.style.transform = `rotate(${angle}deg) translateX(${speed * 30}px)`;
            particle.style.opacity = 0;
        }, 10 + Math.random() * 200); // 粒子扩散和消失
    }

    fireworksContainer.appendChild(firework);

    // 移除烟花元素，避免过多DOM
    setTimeout(() => {
        firework.remove();
    }, 1000); // 烟花持续时间
}

// 如果是新年期间，则定时创建烟花
// 注意：这个简单的实现会在新年期间持续创建烟花，可能会影响性能
// 更优的方案是控制烟花的频率和数量
let fireworkInterval;
function startFireworks() {
    if (!fireworksContainer) return;
    // 避免重复启动
    if (fireworkInterval) return;
    fireworkInterval = setInterval(createFirework, 1000); // 每0.5秒创建一个烟花
}

function stopFireworks() {
    if (fireworkInterval) {
        clearInterval(fireworkInterval);
        fireworkInterval = null; // 清除定时器ID
    }
    if (fireworksContainer) fireworksContainer.innerHTML = ''; // 清除所有烟花
}

// 在 updateCountdown 中调用 startFireworks 和 stopFireworks
// (已在 updateCountdown 中添加相关逻辑)