
const TITLE = "Next Steps";
const DESCRIPTION =
  "Check your email with the instructions to update the robots.txt and add the widget you'll find below to your website.";

const NextSteps = () => {



  return (
    <div className="p-32 flex-grow" data-theme="exampleUi">
      <h1 className="text-4xl sm:text-6xl">{TITLE}</h1>
      <h3 className="text-xl sm:text-2xl">{DESCRIPTION}</h3>
      <div className="grid grid-cols-2 gap-4">
      </div>
    </div>
  );
};

export default NextSteps;
