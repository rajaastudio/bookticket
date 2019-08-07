import React,{Component} from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

class Filtering extends Component
{
    constructor(props)
    {   
        super(props);
        this.state = {
            sortToggler : false,
            filterToggler : false,
        }
        this.handlesortToggler = this.handlesortToggler.bind(this);
        this.handleFilterToggler = this.handleFilterToggler.bind(this);
    }
    handlesortToggler()
    {
        this.setState({sortToggler: !this.state.sortToggler,filterToggler: !this.state.filterToggler})
    }
    handleFilterToggler()
    {
        this.setState({filterToggler: !this.state.filterToggler,sortToggler: !this.state.sortToggler})
    }
    render()
    {
        return(
            <div>
                <div className="mobile-filterscreen">
                    <div className="visible-xs filter-mobile">
                        <Row className="filtering-row">
                            <Col sm={6} xs={6} lg={6} style={{borderRight:'1px solid #FF4057'}}>
                                <span onClick={this.handlesortToggler} className="mob-togglehead">Sort <img className='fa fa-arrow-up' src='static/images/up.png' width='8px'></img>
                                                <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img></span>
                            </Col>
                            <Col sm={6} xs={6} lg={6}>
                                <span onClick={this.handleFilterToggler} className="mob-togglehead">Filter <img className='fa fa-arrow-down' src='static/images/down.png' width='8px'></img></span>
                            </Col>
                        </Row>
                        <div style={{position: 'relative'}} hidden={!this.state.sortToggler}>
                            <Row className='sort'>
                                <Col md={12} xs={12}>
                                    <p><span className="bold-text" style={{fontSize:'13px'}}>Sort by:</span> <Button variant="outline-danger" style={{float:'right'}} onClick={()=> this.setState({sortToggler: false,filterToggler: false})}>Done</Button></p>
                                    <ul className="mobile-sortlist">
                                        <li>
                                            <span onClick={this.sortPopularity}><input type="radio" name="mobile_sorting" defaultValue="Popularity"/> Popularity</span>
                                        </li>
                                        <li>
                                            <span onClick={this.sortDuration}><input type="radio" name="mobile_sorting" defaultValue="Duration"/> Duration </span>
                                        </li>
                                        <li>
                                            <span onClick={this.sortPrice}><input type="radio" name="mobile_sorting" defaultValue="Price"/> Price</span>
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
            </div>
        )
    }
}

export default Filtering;