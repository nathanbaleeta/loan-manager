import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputMask from 'react-input-mask';

import CustomToolbar from "./mui-datatables/CustomToolbar";

import API from "./Api";

const styles = theme => ({
 
});

const loans = [
  {
    value: "Secured",
    label: "Secured"
  },
  {
    value: "Unsecured",
    label: "Unsecured"
  }
];

class CreateDebitor extends React.Component {
	constructor() {
        super();     
        this.state = {
            firstName: '',
		    lastName: '',
		    phone1: '',
		    phone2: '',
		    address: '',
		    principal: '',
		    interestRate: '',
		    issueDate: '',
		    loanTerm: '',
		    loanType: '',
		    collateral: ''
        };
      }

    
  
  onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
      }

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
	const loan = {	
	      firstName: this.state.firstName,
	      lastName: this.state.lastName,
	      phone1: this.state.phone1,
	      phone2: this.state.phone2,
	      address: this.state.address,
	      principal: this.state.principal,
	      interestRate: this.state.interestRate,
	      issueDate: this.state.issueDate,
	      loanTerm: this.state.loanTerm,
	      loanType: this.state.loanType,
	      collateral: this.state.collateral
    };

    API.post("loans", loan )
      .then(response => {
        console.log(response)
        this.handleClose()


      })
      .catch(error => {
    	console.log(error)
	});

      this.setState({
            firstName: '',
		    lastName: '',
		    phone1: '',
		    phone2: '',
		    address: '',
		    principal: '',
		    interestRate: '',
		    issueDate: '',
		    loanTerm: '',
		    loanType: '',
		    collateral: ''
        })
	

  }

  render() {

  	const { firstName, lastName, phone1, phone2, address, principal, 
  		    interestRate, issueDate, loanTerm, loanType, 
	  		collateral 
  	} = this.state;

    return (
    	<div>
        
        <form onSubmit={this.handleSubmit}>
        <Typography component="h1" variant="h4" align="center">
               Create Loan
        </Typography>
        	<Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={this.onChange}
              label="First name"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={this.onChange}
              label="Last name"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="address"
              name="address"
              value={address}
              onChange={this.onChange}
              label="Address"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputMask
				  mask="(+256) 999 999 999"
				  value={phone1}
				  onChange={this.onChange}
				>
				  {() => <TextField  
				  			id="phone1"
				            name="phone1"				            
				            label="Phone 1"
				            fullWidth 
				            autoComplete="phone1"/>}
			</InputMask>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputMask
				  mask="(+256) 999 999 999"
				  value={phone2}
				  onChange={this.onChange}
				>
				  {() => <TextField  
				  			id="phone2"
				            name="phone2"				            
				            label="Phone 2"
				            fullWidth 
				            autoComplete="off"/>}
			</InputMask>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="principal"
              name="principal"
              value={principal}
              onChange={this.onChange}
              label="Principal"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="interestRate"
              name="interestRate"
              value={interestRate}
              onChange={this.onChange}
              label="Interest rate"
              type="number"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="issueDate"
              name="issueDate"
              value={issueDate}
              onChange={this.onChange}
              label="Issue Date"
              type="date"
              fullWidth
              autoComplete="off"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="loanTerm"
              name="loanTerm"
              value={loanTerm}
              onChange={this.onChange}
              label="Loan term"
              type="number"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="loanType"
              select
              name="loanType"
              value={loanType}
              onChange={this.onChange}
              label="Loan type*"
              fullWidth
              helperText="Please select loan type"
              InputLabelProps={{
                shrink: true
              }}
            >
              {loans.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <TextField
              id="collateral"
              type="string"
              name="collateral"
              value={collateral}
              onChange={this.onChange}
              label="Collateral*"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          

          <Grid item xs={12} sm={6}>
		      <Button type="submit" variant="contained" size="large" color="primary">
		        Save Loan
		      </Button>
		       
          </Grid>
        </Grid>

		</form>
      </div>
          );
  }
}

export default withStyles(styles)(CreateDebitor);


