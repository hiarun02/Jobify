import {useSelector} from "react-redux";

const SaveJob = () => {
  const {singalJob} = useSelector((store) => store.jobs);
  return (
    <div>
      {singalJob.length === 0 ? (
        <p>No saved jobs.</p>
      ) : (
        <div>
          <h1 className="text-lg font-bold">{singalJob?.title} </h1>;
        </div>
      )}
    </div>
  );
};

export default SaveJob;
