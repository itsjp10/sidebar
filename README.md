# 📚 Sidebar Reutilizable (React + Tailwind + Lucide)

Un componente de **Sidebar responsivo y reutilizable** hecho con **React + TailwindCSS + lucide-react**.  
Incluye soporte para:
- Expansión/colapso en desktop.
- Overlay en móvil con botón flotante.
- Secciones con scroll y títulos.
- Ítems con iconos y tooltips al colapsar.
- Ítems renombrables (`SidebarFormatoItem`).
- Footer con avatar dinámico y botón de logout.

---

## 🚀 Instalación

Asegúrate de tener **React**, **TailwindCSS** y **lucide-react** en tu proyecto:

```bash
npm install lucide-react
```

---

## 📂 Estructura

El archivo exporta los siguientes componentes:

- `Sidebar` → Shell principal (logo, toggle, footer con usuario).
- `SidebarSection` → Agrupa y etiqueta secciones con scroll.
- `SidebarItem` → Item genérico (con icono y tooltip).
- `SidebarFormatoItem` → Item especial con renombrado inline.
- `SidebarProvider` / `useSidebar` → Contexto para manejar estado interno.

---

## 🛠️ Uso básico

### 1. Importar en `App.jsx`

```jsx
import {
  Sidebar,
  SidebarSection,
  SidebarItem,
  SidebarFormatoItem,
} from "./Sidebar"; // ajusta la ruta según tu proyecto

import { Folder, FolderOpen, Plus } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [expanded, setExpanded] = useState(true);
  const [formatos, setFormatos] = useState([
    { id: "f1", nombre: "Informe mensual" },
    { id: "f2", nombre: "Acta de reunión" },
  ]);

  const handleRenombrar = (id, nuevoNombre) => {
    setFormatos((prev) =>
      prev.map((f) => (f.id === id ? { ...f, nombre: nuevoNombre } : f))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        nombre="María López"
        rol="Coordinadora"
        expanded={expanded}
        setExpanded={setExpanded}
        onLogout={() => alert("Cerrar sesión")}
        logoSrc="/images/vive_rio_img.png"
      >
        {/* Sección con items normales */}
        <SidebarSection title="General">
          <SidebarItem
            icon={<FolderOpen className="w-5 h-5" />}
            text="Panel"
            onClick={() => console.log("Panel")}
          />
          <SidebarItem
            icon={<Folder className="w-5 h-5" />}
            text="Documentos"
            onClick={() => console.log("Documentos")}
          />
          <SidebarItem
            icon={<Plus className="w-5 h-5" />}
            text="Nuevo"
            onClick={() => alert("Crear nuevo")}
          />
        </SidebarSection>

        {/* Sección con items renombrables */}
        <SidebarSection title="Formatos">
          {formatos.map((f) => (
            <SidebarFormatoItem
              key={f.id}
              text={f.nombre}
              formatoID={f.id}
              onRenombrar={handleRenombrar}
              onClick={() => console.log("Abrir:", f.nombre)}
            />
          ))}
        </SidebarSection>
      </Sidebar>

      {/* Contenido principal */}
      <div className={\`transition-all duration-300 \${expanded ? "ml-64" : "ml-18"} p-6\`}>
        <h1 className="text-2xl font-bold mb-4">Contenido principal</h1>
        <p className="text-gray-700">
          Aquí va tu aplicación. Prueba abrir/cerrar el sidebar en desktop y móvil.
        </p>
      </div>
    </div>
  );
}
```

---

## 🎨 Props principales de `Sidebar`

| Prop            | Tipo       | Default  | Descripción |
|-----------------|-----------|----------|-------------|
| `nombre`        | `string`  | `"Usuario"` | Nombre completo del usuario. |
| `rol`           | `string`  | `""`     | Rol o descripción corta. |
| `expanded`      | `bool`    | `true`   | Estado abierto/cerrado. |
| `setExpanded`   | `func`    | —        | Setter para actualizar `expanded`. |
| `onLogout`      | `func`    | —        | Callback para botón de logout. |
| `logoSrc`       | `string`  | `"/images/vive_rio_img.png"` | Ruta del logo. |
| `showMobileToggle` | `bool` | `true`   | Mostrar botón flotante en móvil. |

---

## ✨ Features extra

- **Tooltips en colapsado** → `SidebarItem` muestra el texto flotante cuando el sidebar está cerrado.
- **Renombrar inline** → `SidebarFormatoItem` permite editar el nombre con `Enter` o `blur`.
- **Responsive** → en móvil, el sidebar aparece con overlay y botón de apertura.

---

## 📸 Preview

Cuando está expandido:

```
[Logo]  [Collapse Button]
General
- Panel
- Documentos
- Nuevo

Formatos
- Informe mensual  [...]
- Acta de reunión   [...]
```

Cuando está colapsado:

```
[Icons] con tooltip al hover
```
