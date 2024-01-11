// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import FileSaver from 'file-saver';
// import styles from './QRCodeForm.module.css';

// const QRCodeForm = React.memo(() => {
//   // State hooks to manage component state
//   const [articulos, setArticulos] = useState([]); // List of articulo fetched from the server
//   const [selectedArticulo, setSelectedArticulo] = useState(''); // Currently selected articulo
//   const [searchText, setSearchText] = useState(''); // Text used for filtering articulo
//   const [loading, setLoading] = useState(false); // Loading indicator
//   const [error, setError] = useState(null); // Error message, if any

//   useEffect(() => {
//     // Effect hook to fetch articulo when the component mounts
//     const fetchArticulos = async () => {
//       try {
//         // Fetches the list of 'articulo' from the server
//         const response = await axios.get('http://192.168.0.113:5000/articulos');
//         // Sorts the 'articulo' based on 'Descripcion'
//         const sortedArticulos = response.data.sort((a, b) => a.DESCRIPCION.localeCompare(b.DESCRIPCION));
//         // Sets the sorted 'articulo' in the component's state
//         setArticulos(sortedArticulos);
//       } catch (error) {
//         console.error('Error fetching articulo:', error.message);
//         setError('Error fetching articulo. Please try again.');
//       }
//     };

//     // Calls the fetcharticulo function when the component mounts
//     fetchArticulos();
//   }, []);

//   // Function to handle the generation and download of a PDF based on the selectedArticulo
//   const handleGeneratePDF = async () => {
//     try {
//       // Sets the loading state to true
//       setLoading(true);

//       // Makes an API request using Axios to generate PDF
//       const response = await axios.post(
//         'http://192.168.0.113:5000/generarpdf',
//         {
//           ARTICULO: selectedArticulo.ARTICULO,
//           DESCRIPCION: selectedArticulo.DESCRIPCION,
//         },
//         { responseType: 'blob' } // Sets responseType to 'blob' to receive a Blob
//       );

//       // Creates a Blob object from the response data
//       const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

//       // Uses FileSaver.js to trigger the download of the PDF
//       FileSaver.saveAs(pdfBlob, `${selectedArticulo.ARTICULO}.pdf`);

//       // Resets form fields and loading state
//       setSelectedArticulo('');
//       setSearchText('');
//       setLoading(false);
//       setError(null);
//     } catch (error) {
//       // Handles errors during PDF generation
//       console.error('Error generating PDF:', error.message);
//       setError('Error generating PDF. Please try again.');
//       setLoading(false);
//     }
//   };

//   // Function to handle the change of selectedArticulo when an option is selected
//   const handleArticuloChange = (event) => {
//     // Finds the selected articulo by matching ARTICULO or DESCRIPCION
//     const selected = articulos.find(
//       (articulo) =>
//         articulo.ARTICULO.toUpperCase() === event.target.value.toUpperCase() ||
//         articulo.DESCRIPCION.toUpperCase() === event.target.value.toUpperCase()
//     );
//     setSelectedArticulo(selected);
//     setSearchText(''); // Resets the search text when an option is selected
//   };

//   // Creates a filtered list of articulo based on the searchText
//   const filteredArticulos = articulos.filter(
//     (articulo) =>
//       articulo.ARTICULO.toLowerCase().includes(searchText.toLowerCase()) ||
//       articulo.DESCRIPCION.toLowerCase().includes(searchText.toLowerCase())
//   );

//   // Component JSX
//   return (
//     <div className={styles.container}>
//       {/* Form for selecting and generating PDF for an articulo */}
//       <form className={styles.form}>
//         {/* Search input for filtering articulos */}
//         <label className={styles.label}>
//           Buscar Articulo:
//           <input
//             type="text"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             placeholder="Pendiente su funcion"
//             disabled={selectedArticulo !== ''}
//             className={styles.input}
//           />
//         </label>

//         {/* Dropdown for selecting an articulo */}
//         <label className={styles.label}>
//           Seleccione Articulo:
//           <select
//             value={selectedArticulo ? selectedArticulo.DESCRIPCION : ''}
//             onChange={handleArticuloChange}
//             className={styles.select}
//           >
//             <option value="" disabled>
//               Seleccione Articulo
//             </option>

//             {/* Render the sorted options directly */}
//             {filteredArticulos.map(({ ARTICULO, DESCRIPCION }) => (
//               <option key={ARTICULO} value={DESCRIPCION}>
//                 {DESCRIPCION}
//               </option>
//             ))}
//           </select>
//         </label>

//         {/* Loading and error messages */}
//         {loading && <p style={{ textAlign: 'center' }}>Cargando...</p>}
//         {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

//         {/* Button to generate PDF */}
//         <button
//           type="button"
//           onClick={handleGeneratePDF}
//           disabled={loading || !selectedArticulo}
//           className={styles.button}
//         >
//           Generar PDF con viñetas QR
//         </button>
//       </form>
//     </div>
//   );
// });

// // Exports the QRCodeForm component as the default export of the module
// export default QRCodeForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';
import styles from './QRCodeForm.module.css';

