//this is the working page for individual insurance quotes

import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import finance from "../../Image/finance.svg";
import { Button, Form, Overlay, OverlayTrigger, Row,Modal, Container } from "react-bootstrap";
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { useState, useEffect } from "react";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Individualmedicalfilter from "./Individualmedicalfilter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import Offcanvas from "react-bootstrap/Offcanvas";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
import compare from "../../Image/comparelist.svg";
import { API_URL } from "../..";
import swal from "sweetalert";
import Popover from 'react-bootstrap/Popover';
import jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';



const Individualinsurancequotes = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    HandleSubmitIndividualFormdata,
  } = UseMotorContext();
  const [additionalfilter, setAdditionalfilter] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [serverData, setServerData] = useState([]);
  const [naturePlan, setNaturePlan] = useState([]);
  const [planCategory, setPlanCategory] = useState([]);
  const [additionalCover, setAdditionalCover] = useState([]);
  const [quoteData, setQuoteData] = useState([]);
  const [quoteArr, setQuoteArr] = useState([]);
  const [show, setShow] = useState(false);
  const [filterCount, setFilterCount] = useState(null);
  const [updatePolicyId, setUpdatePolicyId] = useState("");
  const [localCompare, setLocalCompare] = useState([]);
  const [nameId, setNameId] = useState("");
  const [downloadmodal, setDownloadmodal] = useState(false);
  const [networklist,setNetworklist] = useState([])
  const Navigate = useNavigate();
  const img_API = API_URL + "/";
  const location = useLocation();




  useEffect(() => {
    fetchData();
    fetchedMedicalData();
  }, []);



  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");

    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
      setUpdatePolicyId(IndividualInsurance.updatePolicy_id);
      setQuoteArr(IndividualInsurance.compare_data || []);
    }

  }, []);

  const fetchData = async () => {
    await fetch(`${admin}/getAllCompanies`)
      .then((res) => res.json())
      .then((data) => setServerData(data.data))
      .catch((e) => { });

    await fetch(`${admin}/getNaturePlan`)
      .then((res) => res.json())
      .then((data) => setNaturePlan(data.data))
      .catch((e) => { });

    await fetch(`${admin}/getAllPlanCategories`)
      .then((res) => res.json())
      .then((data) => setPlanCategory(data.data))
      .catch((e) => { });

    await fetch(`${admin}/getAllAdditionalCovered?lob=Medical`)
      .then((res) => res.json())
      .then((data) => setAdditionalCover(data.data))
      .catch((e) => { });
  };

  useEffect(() => {
    fetchedMedicalData();
  }, [
    IndividualInsurance.plan_category_id,
    IndividualInsurance.nature_id,
    IndividualInsurance.insurance_company_id,
    IndividualInsurance.price,
    IndividualInsurance.salary_id,
    IndividualInsurance.visa_id,
    IndividualInsurance.emirates_id,
    IndividualInsurance.height,
    IndividualInsurance.weight,
    IndividualInsurance.nationality_id,
    IndividualInsurance.date,
    additionalfilter,

  ]);

  const fetchedMedicalData = async () => {

    const dataToSend = {
      nationalityId: IndividualInsurance.nationality_id,
      salaryRangeId: IndividualInsurance.salary_id,
      visaTypeId: IndividualInsurance.visa_id,
      emiratesId: IndividualInsurance.emirates_id,
      company_id: IndividualInsurance.insurance_company_id,
      plan_category_id: IndividualInsurance.plan_category_id,
      additionalCoverId: additionalfilter || [],
      nature_id: IndividualInsurance.nature_id,
      price: IndividualInsurance.price,
      gender: IndividualInsurance.gender,
      DOB: IndividualInsurance.date,
      height: IndividualInsurance.height,
      weight: IndividualInsurance.weight,
      newLeadId: IndividualInsurance.leadid

    };

    await fetch(`${admin}/getMatchMedicalPlans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((response) => {
        setQuoteData(response.data);
        console.log(response.data, "response data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        setIndividualInsurance((prevState) => ({
          ...prevState,
          full_compare_data: response.data,
        }));
        const length = response.data.length;
        setFilterCount(length);
        const filterValue = response.data.filter((val) => {
          return quoteArr.some((quote) => quote._id === val._id);
        });
        setQuoteArr(filterValue);

      })

      .catch((err) => {
        console.log(err)
      })
  };

  const handleStoreSelected = async (data) => {
    // //console.log(data);
    setIndividualInsurance((prevState) => ({
      ...prevState,
      selectFilter: data,
      company_id: data.company_id,
      // final_price: 1200,
      plan_type_id: data._id,
    }));

    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
    const { company_id, plan_type_id } = data;
    const dataToSend = {
      plan_category_id: company_id,
      plan_type_id,
      // final_price: 1200,
      paymentStatus: "pending",
    };
    //console.log(dataToSend);

    await fetch(`${admin}/updatePolicyDetails?id=${updatePolicyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((res) => { })
      .catch((err) => { });

    const updatedPlan = data;
    console.log(updatedPlan, "updatedPlan");
    // return false;

    if (updatedPlan) {
      Navigate("/Individualselectedquote", {
        state: { selectedPlan: updatedPlan },
      });
      localStorage.setItem("selectedPlan", JSON.stringify(updatedPlan));
    } else {
      console.error("No plan selected.");
      // Handle the case where no plan is selected.
    }
  };

  const handleOption = (e) => {
    const name = e.target.name;
    const value = e.target.value === "Any" ? null : e.target.value;

    if (name === "plan_category_id" && value === null) {
      // If "Any" is selected for plan_category_id, set it to null
      setIndividualInsurance((prevState) => ({
        ...prevState,
        plan_category_id: null,
      }));
    } else if (name === "insurance_company_id" && value === null) {
      setIndividualInsurance((prevState) => ({
        ...prevState,
        insurance_company_id: null,
      }));
    } else if (name === "nature_id" && value === null) {
      setIndividualInsurance((prevState) => ({
        ...prevState,
        nature_id: null,
      }));
    } else if (name === "price" && value === 'Any') {
      setIndividualInsurance((prevState) => ({
        ...prevState,
        price: 'Any',
      }));
    } else {
      setIndividualInsurance((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    localStorage.setItem("IndividualInsurance", JSON.stringify(IndividualInsurance));
  };


  const isQuoteSelected = (quote) => {
    // //console.log(quoteArr);
    return quoteArr.find((item) => item._id === quote._id);
  };

  const handleFormCheck = (quote, e) => {
    const name = e.target.name;

    if (e.target.checked) {
      if (!quoteArr.find((item) => item._id === quote._id)) {
        setQuoteArr((prevArr) => [...prevArr, quote]);
        handleCanvas();
      }
    } else {
      setQuoteArr((prevArr) =>
        prevArr.filter((item) => item._id !== quote._id)
      );

    }
  };

  const handleCanvas = () => {
    setShow(!show);
  };

  useEffect(() => {
    setIndividualInsurance((prevState) => ({
      ...prevState,
      compare_data: quoteArr,
    }));
    // Save the updated IndividualInsurance to localStorage
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [quoteArr]);

  const handleRemoveFromCompare = (id) => {
    // Remove the item with the specified id from compare_data state
    setQuoteArr((prevArr) => prevArr.filter((item) => item._id !== id));
    setIndividualInsurance((prevState) => ({
      ...prevState,
      compare_data: quoteArr,
    }));

    // Save the updated IndividualInsurance to localStorage
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  };




  const toggleShowMore = (index) => {
    setShowMore((prevState) => (prevState === index ? null : index));
  };


  // console.log(IndividualInsurance.full_compare_data, "QuoteArrr");
  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);

  useEffect(() => {
    setIndividualInsurance((prevState) => ({
      ...prevState,
      compare_data: quoteArr,
    }));
    // Save the updated HomeInsurance to localStorage
    localStorage.setItem("IndividualInsurance", JSON.stringify(IndividualInsurance));
  }, [quoteArr]);




  const additionalfilterdata = (id) => {
    //console.log(id);
    if (additionalfilter.includes(id)) {
      // If the id is already in the array, remove it
      setAdditionalfilter(
        additionalfilter.filter((filterId) => filterId !== id)
      );
    } else {
      // If the id is not in the array, add it
      setAdditionalfilter([...additionalfilter, id]);
    }
    // getMatchTravelPlan();
  };

  // console.log(quoteData, "quoteData");

  function openPDF(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag (navigating to a new page)

    const pdfURL = event.target.getAttribute("href");
    window.open(pdfURL, "_blank"); // Open the PDF in a new tab or window

    return false; // Ensure that the link doesn't navigate to the PDF URL
  }

  // console.log(quoteData, "quoteData");


  function toCamelCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  const [showNetworkTooltip, setShowNetworkTooltip] = useState(Array(quoteData.length).fill(false));


  const toggleTooltip = (index) => {
    const newShowNetworkTooltip = [...showNetworkTooltip];
    newShowNetworkTooltip[index] = !newShowNetworkTooltip[index];
    setShowNetworkTooltip(newShowNetworkTooltip);
  };

  const fileType = 'xlsx'

  // const handlenetworks = (networks) => {
  //   console.log(networks.map((val)=>val.name), "Networks");
  //   //pdf dowwnload
  //   const pdf = new jsPDF();

  //   pdf.text(20, 20, 'Networks List');
  //   networks.map((val, index) => {
  //     const y = 30 + index * 10;
  //     pdf.text(20, y, '• ' + val.name);
  //   }
  //   )
  //   pdf.save("networks.pdf");

  //   //excel download
  //   const updatedData = networks.map((item, index) => {
  //     return {
  //       'Networks List': item.name,
  //     }
  //   }
  //   )
  //   console.log(updatedData, '>>>>>this is updated data')
  //   const ws = XLSX.utils.json_to_sheet(updatedData);
  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(wb, { booktype: "xlsx", type: "array" });
  //   const newdata = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(newdata, "Networks" + ".xlsx")
  // };

  // const handledownload = (networks) => {
  //   setNetworklist(networks)
  //   setDownloadmodal(true);
  // }

  const handledownload = (networks) => {
    window.open(`${API_URL}/TPAfiles/${networks[0]}`, "_blank");
    // window.open(`https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`, "_blank");
  }

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.text(20, 20, 'Networks List');
    networklist.map((val, index) => {
      const y = 30 + index * 10;
      pdf.text(20, y, '• ' + val.name);
    }
    )
    pdf.save("networks.pdf");
  }

  const downloadExcel = () => {
    const updatedData = networklist.map((item, index) => {
      return {
        'Networks List': item.name,
      }
    }
    )
    console.log(updatedData, '>>>>>this is updated data')
    const ws = XLSX.utils.json_to_sheet(updatedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { booktype: "xlsx", type: "array" });
    const newdata = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(newdata, "Networks" + ".xlsx")
  }

 
    


  return (
    <div>
      <Header />

      {quoteArr &&
        quoteArr > 0 ? (
        <a to="/Individualcompare" className="compares123">
          <img className="compare_123" src={compare} />
          <span style={{ position: "absolute", top: "-11px" }}>
            {quoteArr.length
              ? `(${quoteArr.length})`
              : 0}
          </span>
        </a>
      ) : (
        <></>
      )}

      {IndividualInsurance.compare_data && IndividualInsurance.compare_data.length > 0 ? (
        <Link to="/Individualcompare" className="compares123">
          <img className="compare_123" src={compare} />
          <span style={{ position: "absolute", top: "-10px", right: "5px" }}>
            {IndividualInsurance.compare_data.length
              ? `(${IndividualInsurance.compare_data.length})`
              : 0}
          </span>
        </Link>
      ) : (
        <></>
      )}

      <div className="Quotes_info1">
        <div className="container Quotes_info pt-4 pb-4">
          <div className="row">
            <Individualmedicalfilter />
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="row quotes_selectoption">
                <div className="col">
                  <span>Plan Categories</span>
                  <select
                    name="plan_category_id"
                    value={IndividualInsurance.plan_category_id}
                    className="quotes_select form-control"
                    onChange={handleOption}
                  >
                    <option value={null}>Any</option>

                    {planCategory.length === 0 ? (
                      <option>No options available</option>
                    ) : (
                      planCategory &&
                      planCategory.map((val) => (
                        <option value={val._id} key={val._id}>
                          {val.plan_category_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="col">
                  <span>Ins Company</span>
                  <select
                    name="insurance_company_id"
                    className="quotes_select form-control"
                    onChange={handleOption}
                    value={IndividualInsurance.insurance_company_id}
                  >
                    <option value={null}>Any</option>

                    {serverData.length === 0 ? (
                      <option>No options available</option>
                    ) : (
                      serverData &&
                      serverData.map((val) => (
                        <option value={val._id} key={val._id}>
                          {val.company_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="col">
                  <span>Plan Nature</span>
                  <select
                    name="nature_id"
                    className="quotes_select form-control"
                    value={IndividualInsurance.nature_id}
                    onChange={handleOption}
                  >
                    <option value={null}>Any</option>

                    {naturePlan.length === 0 ? (
                      <option>No options available</option>
                    ) : (
                      naturePlan &&
                      naturePlan.map((val) => (
                        <option value={val._id} key={val._id}>
                          {val.nature_of_plan_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="col">
                  <span>Instant Policy</span>
                  <select className="quotes_select form-control">
                    <option value={null}>Any</option>
                    <option>Check</option>
                    <option>Sort By</option>
                  </select>
                </div>
                <div className="col">
                  <span>Price</span>
                  <select value={IndividualInsurance.price} name="price" onChange={handleOption} className="quotes_select form-control">

                    <option value={"Highest Price"}>Highest</option>
                    <option value={"Lowest Price"}>Lowest</option>
                  </select>
                </div>
              </div>

              <div className="row quotes_selectoption filters">
                <div className="row" >
                  <span className=" col-lg-12">More Filters</span>
                  {/* <br/> */}
                  {additionalCover.map((item) => (
                    <div className="col-lg-6">
                      <Form.Check
                        key={item.additional_cover_label} // Using label + index as a unique key
                        className="abcds_abcs filtercheck quotes_selectoption"
                        type="checkbox"
                        name="filter"
                        label={item.additional_cover_label}
                        value={item._id}
                        onChange={() => additionalfilterdata(item._id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="mb-3 paragra">
                We have found {quoteData.filter((quote) => quote?.finallBasePremium !== undefined && quote?.finallBasePremium !== null)?.length} Medical insurance quotes for your
                Medical arrangements.
              </p>


              <div
                onClick={() => HandleSubmitIndividualFormdata({ locationurl: 'Individualinsurancepersonaldetails3' })}
                className="col-lg-12 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                style={{ textAlign: "right" }}
              >
                <Link
                  to="/Individualinsurancepersonaldetails3"
                  className="buttonactions"
                  style={{ padding: "6px 19px", marginLeft: "10%" }}

                >
                  Next
                  <i
                    className="fa fa-chevron-right"
                    aria-hidden="true"
                  ></i>
                </Link>
              </div>
              <div className="row">
                {/* <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                    <Link to="/Individualmetrics" className="buttonactions">
                      <i
                        className="fa fa-chevron-left"
                        aria-hidden="true"
                      ></i>
                      Back
                    </Link>
                  </div> */}

              </div>
              <div className="scroll_abcds">
                {quoteData.length === 0 ? (
                  <div>No quote data available now</div>
                ) : (
                  quoteData &&
                  quoteData
                    .filter((quote) => quote?.finallBasePremium !== undefined && quote?.finallBasePremium !== null)
                    .map((quote, index) => {
                      const isSelected = isQuoteSelected(quote);

                      return (
                        <div className="quotes_inner" key={index}>
                          <div className="row quotes_details">
                            <div className="col-lg-3 quotesmobile">
                              {/* <img src={finance} style={{ width: "100%" }} /> */}
                              {quoteData &&
                                quote.companyDetails?.company_logo.map((val) => (
                                  <img
                                    key={index}
                                    alt={val.fieldname}
                                    src={`${img_API}/uploads/${val.filename}`}
                                  />
                                ))}
                            </div>
                            <div className="col-lg-6 quotemobile" onMouseLeave={() => setNameId("")}>
                              <h4 onClick={() => setNameId(quote.medicalRates?.name)} >{quote.medicalRates?.name}</h4>
                              {quote.medicalRates?.name == nameId ? (
                                <p style={{
                                  // position: 'absolute',
                                  width: 'fit-content',
                                  backgroundColor: 'rgba(66, 73, 81, 1)',
                                  padding: '2px 5px',
                                  color: 'white',
                                  boxShadow: '0px 2px 2px 0px #000000',
                                  borderRadius: 3,
                                }}>{quote.plan_name}</p>

                              ) : ""
                              }
                              {
                                quote.additional_cover_arr.map(
                                  (val, index) => (
                                    <ul className="benefits">
                                      <li>
                                        {val.additional_cover_label}
                                      </li>
                                    </ul>
                                  )
                                )
                              }
                            </div>

                            <div className="col-lg-3 action_abcd quotesmobile">
                              <div className="row">
                                <h2> {quote?.finallBasePremium == "Referred" ? "Referred" : "AED " + quote?.finallBasePremium}</h2>
                                <span style={{ fontSize: "12px", color: "red", fontWeight: "bold" }}>(Indicative)</span>

                              </div>

                              <span className="plan">
                                {quote?.policywordings_file && (
                                  <a href={`${API_URL}/uploads/${quote?.policywordings_file}`} target="_blank" onclick={(event) => openPDF(event)}>T&C Apply</a>
                                )}

                              </span>

                              <span className="network">
                               {/* <div >
                                  <OverlayTrigger
                                    className="networkstooltip"
                                    show={showNetworkTooltip[index]}
                                    placement='top'
                                    overlay={<Popover id={`tooltip-${index}`}>
                                      <Popover.Header as="h3">{`Network List`}</Popover.Header>
                                      <Popover.Body>
                                        {quote.networkLits.map((val) => 
                                        <div key={val.name}>
                                        <li>{val.name}</li> 
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>
                                          <li>Network1 network  network network network network network network network  </li>


                                          </div>
                                          )}
                                      </Popover.Body>
                                    </Popover >}
                                  >
                                    <span
                                    // onClick={() => toggleTooltip(index)}
                                    >Networks</span>
                                  </OverlayTrigger>
                                </div> */}

                                {/* <div onClick={()=>handlenetworks(quote.networkLits)}> Networks</div> */}
                                <div onClick={()=>handledownload(quote.tpaData.map((val) => val.file))} style={{fontSize:"12px"}}> 
                                Network List 
                                </div>

                              </span>

                            </div>
                          </div>
                          {showMore === index ? (
                            <div className="rowabcds">
                              <div className="row overalldetails">
                                <div className="col-lg-6 abc">
                                  <img
                                    style={{
                                      width: "auto",
                                      marginRight: "15px",
                                    }}
                                    src={tick}
                                  />
                                  <span className="abcds_aud">
                                    What is Covered.
                                  </span>
                                  <ul className="description">
                                    {quoteData &&
                                      quote &&
                                      quote.standard_cover_arr.map((val) => (
                                        <li key={index}>
                                          {val.standard_cover_label}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                                <div className="col-lg-6 cde">
                                  <img
                                    style={{
                                      width: "auto",
                                      marginRight: "15px",
                                    }}
                                    src={cross}
                                  />
                                  <span className="abcds_aud">
                                    What is not Covered.
                                  </span>
                                  <ul className="description">
                                    {/* <li>nahi hai bhai</li> */}
                                    {quoteData &&
                                      quote &&
                                      quote.notCoveredData.map((val) => (
                                        <li key={index}>
                                          {val.standard_cover_label}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="row overalldetails">
                                <button
                                  className="showadd_details"
                                  onClick={() => toggleShowMore(index)}
                                >
                                  Hide Details
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="rowabcds">
                              <div className="row overalldetails">
                                <button
                                  className="showadd_details"
                                  onClick={() => toggleShowMore(index)}
                                >
                                  See Details
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                )}


              </div>



            </div>
            <div className="col-lg-4 col-md-4">

            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal size="md" centered
        aria-labelledby="contained-modal-title-vcenter"
        show={downloadmodal} 
        onHide={() => setDownloadmodal(false)}
        >
        <Modal.Header closeButton style={{ padding: '10px 10px' }}>
          <Modal.Title style={{color:"#0D2F92"}}>Networks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">
          <div className="row d-flex justify-content-sm-center">
        
          <div className="col-md-6" style={{width: "46%"}}>
          
          <button className="btn btn-dark " onClick={downloadPDF} style={{ backgroundColor: "red" }}><i className="fa fa-file-pdf-o mx-2" aria-hidden="true"></i>Download PDF</button>
          </div>
          <div className="col-md-6" style={{width: "46%"}}> 
          <button className="btn btn-dark " onClick={downloadExcel} style={{ backgroundColor: "green" }}><i class="fa fa-file-excel-o mx-2" aria-hidden="true"></i>Download Excel</button>
          </div>
          
        </div>
        </div>
        </Modal.Body>
        {/* <Modal.Footer style={{ padding: '3px 10px' }}>
        <button className="btn btn-dark" onClick={() => setDownloadmodal(false)}>Close</button>
        </Modal.Footer> */}
       
      </Modal>
    </div>
  );
};

export default Individualinsurancequotes;
