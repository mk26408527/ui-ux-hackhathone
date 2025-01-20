// 'use client'

// import { useState } from 'react';

// export default function ShipmentForm() {
//   const [rates, setRates] = useState(null);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
    
//     try {
//       const response = await fetch("/api/shipengine/get-rates", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           shipToAddress: {
//             name: "Michael Smith",
//             phone: "+1 555 987 6543",
//             addressLine1: "456 Oak Avenue",
//             addressLine2: "Suite 200",
//             cityLocality: "Los Angeles",
//             stateProvince: "CA",
//             postalCode: "90001",
//             countryCode: "US",
//             addressResidentialIndicator: "no",
//           },
//           packages: [
//             { weight: { value: 5, unit: "ounce" }, dimensions: { height: 3, width: 15, length: 10, unit: "inch" } },
//           ],
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch rates');
//       }

//       const data = await response.json();
//       setRates(data);
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching rates:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Add form fields here */}
//       <button type="submit">Get Rates</button>
//       {rates && (
//         <div>
//           {/* Display rates here */}
//         </div>
//       )}
//     </form>
//   );
// }

