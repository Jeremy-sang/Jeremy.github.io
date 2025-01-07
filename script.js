// 导航和页面切换
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // 更新活动链接
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
        
        // 显示目标部分
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    });
});

// 深色模式切换
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// 文字动画效果
const text = document.querySelector('.animate-text');
text.innerHTML = text.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
    .add({
        targets: '.animate-text .letter',
        translateY: [100,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 300 + 30 * i
    });

// 滚动动画
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight * 0.8) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// 项目卡片悬停效果
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const img = card.querySelector('img');
        img.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', (e) => {
        const img = card.querySelector('img');
        img.style.transform = 'scale(1)';
    });
});
