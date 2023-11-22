import { SVGProps, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { LogoutButton } from "./LogoutButton";
import { coreColors, palette } from "~~/styles/colors";
import { Button, Column, Dropdown, Row } from "~~/ui";

const ChevronIcon = dynamic<SVGProps<SVGSVGElement>>(() => import("~~/public/assets/icons/chevron.svg"));
const ScribbleIcon = dynamic<SVGProps<SVGSVGElement>>(() => import("~~/public/assets/icons/scribble.svg"));

interface ProfileButtonProps {
  name?: string;
}

export const ProfileButton = ({}: ProfileButtonProps) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);
  const browseToProfile = () => {
    setIsDropdownOpen(false);
    router.push("/profile");
  };

  return (
    <div style={{ position: "relative", width: "150px" }}>
      <button onClick={openDropdown}>
      <ScribbleIcon
        color={palette.purple[100]}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-160deg)",
          width: "83px",
          height: "auto",
        }}
      />
      <Row style={{ position: "absolute", top: "50%", left: "45%", transform: "translate(-55%, -50%)", gap: "4px" }}>
        <p style={{ fontSize: "27px", paddingLeft: "16px" }}>🧑‍⚕️</p>
        <ChevronIcon color={coreColors.white} style={{ transform: "rotate(-90deg)", marginTop: "8px" }} />
      </Row>
      </button>
      <Dropdown isOpen={isDropdownOpen} close={closeDropdown}>
        <Column style={{ padding: "8px", gap: "8px" }}>
          <Button fullWidth size="lg" onClick={browseToProfile}>
            Profile
          </Button>
          <LogoutButton />
        </Column>
      </Dropdown>
    </div>
  );
};
