


//responsive=======================================================

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import api from "../../services/api";

// Definición del esquema de validación
const schema = yup.object({
  apellidoNombre: yup
    .string()
    .required("Campo obligatorio")
    .min(3, "Debe tener al menos 3 caracteres"),

  edad: yup
    .number()
    .typeError("Debe ser un número")
    .required("Campo obligatorio")
    .min(3, "Edad mínima 3")
    .max(120, "Edad máxima 120"),

  dni: yup
    .string()
    .required("Campo obligatorio")
    .matches(/^\d{8}$/, "El DNI debe tener exactamente 8 dígitos"),

  fechaNacimiento: yup
    .date()
    .required("Fecha obligatoria")
    .typeError("Debe ingresar una fecha válida"),

  domicilio: yup.string().required("Campo obligatorio"),

  correo: yup
    .string()
    .required("Campo obligatorio")
    .email("Correo inválido"),

  celular: yup
    .string()
    .required("Campo obligatorio")
    .matches(/^\d{7,15}$/, "Número inválido"),

  talleres: yup
    .array()
    .min(1, "Debe seleccionar al menos un taller")
});

const talleresOpciones = [
  "Vida Independiente",
  "Alfabetización",
  "Apoyo Escolar",
  "Salud Mental (Consultorio)",
  "Emprendedurismo",
  "Manualidades",
  "Lectura Comprensiva",
  "Radio y Comunicación"
];

export default function Formulario() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, direccion: data.domicilio };
      delete payload.domicilio;

      await api.post("/api/inscriptos", payload);

      toast.success("Inscripción enviada correctamente 🎉");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Error al enviar la inscripción ❌");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
        Inscripción a Talleres
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit, () =>
          toast.error("Hay campos inválidos ❌")
        )}
        className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8 rounded-xl shadow-lg space-y-5"
      >
        {/* Nombre */}
        <input
          {...register("apellidoNombre")}
          placeholder="Apellido y Nombre"
          className="border-2 border-purple-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        {errors.apellidoNombre && (
          <p className="text-red-600 text-sm">{errors.apellidoNombre.message}</p>
        )}

        {/* Edad y DNI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            {...register("edad")}
            type="number"
            placeholder="Edad"
            className="border-2 border-pink-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            {...register("dni")}
            placeholder="DNI"
            className="border-2 border-pink-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        {(errors.edad || errors.dni) && (
          <p className="text-red-600 text-sm">
            {errors.edad?.message || errors.dni?.message}
          </p>
        )}

        {/* Fecha Nacimiento */}
        <input
          {...register("fechaNacimiento")}
          type="date"
          className="border-2 border-green-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.fechaNacimiento && (
          <p className="text-red-600 text-sm">
            {errors.fechaNacimiento.message}
          </p>
        )}

        {/* Domicilio */}
        <input
          {...register("domicilio")}
          placeholder="Domicilio"
          className="border-2 border-yellow-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        {errors.domicilio && (
          <p className="text-red-600 text-sm">{errors.domicilio.message}</p>
        )}

        {/* Correo */}
        <input
          {...register("correo")}
          placeholder="Correo"
          className="border-2 border-blue-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.correo && (
          <p className="text-red-600 text-sm">{errors.correo.message}</p>
        )}

        {/* Celular */}
        <input
          {...register("celular")}
          placeholder="Celular"
          className="border-2 border-red-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        {errors.celular && (
          <p className="text-red-600 text-sm">{errors.celular.message}</p>
        )}

        {/* Talleres */}
        <h3 className="font-semibold text-lg text-purple-600">
          Seleccione Talleres
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {talleresOpciones.map((t) => (
            <label
              key={t}
              className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition"
            >
              <input
                type="checkbox"
                value={t}
                {...register("talleres")}
                className="accent-purple-500"
              />
              {t}
            </label>
          ))}
        </div>
        {errors.talleres && (
          <p className="text-red-600 text-sm">{errors.talleres.message}</p>
        )}

        {/* Botones */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-2 border-2 border-purple-400 rounded-lg hover:bg-purple-50 transition"
          >
            Limpiar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}
