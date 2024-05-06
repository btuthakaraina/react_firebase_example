import ReadComponent from "./ReadComponent";
import CreateComponent from "./CreateComponent";

function App() {
  return (
    <>
    <hr className="mb-3" />
    <h1 className="display-1">View Documents</h1>
    <hr className="mb-3" />
    <ReadComponent />
    <hr className="mb-3" />
    <h2 className="display-2">Add Document</h2>
    <hr className="mb-3" />
    <CreateComponent />
    </>
  );
}

export default App;