const QRCodeForm = React.memo(() => {
  // State hooks to manage component state
  const [articulos, setArticulos] = useState([]); // List of articulo fetched from the server
  const [selectedArticulo, setSelectedArticulo] = useState(''); // Currently selected articulo
  const [searchText, setSearchText] = useState(''); // Text used for filtering articulo
  const [loading, setLoading] = useState(false); // Loading indicator
  const [error, setError] = useState(null); // Error message, if any
  const [suggestions, setSuggestions] = useState([]); // Suggestions based on search input

  useEffect(() => {
    // Effect hook to fetch articulo when the component mounts
    const fetchArticulos = async () => {
      try {
        // Fetches the list of 'articulo' from the server
        const response = await axios.get('http://192.168.0.17:5000/articulos');
        // Sorts the 'articulo' based on 'Descripcion'
        const sortedArticulos = response.data.sort((a, b) => a.DESCRIPCION.localeCompare(b.DESCRIPCION));
        // Sets the sorted 'articulo' in the component's state
        setArticulos(sortedArticulos);
      } catch (error) {
        console.error('Error fetching articulo:', error.message);
        setError('Error fetching articulo. Please try again.');
      }
    };

    // Calls the fetcharticulo function when the component mounts
    fetchArticulos();
  }, []);

  // Function to handle the generation and download of a PDF based on the selectedArticulo
  const handleGeneratePDF = async () => {
    try {
      // Sets the loading state to true
      setLoading(true);

      // Makes an API request using Axios to generate PDF
      const response = await axios.post(
        'http://192.168.0.17:5000/generarpdf',
        {
          ARTICULO: selectedArticulo.ARTICULO,
          DESCRIPCION: selectedArticulo.DESCRIPCION,
        },
        { responseType: 'blob' } // Sets responseType to 'blob' to receive a Blob
      );

      // Creates a Blob object from the response data
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

      // Uses FileSaver.js to trigger the download of the PDF
      FileSaver.saveAs(pdfBlob, `${selectedArticulo.ARTICULO}.pdf`);

      // Resets form fields and loading state
      setSelectedArticulo('');
      setSearchText('');
      setLoading(false);
      setError(null);
      setSuggestions([]); // Clear suggestions after generating PDF
    } catch (error) {
      // Handles errors during PDF generation
      console.error('Error generating PDF:', error.message);
      setError('Error generating PDF. Please try again.');
      setLoading(false);
    }
  };

  // Function to handle the change of selectedArticulo when an option is selected
  const handleArticuloChange = (event) => {
    // Finds the selected articulo by matching ARTICULO or DESCRIPCION
    const selected = articulos.find(
      (articulo) =>
        articulo.ARTICULO.toUpperCase() === event.target.value.toUpperCase() ||
        articulo.DESCRIPCION.toUpperCase() === event.target.value.toUpperCase()
    );
    setSelectedArticulo(selected);
    setSearchText(''); // Resets the search text when an option is selected
    setSuggestions([]); // Clear suggestions after selecting an option
  };

  // Function to handle suggestions based on the search input
  const handleSearchSuggestions = () => {
    const matches = articulos.filter(
      (articulo) =>
        articulo.ARTICULO.toLowerCase().includes(searchText.toLowerCase()) ||
        articulo.DESCRIPCION.toLowerCase().includes(searchText.toLowerCase())
    );
    setSuggestions(matches);
  };

  // Component JSX
  return (
    <div className={styles.container}>
      {/* Form for selecting and generating PDF for an articulo */}
      <form className={styles.form}>
        {/* Search input for filtering articulos */}
        <label className={styles.label}>
          Buscar Articulo:
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearchSuggestions();
            }}
            placeholder="Pendiente su funcion"
            disabled={selectedArticulo !== ''}
            className={styles.input}
          />
        </label>

        {/* Suggestions based on search input */}
        {suggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {suggestions.map(({ ARTICULO, DESCRIPCION }) => (
              <li key={ARTICULO} onClick={() => handleArticuloChange({ target: { value: DESCRIPCION } })}>
                {DESCRIPCION}
              </li>
            ))}
          </ul>
        )}

       {/* Dropdown for selecting an articulo */}
<label className={styles.label}>
  Seleccione Articulo:
  <select
    value={selectedArticulo ? selectedArticulo.DESCRIPCION : ''}
    onChange={handleArticuloChange}
    className={styles.select}
  >
    <option value="" disabled>
      Seleccione Articulo
    </option>

    {/* Render the sorted options directly */}
    {articulos.map(({ ARTICULO, DESCRIPCION }) => (
      <option key={ARTICULO} value={DESCRIPCION}>
        {DESCRIPCION}
      </option>
    ))}
  </select>
</label>

        {/* Loading and error messages */}
        {loading && <p style={{ textAlign: 'center' }}>Cargando...</p>}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {/* Button to generate PDF */}
        <button
          type="button"
          onClick={handleGeneratePDF}
          disabled={loading || !selectedArticulo}
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
