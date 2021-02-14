import { gql, } from "@apollo/client";

export const SchemeSendOTP = gql`
mutation SendOTP($country_code: String!, $mobile_number: String!) {
  sendOtp(country_code: $country_code, mobile_number: $mobile_number)
}
`;


export const SchemeGetUserData = gql`
  query login($auth_token: String!) {
    login(auth_token: $auth_token) {
      id
      email
      country_abbr
      country_code
      mobile_number
      signup_type
      social_id
      auth_token
      profile_image
      time_zone
      name
      child_details {
        id
        user_id
        child_name
        grade
        stream
        gender
      }
    }
  }
`;
