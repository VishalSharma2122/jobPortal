import { setCompanies} from '@/redux/companySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get("https://jobportal-backend.onrender.com/api/v1/company/get", {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    withCredentials: true,
                  });
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies