import { TextField } from '@material-ui/core'
import { Formik } from 'formik'; 
import React from 'react'; 
import { Button,Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel'; 
import MenuItem from '@material-ui/core/MenuItem';
import {Card,CardHeader,CardBody, FormFeedback} from 'reactstrap'
import * as yup from 'yup';
import { Label, Input } from 'reactstrap';
import Tickets from '../Tickets';
const validationSchema =yup.object({
    date : yup.string().required("date is Required"), 
    time : yup.string().required("Please Select the Time"),
    members : yup.string().required("Please enter the no of members")
});

    

function VerticalStepper(props) {
    return (
        <div>
            <Formik
                initialValues={{
                    date : '',
                    time : '',
                    members : ''
                }}
                 onSubmit={async(values,{resetForm}) => {
                    await alert(JSON.stringify(values,null,2));
                     props.setData(values); 
                     props.data.push(values)
                    resetForm();
                    
                }}
                validationSchema={validationSchema}
            >{(formik =>
             <form onSubmit={formik.handleSubmit}>
                    <Card className="myorder bg-gradient bg-transparent">
                        <CardBody>
                            <Label htmlFor="date" style={{marginTop:'5px'}}>What day would you like to visit? <span className="text-danger">*</span></Label>
                            <Input 
                                type="date"
                                placeholder="Please select a date"
                                fullWidth
                                id="date"
                                name="date" 
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                invalid={formik.touched.date && Boolean(formik.errors.date)}
                                helperText={formik.touched.date && formik.errors.date}
                                style={{marginTop:'10px'}}  
                            />
                            <FormFeedback>{formik.errors.date}</FormFeedback>
                            <Label for="time" style={{marginTop:'5px'}}>What time would you like to visit?<span className="text-danger">*</span></Label>
                            <Input 
                                type="select" 
                                id="time"
                                name="time" 
                                value={formik.values.time}
                                onChange={formik.handleChange}
                                invalid={formik.touched.time && Boolean(formik.errors.time)}
                                helperText={formik.touched.time && formik.errors.time} 
                                style={{marginTop:'10px'}}
                                placeholder="Please Select a Time"
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                            <FormFeedback>{formik.errors.time}</FormFeedback>
                            <Label htmlFor="members" style={{marginTop:'5px'}}>What day would you like to visit? <span className="text-danger">*</span></Label>
                            <Input 
                                type="number"
                                fullWidth
                                placeholder="0"
                                id="members"
                                name="members" 
                                value={formik.values.members}
                                onChange={formik.handleChange}
                                invalid={formik.touched.members && Boolean(formik.errors.members)}
                                helperText={formik.touched.members && formik.errors.members}
                                style={{marginTop:'10px'}}  
                            /> 
                            <FormFeedback>{formik.errors.members}</FormFeedback>
                            <Button 
                                fullWidth
                                type="submit" 
                                color="primary"
                                variant="contained"
                                style={{marginTop:'30px'}}    
                            >
                                    Submit
                            </Button>
                            </CardBody>
                    </Card>
                </form>
            )}
            </Formik>
        </div>
    )
}

export default VerticalStepper

