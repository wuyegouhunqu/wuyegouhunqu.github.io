// 获取弹出框和弹出图片元素
const modal = document.getElementById("myModal");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.getElementsByClassName("close")[0];

// 给目录中的每个列表项添加点击事件
document.querySelectorAll('#directory li').forEach((button, index) => {
    button.addEventListener('click', function() {
        // 点击后弹出对应图片
        modalImage.src = `images/picture${index + 1}.jpg`; // 使用相对路径引用图片
        modal.style.display = "block"; // 显示弹出框
    });
});

// 关闭弹出框
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// 点击空白区域关闭弹出框
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
