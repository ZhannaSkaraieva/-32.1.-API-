const input = document.getElementById('search');
const results = document.getElementById('results');

//Устанавливаем обработчик события input
input.oninput = function () {
    //Событие input срабатывает каждый раз при изменении значения.
    results.innerHTML = input.value;
    //input.value — получает текущее значение из текстового поля input
    //.trim() — это метод строки, который удаляет пробелы в начале и в конце строки.
    //сохраняю значение в переменную query
  const query = input.value.trim();
  fetchData(query);
  };

async function fetchData(query) { 
  //Пробую выполнить запрос к OMDb API.
  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=b7147b02&s=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    if (data.Response === 'True') {
      generateData(data.Search);
    } else {
      results.innerHTML = 'Фильмы не найдены.';
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}


function generateData(data) {
    //для каждого елемента в получинных данных генерируем HTML документ
  const elements = data.map((e) =>
    `<div>
            <p>${e.Title}</p >
            <p>${e.Year}</p>
            <img src='${e.Poster}'/>
        </div>`);
  results.innerHTML = elements.join('');
}

const result = document.getElementById('results');


    