import React from 'react';
import Layout from '../components/layout';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Router from "next/router";
import Autocomplete from  'react-autocomplete';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: props.activeTab,
			showAnn: false,
			round: true,
			oneway: false,
			multi: false,
			searchType:0,
			isDirectFlight: false,
			departureLocationCode: '',
			arrivalLocationCode: '',
			preferedFlightClass:0,
			departureDate: new Date(),
			returnDate: new Date(),
			adultCount: 1,
			childCount: 0,
			departure_err :false,
			arrival_err : false,
			cabin_err: false,
			departureDate_err: false,
			returnDate_err: false,
			adults_err: false,
			child_err:false,
			value:'',
			value1:''
			};
		this.handleendChange = this.handleendChange.bind(this);
		this.handlestartChange = this.handlestartChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);

		this.showAnother = this.showAnother.bind(this);

		this.handleround = this.handleround.bind(this);
		this.handleoneway = this.handleoneway.bind(this);
		this.handlemulti = this.handlemulti.bind(this);
		this.changedirectFlight = this.changedirectFlight.bind(this);
		this.changeDeparture = this.changeDeparture.bind(this);
		this.changeArrival = this.changeArrival.bind(this);
		this.changeClass = this.changeClass.bind(this);
		this.adultChanged = this.adultChanged.bind(this);
		this.childChanged = this.childChanged.bind(this);
		this.flightsforRoundTrip = this.flightsforRoundTrip.bind(this);
	}	
	componentDidMount()
	{
		//number input
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
		// End number input
	}
	showAnother(e) {
		this.setState({
			showAnn: true
		});
	}

	handleround(date) {
		this.setState({
			round: true,
			oneway: false,
			multi: false,
			searchType:1
		});
	}

	handleoneway(date) {
		this.setState({
			round: false,
			oneway: true,
			multi: false,
			searchType:2,
		});
	}

	handlemulti(date) {
		this.setState({
			round: false,
			oneway: false,
			multi: true,
			searchType:3,
		});
	}

	handleendChange(date) {
		this.setState({
			returnDate: date
		});
	}

	handlestartChange(date) {
		this.setState({
			departureDate: date
		});
	}

	handleSelect(selectedTab) {
		this.setState({
			activeTab: selectedTab
		});
	}
	changedirectFlight(e)
	{
		this.setState({[e.target.name]: !this.state.isDirectFlight});
		console.log(this.state.isDirectFlight);
	}
	changeDeparture(e)
	{
		this.setState({[e.target.name]: e.target.value,departure_err: false});
		console.log(this.state.departureLocationCode);
	}
	changeArrival(e)
	{
		this.setState({[e.target.name]: e.target.value,arrival_err: false});
		console.log(this.state.arrivalLocationCode);
	}
	changeClass(e)
	{
		this.setState({[e.target.name]: e.target.value,cabin_err: false});
		console.log(this.state.preferedFlightClass);
	}
	adultChanged(e)
	{
		if(e.target.value>9)
		{
			this.setState({adults_err: true});
			e.target.value=1;
		}
		else
		{
			this.setState({[e.target.name]: e.target.value,adults_err: false});
			console.log(this.state.adultCount);
		}
	}
	childChanged(e)	
	{
		if(e.target.value>9)
		{
			this.setState({child_err: true});
			e.target.value=0;
		}
		else
		{
			this.setState({[e.target.name]: e.target.value,child_err: false});
			console.log(this.state.childCount);
		}
	}
	matchStocks(state, departureLocationCode) {
		return (
		  state.CityName.toLowerCase().indexOf(departureLocationCode.toLowerCase()) !== -1 ||
		  state.CityId.toLowerCase().indexOf(departureLocationCode.toLowerCase()) !== -1
		);
	  }
	matchStocks1(state, arrivalLocationCode) {
		return (
			state.CityName.toLowerCase().indexOf(arrivalLocationCode.toLowerCase()) !== -1 ||
			state.CityId.toLowerCase().indexOf(arrivalLocationCode.toLowerCase()) !== -1
		);
		}
	flightsforRoundTrip(e)
	{
		e.preventDefault();
		if(this.state.departureLocationCode == "")
		{
			this.setState({departure_err: true});
		}
		if(this.state.arrivalLocationCode == "")
		{
			this.setState({arrival_err: true});
		}
		if(this.state.preferedFlightClass == "0")
		{
			this.setState({cabin_err: true});
		}
		if(this.state.departureDate == "")
		{
			this.setState({departureDate_err: true});
		}
		if(this.state.returnDate == "")
		{
			this.setState({returnDate_err: true});
		}
		if(this.state.adultCount == "")
		{
			this.setState({adults_err: true});
		}
		if(this.state.childCount === "" )
		{
			this.setState({child_err: true});
		}		
		console.log(this.state.cabin_err);
		if(this.state.departureLocationCode!=="" && this.state.arrivalLocationCode!==""&&this.state.departureDate!=""&&this.state.returnDate!=""&&this.state.preferedFlightClass!=0)
		{
			this.state = 
			{
				userdata:{
					adultCount: this.adultCount.value,
					childCount: this.childCount.value,
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
				}
				Router.push({
					pathname: '/ticketbooking',
					})
		console.log(this.state.userdata);
		}
		
	}
	render() {
		var data  = require('../data/autocomplete.json');
		return (
			<Layout>
				<section className="background">
					<Container>
						<div className="title">Discover</div>
						<h5 className="title_flight">
							<img className='flight_img' src='static/images/airplane-flight.svg' width='25' ></img> Flights
                        </h5>
						<div className="flight">
							<Form onSubmit={this.flightsforRoundTrip}>
								{['radio'].map(type => (
									<div key={`inline-${type}`} className="mb-3">
										<Form.Check name="searchType" defaultValue="1" className='radio_btn' inline label="One Way" type={type} onClick={this.handleoneway} id={`inline-${type}-2`} />
										<Form.Check name="searchType" defaultValue="2" className='radio_btn' inline label="Round Trip" defaultChecked type={type} onClick={this.handleround} id={`inline-${type}-1`} />
										<Form.Check name="searchType" defaultValue="3" className='radio_btn' inline label="Multi-city" type={type} onClick={this.handlemulti} id={`inline-${type}-3`} />
									</div>
								))}
								{['checkbox'].map(type => (
									<div key={`inline-${type}`} className="mb-3 right">
										<Form.Check name="isDirectFlight" inline label="Direct Flight Only" type={type} id={`inline-${type}-1`} defaultChecked={this.state.isDirectFlight} defaultValue={this.state.isDirectFlight} onClick={this.changedirectFlight}/>
									</div>
								))}

								<Row hidden={!this.state.round}>
									<Col md={9} sm={12}>
										<Row>
											<Col md={6} sm={6}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>From</Form.Label>
													<div className="select_box1">
													<Autocomplete
														value={ this.state.departureLocationCode }
														inputProps={{ id: 'states-autocomplete' }}
														items={ data }
														getItemValue={ item => item.CityName }
														shouldItemRender={ this.matchStocks }
														onChange={(event, departureLocationCode) => this.setState({ departureLocationCode }) }
														onSelect={ departureLocationCode => this.setState({ departureLocationCode }) }
														renderMenu={ children => (
															<div className = "menu">
															{ children }
															</div>
														)}
														renderItem={(item, isHighlighted) => (
															<div className={`item ${isHighlighted ? 'item-highlighted' : ''}`} key={item.CityName} >
																<p>
																	<i className="fa fa-fighter-jet" aria-hidden="true"></i>
																	&nbsp;&nbsp;{item.CityName}&nbsp;&nbsp;
																	<small>({item.CityId})</small>
																	&nbsp;&nbsp;{item.CountryName}
																</p>
															</div>
														)}
														/><br/>
														{this.state.departure_err ? (<i className="err-msg">Departure Location required</i>): null}
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
														value={ this.state.arrivalLocationCode }
														inputProps={{ id: 'states-autocomplete' }}
														items={ data }
														getItemValue={ item => item.CityName }
														shouldItemRender={ this.matchStocks1 }
														onChange={(event, arrivalLocationCode) => this.setState({ arrivalLocationCode }) }
														onSelect={ arrivalLocationCode => this.setState({ arrivalLocationCode }) }
														renderMenu={ children => (
															<div className = "menu">
															{ children }
															</div>
														)}
														renderItem={(item, isHighlighted) => (
															<div className={`item ${isHighlighted ? 'item-highlighted' : ''}`} key={item.CityName} >
																<p>
																	<i className="fa fa-fighter-jet" aria-hidden="true"></i>
																	&nbsp;&nbsp;{item.CityName}&nbsp;&nbsp;
																	<small>({item.CityId})</small>
																	&nbsp;&nbsp;{item.CountryName}
																</p>
															</div>
														)}
														/><br/>
														{this.state.arrival_err ? (<i className="err-msg">Arrival Location required</i>): null}
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
												<Form.Control as="select" name="preferedFlightClass" onChange={this.changeClass}>
													<option value="0" hidden>Select</option>
													<option value="1">Any</option>
													<option value="2">Business</option>
													<option value="3">Economy</option>
													<option value="4">First Class</option>
													<option value="5">PremiumOrEconomy</option>
													<option value="6">PremiumAndEconomy</option>
												</Form.Control>
												{this.state.cabin_err ? (<i className="err-msg">Cabin class is required</i>): null}
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
														selected={this.state.departureDate} 
														onChange={this.handlestartChange} />
														{this.state.departureDate_err ? (<i className="err-msg">Departure date is required</i>): null}
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
															selected={this.state.returnDate} 
															onChange={this.handleendChange}
															/>
														{this.state.returnDate_err ? (<i className="err-msg">Return date is required</i>): null}
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
															<input type="number" ref={(input) => this.adultCount = input} name="adultCount" min="1" max="9" step="1" defaultValue={this.state.adultCount} className="form-control" onChange={this.adultChanged}/>
															{this.state.adults_err ? (<i className="err-msg">Adults counting atleast have 1</i>): null}
														</div>
													</div>
												</Form.Group>
											</Col>
											<Col sm={3}>
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>Children</Form.Label>
													<div className="arrow">
														<div className="quantity">
															<input type="number" ref={(input) => this.childCount = input} name="childCount" min="0" max="9" step="1" defaultValue={this.state.childCount} className="form-control" onChange={this.childChanged}/>
															{this.state.child_err ? (<i className="err-msg">Invalid counting</i>): null}
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

								<Row hidden={!this.state.oneway}>
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
														{/* <i className="fa fa-calendar"> </i>  */}
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
								</Row>

								<Row hidden={!this.state.multi}>
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
								</Row>
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
}

export default Index;