import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Загрузка данных из api
  useEffect(() => {
    fetch('http://127.0.0.1:8085/api/csv')
      // Проверяем, успешен ли запрос
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ответ не был успешным');
        }
        return response.json();
      })
      // Сохраняем полученные данные в состояние компонента
      .then((data) => {
        setData(data);
      })
      // Ловим и выводим ошибку в консоль в случае неудачного запроса
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  // Подсчет и изменение страниц
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // Переключение страниц
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Имена колонок
  const columnNames = data.length > 0 ? Object.keys(data[0]).slice(0, 5) : [];

  return (
    <div className="App">
      <h1>Тестовое задание</h1>
      <div className="table-wrapper">
        {data.length === 0 ? (
          <p>Данные отсутствуют</p>
        ) : (
          <div className="table-container">
            <div className="table-header">
              {columnNames.map((colName, index) => (
                <div key={index} className="table-header-cell">
                  {colName}
                </div>
              ))}
            </div>
            <div className="table-body">
              {currentRows.length === 0 ? (
                <p>Данные отсутствуют</p>
              ) : (
                currentRows.map((item, rowIndex) => (
                  <div key={rowIndex} className="table-row">
                    {columnNames.map((colName, colIndex) => (
                      <div key={colIndex} className="table-cell">
                        {item[colName] || 'ничего'}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
            <div className="pagination">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                &lt; Prev
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
