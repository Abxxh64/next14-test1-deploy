'use server'
import baseApi from "./baseApi";
import { getAuthToken } from "./get-token";


async function getAppointments() {
    try {
      const authToken = await getAuthToken();

      const response = await baseApi.get('/appointments', {
        headers: {
            Authorization: `Bearer ${authToken}`
            }
      });

      return response.data;

    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      throw error;
    }
  };
  
  
export default getAppointments