import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Helpandtipsbanner from '../Banner/Helpandtipsbanner'
import { Col, Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
const Helpsandtips = () => {
    return (
        <div>
            <Header />
            <Helpandtipsbanner />
            <h1 className='text-center mt-5'>Helps and Tips</h1>
            <Container className='mt-5 mb-5 helpsandtips'>
                <Row style={{ justifyContent: 'center' }}>
                    <Col xs={12} md={8}>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>1) Why Motor insurance is mandatory?</Accordion.Header>
                                <Accordion.Body>
                                    As per UAE LAW, every year the vehicle has to be registered. To register the vehicle, valid insurance policy is mandatory.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>2) How motor insurance premiums are calculated?</Accordion.Header>
                                <Accordion.Body>
                                    The insurance amount is calculated based on your driving history, type of vehicle etc. In order to obtain a quote please log on to the quote and buy section of our website.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>3) Difference between Comprehensive and Third party insurance?</Accordion.Header>
                                <Accordion.Body>
                                    In comprehensive insurance, client car will be covered in the insurance even if he/she is at fault during the accident. Client has to pay the agreed Excess amount; car will be repair.  In third party, client car will not be insured in his/her policy.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>4) What is personal accident benefits covers?</Accordion.Header>
                                <Accordion.Body>
                                    Personal accident covers are like life insurance, which will be applicable or provided at the time of death or disablement like hand or leg, loss of vision etc., in general, these cases will be approved by the court since it is huge accident.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>5) Why the car value is being depreciated?</Accordion.Header>
                                <Accordion.Body>
                                    The vehicle value is declared based on the market value and the last year sum insured. It is depreciated 10-15% every year and market value also will be considered if the brand new vehicle value got reduced.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>6) When the vehicle value will be considered?</Accordion.Header>
                                <Accordion.Body>
                                    Vehicle value will be considered only at the time of total loss cases. If the vehicle repair cost due to accident is more than 50% of the sum insured means, the vehicle will be declared as total loss.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="6">
                                <Accordion.Header>7) What will happen if the vehicle is declared as total loss?</Accordion.Header>
                                <Accordion.Body>
                                    If there is no loan, you have to name transfer the vehicle to the insurance company name and they will provide you with the settlement amount (sum insured) after depreciating as per company procedure. For bank loan, it will be settled to the bank whatever the amount of settlement, remaining amount should be paid by the insured, if any.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="7">
                                <Accordion.Header>8) Why and when is excess is applicable?</Accordion.Header>
                                <Accordion.Body>
                                    Excess is applicable if the client has comprehensive insurance and he/she is at fault during the accident. The client has to pay the excess amount and the car will be repaired on the damaged parts.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="8">
                                <Accordion.Header>9) Does insurance cover my engine, battery and other spare parts?</Accordion.Header>
                                <Accordion.Body>
                                    Please note that insurance policy does not cover any mechanical fault in the car at all. Client can avail roadside assistance like towing or battery boast if it is included in the policy.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="9">
                                <Accordion.Header>10) Does insurance policy cover my tires and battery?</Accordion.Header>
                                <Accordion.Body>
                                    Motor insurance policy will not cover battery and tires as well. If the tyre is damaged or got flat, it is not covered under insurance.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="10">
                                <Accordion.Header>11) What is the major difference between Agency and Garage Repair?</Accordion.Header>
                                <Accordion.Body>
                                    In Agency repair, the car will be serviced at the dealer if had an accident, where he/she gets brand new or genuine parts of the vehicles. However, in garage repair, client gets standardized parts or used parts.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="11">
                                <Accordion.Header>12) When does my tyre is covered in the motor policy?</Accordion.Header>
                                <Accordion.Body>
                                    If the tyre got damaged due to an accident, it will be covered based on the insurance companies’ terms and conditions.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="12">
                                <Accordion.Header>13) Does my regular services like oil change, wheel alignment can be covered in insurance?</Accordion.Header>
                                <Accordion.Body>
                                    Insurance policy does not cover any regular services. It covers only accidental damages.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="13">
                                <Accordion.Header>14) What is Emergency Medical Expenses?</Accordion.Header>
                                <Accordion.Body>
                                    It is covered on reimbursement basis, if a person either driver or passenger is injured due to an accident, they will be covered upto certain limit as per insurance company terms and conditions.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="14">
                                <Accordion.Header>15) What is windscreen excess wavier?</Accordion.Header>
                                <Accordion.Body>
                                    It is covered only at the time of damage happened in windscreen, till the limit as per the policy, there is no excess. Above the limit, client has to pay the excess and the windscreen will be services.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
            <h1 className='text-center mt-5'>FAQ</h1>
            <Container className='mt-5 mb-5 helpsandtips'>
                <Row style={{ justifyContent: 'center' }}>
                    <Col xs={12} md={8}>
                        <Accordion >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>1. Lorem ipsum dolor sit?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>2. Lorem ipsum dolor sit?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>3. Lorem ipsum dolor sit?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>4. Lorem ipsum dolor sit?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>5. Lorem ipsum dolor sit?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion> 
                    </Col>
                </Row >
            </Container >
            <Footer />
        </div>
    )
}

export default Helpsandtips