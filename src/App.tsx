import Parent from "./components/Parent";
import Person from "./components/person/Person";
import User from "./components/User";


function App() {
  
  const fullName = {
    name: "mahmod",
    family: "ahmady",
  };

  const hobbies = ["movie", "footbal", "swimming"];
  return (
    <div className="App">
      {/* <Person name={fullName} hobbies={hobbies}  isLoggedIn={true}  />  */}
      <Parent>
        <User>adib sadeghi</User>
      </Parent>
    </div>
  );
}

export default App;
