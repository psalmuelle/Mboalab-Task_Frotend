import React from "react";


const servicesOffered = [
  {
    1: "Emergency Medical Services",
  },
  {
    2: "General Medical and Surgical Care",
  },
  {
    3: "Ambulance and Paramedic Services",
  },
  {
    4: "Maternity and Neonatal Care",
  },
  {
    5: "Trauma and Critical Care",
  },
  {
    6: "Pediatrics",
  },
  {
    7: "Oncology and Cancer Care",
  },
  {
    8: "Cardiology and Heart Care",
  },
  {
    9: "Pulmonary and Respiratory Care",
  },
  {
    10: "Gastroenterology and Digestive Care",
  },
  {
    11: "Nephrology and Kidney Care",
  },
  {
    12: "Endocrinology and Diabetes Care",
  },
  {
    13: "Infectious Diseases and Immunology",
  },
  {
    14: "Rheumatology and Autoimmune Disorders",
  },
  {
    15: "Allergy and Immunology",
  },
  {
    16: "Dermatology and Skin Care",
  },
  {
    17: "Ophthalmology and Eye Care",
  },
  {
    18: "Otolaryngology and Ear, Nose and Throat Care",
  },
  {
    19: "Orthopedics and Sports Medicine",
  },
  {
    20: "Neurology and Neurosurgery",
  },
  {
    21: "Rehabilitation and Physical Therapy",
  },
  {
    22: "Pain Management and Anesthesiology",
  },
  {
    23: "Sleep Disorders and Medicine",
  },
  {
    24: "Plastic and Reconstructive Surgery",
  },
  {
    25: "Vascular and Interventional Radiology",
  },
  {
    26: "Psychiatry and Behavioral Health Services",
  },
  {
    27: "Addiction and Substance Abuse Treatment",
  },
  {
    28: "Geriatics and Aging-Related Care",
  },
  {
    29: "Hospice and Palliative Care",
  },
  {
    30: "Transplant Services",
  },
  {
    31: "Home Health Services",
  },
  {
    32: "Telemedicine and Virtual Health Services",
  },
  {
    33: "Medical Imaging and Radiology Services",
  },
  {
    34: "Laboratory and Pathology Services",
  },
  {
    35: "Pharmacy Services",
  },
  {
    36: "Nutrition and Dietary Counseling ",
  },
  {
    37: "Medical Social Work and Counseling Services",
  },
  {
    38: "Patient Advocacy and Support Services",
  },
  {
    39: "Health Education and Prevention Programs",
  },
  {
    40: "Research and Clinical Trials",
  },
  {
    41: "Blood Bank Services",
  },
  {
    42: "Dental and Oral Surgery Services",
  },
  {
    43: "Rehabilitation and Occupational Therapy",
  },
  {
    44: "Nuclear Medicine Services",
  },
  {
    45: "Speech and Language Therapy",
  },
  {
    46: "Wound Care Services",
  },
  {
    47: "Elective Cosmetic Surgery",
  },
  {
    48: "Alternative and Complementary Medicine",
  },
  {
    49: "Bloodless Medicine and Surgery",
  },
  {
    50: "Medical Transportation and Air Ambulance Services",
  },
  {
    51: "Genetic Counseling and Testing",
  },
  {
    52: "Fertility and Reproductive Medicine",
  },
  {
    53: "Bariatric Surgery and Weight Management",
  },
  {
    54: "Integrative Medicine and Therapies",
  },
  {
    55: "Infectious Disease Control and Prevention",
  },
];

const facilities = [
    {
        1: "Operating rooms and surgical suites",
      },
      {
        2: "Emergency department",
      },
      {
        3: "Intensive care units (ICUs)",
      },
      {
        4: "Diagnostic imaging centers",
      },
      {
        5: "Laboratories for conducting medical tests and analyses"
      },
      {
        6: "Pharmacy",
      },
      {
        7: "Rehabilitation centers for physical therapy",
      },
      {
        8: "Blood bank and transfusion services",
      },
      {
        9: "Waiting areas and lobbies",
      },
      {
        10: "Medical waste disposal facilities",
      },
      {
        11: "Morgues or mortuaries",
      },
      {
        12: "Security offices and surveillance equipment",
      },
      {
        13: "Helipads and other transportation facilities for emergency medical services",
      },
      {
        14: "Dental Clinics/Care Facilities",
      },
      {
        15: "Radiation Oncology Centers",
      },
      {
        16: "Hyperbaric oxygen therapy chambers",
      },
     
]

const InputContainer = (props) => {
  return (
    <div className='input__container'>
    {props.children}
    </div>
  );
};

const PopupModal=(props)=>{
  const {cancelAction, approveAction} = props
return(
  <div className="popup-container">
    <div className="popup-modal">
      <h1>Are you sure you want to submit?</h1>
      <div className='form-other__btn'>
        <button
          type='button'
          onClick={cancelAction}
          className='btn__normal bg-red'>
          No
        </button>
        <button type='submit' onSubmit={approveAction} className='btn__normal'>
         Yes
        </button>
      </div>
    </div>
  </div>
)
}

export { InputContainer,PopupModal, servicesOffered, facilities };
