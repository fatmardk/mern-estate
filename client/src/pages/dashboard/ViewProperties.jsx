import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from '../../components/AdminNav'; 

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/admin/properties'); // Adjust the endpoint if needed
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div
        className="relative flex items-center justify-center min-h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/formbg.jpg')" }}
      >
        <AdminNav />
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Properties</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {properties.map(property => (
            <div key={property.id} className="border rounded-lg overflow-hidden shadow-lg">
              <img src={`/images/${property.image1}`} alt={property.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <p className="text-gray-600">{property.description}</p>
                <p className="mt-2 text-lg font-bold">${property.price}</p>
                <p className="text-sm text-gray-500">{property.address}, {property.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Properties;
