import React, { useContext, createContext, useState, useRef, useEffect } from "react";
import { ChevronLast, ChevronFirst, MoreHorizontal, LogOut, Folder, FolderOpen, ChartNoAxesGantt, Plus } from "lucide-react";

/**
 * Reusable Sidebar System (JS + React + Tailwind + lucide-react)
 * --------------------------------------------------------------
 * Goals
 * - Keep the visual style and behaviors from the provided code
 * - Make it reusable and portable across future projects
 * - Keep it 100% JS (no TS), React, Tailwind, lucide-react only
 * - Provide an easy example of usage at the bottom of this file
 *
 * What this includes
 * - <SidebarProvider/>: context provider to share expanded state and helpers
 * - <Sidebar/>: the shell (logo, collapse button, mobile overlay, footer user)
 * - <SidebarSection/>: titled section with scroll and subtle custom scrollbar
 * - <SidebarItem/>: generic clickable item (with optional tooltip when collapsed)
 * - <SidebarFormatoItem/>: list row with inline rename flow (optional)
 *
 * You can import the components you need, or copy-paste this single file.
 */

// ------------------------------------
// Context & Hooks
// ------------------------------------
const SidebarContext = createContext();

export function useSidebar() {
  return useContext(SidebarContext);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return isMobile;
}

// ------------------------------------
// Provider
// ------------------------------------
export function SidebarProvider({ children, expanded, setExpanded }) {
  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
}

// ------------------------------------
// SidebarSection
// ------------------------------------
export function SidebarSection({ title, children }) {
  const { expanded } = useSidebar();
  return (
    <div className="flex flex-col min-h-0 group/section">
      {/* Title only when expanded */}
      <div className={`text-black font-inter text-sm font-bold px-3 ${expanded ? "block" : "hidden"}`}>
        {title}
      </div>

      {/* Scroll container with thin scrollbar that activates on hover */}
      <div
        className="mt-1 px-3 max-h-[28vh] overflow-y-auto
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
          scrollbar-thumb-rounded-full
          hover:scrollbar-thumb-gray-400
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-transparent
          group-hover/section:[&::-webkit-scrollbar-thumb]:bg-gray-300"
      >
        <ul className="space-y-1">{children}</ul>
      </div>
    </div>
  );
}

