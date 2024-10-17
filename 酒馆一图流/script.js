// 获取必要的DOM元素
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementsByClassName("close")[0];
const closeImageBtn = document.getElementsByClassName("close-image")[0]; // 获取关闭图片按钮
const directoryItems = document.querySelectorAll('#directory li');

// 图片列表和当前图片索引
let imageList = [];
let currentIndex = 0;
let imgScale = 1;

// 初始化图片列表
directoryItems.forEach(item => {
    imageList.push(item.getAttribute('data-img'));
});

// 打开模态框并显示图片
directoryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        const imgSrc = this.getAttribute('data-img');
        modal.style.display = "block";
        modalImg.src = imgSrc;
        captionText.innerHTML = this.innerHTML;
        currentIndex = index; // 保存当前图片的索引
        imgScale = 1; // 每次打开图片时重置缩放
        modalImg.style.transform = `scale(${imgScale})`;
    });
});

// 关闭模态框
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// 新增关闭图片按钮的功能
closeImageBtn.onclick = function() {
    modal.style.display = "none";
}

// 监听鼠标滚轮事件，进行图片切换和缩放
modalImg.addEventListener('wheel', function(event) {
    event.preventDefault(); // 防止页面滚动
    if (event.ctrlKey) {
        // 如果按住了Ctrl键，执行缩放
        if (event.deltaY < 0) {
            // 放大图片
            imgScale += 0.1;
        } else {
            // 缩小图片
            imgScale = Math.max(0.1, imgScale - 0.1); // 防止缩小到过小
        }
        modalImg.style.transform = `scale(${imgScale})`;
    } else {
        // 没有按住Ctrl键时，执行图片切换
        if (event.deltaY < 0) {
            // 滚轮向上，切换到上一张图片
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : imageList.length - 1;
        } else {
            // 滚轮向下，切换到下一张图片
            currentIndex = (currentIndex < imageList.length - 1) ? currentIndex + 1 : 0;
        }
        // 更新图片和标题
        modalImg.src = imageList[currentIndex];
        captionText.innerHTML = directoryItems[currentIndex].innerHTML;
        imgScale = 1; // 切换图片时重置缩放
        modalImg.style.transform = `scale(${imgScale})`;
    }
});
