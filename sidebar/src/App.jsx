import { useState } from "react"
import {Sidebar, SidebarSection, SidebarItem, SidebarFormatoItem} from './components/Sidebar'
import { Folder, FolderOpen, Plus } from "lucide-react";

export default function App() {
  const [expanded, setExpanded] = useState(true);
  const [activeId, setActiveId] = useState("docs");
  const [formatos, setFormatos] = useState([
    { id: "f1", nombre: "Informe mensual" },
    { id: "f2", nombre: "Acta de reunión" },
    { id: "f3", nombre: "Checklist Operativo" },
  ]);


  const handleRenombrar = (id, nuevoNombre) => {
    setFormatos((prev) => prev.map((f) => (f.id === id ? { ...f, nombre: nuevoNombre } : f)));
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        nombre="María López"
        rol="Coordinadora"
        expanded={expanded}
        setExpanded={setExpanded}
        onLogout={() => alert("Logout")}
      >
        {/* A top-level quick actions area */}
        <SidebarSection title="General">
          <SidebarItem
            icon={<FolderOpen/>}
            text="Panel"
            active={activeId === "panel"}
            onClick={() => setActiveId("panel")}
          />
          <SidebarItem
            icon={<Folder/>}
            text="Documentos"
            active={activeId === "docs"}
            onClick={() => setActiveId("docs")}
          />
          <SidebarItem
            icon={<Plus/>}
            text="Nuevo"
            onClick={() => alert("Crear nuevo")}
          />
        </SidebarSection>


        {/* A section containing rename-capable items */}
        <SidebarSection title="Formatos">
          {formatos.map((f) => (
            <SidebarFormatoItem
              key={f.id}
              text={f.nombre}
              active={false}
              formatoID={f.id}
              onClick={() => setActiveId(f.id)}
              onRenombrar={handleRenombrar}
              editable
            />
          ))}
        </SidebarSection>
      </Sidebar>


      {/* Main content placeholder */}
      <div className={`transition-all duration-300 ${expanded ? "ml-64" : "ml-18"} p-6`}>
        <h1 className="text-2xl font-bold mb-4">Contenido principal</h1>
        <p className="text-gray-700">
          Área para tu aplicación. Cambia el estado activo, crea o renombra formatos, y prueba el comportamiento
          responsivo: en móvil, abre y cierra con el botón flotante y el overlay.
        </p>
        <div className="mt-4 text-sm text-gray-500">
          Estado activo: <span className="font-semibold">{activeId}</span>
        </div>
      </div>
    </div>
  );
}
