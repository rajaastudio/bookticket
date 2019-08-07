import React, { Component } from 'react';
import Layout from '../components/layout';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import sortJsonArray from 'sort-json-array';
import dateFormat from 'dateformat';
import LoaderIcon from '../components/loader.js';
import getSymbolFromCurrency from 'currency-symbol-map'
import Filtering from '../components/filtering';
import { TimelineLite, TweenLite } from 'gsap';
import datetimeDifference from "datetime-difference";

class TicketBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            startDate: new Date(),
            endDate: new Date(),
            sourcePlace: 'London,United Kingdom',
            destinationPlace: 'Newyork, United States of America',
            popularitySort: false,
            priceSort: false,
            durationSort: false,
            popularityIcon: 0,
            priceIcon: 1,
            durationIcon: 0,
            nonstop:false,
            loader:false,
            sortToggler : false,
            filterToggler : false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.changePlace = this.changePlace.bind(this);
        this.sortPrice = this.sortPrice.bind(this);
        this.sortDuration = this.sortDuration.bind(this);
        this.sortPopularity = this.sortPopularity.bind(this);
        this.changeMonthDate = this.changeMonthDate.bind(this);
        this.nonStopFlights = this.nonStopFlights.bind(this);
        this.TimeSplit = this.TimeSplit.bind(this);
        this.handlesortToggler = this.handlesortToggler.bind(this);
        this.handleFilterToggler = this.handleFilterToggler.bind(this);
        this.calculateDuration = this.calculateDuration.bind(this);
        this.myTween = new TimelineLite({paused: true});
    }
    
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }
    handleChange1(date) {
        this.setState({
            endDate: date
        });
    }
    changePlace(e) {
        this.setState({
            sourcePlace: this.state.destinationPlace,
            destinationPlace: this.state.sourcePlace
        })
    }

    sortPopularity() {
        this.setState({loader:true});
        setTimeout(() => {
            this.setState({loader: false,popularitySort: !this.state.popularitySort})
        },500);
        var data  = require('../data/AW_Response.json'); 
        if(this.state.popularitySort)  
        {
            this.setState({popularityIcon: 2,priceIcon: 0,durationIcon: 0});
            data = sortJsonArray(data.recommendation,"marketingAirlineNames","des");
        }
        else
        {
            this.setState({popularityIcon: 1,priceIcon: 0,durationIcon: 0});
            data = sortJsonArray(data.recommendation,"marketingAirlineNames","asc"); 
        }
    }

    sortDuration() {
        this.setState({loader:true});
        setTimeout(() => {
            this.setState({loader: false,durationSort: !this.state.durationSort})
        },500);
        var data  = require('../data/AW_Response.json');   
        data = data.recommendation;
        if(this.state.durationSort)
        {
            this.setState({durationIcon: 2,popularityIcon: 0,priceIcon: 0});
            data = data.sort(function(obj1, obj2) {
                return obj2.totalFare - obj1.totalFare;
            });
        }
        else
        {
            this.setState({durationIcon: 1,popularityIcon: 0,priceIcon: 0});
            data = data.sort(function(obj1, obj2) {
                return obj1.totalFare - obj2.totalFare;
            });
        }
    }

    sortPrice() {
        this.setState({loader:true});
        setTimeout(() => {
            this.setState({loader: false,priceSort: !this.state.priceSort})
        },500);
        var data  = require('../data/AW_Response.json');  
        data = data.recommendation; 
        if(this.state.priceSort)
        {
            this.setState({priceIcon: 2,popularityIcon: 0,durationIcon: 0});
            data = data.sort(function(obj1, obj2) {
                return obj2.totalFare - obj1.totalFare;
            });
        }
        else
        {
            this.setState({priceIcon: 1,popularityIcon: 0,durationIcon: 0});
            data = data.sort(function(obj1, obj2) {
                return obj1.totalFare - obj2.totalFare;
            });
        }
    }

    changeMonthDate(dt) {
        var date1 = dt.split('-')
        var newDate = date1[1] + '-' +date1[0] +'-' +date1[2];
        var date = new Date(newDate);
        return(date);
    }

    nonStopFlights() {
        this.setState({nonstop: !this.state.nonstop});
        var data  = require('../data/AW_Response.json');
        data = data.recommendation;
        console.log(data);
             data = data.filter(item => {
                return item.flightLeg[0].flightDetails.isDirect == true;
            });
        console.log(data);
    }

    TimeSplit(time) {
        time = time.replace(/(..?)/g, '$1:').slice(0,-1)
        return(time);
    }

    handlesortToggler() {
        this.setState({sortToggler: true,filterToggler: false})
    }

    handleFilterToggler() {
        this.setState({filterToggler: true,sortToggler: false})
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollToElement);
    }
    
    handleScrollToElement(event) {
        console.log('Fired ' + event);
        $(window).scroll(function(){
            var sticky = $('.filtering-row.row'),
                scroll = $(window).scrollTop();
          
            if (scroll >= 400) sticky.addClass('fixed');
            else sticky.removeClass('fixed');
          });
    }
    calculateDuration(dt1,dt2,tm1,tm2)
    {
        var date1 = dt1.split('-')
        var date1 = date1[1] + '-' +date1[0] +'-' +date1[2];
        tm1 = tm1.replace(/(..?)/g, '$1:').slice(0,-1);
        dt1 = date1+", "+tm1;
        var date2 = dt2.split('-')
        var date2 = date2[1] + '-' +date2[0] +'-' +date2[2];
        tm2 = tm2.replace(/(..?)/g, '$1:').slice(0,-1);
        dt2 = date2+", "+tm2;
        var duration = datetimeDifference(new Date(dt1), new Date(dt2));
        var hours = duration.hours;
        var minutes = duration.minutes;
        if(minutes != 0)
        {
            var duration_time = hours+"hrs "+minutes+"min";
        }
        else
        {
            var duration_time = hours+"hrs ";
        }
        return(duration_time);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScrollToElement);

        var data  = require('../data/AW_Response.json');
        data = data.recommendation;
        data = data.sort(function(obj1, obj2) {
            return obj1.totalFare - obj2.totalFare;
        });
    }

    render() {
        var fulldata = require('../data/AW_Response.json');
        var data  = require('../data/AW_Response.json');
        data = data.recommendation;
        var cheapest_price = Math.min.apply(Math,data.map(function(o){return o.totalFare;}))

        return (
            <Layout>
                <div className="container-fluid">
                    <div className="bg-img">
                        <Row className="margin-0">
                            <Col sm={12} style={{padding: '0'}}>
                                <div className="passanger-details">
                                    <Row>
                                        <Col xl={3} lg={4} md={6} sm={8} xs={9} className='pad-6'>
                                            <Row>
                                                <Col sm={5} xs={5}>
                                                    <div className='passanger-class'>
                                                        <small className="pink-text absl-text">TRIP TYPE</small>
                                                        <Form.Control className='trip_select' as="select">
                                                            <option value="1">One Way</option>
                                                            <option value="2">Round Trip</option>
                                                            <option value="3">Multi-city</option>
                                                        </Form.Control>
                                                        <i className="fa fa-sort-desc" aria-hidden="true"></i>
                                                    </div>
                                                </Col>
                                                <Col sm={7} xs={7}>
                                                    <div className="passanger-class">
                                                        <small className="pink-text absl-text">Passanger & Class</small>
                                                        <p>1 Adult, Economy{this.props.userAgent}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={9} lg={8} md={6} sm={4} xs={3} className='pad-6'>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12} md={12} lg={6}>
                                            <Row>
                                                <Col md={6} sm={6} xs={12} className='pad-6'>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inputGroupPrepend" className="bluebg-igroup"><i className="fa fa-map-marker" aria-hidden="true"></i></InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Source City"
                                                                aria-describedby="inputGroupPrepend"
                                                                value={this.state.sourcePlace}
                                                                readOnly="yes"
                                                                className="blubg-control"
                                                                name="sourcePlace" />
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <i className="fa fa-exchange" aria-hidden="true" onClick={this.changePlace}></i>
                                                </Col>
                                                <Col md={6} sm={6} xs={12} className='pad-6'>
                                                    <Form.Group>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inputGroupPrepend" className="bluebg-igroup"><i className="fa fa-map-marker" aria-hidden="true"></i></InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Destination City"
                                                                aria-describedby="inputGroupPrepend"
                                                                value={this.state.destinationPlace}
                                                                readOnly="yes"
                                                                className="blubg-control"
                                                                name="destinationPlace" />
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} md={12} lg={6} className="padding-col">
                                            <Row>
                                                <Col lg={8} md={8} sm={9} xs={12} className='pad-6'>
                                                    <div className='dis_flex'>
                                                        <div className="calendar">
                                                            <img className="img_calendar" src="static/images/calendar.svg" width='25'></img>
                                                            {/* <DatePicker
                                                                className="form-control"
                                                                selected={this.state.startDate}
                                                                onChange={this.handleChange}
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                dateFormat="eee, d MMM d" /> */}
                                                                <DatePicker 
                                                                name="departureDate" 
                                                                className="form-control" 
                                                                showMonthDropdown 
                                                                showYearDropdown 
                                                                dateFormat="eee, d MMM d"
                                                                selected={this.state.startDate}
                                                                onChange={this.handleChange}/>
                                                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                                                            <i className="fa fa-angle-right" aria-hidden="true"></i>&nbsp;
                                                            <span className='separt'> | </span>
                                                        </div>
                                                        <div className='calendar'>
                                                            {/* <DatePicker
                                                                className="form-control"
                                                                selected={this.state.endDate}
                                                                onChange={this.handleChange1}
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                dateFormat="eee, d MMM d" /> */}
                                                            <DatePicker 
                                                                name="departureDate" 
                                                                className="form-control" 
                                                                showMonthDropdown 
                                                                showYearDropdown 
                                                                dateFormat="eee, d MMM d"
                                                                selected={this.state.endDate}
                                                                onChange={this.handleChange1}/>
                                                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={4} md={4} sm={3} xs={12} className='pad-6'>
                                                    <button className="btn-search">SEARCH</button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {/* Filtering component */}
                    <div className="mobile-filterscreen">
                    <div className="visible-xs filter-mobile">
                        <Row className="filtering-row">
                            <Col sm={6} xs={6} lg={6} style={{borderRight:'1px solid #FF4057'}}>
                                <span onClick={this.handlesortToggler} className="mob-togglehead">Sort </span>
                            </Col>
                            <Col sm={6} xs={6} lg={6}>
                                <span onClick={this.handleFilterToggler} className="mob-togglehead">Filter </span>
                            </Col>
                        </Row>
                        <div style={{position: 'relative'}} hidden={!this.state.sortToggler}>
                            <Row className='sort'>
                                <Col md={12} xs={12}>
                                    <p>
                                        <span className="bold-text" style={{fontSize:'13px'}}>Sort by:</span> 
                                        <Button variant="outline-danger" style={{float:'right'}} onClick={()=> this.setState({sortToggler: false,filterToggler: false})}>Close</Button>
                                    </p>
                                    <ul className="mobile-sortlist">
                                        <li>
                                            <span onClick={this.sortPopularity}>
                                                <input className='sort_name' type="radio" name="mobile_sorting" defaultValue="Popularity"/> Popularity
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={this.sortDuration}>
                                                <input className='sort_name' type="radio" name="mobile_sorting" defaultValue="Duration"/> Duration 
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={this.sortPrice}>
                                                <input className='sort_name' type="radio" name="mobile_sorting" defaultValue="Price"/> Price
                                            </span>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    {this.state.filterToggler ?
                    <div className="datas">
                        <Row>
                            <Col xs={12}>
                                <p><span className="bold-text">Filter by:</span><Button variant="outline-danger" style={{float:'right'}} onClick={()=> this.setState({sortToggler: false,filterToggler: false})}>Done</Button></p>
                                <br/>
                                <Row>
                                    <Col xs={12}>
                                        <p className='small_txt'><b>Stops</b><small className="pink-text" style={{ float: 'right' }}>Reset</small></p>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Check className='small_checkbox' type="checkbox" label="Non-stop" name="stop1" value="Non-stop"/>
                                                <Form.Check className='small_checkbox' type="checkbox" label="1stop" name="stop2" value="1stop" />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={12}>
                                        <p className='small_txt'><b>Departure from London</b> <small className="pink-text" style={{ float: 'right' }}>Reset</small></p>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Check className='small_checkbox' type="checkbox" label="6AM - 12 Noon" />
                                                <Form.Check className='small_checkbox' type="checkbox" label="After 6PM" />
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Check className='small_checkbox' type="checkbox" label="12 Noon - 6PM" />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={12}>
                                        <p className='small_txt'><b>Departure from Newyork</b><small className="pink-text" style={{ float: 'right' }}>Reset</small></p>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Check className='small_checkbox' type="checkbox" label="6AM - 12 Noon" />
                                                <Form.Check className='small_checkbox' type="checkbox" label="After 6PM" />
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Check className='small_checkbox' type="checkbox" label="12 Noon - 6PM" />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={12}>
                                        <p className='small_txt'><b>Airlines</b></p>
                                    </Col>
                                    <Col xs={12}>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Check className='small_checkbox' type="checkbox" label="Aer Lingus(2) 103,931" />
                                                <Form.Check className='small_checkbox' type="checkbox" label="Alitalia(6) 86,227" />
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Check className='small_checkbox' type="checkbox" label="Aer Finance(2) 103,931" />
                                                <Form.Check className='small_checkbox' type="checkbox" label="American Airlines,102,750" />
                                            </Col>
                                            <Col xs={12}>
                                                <small className="pink-text" style={{float:'left',marginTop:'20px'}}>More Filters</small>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div> : null}
                </div>
                {/* ----------------end for mobile -------------------- */}
                <div className="desktop-filterscreen">
                    <div className="datas">
                    <Row>
                        <Col md={12} lg={12} xl={6}>
                            <Row>
                                <Col sm={2} xs={4} className='set_border' style={{ padding: '0 4px' }}>
                                    <p className='small_txt'><b>Stops</b><small className="pink-text" style={{ float: 'right' }}>Reset</small></p>
                                    <Row>
                                        <Col xs={12}>
                                            <Form.Check className='small_checkbox' type="checkbox" label="Non-stop" name="stop1" value="Non-stop"/>
                                            <Form.Check className='small_checkbox' type="checkbox" label="1stop" name="stop2" value="1stop" />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={5} xs={4} className='set_border'>
                                    <p className='small_txt'><b>Departure from London</b> <small className="pink-text" style={{ float: 'right' }}>Reset</small></p>
                                    <Row>
                                        <Col xs={12} sm={6}>
                                            <Form.Check className='small_checkbox' type="checkbox" label="6AM - 12 Noon" />
                                            <Form.Check className='small_checkbox' type="checkbox" label="After 6PM" />
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Check className='small_checkbox' type="checkbox" label="12 Noon - 6PM" />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={5} xs={4} className='set_border'>
                                    <p className='small_txt'><b>Departure from Newyork</b><small className="pink-text" style={{ float: 'right' }}>Reset</small></p>
                                    <Row>
                                        <Col xs={12} sm={6}>
                                            <Form.Check className='small_checkbox' type="checkbox" label="6AM - 12 Noon" />
                                            <Form.Check className='small_checkbox' type="checkbox" label="After 6PM" />
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Check className='small_checkbox' type="checkbox" label="12 Noon - 6PM" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={12} lg={12} xl={6}>
                            <Row>
                                <Col xs={12} style={{ padding: '0 4px' }}>
                                    <p className='small_txt'><b>Airlines</b></p>
                                </Col>
                                <Col md={9} sm={12} style={{ padding: '0 4px' }}>
                                    <Row>
                                        <Col xs={5}>
                                            <Form.Check className='small_checkbox' type="checkbox" label="Aer Lingus(2) 103,931" />
                                            <Form.Check className='small_checkbox' type="checkbox" label="Alitalia(6) 86,227" />
                                        </Col>
                                        <Col xs={5}>
                                            <Form.Check className='small_checkbox' type="checkbox" label="Aer Finance(2) 103,931" />
                                            <Form.Check className='small_checkbox' type="checkbox" label="American Airlines,102,750" />
                                        </Col>
                                        <Col xs={2}>
                                            <small className="pink-text">More Filters</small>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={3} sm={12} className='pad-6'>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div className='custom-container'>
                    <div className='filter-datas container'>
                        <Row>
                            <Col sm={10}>                                              
                                <Row className='sort'>
                                    <Col md={2} xs={3}>
                                        <span className="bold-text">Sort by:</span>
                                    </Col>
                                    <Col md={3} xs={3}>
                                        <span className="bold-text" onClick={this.sortPopularity}>Popularity&nbsp;&nbsp;
                                        {this.state.popularityIcon == 0 ?
                                            <span className="text-muted">
                                                <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img>
                                                <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img>
                                            </span> : null}
                                            {this.state.popularityIcon == 2 ?
                                                <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img>
                                                : null}
                                            {this.state.popularityIcon == 1 ?
                                                <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img> : null}
                                        </span>
                                    </Col>
                                    <Col md={3} xs={3}>
                                        <span className="bold-text" onClick={this.sortDuration}>Duration&nbsp;&nbsp;
                                        {this.state.durationIcon == 0 ? 
                                            <span className="text-muted">
                                                <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img>
                                                <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img>
                                            </span> : null}
                                            {this.state.durationIcon == 2 ? 
                                                <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img> : null}
                                            {this.state.durationIcon == 1 ? 
                                                <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img> : null}
                                        </span>
                                    </Col>
                                    <Col md={2} xs={3}>
                                        <span className="bold-text" onClick={this.sortPrice}>Price&nbsp;&nbsp;  
                                        {this.state.priceIcon == 0 ? 
                                            <span className="text-muted">
                                                <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img>
                                                <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img>
                                            </span> : null}
                                            {this.state.priceIcon == 2 ? 
                                                <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img> : null}
                                            {this.state.priceIcon == 1 ? 
                                                <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img> : null}
                                        </span>
                                    </Col>
                                </Row> 
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
                    {/* End Filtering component */}
                    <div className=''>
                    { this.state.loader ? <LoaderIcon/> : <div>
                        <div className='container'>
                        
                            <Row>
                                <Col md={10} sm={12} xs={12}>
                                    {/* Common for sorting datas */}
                                    <div className="sort-title">
                                        <Row>
                                            <Col sm={9}>
                                                <h3 className="bold-text">Smart value Flights</h3>
                                                <p>Popularity based on customer preference, duration & price</p>
                                            </Col>
                                            <Col sm={3} className="text-right">
                                                <div className="topright-price">
                                                    <big><span className="pink-text">Chepeast Starting at</span></big>
                                                    <br />
                                                    <span className="top-currency">
                                                        {getSymbolFromCurrency(fulldata.currencyCode)}
                                                        &nbsp;{cheapest_price}
                                                    </span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    {/* End common title */}

                                        {/* Sorting Area */}
                                        {data.map((resultData, i = 1) => (
                                        <Row className="sort-box" key={resultData.recommendationRefNo}>
                                            <Col xl={8} lg={8} sm={6} xs={6}>
                                                {resultData.totalFare == cheapest_price ? <button className="pink-button cheap">CHEAPEST</button> : <button className="pink-button cheap">VALUE FOR MONEY</button> }
                                                <p className="sort-countryname">{resultData.marketingAirlineNames}</p>
                                            </Col>
                                            <Col xl={4} lg={4} sm={6} xs={6}>
                                                <Row>
                                                    <Col xs={6}>
                                                        <span className="sort-currency text-right">
                                                            {getSymbolFromCurrency(fulldata.currencyCode)}
                                                            &nbsp;{resultData.totalFare}
                                                        </span>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <a href={resultData.Deeplink} target="_blank"><button className="pink-button negative-margin">BOOK NOW</button></a>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Row className="travel-timing">
                                                <Col md={6} sm={6}>
                                                    <b>Departure</b> | {dateFormat(this.changeMonthDate(resultData.flightLeg[0].flightDetails.departureDate), "ddd, mmm d")} | {resultData.flightLeg[0].flightDetails.operatingAirlineName}
                                                </Col>
                                                <Col md={6} sm={6}>
                                                    <b>Return</b> | {dateFormat(this.changeMonthDate(resultData.flightLeg[0].flightDetails.arrivalDate), "ddd, mmm d")} | {resultData.flightLeg[0].flightDetails.operatingAirlineName}
                                                </Col>
                                            </Row>
                                            <Row className="flight-details">
                                                <Col lg={6} md={12} sm={12}>
                                                    <Row>
                                                        <Col xs={1}>
                                                            <input className='radio_style' type="radio" id={`test` + i} name={`radio-group1` + i} defaultChecked />
                                                        </Col>
                                                        <Col xs={4}>
                                                            <div className="start-time" htmlFor={`test` + i}>
                                                                {this.TimeSplit(resultData.flightLeg[0].flightDetails.departureTime)}
                                                                <p className="mini-text">{resultData.flightLeg[0].flightDetails.departureLocationName}</p>
                                                            </div>
                                                        </Col>
                                                        <Col xs={3} className='text-center hrs'>
                                                        {this.calculateDuration(resultData.flightLeg[0].flightDetails.departureDate,resultData.flightLeg[0].flightDetails.arrivalDate,resultData.flightLeg[0].flightDetails.departureTime,resultData.flightLeg[0].flightDetails.arrivalTime)}<hr />
                                                            <span className="mini-text sky-text">Non stop</span>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <div className="start-time">
                                                                {this.TimeSplit(resultData.flightLeg[0].flightDetails.arrivalTime)}
                                                                <p className="mini-text">{resultData.flightLeg[0].flightDetails.arrivalLocationName}</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={6} md={12} sm={12}>
                                                    <Row>
                                                        <Col xs={1}>
                                                            <input className='radio_style' type="radio" id={`test` + i} name={`radio-group1` + i} defaultChecked />
                                                        </Col>
                                                        <Col xs={4}>
                                                            <div className="start-time" htmlFor={`test` + i}>
                                                                17:05
                                                                <p className="mini-text">London - Gatewick</p>
                                                            </div>
                                                        </Col>
                                                        <Col xs={3} className='text-center hrs'>
                                                            08hrs<hr />
                                                            <span className="mini-text sky-text">Non stop</span>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <div className="start-time">
                                                                20:05
                                                                <p className="mini-text">Newyork</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={12} className="text-center grey">
                                                    <span>Cabin Baggage Only Flights</span>
                                                </Col>
                                            </Row>
                                            <Row className="flight-details bottom">
                                                <Col sm={6} xs={8}>
                                                    <p>
                                                        <i className="fa fa-star"></i> 
                                                        <b className='green-text'>8.5<small>/10</small></b>
                                                        <span className=""> Non-refundable</span>
                                                        <i className="fa fa-angle-down" aria-hidden="true" ></i> | 
                                                        <span>Seat varies by flight segment</span>
                                                    </p>
                                                </Col>
                                                <Col sm={6} xs={4} className="text-right">
                                                    <p className="sky-text">Flight Details &nbsp;<i className="fa fa-angle-down" aria-hidden="true"></i></p>
                                                </Col>
                                            </Row>

                                        </Row>
                                    ))} 
                                    {/* Ending Sorting Area */}

                                </Col>
                                <Col md={2} sm={12} xs={12} className='text-center'>
                                    <div className="ad-block">
                                        <p>Place for ad</p>
                                    </div>
                                    <div className="ad-block">
                                        <p>Place for ad</p>
                                    </div>
                                    <div className="ad-block">
                                        <p>Place for ad</p>
                                    </div>
                                </Col>
                            </Row>
                        </div></div>}
                    </div>

                </div>
            </Layout>
        )
    }
}

export default TicketBooking;