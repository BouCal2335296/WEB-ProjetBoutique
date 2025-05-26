"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const action = [
    { code: "AJOUT", label: "Ajouter Produit", icon: "/plus-circle-dotted.svg", path: "/AddProduit" },
];

export default function MenuAdmin() {
    const [selected, setSelected] = useState("AJOUT");
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectOption = (code) => {
        const option = action.find((a) => a.code === code);
        if (option) {
            setSelected(code);
            setIsOpen(false);
            router.push(option.path);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest(".dropdown")) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2" type="button" onClick={toggleDropdown} aria-expanded={isOpen} >
                <img src={action.find((l) => l.code === selected)?.icon} width="20" height="15" alt={selected} />
                {selected}
            </button>

            <ul className={`color1 dropdown-menu ${isOpen ? "show" : ""}`}>
                {action.map((act) => (
                    <li key={act.code}>
                        <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => selectOption(act.code)} >
                            <img src={act.icon} width="20" height="15" alt={act.label} />
                            {act.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
