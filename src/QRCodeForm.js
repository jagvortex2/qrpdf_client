import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';
import styles from './QRCodeForm.module.css';

const QRCodeForm = React.memo(() => {
  // State hooks to manage component state
  const [articulos, setArticulos] = useState([]); // List of articulos fetched from the server
  const [selectedArticulo, setSelectedArticulo] = useState(''); // Currently selected articulo
  const [searchText, setSearchText] = useState(''); // Text used for filtering articulos
  const [loading, setLoading] = useState(false); // Loading indicator
  const [error, setError] = useState(null); // Error message, if any

  useEffect(() => {
    // Effect hook to fetch articulos when the component mounts
    const fetchArticulos = async () => {
      try {
        // Fetches the list of 'articulos' from the server
        const response = await axios.get('http://192.168.0.110:5000/articulos');
        // Sorts the 'articulos' based on 'Descripcion'
        const sortedArticulos = response.data.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion));
        // Sets the sorted 'articulos' in the component's state
        setArticulos(sortedArticulos);
      } catch (error) {
        console.error('Error fetching articulos:', error.message);
        setError('Error fetching articulos. Please try again.');
      }
    };

    // Calls the fetchArticulos function when the component mounts
    fetchArticulos();
  }, []);

  // Function to handle the generation and download of a PDF based on the selectedArticulo
  const handleGeneratePDF = async () => {
    try {
      // Sets the loading state to true
      setLoading(true);

      // Makes an API request using Axios to generate PDF
      const response = await axios.post(
        'http://192.168.0.110:5000/generarpdf',
        {
          Descripcion: selectedArticulo.Descripcion,
          ArticuloDetalle: selectedArticulo.ArticuloDetalle,
        },
        { responseType: 'blob' } // Sets responseType to 'blob' to receive a Blob
      );

      // Creates a Blob object from the response data
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

      // Uses FileSaver.js to trigger the download of the PDF
      FileSaver.saveAs(pdfBlob, `${selectedArticulo.ArticuloDetalle}.pdf`);

      // Resets form fields and loading state
      setSelectedArticulo('');
      setSearchText('');
      setLoading(false);
      setError(null);
    } catch (error) {
      // Handles errors during PDF generation
      console.error('Error generating PDF:', error.message);
      setError('Error generating PDF. Please try again.');
      setLoading(false);
    }
  };

  // Function to handle the change of selectedArticulo when an option is selected
  const handleArticuloChange = (event) => {
    const selected = articulos.find((articulo) => articulo.ArticuloDetalle === event.target.value);
    setSelectedArticulo(selected);
    setSearchText(''); // Resets the search text when an option is selected
  };

  // Creates a filtered list of articulos based on the searchText
  const filteredArticulos = articulos.filter((articulo) =>
    articulo.Descripcion.toLowerCase().includes(searchText.toLowerCase())
  );

  // Component JSX
return (
  <div className={styles.container}>
    {/* <h2 className={styles.heading}>Generar PDF con formato para viñetas</h2> */}
    <form className={styles.form}>
      <label className={styles.label}>
        Buscar Articulo:
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Pendiente su funcion"
          disabled={selectedArticulo !== ''}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Seleccione Articulo:
        <select
          value={selectedArticulo.ArticuloDetalle}
          onChange={handleArticuloChange}
          className={styles.select}
        >
          <option value="" disabled>
            Seleccione Articulo
          </option>

          {/* Render the sorted options directly */}
          {articulos.map(({ ArticuloDetalle, Descripcion }) => (
            <option key={ArticuloDetalle} value={ArticuloDetalle}>
              {Descripcion}
            </option>
          ))}
        </select>
      </label>
      {loading && <p style={{ textAlign: 'center' }}>Cargando...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <button
        type="button"
        onClick={handleGeneratePDF}
        disabled={loading}
        className={styles.button}
      >
        Generar PDF con viñetas QR
      </button>
    </form>
  </div>
);

});

// Exports the QRCodeForm component as the default export of the module
export default QRCodeForm;
