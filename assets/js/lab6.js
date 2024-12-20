const filterSection = document.querySelector('.filter-section');
const previousArrow = document.querySelector('.previous-arrow');
const nextArrow = document.querySelector('.next-arrow');
const scrollAmount = 200; // Điều chỉnh khoảng cách cuộn

// Cuộn sang phải (Next)
function scrollNext() {
    filterSection.scrollTo({
        left: filterSection.scrollLeft + scrollAmount,
        behavior: 'smooth'
    });
    setTimeout(checkScrollButtons, 300); // Kiểm tra sau khi cuộn
}

// Cuộn sang trái (Previous)
function scrollPrevious() {
    filterSection.scrollTo({
        left: filterSection.scrollLeft - scrollAmount,
        behavior: 'smooth'
    });
    setTimeout(checkScrollButtons, 300); // Kiểm tra sau khi cuộn
}

// Kiểm tra vị trí cuộn và hiển thị mũi tên
function checkScrollButtons() {
    const maxScrollLeft = filterSection.scrollWidth - filterSection.clientWidth;

    // Hiển thị hoặc ẩn mũi tên Previous
    previousArrow.style.display = filterSection.scrollLeft > 0 ? 'block' : 'none';

    // Hiển thị hoặc ẩn mũi tên Next
    nextArrow.style.display = filterSection.scrollLeft < maxScrollLeft ? 'block' : 'none';
}

// Kiểm tra sau mỗi lần cuộn
filterSection.addEventListener('scroll', checkScrollButtons);

// Kiểm tra sau khi trang được tải
window.addEventListener('load', checkScrollButtons);

// Kiểm tra lần đầu tiên khi trang tải xong
checkScrollButtons();


const courseCardSection = document.querySelector('.course-cards');  // Phần chứa các thẻ khóa học
const previousCourseArrow = document.querySelector('.previous-course-arrow');  // Nút cuộn sang trái cho khóa học
const nextCourseArrow = document.querySelector('.next-course-arrow');  // Nút cuộn sang phải cho khóa học
const scrollAmount2 = 640; // Khoảng cách cuộn mỗi lần

// Cuộn sang phải (Next)
function scrollCourseCardNext() {
    courseCardSection.scrollTo({
        left: courseCardSection.scrollLeft + scrollAmount2, // Cuộn sang phải
        behavior: 'smooth' // Thêm hiệu ứng cuộn mượt mà
    });
    setTimeout(checkCourseScrollButtons, 300); // Kiểm tra trạng thái mũi tên sau khi cuộn
}

// Cuộn sang trái (Previous)
function scrollCourseCardPrevious() {
    courseCardSection.scrollTo({
        left: courseCardSection.scrollLeft - scrollAmount2, // Cuộn sang trái
        behavior: 'smooth' // Thêm hiệu ứng cuộn mượt mà
    });
    setTimeout(checkCourseScrollButtons, 300); // Kiểm tra trạng thái mũi tên sau khi cuộn
}

// Kiểm tra vị trí cuộn và hiển thị mũi tên
function checkCourseScrollButtons() {
    const maxScrollLeft = courseCardSection.scrollWidth - courseCardSection.clientWidth;

    // Hiển thị hoặc ẩn mũi tên Previous
    previousCourseArrow.style.display = courseCardSection.scrollLeft > 0 ? 'block' : 'none';

    // Hiển thị hoặc ẩn mũi tên Next
    nextCourseArrow.style.display = courseCardSection.scrollLeft < maxScrollLeft ? 'block' : 'none';
}

// Kiểm tra sau mỗi lần cuộn
courseCardSection.addEventListener('scroll', checkCourseScrollButtons);

// Kiểm tra sau khi trang được tải
window.addEventListener('load', checkCourseScrollButtons);

// Kiểm tra lần đầu tiên khi trang tải xong
checkCourseScrollButtons();

