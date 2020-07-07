// React
import React from "react";

// Components
import AddItemLinkButton from "../AddItemLinkButton/AddItemLinkButton";

export default function NavLinkList(props) {
    return props.navLinks.map((navLink) => {
        return (
            <AddItemLinkButton
                to={navLink.to}
                label={navLink.label}
                alwaysShowLabel={navLink.alwaysShowLabel}
                labelSize={navLink.labelSize}
                name={navLink.name}
                icon={navLink.icon}
                classes={navLink.classes}
                onClick={navLink.onClick}
                key={navLink.name}
            />
        );
    });
}
