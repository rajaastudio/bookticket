import React,{useEffect,useState,useContext} from 'react';
import Layout from '../components/layout';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Router from "next/router";
import Autocomplete from  'react-autocomplete';
import axios from 'axios';
import {RequestContext} from '../services/context';
import $ from 'jquery';

const Index = (props) => {

	//Number input ref
	const adultCountref = React.createRef();
	const childCountref = React.createRef();
	// End Number input ref

	// const [Request,setRequest] = useContext(RequestContext);	  // error line
	const [showAnn,setShowAnn] = useState(false);
	const [round,setRound] = useState(true);
	const [oneway,setOneway] = useState(false);
	const [multi,setMulti] = useState(false);
	const [searchType,setSearchtype] = useState(0);
	const [isDirectFlight,setDirectflight] = useState(false);
	const [departureLocationCode,setDeparturelocationcode] = useState('');
	const [arrivalLocationCode,setArrivallocationcode] = useState('');
	const [preferedFlightClass,setPreferedflightclass] = useState(0);
	const [departureDate,setDeparturedate] = useState(new Date());
	const [returnDate,setReturndate] = useState(new Date());
	const [adultCount,setAdultcount] = useState(1);
	const [childCount,setchildCount] = useState(0);
	const [departure_err,setDeparture_err] = useState(false);
	const [arrival_err,setArrival_err] = useState(false);
	const [cabin_err,setCabin_err] = useState(false);
	const [departureDate_err,setDeparturedate_err] = useState(false);
	const [returnDate_err,setReturndate_err] = useState(false);
	const [adults_err,setAdults_err] = useState(false);
	const [child_err,setChild_err] = useState(false);
	const [departureData,setDeparturedata] = useState([]);
	const [arrivalData,setArrivaldata] = useState([]);

	useEffect(() => {
		// jquery for number input
		$('<div class="quantity-nav"><div class="quantity-button quantity-up"><span></span></div><div class="quantity-button quantity-down"><span></span></div></div>').insertAfter('.quantity input');
          $('.quantity').each(function() {
            var spinner = $(this),
              input = spinner.find('input[type="number"]'),
              btnUp = spinner.find('.quantity-up'),
              btnDown = spinner.find('.quantity-down'),
              min = input.attr('min'),
              max = input.attr('max');
      
            btnUp.click(function() {
              var oldValue = parseFloat(input.val());
              if (oldValue >= max) {
                var newVal = oldValue;
              } else {
                var newVal = oldValue + 1;
              }
              spinner.find("input").val(newVal);
              spinner.find("input").trigger("change");
            });
      
            btnDown.click(function() {
              var oldValue = parseFloat(input.val());
              if (oldValue <= min) {
                var newVal = oldValue;
              } else {
                var newVal = oldValue - 1;
              }
              spinner.find("input").val(newVal);
              spinner.find("input").trigger("change");
            });
		  });
		//   End jquery
	});

	const showAnother = (e) => {
		setShowAnn(true);
	}
	const handleround = (date) => {
		setRound(true);
		setOneway(false);
		setMulti(false);
		setSearchtype(1);
		
	}
	const handleoneway = (date) => {
		setRound(false);
		setOneway(true);
		setMulti(false);
		setSearchtype(2);
	}

	const handlemulti = (date) => {
		setRound(false);
		setOneway(false);
		setMulti(true);
		setSearchtype(3);
	}

	const handleendChange = (date) => {
		setReturndate(date);
	}

	const handlestartChange = (date) => {
		setDeparturedate(date);
	}

	const handleSelect = (selectedTab) => {
		setActiveTab(selectedTab);
	}
	const changedirectFlight = (e) => {
		setDirectflight(!isDirectFlight);
	}
	const changeDeparture = (e) => {
		setDeparturelocationcode(e.target.value);
		setDeparture_err(false);
	}
	const changeArrival = (e) => {
		setArrivallocationcode(e.target.value);
		setArrival_err(false);
	}
	const changeClass = (e) => {
		setPreferedflightclass(e.target.value);
		setCabin_err(false);
	}
	const adultChanged = (e) =>{
		if(e.target.value>9)
		{
			setAdults_err(true);
			e.target.value=1;
		}
		else
		{
			setAdultcount(e.target.value);
			setAdults_err(false);
		}
	}
	const childChanged = (e) =>{
		if(e.target.value>9)
		{
			setChild_err(true);
			e.target.value=0;
		}
		else
		{
			setchildCount(e.target.value);
			setChild_err(false);
		}
	}
	const onChangeCountries = (e) => {
        setDeparturelocationcode(e.target.value);
		var searchText = e.target.value;
		if(searchText != "")
		{
		axios.get(`http://localhost:4000/countries?query=${searchText}`)
		.then(response => {
			if(response.status == 200)
			{
				setDeparturedata(response.data);
			}
			else
			{
				setDeparturedata('');
			}
		})
		.catch(error => {
			console.log(error);
		});
		console.log("The Input Text has changed to ", e.target.value);
		}
	}
	const onChangeCountries1 = (e) => {
        setArrivallocationcode(e.target.value);
		var searchText1 = e.target.value;
		axios.get(`http://localhost:4000/countries?query=${searchText1}`)
		.then(response => {
			setArrivaldata(response.data);
		})
		.catch(error => {
			console.log(error);
		});
		console.log("The Input Text has changed to ", e.target.value);
	}
	const matchStocks =(state, departureLocationCode) => {
		return (
		  state.CityName.toLowerCase().indexOf(departureLocationCode.toLowerCase()) !== -1 ||
		  state.CityId.toLowerCase().indexOf(departureLocationCode.toLowerCase()) !== -1
		);
	  }
	const matchStocks1 = (state, arrivalLocationCode) => {
		return (
			state.CityName.toLowerCase().indexOf(arrivalLocationCode.toLowerCase()) !== -1 ||
			state.CityId.toLowerCase().indexOf(arrivalLocationCode.toLowerCase()) !== -1
		);
		}
	const flightsforRoundTrip = (e) => {
		e.preventDefault();
		if(departureLocationCode == "")
		{
			setDeparture_err(true);
		}
		if(arrivalLocationCode == "")
		{
			setArrival_err(true);
		}
		if(preferedFlightClass == "0")
		{
			setCabin_err(true);
		}
		if(departureDate == "")
		{
			setDeparturedate_err(true);
		}
		if(returnDate == "")
		{
			setReturndate_err(true);
		}
		if(adultCount == "")
		{
			setAdults_err(true);
		}
		if(childCount === "" )
		{
			setChild_err(true);
		}		
		if(departureLocationCode!=="" && arrivalLocationCode!==""&&departureDate!=""&&returnDate!=""&&preferedFlightClass!=0)
		{
			setRequest({
				userdata:{
					adultCount: this.adultCountref.value,
					childCount: this.childCountref.value,
					infantCount: 0,
					isDirectFlight: this.state.isDirectFlight,
					isPlusOrMinus3Days: false,
					searchType: this.state.searchType,
					preferedFlightClass: this.state.preferedFlightClass,
						segments: [
					{
						departureLocationCode: this.state.departureLocationCode,
						departureDate: this.state.departureDate,
						arrivalLocationCode: this.state.arrivalLocationCode,
						returnDate: this.state.returnDate,
						departureTime: "Any",
						returnTime: "Any"
					}
					],
				}
				})
				Router.push({
					pathname: '/ticketbooking',
					})
				}
			}
	
		return (
			<Layout>
				<section className="background">
					<Container>
						<div className="title">Discover</div>
						<h5 className="title_flight">
							<img className='flight_img' src='static/images/airplane-flight.svg' width='25' ></img> Flights
                        </h5>
						<div className="flight">
							<Form onSubmit={flightsforRoundTrip}>
								{['radio'].map(type => (
									<div key={`inline-${type}`} className="mb-3">
										<Form.Check name="searchType" defaultValue="1" className='radio_btn' inline label="One Way" type={type} onClick={handleoneway} id={`inline-${type}-2`} />
										<Form.Check name="searchType" defaultValue="2" className='radio_btn' inline label="Round Trip" defaultChecked type={type} onClick={handleround} id={`inline-${type}-1`} />
										<Form.Check name="searchType" defaultValue="3" className='radio_btn' inline label="Multi-city" type={type} onClick={handlemulti} id={`inline-${type}-3`} />
									</div>
								))}
								{['checkbox'].map(type => (
									<div key={`inline-${type}`} className="mb-3 right">
										<Form.Check name="isDirectFlight" inline label="Direct Flight Only" type={type} id={`inline-${type}-1`} defaultChecked={isDirectFlight} defaultValue={isDirectFlight} onClick={changedirectFlight}/>
									</div>
								))}

								<Row hidden={!round}>
									<Col md={9} sm={12}>
										<Row>
											<Col md={6} sm={6}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>From</Form.Label>
													<div className="select_box1">
													<Autocomplete
														value={departureLocationCode}
														inputProps={{ id: 'states-autocomplete' }}
														items={departureData}
														getItemValue={ item => item.CityName }
														shouldItemRender={ matchStocks }
														onChange = { onChangeCountries}
														autoComplete="off"
														onSelect={ departureLocationCode => setDeparturelocationcode(departureLocationCode)}
														renderMenu={ children => (
															<div className = "menu">
															{ children }
															</div>
														)}
														renderItem={(item, isHighlighted) => (
															<div className={`item ${isHighlighted ? 'item-highlighted' : ''}`} key={item.CityName} >
																<p>
																	<img className='fa fa-fighter-jet' alt="Flight" src='static/images/flight.png' width='25px'></img>
																	&nbsp;&nbsp;{item.CityName}&nbsp;&nbsp;
																	<small>({item.CityId})</small>
																	<br /><span>{item.CountryName}</span>
																</p>

															</div>
														)}
														/><br/>
														{departure_err ? (<i className="err-msg">Departure Location required</i>): null}
													</div>
												</Form.Group>
												{['checkbox'].map(type => (
													<div key={`inline-${type}`} className="mb-3 top-0">
														<Form.Check name="add_near_airport" inline label="Add Nearby Airports" type={type} id={`inline-${type}-1`} />
													</div>
												))}
											</Col>
											<Col md={6} sm={6}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>To</Form.Label>
													<div className="select_box1">
													<Autocomplete
														value={ arrivalLocationCode }
														autoComplete="off"
														inputProps={{ id: 'states-autocomplete' }}
														items={arrivalData}
														getItemValue={ item => item.CityName }
														shouldItemRender={ matchStocks1 }
														onChange = {onChangeCountries1}
														onSelect={ arrivalLocationCode => setArrivallocationcode(arrivalLocationCode) }
														renderMenu={ children => (
															<div className = "menu">
															{ children }
															</div>
														)}
														renderItem={(item, isHighlighted) => (
															<div className={`item ${isHighlighted ? 'item-highlighted' : ''}`} key={item.CityName} >
																<p>
																	<img className='fa fa-fighter-jet' alt="Flight" src='static/images/flight.png' width='25px'></img>
																	&nbsp;&nbsp;{item.CityName}&nbsp;&nbsp;
																	<small>({item.CityId})</small>
																	<br /><span>{item.CountryName}</span>
																</p>

															</div>
														)}
														/><br/>
														{arrival_err ? (<i className="err-msg">Arrival Location required</i>): null}
													</div>
												</Form.Group>
												{['checkbox'].map(type => (
													<div key={`inline-${type}`} className="mb-3 top-0">
														<Form.Check name="add_near_airport" inline label="Add Nearby Airports" type={type} id={`inline-${type}-1`} />
													</div>
												))}
											</Col>
										</Row>
									</Col>
									<Col md={3} sm={12}>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>Cabin Class</Form.Label>
											<div className="select_box">
												<Form.Control as="select" name="preferedFlightClass" onChange={changeClass}>
													<option value="0" hidden>Select</option>
													<option value="1">Any</option>
													<option value="2">Business</option>
													<option value="3">Economy</option>
													<option value="4">First Class</option>
													<option value="5">PremiumOrEconomy</option>
													<option value="6">PremiumAndEconomy</option>
												</Form.Control>
												{cabin_err ? (<i className="err-msg">Cabin class is required</i>): null}
											</div>
										</Form.Group>
									</Col>

									<Col lg={5} md={12}>
										<Row>
											<Col sm={6}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>Depature</Form.Label>
													<div className="date">
														{/* <i className="fa fa-calendar"> </i>  */}
														<img className='fa fa-calendar' src='static/images/calendar.svg' width='25'></img>
														<DatePicker 
														name="departureDate" 
														className="form-control" 
														showMonthDropdown 
														showYearDropdown 
														dateFormat="dd/MM/yyyy" 
														selected={departureDate} 
														onChange={handlestartChange} />
														{departureDate_err ? (<i className="err-msg">Departure date is required</i>): null}
													</div>
												</Form.Group>
											</Col>
											<Col sm={6}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>Return</Form.Label>
													<div className="date">
														{/* <i className="fa fa-calendar"> </i>  */}
														<img className='fa fa-calendar' src='static/images/calendar.svg' width='25'></img>
														<DatePicker 
															name="returnDate" 
															className="form-control" 
															dateFormat="dd/MM/yyyy" 
															showMonthDropdown 
															showYearDropdown 
															selected={returnDate} 
															onChange={handleendChange}
															/>
														{returnDate_err ? (<i className="err-msg">Return date is required</i>): null}
													</div>
												</Form.Group>
											</Col>
										</Row>
									</Col>
									<Col lg={7} md={12}>
										<Row>
											<Col sm={3}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>Adults (16+)</Form.Label>
													<div className="arrow">
														<div className="quantity">
															<input type="number" ref={adultCountref} name="adultCount" min="1" max="9" step="1" defaultValue={adultCount} className="form-control" onChange={adultChanged} readOnly/>
															{adults_err ? (<i className="err-msg">Adults counting atleast have 1</i>): null}
														</div>
													</div>
												</Form.Group>
											</Col>
											<Col sm={3}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>Children</Form.Label>
													<div className="arrow">
														<div className="quantity">
															<input type="number" ref={childCountref} name="childCount" min="0" max="9" step="1" defaultValue={childCount} className="form-control" onChange={childChanged}/>
															{child_err ? (<i className="err-msg">Invalid counting</i>): null}
														</div>
													</div>
												</Form.Group>
											</Col>
											<Col sm={6}>
												{/* <a href='/ticketBooking'><Button className='form-control' variant="danger">SEARCH FLIGHTS</Button></a> */}
												<Button className='form-control' variant="danger" type="submit">SEARCH FLIGHTS</Button>
											</Col>
										</Row>
									</Col>
								</Row>

								{/* <Row hidden={!this.state.oneway}>
									<Col md={9} sm={12}>
										<Row>
											<Col md={6} sm={6}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>From</Form.Label>
													<div className="select_box">
														<Form.Control as="select" name="departureLocationCode">
															<option hidden>Select</option>
															<option value="LHR">LONDON (LHR), UNITED KINGDOM, LONDON HEATHROW</option>
															<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
															<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
														</Form.Control>
													</div>
												</Form.Group>
												{['checkbox'].map(type => (
													<div key={`inline-${type}`} className="mb-3 top-0">
														<Form.Check name="add_near_airport" inline label="Add Nearby Airports" type={type} id={`inline-${type}-1`} />
													</div>
												))}
											</Col>
											<Col md={6} sm={6}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>To</Form.Label>
													<div className="select_box">
														<Form.Control as="select" name="arrivalLocationCode">
															<option hidden>Select</option>
															<option value="LHR">LONDON (LHR), UNITED KINGDOM, LONDON HEATHROW</option>
															<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
															<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
														</Form.Control>
													</div>
												</Form.Group>
												{['checkbox'].map(type => (
													<div key={`inline-${type}`} className="mb-3 top-0">
														<Form.Check name="add_near_airport" inline label="Add Nearby Airports" type={type} id={`inline-${type}-1`} />
													</div>
												))}
											</Col>
										</Row>
									</Col>
									<Col md={3} sm={12}>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>Cabin Class</Form.Label>
											<div className="select_box">
												<Form.Control as="select" name="preferedFlightClass">
													<option value="1">Economy</option>
													<option value="2">Domestic</option>
												</Form.Control>
											</div>
										</Form.Group>
									</Col>
									<Col lg={5} md={12}>
										<Row>
											<Col sm={12}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>Depature</Form.Label>
													<div className="date">														
														<img className='fa fa-calendar' src='static/images/calendar.svg' width='25'></img>
														<DatePicker 
														name="departureDate" 
														className="form-control" 
														showMonthDropdown 
														showYearDropdown 
														dateFormat="dd/MM/yyyy" 
														selected={this.state.departureDate} 
														onChange={this.handlestartChange} />
													</div>
												</Form.Group>
											</Col>
										</Row>
									</Col>
									<Col lg={7} md={12}>
										<Row>
											<Col sm={3}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>Adults (16+)</Form.Label>
													<div className="arrow">
														<div className="quantity">
															<input type="number" name="adultCount" min="1" max="9" step="1" defaultValue="1" className="form-control" />
														</div>
													</div>
												</Form.Group>
											</Col>
											<Col sm={3}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>Children</Form.Label>
													<div className="arrow">
														<div className="quantity">
															<input type="number" name="childCount" min="0" max="9" step="1" defaultValue="0" className="form-control" />
														</div>
													</div>
												</Form.Group>
											</Col>
											<Col sm={6}>
											<a href='/ticketBooking'><Button className='form-control' variant="danger">SEARCH FLIGHTS</Button></a>
											</Col>
										</Row>
									</Col>
								</Row> */}

								{/* {/* <Row hidden={!this.state.multi}>
									<Col md={4} sm={12}>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>From</Form.Label>
											<div className="select_box">
												<Form.Control as="select" name="departureLocationCode">
													<option hidden>Select</option>
													<option value="LHR">LONDON (LHR), UNITED KINGDOM, LONDON HEATHROW</option>
													<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
													<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
												</Form.Control>
											</div>
										</Form.Group>
									</Col>
									<Col md={4} sm={12}>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>To</Form.Label>
											<div className="select_box">
												<Form.Control as="select" name="arrivalLocationCode">
												<option hidden>Select</option>
												<option value="LHR">LONDON (LHR), UNITED KINGDOM, LONDON HEATHROW</option>
												<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
												<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
												</Form.Control>
											</div>
										</Form.Group>
									</Col>
									<Col md={4} sm={12}>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>Depature</Form.Label>
											<div className="date">
												<img className='fa fa-calendar' src='static/images/calendar.svg' width='25'></img>
												<DatePicker 
														name="departureDate" 
														className="form-control" 
														showMonthDropdown 
														showYearDropdown 
														dateFormat="dd/MM/yyyy" 
														selected={this.state.departureDate} 
														onChange={this.handlestartChange} />
											</div>
										</Form.Group>
									</Col>
									<Col md={4} sm={12}>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>From</Form.Label>
											<div className="select_box">
												<Form.Control as="select" name="departureLocationCode">
													<option hidden>Select</option>
													<option value="LHR">LONDON (LHR), UNITED KINGDOM, LONDON HEATHROW</option>
													<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
													<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
												</Form.Control>
											</div>
										</Form.Group>
									</Col>
									<Col md={4} sm={12}>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>To</Form.Label>
											<div className="select_box">
												<Form.Control as="select" name="arrivalLocationCode">
													<option hidden>Select</option>
													<option value="LHR">LONDON (LHR), UNITED KINGDOM, LONDON HEATHROW</option>
													<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
													<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
												</Form.Control>
											</div>
										</Form.Group>
									</Col>
									<Col md={4} sm={12}>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>Depature</Form.Label>
											<div className="date">
												<img className='fa fa-calendar' src='static/images/calendar.svg' width='25'></img>
												<DatePicker 
														name="departureDate" 
														className="form-control" 
														showMonthDropdown 
														showYearDropdown 
														dateFormat="dd/MM/yyyy" 
														selected={this.state.departureDate} 
														onChange={this.handlestartChange} />
											</div>
										</Form.Group>
									</Col>
									<div hidden={!this.state.showAnn} style={{width: '100%'}}>
										<Row style={{padding: '0 15px'}}>
											<Col md={4} sm={12}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>From</Form.Label>
													<div className="select_box">
														<Form.Control as="select" name="departureLocationCode">
															<option hidden>Select</option>
															<option value="LHR">LONDON (LHR), UNITED KINGDOM, LONDON HEATHROW</option>
															<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
															<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
														</Form.Control>
													</div>
												</Form.Group>
											</Col>
											<Col md={4} sm={12}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>To</Form.Label>
													<div className="select_box">
														<Form.Control as="select" name="arrivalLocationCode">
															<option hidden>Select</option>
															<option value="LHR">LONDON (LHR), UNITED KINGDOM, LONDON HEATHROW</option>
															<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
															<option value="CMB">COLOMBO (CMB), SRI LANKA, BANDARANAYAKE INTERNATIONAL</option>
														</Form.Control>
													</div>
												</Form.Group>
											</Col>
											<Col md={4} sm={12}>
											<Form.Group controlId="exampleForm.ControlSelect1">
												<Form.Label>Depature</Form.Label>
												<div className="date">
													<img className='fa fa-calendar' src='static/images/calendar.svg' width='25'></img>
													<DatePicker name="departureDate" className="form-control" dateFormat="dd/MM/yyyy" selected={this.state.startDate} onChange={this.handlestartChange} />
												</div>
											</Form.Group>
										</Col>
										</Row>
									</div>
									<Col md={4} sm={12}>
										<Button className='form-control' variant="danger" onClick={this.showAnother}>ADD ANOTHER FLIGHT</Button>
									</Col>
									<Col md={8} sm={12}>

									</Col>
									<Col md={3} sm={12}>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>Cabin Class</Form.Label>
											<div className="select_box">
												<Form.Control as="select" name="preferedFlightClass">
													<option value="1">Economy</option>
													<option value="2">Domestic</option>
												</Form.Control>
											</div>
										</Form.Group>
									</Col>
									<Col md={9} sm={12}>
										<Row>
											<Col sm={4}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>Adults (16+)</Form.Label>
													<div className="arrow">
														<div className="quantity">
															<input type="number" name="adultCount" min="1" max="9" step="1" defaultValue="1" className="form-control" />
														</div>
													</div>
												</Form.Group>
											</Col>
											<Col sm={4}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>Children</Form.Label>
													<div className="arrow">
														<div className="quantity">
															<input type="number" name="childCount" min="0" max="9" step="1" defaultValue="0" className="form-control" />
														</div>
													</div>
												</Form.Group>
											</Col>
											<Col sm={4}>
											<a href='/ticketBooking'><Button className='form-control' variant="danger">SEARCH FLIGHTS</Button></a>
											</Col>
										</Row> 
									</Col>
								</Row> */}
							</Form>
						</div>
					</Container>
				</section>

				{/* Next Section */}
				<section className='nextBG'>
					<Container>
						<div className=''>
							<Row>
								<Col md={1} sm={12}>
								</Col>
								<Col md={10} sm={12}>
									<Row>
										<Col xl={3} lg={6} md={6} sm={6} xs={6} className='service'>
											<div className='img_round'>
												<div className='count'>03</div>
												<img src='static/images/image02.jpg' width='100%' alt=''></img>
											</div>
											<h5>BEST PRICE GUARANTEE</h5>
											<p>" Offical ticket agent. No refund, ticket renewed. "</p>
										</Col>
										<Col xl={3} lg={6} md={6} sm={6} xs={6} className='service'>
											<div className='count'>02</div>
											<div className='img_round'>
												<img src='static/images/image01.jpg' width='100%' alt=''></img>
											</div>
											<h5>PLEASE FLIGHT TICKET</h5>
											<p>" Convenient payment and very safe, intelligent booking system. " </p>
										</Col>
										<Col xl={3} lg={6} md={6} sm={6} xs={6} className='service'>
											<div className='img_round'>
												<div className='count'>04</div>
												<img src='static/images/image03.jpg' width='100%' alt=''></img>
											</div>
											<h5>CUSTOMER CARE 24/7</h5>
											<p>" Cheap Domestic Flights, International Cheap Flights. "</p>
										</Col>
										<Col xl={3} lg={6} md={6} sm={6} xs={6} className='service'>
											<div className='img_round'>
												<div className='count'>01</div>
												<img src='static/images/image04.jpg' width='100%' alt=''></img>
											</div>
											<h5>THOUGHTFUL SERVICE</h5>
											<p>" Support Free Support Related Information. "</p>
										</Col>
									</Row>
								</Col>
								<Col md={1} sm={12}>
								</Col>
							</Row>
						</div>
					</Container>
				</section>
			</Layout>
		);
	}

export default Index;