// ------------------------------------
// Sidebar Shell
// ------------------------------------
export function Sidebar({
  children,
  nombre = "Usuario",
  rol = "",
  onLogout,
  expanded,
  setExpanded,
  showMobileToggle = true,
  logoSrc = "/images/vive_rio_img.png",
}) {
  const isMobile = useIsMobile();

  // Hide on small screens by default
  useEffect(() => {
    if (isMobile) setExpanded(false);
  }, [isMobile, setExpanded]);

  // Close on ESC in mobile
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setExpanded]);

  const partes = String(nombre || "").trim().split(" ").filter(Boolean);
  const displayName = partes.length > 1 ? `${partes[0]} ${partes[1]}` : (partes[0] || "");

  return (
    <>
      {/* Floating open button on mobile */}
      {showMobileToggle && !expanded && (
        <button
          type="button"
          aria-label="Abrir menú"
          className="md:hidden fixed top-3 left-3 z-[60] p-2 rounded-xl bg-white/90 border shadow hover:bg-white transition"
          onClick={() => setExpanded(true)}
        >
          <ChartNoAxesGantt className="text-black" size={20} />
        </button>
      )}

      {/* Mobile overlay only visible when the panel is open */}
      <div
        onClick={() => setExpanded(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/30 transition-opacity ${expanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <aside
        aria-label="Barra lateral"
        className={`
          fixed top-0 left-0 z-50 h-screen bg-white
          transform transition-all duration-300 will-change-transform
          ${expanded ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${expanded ? "w-64" : "w-18"} ${expanded ? "md:w-64" : "md:w-18"}
          border-r shadow-sm
        `}
      >
        <nav className="h-full flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={logoSrc}
              className={`overflow-hidden transition-all ${expanded ? "w-24" : "w-0"}`}
              alt="Logo"
            />
            {/* Desktop: collapse/expand; Mobile: close */}
            <button
              onClick={() => {
                if (isMobile) setExpanded(false);
                else setExpanded(!expanded);
              }}
              className="text-black p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              aria-label={expanded ? "Colapsar" : "Expandir"}
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          {/* Items */}
          <SidebarProvider expanded={expanded} setExpanded={setExpanded}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarProvider>

          {/* Footer / user */}
          <div className="border-t flex p-3">
            <img
              src={`https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${encodeURIComponent(displayName)}`}
              alt="Avatar"
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`flex-1 min-w-0 ml-3 flex items-center justify-between transition-opacity ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-black truncate">{nombre}</h4>
                <span className="text-xs text-gray-600">{rol}</span>
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 font-medium text-gray-700 bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                onClick={onLogout}
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

// ------------------------------------
// SidebarItem (generic)
// ------------------------------------
export function SidebarItem({
  icon, // a lucide node, e.g. <Folder />
  text,
  active,
  alert,
  onClick,
}) {
  const { expanded, setExpanded } = useSidebar();

  // Close on navigate in mobile
  const handleNavigate = (e) => {
    onClick?.(e);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) setExpanded(false);
  };

  // Label without icon (section label line)
  if (!icon) {
    return (
      <li className={`py-2 my-1 ${expanded ? "pl-3" : "pl-0"}`}>
        <span className={`text-black font-inter text-sm font-bold transition-all ${expanded ? "block" : "hidden"}`}>
          {text}
        </span>
      </li>
    );
  }

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1 h-10
        font-medium rounded-md cursor-pointer transition-colors group
        text-black font-inter
        ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100" : "hover:bg-indigo-50"}
      `}
      onClick={handleNavigate}
    >
      {icon}
      <span className={`overflow-hidden transition-all text-black font-inter ${expanded ? "w-52 ml-3" : "w-0"}`}>
        {text}
      </span>
      {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />}

      {/* Tooltip when collapsed */}
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6 w-max
            bg-indigo-100 text-black text-sm font-inter
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

// ------------------------------------
// SidebarFormatoItem (rename-capable row)
// ------------------------------------
export function SidebarFormatoItem({
  text,
  active,
  onClick,
  formatoID,
  onRenombrar, // (id, nuevoNombre) => void
  editable = true,
}) {
  const { expanded } = useSidebar();
  const [isEditing, setIsEditing] = useState(false);
  const [nombreEditado, setNombreEditado] = useState(text);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => setNombreEditado(text), [text]);

  // Focus when entering edit
  useEffect(() => {
    if (!isEditing) return;
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }, [isEditing]);

  const finalizarEdicion = () => {
    if (!isEditing) return;
    setIsEditing(false);
    const nuevo = String(nombreEditado || "").trim();
    if (nuevo && nuevo !== text) {
      setNombreEditado(nuevo);
      onRenombrar?.(formatoID, nuevo);
    }
  };

  if (!expanded) return null; // (defensive)

  return (
    <li
      className={`
        relative group/item flex items-center justify-between py-2 px-3 my-1 h-10
        font-medium rounded-md cursor-pointer transition-colors
        text-black font-inter
        ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100" : "hover:bg-indigo-50"}
      `}
      onClick={onClick}
    >
      <span className="overflow-hidden text-black font-inter w-52 truncate group-hover/item:w-35 text-sm">
        {isEditing ? (
          <input
            ref={inputRef}
            value={nombreEditado}
            onChange={(e) => setNombreEditado(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && finalizarEdicion()}
            onBlur={finalizarEdicion}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-transparent px-0 py-0 text-sm focus:outline-none"
          />
        ) : (
          nombreEditado
        )}
      </span>

      <button
        ref={triggerRef}
        className="relative z-10 p-1"
        onClick={(e) => {
          e.stopPropagation();
          if (!editable) return;
          setIsEditing(true);
        }}
        aria-label={editable ? "Renombrar" : "Bloqueado"}
      >
        <MoreHorizontal className="w-4 h-4 text-gray-500 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 hover:cursor-pointer" />
      </button>
    </li>
  );
}

