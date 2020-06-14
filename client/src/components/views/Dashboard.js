import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Dashboard extends React.Component {

  render() {
    const { firstname, lastname } = this.props;
    return (
      <div className="container">
        <h1>Welcome {firstname} {lastname} to Dashboard!</h1>
      </div>
    );
  }
}

Dashboard.propTypes = {
  firstname: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname
  };
}

export default connect(mapStateToProps, null)(Dashboard);