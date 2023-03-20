import React, { useState, useEffect } from "react";
import allServices from "./services/allServices";

import {
  InputContainer,
  PopupModal,
  servicesOffered,
  facilities,
} from "./formUtils";
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { Link, useNavigate } from "react-router-dom";
import checkImage from "./icons8-done.svg";

const StepOne = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const result = await Country.getAllCountries();
        let allCountries = [];
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstCountry } = {}] = allCountries;
        setCountries(allCountries);
        setSelectedCountry(firstCountry);
        setIsLoading(false);
      } catch (error) {
        setCountries([]);
        setIsLoading(false);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await State.getStatesOfCountry(selectedCountry);
        let allStates = [];
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstState = "" } = {}] = allStates;
        setCities([]);
        setSelectedCity("");
        setStates(allStates);
        setSelectedState(firstState);
      } catch (error) {
        setStates([]);
        setCities([]);
        setSelectedCity("");
      }
    };

    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await City.getCitiesOfState(
          selectedCountry,
          selectedState
        );
        let allCities = [];
        allCities = result?.map(({ name }) => ({
          name,
        }));
        const [{ name: firstCity = "" } = {}] = allCities;
        setCities(allCities);
        setSelectedCity(firstCity);
      } catch (error) {
        setCities([]);
      }
    };

    getCities();
  }, [selectedState]);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data["country"] = selectedCountry;
    data["state"] = selectedState;
    data["city"] = selectedCity;
    localStorage.setItem("first_step", JSON.stringify(data));
    navigate("/hospital-data/1");
  };

  return (
    <form className='input-form' onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <label className='input__container-label' htmlFor='hospital_name'>
          Hospital Name
        </label>
        <input
          className='input__container-input'
          type='text'
          id='hospital_name'
          autoComplete='off'
          {...register("hospital_name", { required: true })}
        />
      </InputContainer>

      <div className='input__container'>
        <label className='input__container-label' htmlFor='country'>
          Country
        </label>
        <select
          className='input__container-input'
          value={selectedCountry}
          id='country'
          onChange={(e) => setSelectedCountry(e.target.value)}>
          {countries.map(({ isoCode, name }) => (
            <option value={isoCode} key={isoCode}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className='input__container'>
        <label className='input__container-label' htmlFor='region'>
          State
        </label>
        <select
          className='input__container-input'
          value={selectedState}
          id='region'
          onChange={(e) => setSelectedState(e.target.value)}>
          {states.length > 0 ? (
            states.map(({ isoCode, name }) => (
              <option value={isoCode} key={isoCode}>
                {name}
              </option>
            ))
          ) : (
            <option value='' key=''>
              No state found
            </option>
          )}
        </select>
      </div>

      <div className='input__container'>
        <label className='input__container-label' htmlFor='city'>
          City
        </label>
        <select
          className='input__container-input'
          value={selectedCity}
          id='city'
          onChange={(e) => setSelectedCity(e.target.value)}>
          {cities.length > 0 ? (
            cities.map(({ name }) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))
          ) : (
            <option value=''>No cities found</option>
          )}
        </select>
      </div>

      <InputContainer>
        <label className='input__container-label' htmlFor='address'>
          Address
        </label>
        <input
          className='input__container-input'
          type='text'
          id='address'
          {...register("address", { required: true })}
        />
      </InputContainer>
      <div className='form-one__btn'>
        <button type='submit' className='btn__normal'>
          Save & Continue
        </button>
      </div>
    </form>
  );
};

const StepTwo = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("second_step", JSON.stringify(data));
    navigate("/hospital-data/2");
  };

  return (
    <form className='input-form' onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <label className='input__container-label' htmlFor='website_url'>
          Website URL
        </label>
        <input
          className='input__container-input'
          type='url'
          id='website_url'
          {...register("website_url", { required: true })}
        />
      </InputContainer>

      <InputContainer>
        <label className='input__container-label' htmlFor='email'>
          Hospital Email Address
        </label>
        <input
          className='input__container-input'
          type='email'
          id='email'
          autoComplete='off'
          {...register("email", { required: true })}
        />
      </InputContainer>

      <InputContainer>
        <label className='input__container-label' htmlFor='hotline'>
          Hotline
        </label>
        <input
          className='input__container-input'
          type='tel'
          id='hotline'
          {...register("hotline", { required: true })}
        />
      </InputContainer>

      <div className='input__container'>
        <label className='input__container-label' htmlFor='operatingHours'>
          Operating Hours
        </label>
        <select
          className='input__select'
          id='operatingHours'
          {...register("operating_hours", { required: true })}>
          <option>24 Hours </option>
          <option>Monday - Friday</option>
          <option>Weekends</option>
          <option>Others</option>
        </select>
      </div>
      <div className='form-other__btn'>
        <button
          type='button'
          className='btn__normal bg-red'
          onClick={(e) => {
            e.preventDefault();
            navigate("/hospital-data");
          }}>
          Previous
        </button>
        <button type='submit' className='btn__normal'>
          Save & Continue
        </button>
      </div>
    </form>
  );
};

