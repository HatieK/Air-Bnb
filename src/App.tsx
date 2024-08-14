import useRouterElement from "./routes/useRoutesElement";
import "./index.css";
import DateRangePickerComponent from "./test/DateRangePickerComponent";

function App() {
  const routeElement = useRouterElement();
  return (
    <>
      {/* <Header />
    <HomePage/>
    <Footer/> */}
      {routeElement}
      {/* <Test /> */}
      {/* <CalenderComponent /> */}
      {/* <DateRangeComponent /> */}
      {/* <DateRangePickerComponent /> */}
    </>
  );
}

export default App;
