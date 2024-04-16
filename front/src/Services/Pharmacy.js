const baseURL='https://localhost:44346'

const endPoints = { 
    DRUGREQUEST:'/api/Bill/DrugRequest',
    MEDICINEDETAIL:'/api/Bill/GetMedicineDetails',   
    DRUGPOST:'/api/Drugs',
    DRUGGET:'/api/Drugs',
    DRUGDELETE:'/api/Drugs/${id}',
    DRUGGETID:'/api/Drugs/${id}',
    DRUGUPDATE:'/api/Drugs/${id}',   
  };
  export { baseURL,endPoints};