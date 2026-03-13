
  function setActiveCategory(catId) {
    document.querySelectorAll('.filter-cat-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.filter-cat-btn[data-cat="${catId}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    filterProjects();
  }

  function filterProjects() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const activeCatElem = document.querySelector('.filter-cat-btn.active');
    const activeCat = activeCatElem ? activeCatElem.getAttribute('data-cat') : 'all';
    
    const projects = document.querySelectorAll('.project-card');
    let visibleCount = 0;
    
    projects.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.getAttribute('data-title') || '';
      const desc = card.getAttribute('data-description') || '';
      const matchesCategory = (activeCat === 'all' || category === activeCat);
      const matchesSearch = title.includes(searchInput) || desc.includes(searchInput);
      
      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    const emptyState = document.getElementById('emptyState');
    if (visibleCount === 0) {
      emptyState.classList.remove('d-none');
    } else {
      emptyState.classList.add('d-none');
    }
  }

  window.onload = function() {
    document.getElementById('searchInput').addEventListener('keyup', filterProjects);
    setActiveCategory('all');
  };