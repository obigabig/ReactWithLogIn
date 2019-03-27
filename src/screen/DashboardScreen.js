import React, { Component } from 'react';
import requireAuth from '../utils/requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
//import DueContractList from './DueContractList';
//import InvestorRatio from './InvestorRatio';
import FixButton from '../components/reactComponent/FixButton';
import { menuClicked } from '../actions';

class DashboardScreen extends Component{

    componentDidMount(){
        this.props.menuClicked('Dashboard')
    }

    render() {
        return (             
            <div className="main-box">
                <div className="row">
                    <div className="col s12 m4 l3 hide-on-small-only">
                    </div>
                    <div className="col s12 m8 l9 mobile-box">                           
                                  
                    </div>
                </div>   
                <FixButton link="/Contract"> </FixButton>
            </div>
        );
    }
}

export default compose(
    connect(null, { menuClicked }),
    requireAuth
  )(DashboardScreen);