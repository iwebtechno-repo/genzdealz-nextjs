export function setupSearch(searchInputId = 'searchHeader', resultsContainerId = 'searchResults', buttonId = 'searchButton') {
  const input = document.getElementById(searchInputId);
  const resultsContainer = document.getElementById(resultsContainerId);
  const searchButton = document.getElementById(buttonId);

  let debounceTimeout;
  let suggestionsData = [];
  let activeIndex = -1;
  function handleSearch(event) {
    event.preventDefault();
  }
  function renderSuggestions() {
    resultsContainer.innerHTML = '';
    suggestionsData.forEach((item, index) => {
      const div = document.createElement('div');
      div.textContent = item;
      div.classList.add('search-result-item');
      Object.assign(div.style, {
        cursor: 'pointer',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: index === activeIndex ? '#f0efff' : '#fff',
        borderLeft: index === activeIndex ? '2px solid #4d47c3' : '2px solid rgb(255, 255, 255)',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
        marginBottom: '5px',
        fontSize: '16px',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'left',
        lineHeight: '1.5'
      });

      div.addEventListener('click', () => {
        const selected = encodeURIComponent(item);
        window.location.href = `/search?query=${selected}`;
      });

      resultsContainer.appendChild(div);
    });
  }

  input?.addEventListener('input', () => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
      const query = input.value.trim();
      activeIndex = -1;

      if (!query) {
        suggestionsData = [];
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        return;
      }


      const response = await fetch(`https://flashweb.iweberp.com/api/suggest?search_text=${query}`);
      const { suggestions } = await response.json();

      suggestionsData = suggestions || [];

      if (suggestionsData.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
      } else {
        renderSuggestions();
      }

      resultsContainer.style.display = 'block';
    }, 300);
  });

  input?.addEventListener('keydown', (event) => {
    const maxIndex = suggestionsData.length - 1;

    if (event.key === "ArrowDown") {
      if (suggestionsData.length > 0) {
        activeIndex = (activeIndex + 1) > maxIndex ? 0 : activeIndex + 1;
        renderSuggestions();
      }
      event.preventDefault();
    }

    if (event.key === "ArrowUp") {
      if (suggestionsData.length > 0) {
        activeIndex = (activeIndex - 1) < 0 ? maxIndex : activeIndex - 1;
        renderSuggestions();
      }
      event.preventDefault();
    }

    if (event.key === "Enter") {
      const selected = activeIndex >= 0 ? suggestionsData[activeIndex] : input.value.trim();
      if (!selected) return;
      const encoded = encodeURIComponent(selected);
      window.location.href = `/search?query=${encoded}`;
    }
  });

  searchButton?.addEventListener('click', () => {
    const query = input.value.trim();
    if (!query) return;
    const selected = encodeURIComponent(query);
    window.location.href = `/search?query=${selected}`;
  });
  const form = document.getElementById('searchForm');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const selected = activeIndex >= 0 ? suggestionsData[activeIndex] : input.value.trim();
    if (!selected) return;
    const encoded = encodeURIComponent(selected);
    window.location.href = `/search?query=${encoded}`;
  });
  
  // Hide on outside click
  document.addEventListener('click', (e) => {
    if (!resultsContainer.contains(e.target) && !input.contains(e.target)) {
      resultsContainer.style.display = 'none';
    }
  });

  // Show results on input click if suggestions exist
  input?.addEventListener('click', () => {
    if (suggestionsData.length > 0) {
      renderSuggestions();
      resultsContainer.style.display = 'block';
    }
  });
}
