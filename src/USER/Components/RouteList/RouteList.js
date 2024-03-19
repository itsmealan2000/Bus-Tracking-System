import React, { useEffect, useState } from "react";
import "./RouteList.css";
import { getRouteApi } from "../../../SERVICES/AllAPI";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StopList from "../StopList/StopList";
import axios from "axios";


function RouteList() {
  const [allRoutes, setAllRoutes] = useState([]);
  const token = localStorage.getItem("token");

  const header = {
    Authorization: `Token ${token}`,
  };
  const getAllRoutes = async () => {
try {
   const response =  await axios.get(`http://127.0.0.1:8000/passengerapi/route/`,{
      headers:{
        Authorization:`Token ${token}`
      }
    })
  console.log(response.data);
  setAllRoutes(response.data);
} catch (error) {
  console.log(error);
}   
    
  };

  useEffect(() => {
    getAllRoutes();
  }, []);
  

  return (
    <div>
      {" "}
      <div className="m-5   ">
        <div className="m-5 bustopBody shadow text-center">
          {allRoutes && allRoutes.length > 0 ? (
            allRoutes.map((i, index) => (
                <Accordion className='ps-5 w-100 ' key={i.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="panel1-header"
                  className='d-flex '
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', width: '100%' }}>
                  <img
                    className="bustopLogo"
                    src="https://i.postimg.cc/DwB1WWDp/bus-station.png"
                    alt=""
                  />
                  <div className="ms-5 catDiv pt-2 ">{i.buscategory}</div>
                  
                    <h3 style={{ textTransform: 'capitalize' }} className="ms-4 ">{i?.route.name}</h3> 
                    <div className='ms-auto text-end me-5 pe-5'>
                      <b> Starts From : </b> {i.route.starts_from} <br />
                      <b> Ends At : </b> {i.route.ends_at}
                    </div>
                  </div>
                </AccordionSummary>
  
                <AccordionDetails>
  
                  <div>
                 <StopList id={i.id}></StopList>

                  </div>
  
  
  
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default RouteList;
