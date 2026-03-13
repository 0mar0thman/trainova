  function toggleModule(id) {
    const moduleDiv = document.getElementById('module' + id);
    const chevron = document.getElementById('chevron' + id);
    if (moduleDiv.style.display === 'none') {
      moduleDiv.style.display = 'block';
      chevron.classList.remove('fa-chevron-right');
      chevron.classList.add('fa-chevron-down');
    } else {
      moduleDiv.style.display = 'none';
      chevron.classList.remove('fa-chevron-down');
      chevron.classList.add('fa-chevron-right');
    }
  }