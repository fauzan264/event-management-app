import * as yup from "yup";

export const registerSchema = yup.object().shape({
  idCardNumber: yup.number().required("ID Card Number is required"),
  fullName: yup.string().required("Full Name is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  referralCode: yup.string(),
  userRole: yup.string().required("User Role is required"),
});
