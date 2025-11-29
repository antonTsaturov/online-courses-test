// JavaScript file
console.log('Script loaded');

document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.courses__filter');
    const courses = document.querySelectorAll('.course');

    // Объект для подсчета количества карточек по категориям
    const categoryCount = {
        'All': courses.length,
        'Marketing': 0,
        'Management': 0,
        'HR & Recruiting': 0,
        'Design': 0,
        'Development': 0
    };

    // Подсчитываем количество карточек по категориям
    courses.forEach(course => {
        const badge = course.querySelector('.course__badge');
        if (badge) {
            const category = badge.textContent.trim();
            if (category in categoryCount) {
                categoryCount[category]++;
            }
        }
    });

    // Добавляем количество в названия фильтров
    filters.forEach(filter => {
        const filterName = filter.textContent.trim();
        const count = categoryCount[filterName] || 0;
        // Сохраняем оригинальное имя в data-attribute
        filter.dataset.filterName = filterName;
        filter.innerHTML = `${filterName}<sup>${count}</sup>`;
    });

    // Обработчик клика по фильтрам
    filters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedFilter = this.dataset.filterName;
            
            // Удаляем класс active со всех фильтров
            filters.forEach(f => f.classList.remove('courses__filter--active'));
            
            // Добавляем класс active текущему фильтру
            this.classList.add('courses__filter--active');

            // Фильтруем карточки
            courses.forEach(course => {
                const badge = course.querySelector('.course__badge');
                const category = badge ? badge.textContent.trim() : '';
                
                if (selectedFilter === 'All' || category === selectedFilter) {
                    course.classList.remove('hidden');
                } else {
                    course.classList.add('hidden');
                }
            });
        });
    });
});
