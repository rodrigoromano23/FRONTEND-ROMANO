import { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from "../../components/UI/Loader";

export default function AdminTalleres() {
  const [talleres, setTalleres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/talleres");
        setTalleres(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Talleres</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {talleres.map(t => (
          <div key={t._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{t.nombre}</h3>
            <p className="text-sm text-gray-600">{t.descripcion}</p>
            <p className="mt-2 text-xs text-gray-500">Cupo: {t.cupo || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
