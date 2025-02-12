import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import TripDetails from "./Component/TripDetails";
import TripsComponent from "./Component/TripsComponent";
import CheckEmail from "./Component/CheckEmail";
import ChangePassword from "./Component/ChangePassword";
import Signup from "./Component/Signup";
import AdminHome from "./Component/AdminHome";
import About from "./Component/About";
import Contact from "./Component/Contact";
import CategoryComponent from "./Component/CategoryComponent";
import AddTripComponent from "./Component/AddTripComponent";
import TripsByCategoryComponent from "./Component/TripsByCategoryComponent";
import MatchDetails from "./Component/MatchDetails";
import MyTripComponent from "./Component/MyTripComponent";
import Payment from "./Component/Payment";
import MyBookedTrip from "./Component/MyBookedTrip";
import Profile from "./Component/Profile";
import AllTrips from "./Component/AllTrips";
import Alluser from "./Component/Alluser";
import AllPayment from "./Component/AllPayment";
import Feedbacks from "./Component/Feedbacks";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/forgot-password" element={<CheckEmail></CheckEmail>}></Route>
        <Route path="/change-password" element={<ChangePassword></ChangePassword>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/AdminHome" element={<AdminHome></AdminHome>}></Route>
        <Route path="/tripdetails/:id" element={<TripDetails></TripDetails>}></Route>
        <Route path="/trips" element={<TripsComponent></TripsComponent>}></Route>
        <Route path="/category" element={<CategoryComponent></CategoryComponent>}></Route>
        <Route path="/searchcategory/:categoryId" element={<TripsByCategoryComponent></TripsByCategoryComponent>} />
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/addtrip" element={<AddTripComponent></AddTripComponent>}></Route>
        <Route path="/mytrip/:userId" element={<MyTripComponent></MyTripComponent>}></Route>
        <Route path="/create/:tripId" element={<MatchDetails></MatchDetails>}></Route>
        <Route path="/payment" element={<Payment></Payment>}></Route>
        <Route path="/Mytrips" element={<MyBookedTrip></MyBookedTrip>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/allusers" element={<Alluser></Alluser>}></Route>
        <Route path="/alltrips" element={<AllTrips></AllTrips>}></Route>
        <Route path="/allpayment" element={<AllPayment></AllPayment>}></Route>
        <Route path="/feedbacks" element={<Feedbacks></Feedbacks>}></Route>
      </Routes>
    </div>
  );
}

export default App;
