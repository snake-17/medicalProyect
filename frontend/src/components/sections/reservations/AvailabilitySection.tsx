import CalendarCard from "./CalendarCard";
import ScheduleListCard from "./ScheduleListCard";
import { useState, useEffect } from "react";
import type { Schedule } from "./Schedule";

const API_URL = import.meta.env.VITE_API_URL;

function AvailabilitySection() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const getCleanToken = () => {
    const storedData = localStorage.getItem("token");
    if (!storedData) return null;

    try {
      const parsed = JSON.parse(storedData);
      if (parsed && typeof parsed === "object") {
        return parsed.token || null;
      }
      return parsed;
    } catch {
      return storedData;
    }
  };

  useEffect(() => {
    if (!selectedDate) return;

    const fetchAvailability = async () => {
      try {
        const token = getCleanToken();
        if (!token) {
          console.warn("No hay token, asegúrate de haber iniciado sesión.");
          return;
        }

        console.log("Revisar: Fecha enviada al API:", selectedDate);
        console.log(
          "Token limpio enviado (primeros 15 caracteres):",
          token.substring(0, 15) + "...",
        );

        const response = await fetch(
          `${API_URL}/api/reservations/schedule?date=${selectedDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Error en el servidor: código ${response.status}`);
        }

        const data = await response.json();
        console.log("Respuesta completa de la API:");
        console.table(data);
        if (Array.isArray(data)) {
          setSchedules(data);
        } else {
          console.error("El API no devolvió una lista, devolvió:", data);
          setSchedules([]);
        }
      } catch (error) {
        console.error("Error cargando horarios:", error);
        setSchedules([]);
      }
    };

    fetchAvailability();
  }, [selectedDate]);

  const pick = async (scheduleId: number) => {
    const token = getCleanToken();
    if (!token) {
      alert("No hay sesión activa. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/reservations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ scheduleId }),
      });

      if (response.ok) {
        alert("Cita agendada con éxito");
        setSchedules((prevSchedules) =>
          prevSchedules.filter((s) => s.id !== scheduleId),
        );
      } else {
        const errText = await response.text();
        try {
          const errJson = JSON.parse(errText);
          alert(errJson.message || "Error al agendar");
        } catch {
          alert("Error al agendar: " + errText);
        }
      }
    } catch (error) {
      alert("Error de conexión al intentar agendar.");
      console.error("Error en pick:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <CalendarCard onDateChange={setSelectedDate} />
        <ScheduleListCard
          title={`Disponibles para ${selectedDate}`}
          schedules={schedules}
          renderActions={(item: Schedule) => (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => pick(item.id)}
            >
              Elegir
            </button>
          )}
        />
      </div>
    </div>
  );
}

export default AvailabilitySection;
