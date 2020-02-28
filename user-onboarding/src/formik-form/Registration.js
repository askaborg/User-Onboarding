import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import UserDisplay from './UserDisplay'

const RegistrationForm = ({ values, errors, touched, status }) => {
    const [userList, addUser] = useState([])

    useEffect(() => status && addUser(userList => [...userList, status]), [status])

    return (
        <div className="registration-form">
            <Form>
                <div>
                    {touched.name && errors.name && (<p>{errors.name}</p>)}   
                    <Field type="text" name="name" placeholder="Name" />
                </div>
                <div>
                    {touched.email && errors.email && (<p>{errors.email}</p>)}
                    <Field type="text" name="email" placeholder="Email" />
                </div>
                <div>
                    {touched.password && errors.password && (<p>{errors.password}</p>)}    
                    <Field type="password" name="password" placeholder="Pass" />
                </div>
                <div>
                    <label>
                        Accept the Terms of Service       
                        {touched.terms && errors.terms && (<p>{errors.terms}</p>)}             
                        <Field type="checkbox" name="terms" checked={values.terms} />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Submit" /> 
                </div>
            </Form>
            <UserDisplay userList={userList} />       
        </div>
    )
}

const Registration = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(2, "Name requires at least 2 characters")
            .max(50, "Name cannot be more than 50 characters")
            .required("You need a name"),
        email: Yup.string()
            .email("You need a real email")
            .required("You need an email"),
        password: Yup.string()
            .min(6, "Password needs to be at lease 6 characters")
            .required("You need a password"),
        terms: Yup.boolean()
            .oneOf([true], "You need to accept")
    }),
    handleSubmit(values, { setStatus, resetForm }){
        axios
            .post("https://reqres.in/api/users/", values)
            .then(responseReqres => setStatus(responseReqres.data))
            .catch(errorReqres => console.log(errorReqres.response))
            .finally(resetForm())
    }
})(RegistrationForm)

export default Registration