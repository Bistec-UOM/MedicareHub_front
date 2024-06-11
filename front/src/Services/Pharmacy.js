let baseURL;

if (window.location.hostname === 'localhost') {
  baseURL = 'https://localhost:7205';
} else {
  baseURL = 'https://mediicarehub.azurewebsites.net';
}


const endPoints = { 
    DRUGREQUEST:'/api/Bill/DrugRequest',
    MEDICINEDETAIL:'/api/Bill/GetMedicineDetails',   
    DRUGPOST:'/api/Drugs',
    DRUGGET:'/api/Drugs',
    DRUGDELETE:'/api/Drugs',
    DRUGGETID:'/api/Drugs',
    DRUGUPDATE:'/api/Drugs',
    ADDBILLDRUG:'/api/Bill/AddBillDrugs'   
  };
  export { baseURL,endPoints};