const StepThree = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("third_step", JSON.stringify(data));
    navigate("/hospital-data/3");
  };
  return (
    <form className='input-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='input__container'>
        <label className='input__container-label' htmlFor='ownership'>
          Ownership
        </label>
        <select
          className='input__select'
          id='ownership'
          {...register("ownership", { required: true })}>
          <option>Private</option>
          <option>Public</option>
          <option>Non-Profit</option>
        </select>
      </div>
      <div className='input__container'>
        <label className='input__container-label' htmlFor='facilityLevel'>
          Facility Level
        </label>
        <select
          className='input__select'
          id='facilityLevel'
          {...register("facility_level", { required: true })}>
          <option>Primary</option>
          <option>Secondary</option>
          <option>Tetiary</option>
        </select>
      </div>

      <div className='input__container'>
        <label className='input__container-label' htmlFor='facilityType'>
          Facility Type
        </label>
        <select
          className='input__select'
          id='facilityType'
          {...register("facility_type", { required: true })}>
          <option>General</option>
          <option>Specialist</option>
          <option>Teaching</option>
        </select>
      </div>
      <div className='input__container'>
        <label className='input__container-label' htmlFor='bedSpaces'>
          Bed Spaces
        </label>
        <input
          className='input__select'
          type='number'
          id='bedSpaces'
          {...register("bed_spaces", { required: true })}
        />
      </div>

      <div className='form-other__btn'>
        <button
          type='button'
          className='btn__normal bg-red'
          onClick={(e) => {
            e.preventDefault();
            navigate("/hospital-data/1");
          }}>
          Previous
        </button>
        <button type='submit' className='btn__normal'>
          Save & Continue
        </button>
      </div>
    </form>
  );
};

const StepFour = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const services = data?.services.join(",");
    localStorage.setItem("services_offered", services);
    navigate("/hospital-data/4");
    console.log(services);
  };

  return (
    <form className='input-form' onSubmit={handleSubmit(onSubmit)}>
      <figure className='form-instruction'>
        <p>Kindly Select Services You Offer</p>
      </figure>
      <div className='input__container'>
        {servicesOffered.map((val, i) => {
          return (
            <div className='input__container-check border-bottom' key={i}>
              <input
                type='checkbox'
                id={i}
                className='input__checkbox'
                value={val[i + 1]}
                {...register("services", { required: true })}
              />
              <label className='input__container-label' htmlFor={i}>
                {val[i + 1]}
              </label>
            </div>
          );
        })}
      </div>

      <div className='form-other__btn'>
        <button
          type='button'
          className='btn__normal bg-red'
          onClick={(e) => {
            e.preventDefault();
            navigate("/hospital-data/2");
          }}>
          Previous
        </button>
        <button type='submit' className='btn__normal'>
          Save & Continue
        </button>
      </div>
    </form>
  );
};

