import { useState, useEffect } from "react";
import type { Schedule } from "./Schedule";
import ScheduleListCard from "./ScheduleListCard";
import CalendarCard from "./CalendarCard";

const API_URL = import.meta.env.VITE_API_URL;

function EditSection() {
  const [myAppointments, setMyAppointments] = useState<Schedule[]>([]);
  const [editingAppointmentId, setEditingAppointmentId] = useState<
    number | null
  >(null);
  const [availableSchedules, setAvailableSchedules] = useState<Schedule[]>([]);
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
    const fetchMyAppointments = async () => {
      const token = getCleanToken();
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/api/reservations/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMyAppointments(data);
        } else {
          console.error("Error al traer citas:", response.status);
        }
      } catch (error) {
        console.error("Error de red cargando mis citas:", error);
      }
    };

    fetchMyAppointments();
  }, []);
  useEffect(() => {
    if (!selectedDate) return;

    const fetchNewSchedules = async () => {
      const token = getCleanToken();
      if (!token) return;

      try {
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

        if (response.ok) {
          const data = await response.json();
          setAvailableSchedules(data);
        }
      } catch (error) {
        console.error("Error cargando nuevos horarios:", error);
      }
    };

    fetchNewSchedules();
  }, [selectedDate]);
  const handleUpdate = async (newScheduleId: number) => {
    const token = getCleanToken();
    if (!token) return;

    try {
      const response = await fetch(
        `${API_URL}/api/reservations/${editingAppointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ scheduleId: newScheduleId }),
        },
      );

      if (response.ok) {
        const updatedAppointment = await response.json();

        setMyAppointments(
          myAppointments.map((appointment) =>
            appointment.id === editingAppointmentId
              ? updatedAppointment
              : appointment,
          ),
        );

        alert("¡Cita reprogramada!");
        setEditingAppointmentId(null);
      } else {
        const errorData = await response.text();
        alert("Error al reprogramar: " + errorData);
      }
    } catch (error) {
      console.error("Error al actualizar", error);
      alert("Error de conexión al actualizar");
    }
  };
  const handleDelete = async (appointmentId: number) => {
    // const confirmDelete = window.confirm(
    //   "¿Estás seguro de que deseas cancelar esta cita?",
    // );
    // if (!confirmDelete) return;

    const token = getCleanToken();
    if (!token) return;

    try {
      const response = await fetch(
        `${API_URL}/api/reservations/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      if (response.status === 204) {
        alert("Cita cancelada correctamente.");

        setMyAppointments(
          myAppointments.filter((app) => app.id !== appointmentId),
        );
      } else {
        const errorData = await response.text();
        alert(
          `Error al cancelar la cita (Código ${response.status}): ${errorData}`,
        );
      }
    } catch (error) {
      console.error("Error al eliminar", error);
      alert("Error de conexión al intentar cancelar la cita");
    }
  };
  if (editingAppointmentId) {
    return (
      <div className="container mt-4">
        <h3>Reprogramar Cita #{editingAppointmentId}</h3>
        <button
          className="btn btn-link mb-3"
          onClick={() => setEditingAppointmentId(null)}
        >
          ← Volver atrás
        </button>

        <div className="row">
          <CalendarCard onDateChange={setSelectedDate} />
          <ScheduleListCard
            title="Selecciona el nuevo horario"
            schedules={availableSchedules}
            renderActions={(item) => (
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleUpdate(item.id)}
              >
                Confirmar Cambio
              </button>
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <ScheduleListCard
        title="Mis Citas"
        schedules={myAppointments}
        renderActions={(item) => (
          <div className="d-flex gap-2">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => setEditingAppointmentId(item.id)}
            >
              Editar
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(item.id)}
            >
              Eliminar
            </button>
          </div>
        )}
      />
    </div>
  );
}

export default EditSection;
