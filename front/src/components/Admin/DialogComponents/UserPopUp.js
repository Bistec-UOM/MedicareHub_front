import React from 'react';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import EditUserDialog from './EditUserDialog';
import SuccessNotification from '../../recepcomponents/SnackBar/SuccessNotification';
import UserPopupDislog from './UserPopupDislog';
import { baseURL, endPoints } from '../../../Services/Admin';

const UserPopUp = ({profile,editOpen,setEditOpen}) => {
     ///////////////////////////// NAv bar Profile ///////////////////////////////


  const [deleteOpen, setDeleteOpen] = useState(false);

  const deletePopUp = () => {
    setDeleteOpen(true);
  };

  const [row2, setStaffData] = useState([]);

//   const [editOpen, setEditOpen] = useState(false);
const [isDisabled, setIsDisabled] = useState(true);

  const handleEditClose = () => {
    // setSelectedPaper(null);
    setEditOpen(false);
    // setIsDisabled(en);
  };
  const fields = [
    { label: "Full Name", key: "fullName", fullWidth: true },
    { label: "Usual Name", key: "name", style: { width:{xs:"100%",sm:"auto"} }  },
    { label: "NIC", key: "nic", style: { ml: {md:5,xs:0},width:{xs:"100%",sm:"auto"} } },
    { label: "Address", key: "address", fullWidth: true },
    { label: "Contact Number", key: "contactNumber" , style: { width:{xs:"100%",sm:"auto"} }},
    { label: "Qualifications", key: "qualifications", style: { ml: {md:5,xs:0},width:{xs:"100%",sm:"auto"} }},
    { label: "Email Address", key: "email" , style: { width:{xs:"100%",sm:"auto"} } },
    { label: "Password", key: "password", style: { ml: {md:5,xs:0},width:{xs:"100%",sm:"auto"} } },
  ];
  const [formErrors, setFormErrors] = useState({
    Name: "",
    FullName: "",
    nic: "",
    address: "",
    contactNumber: "",
    email: "",
    dob: "",
    gender: "",
    role: "",
    qualifications: "",
    password: "",
    imageUrl: "",
    isDeleted:false,
    // isActive: false,
  });
  const [loadingB, setLoadingB] = useState(false); //Loading button states
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    fullName: "",
    nic: "",
    address: "",
    contactNumber: "",
    email: "",
    dob: "",
    gender: "",
    role: "",
    qualifications: "",
    password: "",
    imageUrl: "",
    isDeleted:false,
    // isActive: false,
  });
//   const handleEditClickOpen = () => {
//     setIsDisabled(true);

//     // setType(`Edit ${buttonNumber}`);
//     console.log("row2", profile.Id);

//     axios.get(`https://localhost:7205/api/User/${profile.Id}`)
//     .then((response) => {
//       console.log('respoinse is',response.data);
//       setStaffData(response.data);
//     })
//     setFormData({
//       ...formData,
//       id: row2.id,
//       name: row2.name,
//       role: row2.role,
//       fullName: row2.fullName,
//       nic: row2.nic,
//       address: row2.address,
//       contactNumber: row2.contactNumber,
//       email: row2.email,
//       dob: row2.dob,
//       gender: row2.gender,
//       qualifications: row2.qualifications,
//       password: row2.password,
//       imageUrl: row2.imageUrl,
//       isDeleted:row2.isDeleted,
//       // isActive:row2.isActive,
//     });
//     // console.log(formData.name);

//   };

  useEffect(() => {
    if (editOpen) {
      setIsDisabled(true);
      axios.get(baseURL+endPoints.StaffList+`/${profile.Id}`)
        .then((response) => {
          setStaffData(response.data);
          setFormData({
            ...formData,
            id: response.data.id,
            name: response.data.name,
            role: response.data.role,
            fullName: response.data.fullName,
            nic: response.data.nic,
            address: response.data.address,
            contactNumber: response.data.contactNumber,
            email: response.data.email,
            dob: response.data.dob,
            gender: response.data.gender,
            qualifications: response.data.qualifications,
            password: response.data.password,
            imageUrl: response.data.imageUrl,
            isDeleted: response.data.isDeleted,
          });
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
        });
    }
  }, [editOpen]);

  const pData = {
    id: formData.id,
    name: formData.name,
    fullName: formData.fullName,
    nic: formData.nic,
    address: formData.address,
    contactNumber: formData.contactNumber,
    email: formData.email,
    dob: formData.dob,
    gender: formData.gender,
    qualifications: formData.qualifications,
    password: formData.password,
    role: formData.role,
    imageUrl: formData.imageUrl,
    isDeleted:false,
    // isActive: true,
  };

  const handleInputChange = (field, value) => {
    console.log("update values");
    setFormData({
      ...formData,
      [field]: value,
      });
      };
      const handleEditClick = () => {
        setIsDisabled(false);
      };
    return (
        <div>
<UserPopupDislog
  editOpen={editOpen}
  handleEditClose={handleEditClose}
  fields={fields}
  formErrors={formErrors}
  loadingB={loadingB}
  formData={formData}
  isDisabled={isDisabled}
  setFormData={setFormData}
  handleInputChange={handleInputChange}
  deletePopUp={deletePopUp}
  handleEditClick={handleEditClick}
  row2={row2}
  setFormErrors={setFormErrors}
  pData={pData}
  setIsDisabled={setIsDisabled}
  setEditOpen={setEditOpen}
>

</UserPopupDislog>
{/* <SuccessNotification typenoti={typenoti} notiMessage={notiMessage} notificationOpen={notificationOpen}></SuccessNotification> */}
        </div>
    );
}

export default UserPopUp;