const StepFive = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const facilities = data?.facilities.join(",");
    localStorage.setItem("facilities", facilities);
    navigate("/");
    const step1 = JSON.parse(localStorage.getItem("first_step"));
    const step2 = JSON.parse(localStorage.getItem("second_step"));
    const step3 = JSON.parse(localStorage.getItem("third_step"));
    const step4 = localStorage.getItem("services_offered");
    const step5 = localStorage.getItem("facilities");

    const allData = {
      hospital_name: step1["hospital_name"],
      country: step1["country"],
      region: step1["state"],
      city: step1["city"],
      address: step1["address"],
      website_url: step2["website_url"],
      email: step2["email"],
      hotline: step2["hotline"],
      operating_hours: step2["operating_hours"],
      ownership: step3["ownership"],
      facility_level: step3["facility_level"],
      facility_type: step3["facility_type"],
      bed_spaces: step3["bed_spaces"],
      services_offered: step4,
      other_facilities: step5,
    };

    allServices.createHospitalData(allData).then(()=>{  
     
       })
  };
  return (
    <form className='input-form' onSubmit={handleSubmit(onSubmit)}>
      <figure className='form-instruction'>
        <p>Kindly Select Available Facilities</p>
      </figure>
      <div className='input__container'>
        {facilities.map((val, i) => {
          return (
            <div className='input__container-check border-bottom' key={i}>
              <input
                type='checkbox'
                className='input__checkbox'
                id={i}
                value={val[i + 1]}
                {...register("facilities", { required: true })}
              />
              <label className='input__container-label' htmlFor={i}>
                {val[i + 1]}
              </label>
            </div>
          );
        })}
      </div>

      <div className='form-other__btn'>
        <button
          type='button'
          className='btn__normal bg-red'
          onClick={(e) => {
            e.preventDefault();
            navigate("/hospital-data/3");
          }}>
          Previous
        </button>
        <button
          type='submit'
          className='btn__normal'
          onClick={(e) => {
            e.preventDefault();
            setShowPopup(true);
          }}>
          Submit
        </button>
      </div>
      {showPopup && (
        <PopupModal
          approveAction={handleSubmit(onSubmit)}
          cancelAction={() => setShowPopup()}
        />
      )}
    </form>
  );
};

const Progress = ({ path }) => {
  const pathname = path;

  const isFirstStep = pathname === "/hospital-data";
  const isSecondStep = pathname === "/hospital-data/1";
  const isThirdStep = pathname === "/hospital-data/2";
  const isFourthStep = pathname === "/hospital-data/3";
  const isFifthStep = pathname === "/hospital-data/4";

  return (
    <React.Fragment>
      <div className='steps'>
        <hr className='steps__hr' />
        <div className={`${isFirstStep ? "step active" : "step"}`}>
          <div>
            {isFirstStep ? (
              <img className='active__image' src={checkImage} alt='' />
            ) : (
              <Link to='/hospital-data'>1</Link>
            )}
          </div>
        </div>

        <div className={`${isSecondStep ? "step active" : "step"}`}>
          <div>
            {isSecondStep ? (
              <img className='active__image' src={checkImage} alt='' />
            ) : (
              <Link to='/hospital-data/1'>2</Link>
            )}
          </div>
        </div>

        <div className={`${isThirdStep ? "step active" : "step"}`}>
          <div>
            {isThirdStep ? (
              <img className='active__image' src={checkImage} alt='' />
            ) : (
              <Link to='/hospital-data/2'>3</Link>
            )}
          </div>
        </div>

        <div className={`${isFourthStep ? "step active" : "step"}`}>
          <div>
            {isFourthStep ? (
              <img className='active__image' src={checkImage} alt='' />
            ) : (
              <Link to='/hospital-data/3'>4</Link>
            )}
          </div>
        </div>

        <div className={`${isFifthStep ? "step active" : "step"}`}>
          <div>
            {isFifthStep ? (
              <img className='active__image' src={checkImage} alt='' />
            ) : (
              <Link to='/hospital-data/4'>5</Link>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export { StepOne, StepTwo, StepThree, StepFour, StepFive, Progress };
