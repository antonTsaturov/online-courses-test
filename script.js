// JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    
    try {
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
                    //console.log(`✅ Found course in category: ${category}`);
                } else {
                    //console.warn(`⚠️ Unknown category: ${category}`);
                }
            } else {
                //console.warn('⚠️ Course without badge found');
            }
        });

        // Добавляем количество в названия фильтров
        filters.forEach(filter => {
            const filterName = filter.textContent.trim();
            const count = categoryCount[filterName] || 0;
            // Сохраняем оригинальное имя в data-attribute
            filter.dataset.filterName = filterName;
            filter.innerHTML = `${filterName}<sup class="courses__count">${count}</sup>`;
            //console.log(`✅ Updated filter: "${filterName}" with count ${count}`);
        });

        // Обработчик клика по фильтрам
        filters.forEach(filter => {
            filter.addEventListener('click', function(e) {
                e.preventDefault();
                const selectedFilter = this.dataset.filterName;
                //console.log(`\n🔵 Filter clicked: "${selectedFilter}"`);
                
                // Удаляем класс active со всех фильтров
                filters.forEach(f => f.classList.remove('courses__filter--active'));
                
                // Добавляем класс active текущему фильтру
                this.classList.add('courses__filter--active');
                //console.log(`✅ Active class added to: "${selectedFilter}"`);

                // Фильтруем карточки
                let visibleCount = 0;
                let hiddenCount = 0;
                
                courses.forEach(course => {
                    const badge = course.querySelector('.course__badge');
                    const category = badge ? badge.textContent.trim() : '';
                    
                    if (selectedFilter === 'All' || category === selectedFilter) {
                        course.classList.remove('hidden');
                        visibleCount++;
                        //console.log(`  ✅ Showing course: "${course.querySelector('.course__title')?.textContent || 'Unknown'}" (${category})`);
                    } else {
                        course.classList.add('hidden');
                        hiddenCount++;
                        //console.log(`  ❌ Hiding course: "${course.querySelector('.course__title')?.textContent || 'Unknown'}" (${category})`);
                    }
                });
                
            });
        });

        // Обработчик поиска по названиям курсов
        const searchInput = document.querySelector('.courses__search-input');
        if (searchInput) {
            //console.log('✅ Search input found');
            searchInput.addEventListener('input', function(e) {
                const searchText = this.value.toLowerCase().trim();
                //console.log(`\n🔍 Search input changed: "${searchText}"`);
                
                let visibleCount = 0;
                let hiddenCount = 0;
                
                courses.forEach(course => {
                    const titleElement = course.querySelector('.course__title');
                    const courseTitle = titleElement ? titleElement.textContent.toLowerCase() : '';
                    
                    // Проверяем совпадение с поиском
                    // Если поле поиска пусто, показываем все курсы
                    // Иначе показываем только те, что совпадают с текстом поиска
                    const matchesSearch = searchText === '' || courseTitle.includes(searchText);
                    
                    if (matchesSearch) {
                        course.classList.remove('hidden');
                        visibleCount++;
                        //console.log(`  ✅ Match found: "${courseTitle}"`);
                    } else {
                        course.classList.add('hidden');
                        hiddenCount++;
                        //console.log(`  ❌ No match: "${courseTitle}"`);
                    }
                });
                
                //console.log(`📊 Search result: ${visibleCount} visible, ${hiddenCount} hidden`);
            });
        } else {
            //console.warn('⚠️ Search input not found');
        }
        

        
    } catch (error) {
        //console.error('❌ Error during initialization:', error);
        //console.error('Error stack:', error.stack);
    }
});
