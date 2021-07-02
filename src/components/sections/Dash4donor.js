import {useState, useEffect} from 'react';
import axios from "../../api/axios";

import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link } from 'react-router-dom';
import './style.css'
import FooterSocial from '../layout/partials/FooterSocial';
import { Chart } from "react-google-charts";

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {


  console.log(props.location)  
  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: '',
    paragraph: ''
  };


  const [student,setStudent]=useState(props.location.state.student)
  const [donortoken,setDonortoken]=useState(props.location.state.donordata)
  const [studentMarklist,setStudentMarklist]=useState([])
  const [donorStudents,setDonorStudents]=useState([])
  useEffect(() => {
    axios.get('/adoptedStudents', {
        headers : {
            email:donortoken.email,
            authorization: donortoken
        }
    }).then((response) => {
            console.log(response.data)
            setDonorStudents(response.data)
        })
  }, []);
  
  useEffect(() => {
    axios.get('/getMarks', {
        headers : {
            email:props.location.state.email,
            authorization: donortoken
        }
    }).then((response) => {
            console.log(response.data)
            //console.log(index)
            setStudentMarklist(response.data)
        
        })
  }, []);
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
            <div style={{padding:"3%", margin:"1% 0% 4% 0%"}}>
                        <div className="row" style={{alignItems:"center"}}> 
                                <div className="column4" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{fontSize:"14px"}}>
                                        <center>
                                        <Chart
                                        width={'100%'}
                                        height={'100%'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                        ['Task', '100'],
                                        ['English', 20.52],
                                        ['Hindi', 20.52],
                                        ['Physics', 20.08],
                                        ['Chemistry', 17.58],
                                        ['Math', 21.3],
                                        ]}
                                        options={{
                                        title: 'Cumulative: 100',
                                        }}
                                        rootProps={{ 'data-testid': '1' }}
                                        />
                                        </center>
                                    </p>
                                </div>
                                <div className="column3" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                    i want to be an {student.aim}
    
                                    </p>
                                </div>
                        </div>
            </div>
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <p className="m-0" style={{alignItems:"center"}}>
                  <br/>
                    <div style={{border:"1px solid #3d946e", padding:"7%", margin:"4% 0%"}}>
                        <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                        <div className="row">
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Subjects
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Number
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Test 1
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Test 2
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Cumulative
                                            </div>
                                        </div><br/>
                                        {studentMarklist.map((subject,index)=>{
                                            if (index>=2){
                                                return
                                            }
                                            else{
                                                return(
                                                    <div className="row">
                                                    <div className="column2" style={{textAlign:"left"}}>
                                                        {subject.subject}
                                                    </div>
                                                    <div className="column2" style={{textAlign:"left"}}>
                                                        {index}
                                                    </div>
                                                    <div className="column2" style={{textAlign:"left"}}>
                                                        {subject.marks[0]}
                                                    </div>
                                                    <div className="column2" style={{textAlign:"left"}}>
                                                        {subject.marks[1]}
                                                    </div>
                                                    <div className="column2" style={{textAlign:"left"}}>
                                                        {subject.marks[1]}
                                                    </div>
                                                    {/* <div className="column2" style={{textAlign:"center"}}>
                                                        XX
                                                    </div> */}
                                                </div>
                                                  
                                                )
                                            }
                                        })}
                                        
                                <br/>
                            
                        </p>
                    </div>
                    <div style={{border:"1px solid #3d946e", padding:"7%", margin:"4% 0%"}}>
                        <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                        
                        {studentMarklist.map((subject,index)=>{
                            if (index<2){
                                return
                            }
                            else{}
                            
                        })}
                        <div className="row">
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Physics
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                02
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                92
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                93
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                92.5
                                            </div>
                                            {/* <div className="column2" style={{textAlign:"center"}}>
                                                XX
                                            </div> */}
                                        </div>
                            <br/>
                           
                            <div className="row">
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Chemistry
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                01
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                91
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                -
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                81
                                            </div>
                                            
                                        </div>
                            <br/>
                            <div className="row">
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Maths
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                01
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                98
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                -
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                98
                                            </div>
                                            
                                        </div>
                        </p>
                    </div>
                </p>
              </div>
              <div className='split-item-image center-content-mobile reveal-from-bottom' data-reveal-container=".split-item" style={{paddingLeft:"2%"}}>
                <p className="m-0">
                    <center>
                    <a href="#" style={{color:"grey", fontSize:"14px", margin:"0.5rem"}}>EAA</a>
                        <div style={{border:"1px solid #3d946e", padding:"7%", margin:"4% 0%", width:"80%"}}>
                            <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                            2 times school badminton winner<br/>4 academy medals- 2gold, 1 silver, 1 bronze<br/>Best player of the year<br/>District champion Bangalore.                             </p>
                            <br/>
                            <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                            </p>
                        </div>
                    </center>
                </p>
              </div>
            </div>
            
          </div>
          <center>
            <br/><br/>
            <Link to="#" className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#3d946e"}}>Open</Link>
          </center>
        </div>
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;