import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./homeStyles.css";
import allServices from "../../services/allServices";
import { removeAuthentication } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [record, setRecord] = useState([]);
  useEffect(() => {
    allServices.getHospitalData().then((res) => {
      setRecord(() => [...res.data]);
    });
  }, []);
  useEffect(() => {
    if ("token" in localStorage) {
      return;
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    allServices.logout().then(() => {
      dispatch(removeAuthentication()) && navigate("/login");
    });
  };
  return (
    <div className='App'>
      <div className='header__btn-container'>
        <div className='header__btn'>
          <button className='btn__normal' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <h2 className='sub__heading'>Hospital/Medical Facility Data</h2>

      {record.length >= 1 ? (
        <div className='container'>
          <h3>Welcome!</h3>
          <div>
            {record.map((val, i) => {
              return (
                <table key={i}>
                  <tbody>
                    <tr>
                      <td className='first__data'>Name</td>
                      <td>{val["hospital_name"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>Country</td>
                      <td>{val["country"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>State</td>
                      <td>{val["region"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>City</td>
                      <td>{val["city"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>Address</td>
                      <td>{val["address"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>Website</td>
                      <td>
                        {" "}
                        <Link to={val["website_url"]}></Link>{" "}
                        {val["website_url"]}
                      </td>
                    </tr>

                    <tr>
                      <td className='first__data'>Email</td>
                      <td>{val["email"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>Hotline</td>
                      <td>{val["hotline"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>Operating Hours</td>
                      <td>{val["operating_hours"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>Bed Spaces</td>
                      <td>{val["bed_spaces"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>Ownership</td>
                      <td>{val["ownership"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>Facility Type</td>
                      <td>{val["facility_type"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>Facility Level</td>
                      <td>{val["facility_level"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>Services Offered</td>
                      <td>{val["services_offered"]}</td>
                    </tr>

                    <tr>
                      <td className='first__data'>Facilities</td>
                      <td>{val["other_facilities"]}</td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
            <div className='notice__container'>
              <p className='notice'>
                Hospitals will be able to edit data in future updates{" "}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className='container'>
          <h3>Welcome!</h3>
          <h1 className='no__record'>You seem not to have any data with us!</h1>
          <div className='create-one__container'>
            <button
              className='btn__normal'
              onClick={() => navigate("hospital-data")}>
              {" "}
              Create One{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
