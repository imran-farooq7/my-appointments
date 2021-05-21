import { useCallback, useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import Search from "./components/Search";

function App() {
  const [appointmentsList, setappointmentsList] = useState([]);
  const [query, setquery] = useState("");
  const [sortBy, setsortBy] = useState("petName");
  const [orderBy, setorderBy] = useState("asc");
  const filteredAppointments = appointmentsList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setappointmentsList(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-4">
        <BiCalendar className="text-red-400 inline-block" />
        Your appointments
      </h1>
      <AddAppointment
        onSendingAppointmetData={(myappointment) =>
          setappointmentsList([...appointmentsList, myappointment])
        }
        lastId={appointmentsList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max, 0)
        )}
      />
      <Search
        query={query}
        onQueryChange={(myQuery) => setquery(myQuery)}
        orderBy={orderBy}
        onOrderChange={(mySort) => setorderBy(mySort)}
        sortBy={sortBy}
        onSortChange={(mySort) => setsortBy(mySort)}
      />
      <ul className="divide-y divide-gray-500">
        {filteredAppointments.map((apt) => {
          return (
            <AppointmentInfo
              appointment={apt}
              key={apt.id}
              delAppointmentHandler={(aptId) =>
                setappointmentsList(
                  appointmentsList.filter((apt) => apt.id !== aptId)
                )
              }
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
