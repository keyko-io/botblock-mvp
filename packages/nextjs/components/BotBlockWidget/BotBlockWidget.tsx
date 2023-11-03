export const BotBlockWidget = ({ planId }: { planId: string }) => {
  // const linkUrl = "https://www.botblock.io/subscribe/";
  const linkUrl = `https://botblock-3805ec.spheron.app/subscribe/${planId}`;
  const buttonText = "Go to Botblock to authorize crawler";
  return (
    <button
      style={{
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 8,
        padding: 4,
      }}
      onClick={() => (window.location.href = `${linkUrl}`)}
    >
      {buttonText}
    </button>
  );
};
