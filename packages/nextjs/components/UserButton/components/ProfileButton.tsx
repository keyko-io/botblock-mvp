interface ProfileButtonProps {
  name?: string;
}

export const ProfileButton = ({ name }: ProfileButtonProps) => {
  return (
    <button className="btn btn-primary btn-sm" type="button">
      {name && `[${name}] `}→ Log out
    </button>
  );
};
